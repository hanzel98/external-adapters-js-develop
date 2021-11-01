/**
 * This code is directly copied from Intrinio's library.  We have a ticket to refactor this file.
 */
/// <reference types="node" />
import * as events from 'events';
declare const EventEmitter: typeof events.EventEmitter;
export declare class IntrinioRealtime extends EventEmitter {
    options: any;
    token: null | string;
    websocket: null;
    ready: boolean;
    channels: {};
    joinedChannels: {};
    afterConnected: null;
    self_heal_backoff: number[];
    self_heal_ref: null;
    quote_callback: null;
    error_callback: null;
    constructor(options: any);
    _throw(e: any): void;
    _makeAuthUrl(): {
        host: string;
        path: string;
    };
    _makeAPIAuthUrl(auth_url: any): any;
    _makeHeaders(): {
        'Content-Type': string;
        Authorization?: undefined;
    } | {
        'Content-Type': string;
        Authorization: string;
    };
    _refreshToken(): Promise<void>;
    _makeSocketUrl(): Promise<string>;
    _makeHeartbeatMessage(): any;
    _makeJoinMessage(channel: string): any;
    _makeLeaveMessage(channel: string): any;
    _parseIexTopic(channel: string): string;
    _validAPIKey(api_key: string): boolean;
}
export {};
//# sourceMappingURL=util.d.ts.map