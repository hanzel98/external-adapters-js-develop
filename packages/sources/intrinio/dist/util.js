"use strict";
/**
 * This code is directly copied from Intrinio's library.  We have a ticket to refactor this file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntrinioRealtime = void 0;
const tslib_1 = require("tslib");
const https = tslib_1.__importStar(require("https"));
const events = tslib_1.__importStar(require("events"));
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const EventEmitter = events.EventEmitter;
const SELF_HEAL_BACKOFFS = [0, 100, 500, 1000, 2000];
class IntrinioRealtime extends EventEmitter {
    constructor(options) {
        super();
        this.token = null;
        this.websocket = null;
        this.ready = false;
        this.channels = {};
        this.joinedChannels = {};
        this.afterConnected = null; // Promise
        this.self_heal_backoff = Array.from(SELF_HEAL_BACKOFFS);
        this.self_heal_ref = null;
        this.quote_callback = null;
        this.error_callback = null;
        this.options = options;
        this.token = null;
        this.websocket = null;
        this.ready = false;
        this.channels = {};
        this.joinedChannels = {};
        this.afterConnected = null; // Promise
        this.self_heal_backoff = Array.from(SELF_HEAL_BACKOFFS);
        this.self_heal_ref = null;
        this.quote_callback = null;
        this.error_callback = null;
        // Parse options
        if (!options) {
            this._throw('Need a valid options parameter');
        }
        if (options.api_key) {
            if (!this._validAPIKey(options.api_key)) {
                this._throw('API Key was formatted invalidly');
            }
        }
        else {
            if (!options.username && !options.password) {
                this._throw('API key or username and password are required');
            }
            if (!options.username) {
                this._throw('Need a valid username');
            }
            if (!options.password) {
                this._throw('Need a valid password');
            }
        }
        const providers = ['iex', 'quodd', 'cryptoquote', 'fxcm'];
        if (!options.provider || !providers.includes(options.provider)) {
            this._throw('Need a valid provider: iex, quodd, cryptoquote, or fxcm');
        }
    }
    _throw(e) {
        let handled = false;
        if (typeof e === 'string') {
            e = 'IntrinioRealtime | ' + e;
        }
        if (this.listenerCount('error') > 0) {
            ea_bootstrap_1.Logger.error(e);
            handled = true;
        }
        if (!handled) {
            throw e;
        }
    }
    _makeAuthUrl() {
        let auth_url = {
            host: '',
            path: '',
        };
        if (this.options.provider == 'iex') {
            auth_url = {
                host: 'realtime.intrinio.com',
                path: '/auth',
            };
        }
        else if (this.options.provider == 'quodd') {
            auth_url = {
                host: 'api.intrinio.com',
                path: '/token?type=QUODD',
            };
        }
        else if (this.options.provider == 'cryptoquote') {
            auth_url = {
                host: 'crypto.intrinio.com',
                path: '/auth',
            };
        }
        else if (this.options.provider == 'fxcm') {
            auth_url = {
                host: 'fxcm.intrinio.com',
                path: '/auth',
            };
        }
        if (this.options.api_key) {
            auth_url = this._makeAPIAuthUrl(auth_url);
        }
        return auth_url;
    }
    _makeAPIAuthUrl(auth_url) {
        let path = auth_url.path;
        if (path.includes('?')) {
            path = path + '&';
        }
        else {
            path = path + '?';
        }
        auth_url.path = path + 'api_key=' + this.options.api_key;
        return auth_url;
    }
    _makeHeaders() {
        if (this.options.api_key) {
            return {
                'Content-Type': 'application/json',
            };
        }
        else {
            const { username, password } = this.options;
            return {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            };
        }
    }
    _refreshToken() {
        ea_bootstrap_1.Logger.debug('Requesting auth token...');
        return new Promise((fulfill, reject) => {
            const agent = this.options.agent || false;
            const { host, path } = this._makeAuthUrl();
            const headers = this._makeHeaders();
            // Get token
            const options = {
                host: host,
                path: path,
                agent: agent,
                headers: headers,
            };
            const req = https.get(options, (res) => {
                if (res.statusCode == 401) {
                    this._throw('Unable to authorize');
                    reject();
                }
                else if (res.statusCode != 200) {
                    console.error('IntrinioRealtime | Could not get auth token: Status code ' + res.statusCode);
                    reject();
                }
                else {
                    res.on('data', (data) => {
                        this.token = Buffer.from(data, 'base64').toString();
                        ea_bootstrap_1.Logger.debug('Received auth token!');
                        fulfill();
                    });
                }
            });
            req.on('error', (e) => {
                console.error('IntrinioRealtime | Could not get auth token: ' + e);
                reject(e);
            });
            req.end();
        });
    }
    async _makeSocketUrl() {
        if (!this.token) {
            await this._refreshToken();
            if (!this.token)
                return '';
        }
        if (this.options.provider == 'iex') {
            return ('wss://realtime.intrinio.com/socket/websocket?vsn=1.0.0&token=' +
                encodeURIComponent(this.token));
        }
        else if (this.options.provider == 'quodd') {
            return 'wss://www5.quodd.com/websocket/webStreamer/intrinio/' + encodeURIComponent(this.token);
        }
        else if (this.options.provider == 'cryptoquote') {
            return ('wss://crypto.intrinio.com/socket/websocket?vsn=1.0.0&token=' +
                encodeURIComponent(this.token));
        }
        else if (this.options.provider == 'fxcm') {
            return ('wss://fxcm.intrinio.com/socket/websocket?vsn=1.0.0&token=' + encodeURIComponent(this.token));
        }
        return '';
    }
    _makeHeartbeatMessage() {
        if (this.options.provider == 'quodd') {
            return { event: 'heartbeat', data: { action: 'heartbeat', ticker: Date.now() } };
        }
        else if (['iex', 'cryptoquote', 'fxcm'].includes(this.options.provider)) {
            return { topic: 'phoenix', event: 'heartbeat', payload: {}, ref: null };
        }
    }
    _makeJoinMessage(channel) {
        if (this.options.provider == 'iex') {
            return {
                topic: this._parseIexTopic(channel),
                event: 'phx_join',
                payload: {},
                ref: null,
            };
        }
        else if (this.options.provider == 'quodd') {
            return {
                event: 'subscribe',
                data: {
                    ticker: channel,
                    action: 'subscribe',
                },
            };
        }
        else if (['cryptoquote', 'fxcm'].includes(this.options.provider)) {
            return {
                topic: channel,
                event: 'phx_join',
                payload: {},
                ref: null,
            };
        }
    }
    _makeLeaveMessage(channel) {
        if (this.options.provider == 'iex') {
            return {
                topic: this._parseIexTopic(channel),
                event: 'phx_leave',
                payload: {},
                ref: null,
            };
        }
        else if (this.options.provider == 'quodd') {
            return {
                event: 'unsubscribe',
                data: {
                    ticker: channel,
                    action: 'unsubscribe',
                },
            };
        }
        else if (['cryptoquote', 'fxcm'].includes(this.options.provider)) {
            return {
                topic: channel,
                event: 'phx_leave',
                payload: {},
                ref: null,
            };
        }
    }
    _parseIexTopic(channel) {
        let topic = null;
        if (channel == '$lobby') {
            topic = 'iex:lobby';
        }
        else if (channel == '$lobby_last_price') {
            topic = 'iex:lobby:last_price';
        }
        else {
            topic = 'iex:securities:' + channel;
        }
        return topic;
    }
    _validAPIKey(api_key) {
        if (typeof api_key !== 'string') {
            return false;
        }
        if (api_key === '') {
            return false;
        }
        return true;
    }
}
exports.IntrinioRealtime = IntrinioRealtime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7OztBQUVILHFEQUE4QjtBQUM5Qix1REFBZ0M7QUFDaEMsMERBQWdEO0FBRWhELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUE7QUFFeEMsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUVwRCxNQUFhLGdCQUFpQixTQUFRLFlBQVk7SUFhaEQsWUFBWSxPQUFZO1FBQ3RCLEtBQUssRUFBRSxDQUFBO1FBWlQsVUFBSyxHQUFrQixJQUFJLENBQUE7UUFDM0IsY0FBUyxHQUFHLElBQUksQ0FBQTtRQUNoQixVQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2IsYUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNiLG1CQUFjLEdBQUcsRUFBRSxDQUFBO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFBLENBQUMsVUFBVTtRQUNoQyxzQkFBaUIsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDbEQsa0JBQWEsR0FBRyxJQUFJLENBQUE7UUFDcEIsbUJBQWMsR0FBRyxJQUFJLENBQUE7UUFDckIsbUJBQWMsR0FBRyxJQUFJLENBQUE7UUFLbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUE7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUEsQ0FBQyxV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LElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFFRCxJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDbEIsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztDQUNGO0FBL1JELDRDQStSQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBjb2RlIGlzIGRpcmVjdGx5IGNvcGllZCBmcm9tIEludHJpbmlvJ3MgbGlicmFyeS4gIFdlIGhhdmUgYSB0aWNrZXQgdG8gcmVmYWN0b3IgdGhpcyBmaWxlLlxuICovXG5cbmltcG9ydCAqIGFzIGh0dHBzIGZyb20gJ2h0dHBzJ1xuaW1wb3J0ICogYXMgZXZlbnRzIGZyb20gJ2V2ZW50cydcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBldmVudHMuRXZlbnRFbWl0dGVyXG5cbmNvbnN0IFNFTEZfSEVBTF9CQUNLT0ZGUyA9IFswLCAxMDAsIDUwMCwgMTAwMCwgMjAwMF1cblxuZXhwb3J0IGNsYXNzIEludHJpbmlvUmVhbHRpbWUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBvcHRpb25zOiBhbnlcbiAgdG9rZW46IG51bGwgfCBzdHJpbmcgPSBudWxsXG4gIHdlYnNvY2tldCA9IG51bGxcbiAgcmVhZHkgPSBmYWxzZVxuICBjaGFubmVscyA9IHt9XG4gIGpvaW5lZENoYW5uZWxzID0ge31cbiAgYWZ0ZXJDb25uZWN0ZWQgPSBudWxsIC8vIFByb21pc2VcbiAgc2VsZl9oZWFsX2JhY2tvZmYgPSBBcnJheS5mcm9tKFNFTEZfSEVBTF9CQUNLT0ZGUylcbiAgc2VsZl9oZWFsX3JlZiA9IG51bGxcbiAgcXVvdGVfY2FsbGJhY2sgPSBudWxsXG4gIGVycm9yX2NhbGxiYWNrID0gbnVsbFxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IGFueSkge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLnRva2VuID0gbnVsbFxuICAgIHRoaXMud2Vic29ja2V0ID0gbnVsbFxuICAgIHRoaXMucmVhZHkgPSBmYWxzZVxuICAgIHRoaXMuY2hhbm5lbHMgPSB7fVxuICAgIHRoaXMuam9pbmVkQ2hhbm5lbHMgPSB7fVxuICAgIHRoaXMuYWZ0ZXJDb25uZWN0ZWQgPSBudWxsIC8vIFByb21pc2VcbiAgICB0aGlzLnNlbGZfaGVhbF9iYWNrb2ZmID0gQXJyYXkuZnJvbShTRUxGX0hFQUxfQkFDS09GRlMpXG4gICAgdGhpcy5zZWxmX2hlYWxfcmVmID0gbnVsbFxuICAgIHRoaXMucXVvdGVfY2FsbGJhY2sgPSBudWxsXG4gICAgdGhpcy5lcnJvcl9jYWxsYmFjayA9IG51bGxcblxuICAgIC8vIFBhcnNlIG9wdGlvbnNcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX3Rocm93KCdOZWVkIGEgdmFsaWQgb3B0aW9ucyBwYXJhbWV0ZXInKVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmFwaV9rZXkpIHtcbiAgICAgIGlmICghdGhpcy5fdmFsaWRBUElLZXkob3B0aW9ucy5hcGlfa2V5KSkge1xuICAgICAgICB0aGlzLl90aHJvdygnQVBJIEtleSB3YXMgZm9ybWF0dGVkIGludmFsaWRseScpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghb3B0aW9ucy51c2VybmFtZSAmJiAhb3B0aW9ucy5wYXNzd29yZCkge1xuICAgICAgICB0aGlzLl90aHJvdygnQVBJIGtleSBvciB1c2VybmFtZSBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkJylcbiAgICAgIH1cblxuICAgICAgaWYgKCFvcHRpb25zLnVzZXJuYW1lKSB7XG4gICAgICAgIHRoaXMuX3Rocm93KCdOZWVkIGEgdmFsaWQgdXNlcm5hbWUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIW9wdGlvbnMucGFzc3dvcmQpIHtcbiAgICAgICAgdGhpcy5fdGhyb3coJ05lZWQgYSB2YWxpZCBwYXNzd29yZCcpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdmlkZXJzID0gWydpZXgnLCAncXVvZGQnLCAnY3J5cHRvcXVvdGUnLCAnZnhjbSddXG4gICAgaWYgKCFvcHRpb25zLnByb3ZpZGVyIHx8ICFwcm92aWRlcnMuaW5jbHVkZXMob3B0aW9ucy5wcm92aWRlcikpIHtcbiAgICAgIHRoaXMuX3Rocm93KCdOZWVkIGEgdmFsaWQgcHJvdmlkZXI6IGlleCwgcXVvZGQsIGNyeXB0b3F1b3RlLCBvciBmeGNtJylcbiAgICB9XG4gIH1cblxuICBfdGhyb3coZTogYW55KSB7XG4gICAgbGV0IGhhbmRsZWQgPSBmYWxzZVxuICAgIGlmICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGUgPSAnSW50cmluaW9SZWFsdGltZSB8ICcgKyBlXG4gICAgfVxuICAgIGlmICh0aGlzLmxpc3RlbmVyQ291bnQoJ2Vycm9yJykgPiAwKSB7XG4gICAgICBMb2dnZXIuZXJyb3IoZSlcbiAgICAgIGhhbmRsZWQgPSB0cnVlXG4gICAgfVxuICAgIGlmICghaGFuZGxlZCkge1xuICAgICAgdGhyb3cgZVxuICAgIH1cbiAgfVxuXG4gIF9tYWtlQXV0aFVybCgpOiB7IGhvc3Q6IHN0cmluZzsgcGF0aDogc3RyaW5nIH0ge1xuICAgIGxldCBhdXRoX3VybCA9IHtcbiAgICAgIGhvc3Q6ICcnLFxuICAgICAgcGF0aDogJycsXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcm92aWRlciA9PSAnaWV4Jykge1xuICAgICAgYXV0aF91cmwgPSB7XG4gICAgICAgIGhvc3Q6ICdyZWFsdGltZS5pbnRyaW5pby5jb20nLFxuICAgICAgICBwYXRoOiAnL2F1dGgnLFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnByb3ZpZGVyID09ICdxdW9kZCcpIHtcbiAgICAgIGF1dGhfdXJsID0ge1xuICAgICAgICBob3N0OiAnYXBpLmludHJpbmlvLmNvbScsXG4gICAgICAgIHBhdGg6ICcvdG9rZW4/dHlwZT1RVU9ERCcsXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMucHJvdmlkZXIgPT0gJ2NyeXB0b3F1b3RlJykge1xuICAgICAgYXV0aF91cmwgPSB7XG4gICAgICAgIGhvc3Q6ICdjcnlwdG8uaW50cmluaW8uY29tJyxcbiAgICAgICAgcGF0aDogJy9hdXRoJyxcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5wcm92aWRlciA9PSAnZnhjbScpIHtcbiAgICAgIGF1dGhfdXJsID0ge1xuICAgICAgICBob3N0OiAnZnhjbS5pbnRyaW5pby5jb20nLFxuICAgICAgICBwYXRoOiAnL2F1dGgnLFxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXBpX2tleSkge1xuICAgICAgYXV0aF91cmwgPSB0aGlzLl9tYWtlQVBJQXV0aFVybChhdXRoX3VybClcbiAgICB9XG5cbiAgICByZXR1cm4gYXV0aF91cmxcbiAgfVxuXG4gIF9tYWtlQVBJQXV0aFVybChhdXRoX3VybDogYW55KTogYW55IHtcbiAgICBsZXQgcGF0aCA9IGF1dGhfdXJsLnBhdGhcblxuICAgIGlmIChwYXRoLmluY2x1ZGVzKCc/JykpIHtcbiAgICAgIHBhdGggPSBwYXRoICsgJyYnXG4gICAgfSBlbHNlIHtcbiAgICAgIHBhdGggPSBwYXRoICsgJz8nXG4gICAgfVxuXG4gICAgYXV0aF91cmwucGF0aCA9IHBhdGggKyAnYXBpX2tleT0nICsgdGhpcy5vcHRpb25zLmFwaV9rZXlcbiAgICByZXR1cm4gYXV0aF91cmxcbiAgfVxuXG4gIF9tYWtlSGVhZGVycygpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmFwaV9rZXkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSB0aGlzLm9wdGlvbnNcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgQXV0aG9yaXphdGlvbjogJ0Jhc2ljICcgKyBCdWZmZXIuZnJvbSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKS50b1N0cmluZygnYmFzZTY0JyksXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3JlZnJlc2hUb2tlbigpIHtcbiAgICBMb2dnZXIuZGVidWcoJ1JlcXVlc3RpbmcgYXV0aCB0b2tlbi4uLicpXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgYWdlbnQgPSB0aGlzLm9wdGlvbnMuYWdlbnQgfHwgZmFsc2VcbiAgICAgIGNvbnN0IHsgaG9zdCwgcGF0aCB9ID0gdGhpcy5fbWFrZUF1dGhVcmwoKVxuICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXMuX21ha2VIZWFkZXJzKClcblxuICAgICAgLy8gR2V0IHRva2VuXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBob3N0OiBob3N0LFxuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICBhZ2VudDogYWdlbnQsXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcSA9IGh0dHBzLmdldChvcHRpb25zLCAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IDQwMSkge1xuICAgICAgICAgIHRoaXMuX3Rocm93KCdVbmFibGUgdG8gYXV0aG9yaXplJylcbiAgICAgICAgICByZWplY3QoKVxuICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXNDb2RlICE9IDIwMCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAnSW50cmluaW9SZWFsdGltZSB8IENvdWxkIG5vdCBnZXQgYXV0aCB0b2tlbjogU3RhdHVzIGNvZGUgJyArIHJlcy5zdGF0dXNDb2RlLFxuICAgICAgICAgIClcbiAgICAgICAgICByZWplY3QoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcy5vbignZGF0YScsIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSBCdWZmZXIuZnJvbShkYXRhLCAnYmFzZTY0JykudG9TdHJpbmcoKVxuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCdSZWNlaXZlZCBhdXRoIHRva2VuIScpXG4gICAgICAgICAgICBmdWxmaWxsKClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICByZXEub24oJ2Vycm9yJywgKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW50cmluaW9SZWFsdGltZSB8IENvdWxkIG5vdCBnZXQgYXV0aCB0b2tlbjogJyArIGUpXG4gICAgICAgIHJlamVjdChlKVxuICAgICAgfSlcblxuICAgICAgcmVxLmVuZCgpXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIF9tYWtlU29ja2V0VXJsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKCF0aGlzLnRva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLl9yZWZyZXNoVG9rZW4oKVxuICAgICAgaWYgKCF0aGlzLnRva2VuKSByZXR1cm4gJydcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3ZpZGVyID09ICdpZXgnKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAnd3NzOi8vcmVhbHRpbWUuaW50cmluaW8uY29tL3NvY2tldC93ZWJzb2NrZXQ/dnNuPTEuMC4wJnRva2VuPScgK1xuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQodGhpcy50b2tlbilcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5wcm92aWRlciA9PSAncXVvZGQnKSB7XG4gICAgICByZXR1cm4gJ3dzczovL3d3dzUucXVvZGQuY29tL3dlYnNvY2tldC93ZWJTdHJlYW1lci9pbnRyaW5pby8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMudG9rZW4pXG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMucHJvdmlkZXIgPT0gJ2NyeXB0b3F1b3RlJykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgJ3dzczovL2NyeXB0by5pbnRyaW5pby5jb20vc29ja2V0L3dlYnNvY2tldD92c249MS4wLjAmdG9rZW49JyArXG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnRva2VuKVxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnByb3ZpZGVyID09ICdmeGNtJykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgJ3dzczovL2Z4Y20uaW50cmluaW8uY29tL3NvY2tldC93ZWJzb2NrZXQ/dnNuPTEuMC4wJnRva2VuPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy50b2tlbilcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIF9tYWtlSGVhcnRiZWF0TWVzc2FnZSgpOiBhbnkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvdmlkZXIgPT0gJ3F1b2RkJykge1xuICAgICAgcmV0dXJuIHsgZXZlbnQ6ICdoZWFydGJlYXQnLCBkYXRhOiB7IGFjdGlvbjogJ2hlYXJ0YmVhdCcsIHRpY2tlcjogRGF0ZS5ub3coKSB9IH1cbiAgICB9IGVsc2UgaWYgKFsnaWV4JywgJ2NyeXB0b3F1b3RlJywgJ2Z4Y20nXS5pbmNsdWRlcyh0aGlzLm9wdGlvbnMucHJvdmlkZXIpKSB7XG4gICAgICByZXR1cm4geyB0b3BpYzogJ3Bob2VuaXgnLCBldmVudDogJ2hlYXJ0YmVhdCcsIHBheWxvYWQ6IHt9LCByZWY6IG51bGwgfVxuICAgIH1cbiAgfVxuXG4gIF9tYWtlSm9pbk1lc3NhZ2UoY2hhbm5lbDogc3RyaW5nKTogYW55IHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3ZpZGVyID09ICdpZXgnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3BpYzogdGhpcy5fcGFyc2VJZXhUb3BpYyhjaGFubmVsKSxcbiAgICAgICAgZXZlbnQ6ICdwaHhfam9pbicsXG4gICAgICAgIHBheWxvYWQ6IHt9LFxuICAgICAgICByZWY6IG51bGwsXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMucHJvdmlkZXIgPT0gJ3F1b2RkJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZXZlbnQ6ICdzdWJzY3JpYmUnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGlja2VyOiBjaGFubmVsLFxuICAgICAgICAgIGFjdGlvbjogJ3N1YnNjcmliZScsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChbJ2NyeXB0b3F1b3RlJywgJ2Z4Y20nXS5pbmNsdWRlcyh0aGlzLm9wdGlvbnMucHJvdmlkZXIpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3BpYzogY2hhbm5lbCxcbiAgICAgICAgZXZlbnQ6ICdwaHhfam9pbicsXG4gICAgICAgIHBheWxvYWQ6IHt9LFxuICAgICAgICByZWY6IG51bGwsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX21ha2VMZWF2ZU1lc3NhZ2UoY2hhbm5lbDogc3RyaW5nKTogYW55IHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3ZpZGVyID09ICdpZXgnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3BpYzogdGhpcy5fcGFyc2VJZXhUb3BpYyhjaGFubmVsKSxcbiAgICAgICAgZXZlbnQ6ICdwaHhfbGVhdmUnLFxuICAgICAgICBwYXlsb2FkOiB7fSxcbiAgICAgICAgcmVmOiBudWxsLFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnByb3ZpZGVyID09ICdxdW9kZCcpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGV2ZW50OiAndW5zdWJzY3JpYmUnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGlja2VyOiBjaGFubmVsLFxuICAgICAgICAgIGFjdGlvbjogJ3Vuc3Vic2NyaWJlJyxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFsnY3J5cHRvcXVvdGUnLCAnZnhjbSddLmluY2x1ZGVzKHRoaXMub3B0aW9ucy5wcm92aWRlcikpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcGljOiBjaGFubmVsLFxuICAgICAgICBldmVudDogJ3BoeF9sZWF2ZScsXG4gICAgICAgIHBheWxvYWQ6IHt9LFxuICAgICAgICByZWY6IG51bGwsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3BhcnNlSWV4VG9waWMoY2hhbm5lbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgdG9waWMgPSBudWxsXG4gICAgaWYgKGNoYW5uZWwgPT0gJyRsb2JieScpIHtcbiAgICAgIHRvcGljID0gJ2lleDpsb2JieSdcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWwgPT0gJyRsb2JieV9sYXN0X3ByaWNlJykge1xuICAgICAgdG9waWMgPSAnaWV4OmxvYmJ5Omxhc3RfcHJpY2UnXG4gICAgfSBlbHNlIHtcbiAgICAgIHRvcGljID0gJ2lleDpzZWN1cml0aWVzOicgKyBjaGFubmVsXG4gICAgfVxuICAgIHJldHVybiB0b3BpY1xuICB9XG5cbiAgX3ZhbGlkQVBJS2V5KGFwaV9rZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0eXBlb2YgYXBpX2tleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChhcGlfa2V5ID09PSAnJykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuIl19