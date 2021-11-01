"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalLRUCache = exports.redactOptions = exports.defaultOptions = void 0;
const tslib_1 = require("tslib");
const lru_cache_1 = tslib_1.__importDefault(require("lru-cache"));
const util_1 = require("../util");
// Options
const DEFAULT_CACHE_MAX_ITEMS = 500;
const DEFAULT_CACHE_MAX_AGE = 1000 * 60 * 1.5; // 1.5 minutes
const DEFAULT_CACHE_UPDATE_AGE_ON_GET = false;
const env = process.env;
const defaultOptions = () => ({
    type: 'local',
    max: Number(env.CACHE_MAX_ITEMS) || DEFAULT_CACHE_MAX_ITEMS,
    maxAge: Number(env.CACHE_MAX_AGE) || DEFAULT_CACHE_MAX_AGE,
    updateAgeOnGet: util_1.parseBool(env.CACHE_UPDATE_AGE_ON_GET) || DEFAULT_CACHE_UPDATE_AGE_ON_GET,
});
exports.defaultOptions = defaultOptions;
// Options without sensitive data
const redactOptions = (opts) => opts;
exports.redactOptions = redactOptions;
class LocalLRUCache {
    constructor(options) {
        this.options = options;
        this.client = new lru_cache_1.default(options);
    }
    setResponse(key, value, maxAge) {
        return this.client.set(key, value, maxAge);
    }
    setFlightMarker(key, maxAge) {
        return this.client.set(key, true, maxAge);
    }
    async getResponse(key) {
        return this.client.get(key);
    }
    async getFlightMarker(key) {
        return this.client.get(key);
    }
    del(key) {
        return this.client.del(key);
    }
    ttl(key) {
        // Get LRU internal 'cache' symbol
        const _isCacheSymbol = (sym) => sym.toString().includes('cache');
        const cacheSymbol = Object.getOwnPropertySymbols(this.client).find(_isCacheSymbol);
        if (!cacheSymbol)
            return 0;
        // Get raw LRU entry
        const cacheMap = this.client[cacheSymbol];
        const hit = cacheMap.get(key);
        if (!hit)
            return 0;
        // Return ttl >= 0
        const ttl = hit.value?.now + (hit.value?.maxAge || 0) - Date.now();
        return ttl < 0 ? 0 : ttl;
    }
    close() {
        // noop
    }
}
exports.LocalLRUCache = LocalLRUCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NhY2hlL2xvY2FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxrRUFBMkI7QUFDM0Isa0NBQW1DO0FBR25DLFVBQVU7QUFDVixNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQTtBQUNuQyxNQUFNLHFCQUFxQixHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFBLENBQUMsY0FBYztBQUM1RCxNQUFNLCtCQUErQixHQUFHLEtBQUssQ0FBQTtBQUU3QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBT2hCLE1BQU0sY0FBYyxHQUFHLEdBQWlCLEVBQUUsQ0FDL0MsQ0FBQztJQUNDLElBQUksRUFBRSxPQUFPO0lBQ2IsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksdUJBQXVCO0lBQzNELE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLHFCQUFxQjtJQUMxRCxjQUFjLEVBQUUsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSwrQkFBK0I7Q0FDaEYsQ0FBQSxDQUFBO0FBTkEsUUFBQSxjQUFjLGtCQU1kO0FBQ2IsaUNBQWlDO0FBQzFCLE1BQU0sYUFBYSxHQUFHLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7QUFBbkMsUUFBQSxhQUFhLGlCQUFzQjtBQU9oRCxNQUFhLGFBQWE7SUFJeEIsWUFBWSxPQUFxQjtRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUJBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQVcsRUFBRSxLQUFVLEVBQUUsTUFBYztRQUNqRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFXLEVBQUUsTUFBYztRQUN6QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBVztRQUMzQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBMkIsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFXO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFZLENBQUE7SUFDeEMsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVc7UUFDYixrQ0FBa0M7UUFDbEMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEYsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPLENBQUMsQ0FBQTtRQUUxQixvQkFBb0I7UUFDcEIsTUFBTSxRQUFRLEdBQW1CLElBQUksQ0FBQyxNQUFjLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDakUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM3QixJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRWxCLGtCQUFrQjtRQUNsQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNsRSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO0lBQzFCLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTztJQUNULENBQUM7Q0FDRjtBQWhERCxzQ0FnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTFJVIGZyb20gJ2xydS1jYWNoZSdcbmltcG9ydCB7IHBhcnNlQm9vbCB9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgeyBDYWNoZUVudHJ5IH0gZnJvbSAnLi90eXBlcydcblxuLy8gT3B0aW9uc1xuY29uc3QgREVGQVVMVF9DQUNIRV9NQVhfSVRFTVMgPSA1MDBcbmNvbnN0IERFRkFVTFRfQ0FDSEVfTUFYX0FHRSA9IDEwMDAgKiA2MCAqIDEuNSAvLyAxLjUgbWludXRlc1xuY29uc3QgREVGQVVMVF9DQUNIRV9VUERBVEVfQUdFX09OX0dFVCA9IGZhbHNlXG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52XG5leHBvcnQgaW50ZXJmYWNlIExvY2FsT3B0aW9ucyB7XG4gIHR5cGU6ICdsb2NhbCdcbiAgbWF4OiBudW1iZXJcbiAgbWF4QWdlOiBudW1iZXJcbiAgdXBkYXRlQWdlT25HZXQ6IGJvb2xlYW5cbn1cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9ucyA9ICgpOiBMb2NhbE9wdGlvbnMgPT5cbiAgKHtcbiAgICB0eXBlOiAnbG9jYWwnLFxuICAgIG1heDogTnVtYmVyKGVudi5DQUNIRV9NQVhfSVRFTVMpIHx8IERFRkFVTFRfQ0FDSEVfTUFYX0lURU1TLFxuICAgIG1heEFnZTogTnVtYmVyKGVudi5DQUNIRV9NQVhfQUdFKSB8fCBERUZBVUxUX0NBQ0hFX01BWF9BR0UsXG4gICAgdXBkYXRlQWdlT25HZXQ6IHBhcnNlQm9vbChlbnYuQ0FDSEVfVVBEQVRFX0FHRV9PTl9HRVQpIHx8IERFRkFVTFRfQ0FDSEVfVVBEQVRFX0FHRV9PTl9HRVQsXG4gIH0gYXMgY29uc3QpXG4vLyBPcHRpb25zIHdpdGhvdXQgc2Vuc2l0aXZlIGRhdGFcbmV4cG9ydCBjb25zdCByZWRhY3RPcHRpb25zID0gKG9wdHM6IGFueSkgPT4gb3B0c1xuXG50eXBlIENhY2hlT3B0aW9ucyA9IE9taXQ8XG4gIExSVS5PcHRpb25zPHN0cmluZywgQ2FjaGVFbnRyeSB8IGJvb2xlYW4+LFxuICAnbWF4JyB8ICdtYXhBZ2UnIHwgJ3VwZGF0ZUFnZU9uR2V0J1xuPiAmXG4gIFJldHVyblR5cGU8dHlwZW9mIGRlZmF1bHRPcHRpb25zPlxuZXhwb3J0IGNsYXNzIExvY2FsTFJVQ2FjaGUge1xuICBvcHRpb25zOiBDYWNoZU9wdGlvbnNcbiAgY2xpZW50OiBMUlU8c3RyaW5nLCBDYWNoZUVudHJ5IHwgYm9vbGVhbj5cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBDYWNoZU9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5jbGllbnQgPSBuZXcgTFJVKG9wdGlvbnMpXG4gIH1cblxuICBzZXRSZXNwb25zZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgbWF4QWdlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuc2V0KGtleSwgdmFsdWUsIG1heEFnZSlcbiAgfVxuXG4gIHNldEZsaWdodE1hcmtlcihrZXk6IHN0cmluZywgbWF4QWdlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuc2V0KGtleSwgdHJ1ZSwgbWF4QWdlKVxuICB9XG5cbiAgYXN5bmMgZ2V0UmVzcG9uc2Uoa2V5OiBzdHJpbmcpOiBQcm9taXNlPENhY2hlRW50cnkgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZ2V0KGtleSkgYXMgQ2FjaGVFbnRyeSB8IHVuZGVmaW5lZFxuICB9XG5cbiAgYXN5bmMgZ2V0RmxpZ2h0TWFya2VyKGtleTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmdldChrZXkpIGFzIGJvb2xlYW5cbiAgfVxuXG4gIGRlbChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5kZWwoa2V5KVxuICB9XG5cbiAgdHRsKGtleTogc3RyaW5nKSB7XG4gICAgLy8gR2V0IExSVSBpbnRlcm5hbCAnY2FjaGUnIHN5bWJvbFxuICAgIGNvbnN0IF9pc0NhY2hlU3ltYm9sID0gKHN5bTogc3ltYm9sKSA9PiBzeW0udG9TdHJpbmcoKS5pbmNsdWRlcygnY2FjaGUnKVxuICAgIGNvbnN0IGNhY2hlU3ltYm9sID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0aGlzLmNsaWVudCkuZmluZChfaXNDYWNoZVN5bWJvbClcbiAgICBpZiAoIWNhY2hlU3ltYm9sKSByZXR1cm4gMFxuXG4gICAgLy8gR2V0IHJhdyBMUlUgZW50cnlcbiAgICBjb25zdCBjYWNoZU1hcDogTWFwPGFueSwgYW55PiA9ICh0aGlzLmNsaWVudCBhcyBhbnkpW2NhY2hlU3ltYm9sXVxuICAgIGNvbnN0IGhpdCA9IGNhY2hlTWFwLmdldChrZXkpXG4gICAgaWYgKCFoaXQpIHJldHVybiAwXG5cbiAgICAvLyBSZXR1cm4gdHRsID49IDBcbiAgICBjb25zdCB0dGwgPSBoaXQudmFsdWU/Lm5vdyArIChoaXQudmFsdWU/Lm1heEFnZSB8fCAwKSAtIERhdGUubm93KClcbiAgICByZXR1cm4gdHRsIDwgMCA/IDAgOiB0dGxcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIC8vIG5vb3BcbiAgfVxufVxuIl19