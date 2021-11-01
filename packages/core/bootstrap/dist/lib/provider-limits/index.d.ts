export declare const DEFAULT_MINUTE_RATE_LIMIT = 60;
export declare const BURST_UNDEFINED_QUOTA_MULTIPLE = 2;
export declare const DEFAULT_WS_CONNECTIONS = 2;
export declare const DEFAULT_WS_SUBSCRIPTIONS = 10;
declare type RateLimitTimeFrame = 'rateLimit1s' | 'rateLimit1m' | 'rateLimit1h';
declare type WSTier = {
    connections: number;
    subscriptions: number;
};
interface ProviderRateLimit {
    second: number;
    minute: number;
}
export declare const getHTTPLimit: (provider: string, tier: string, timeframe: RateLimitTimeFrame) => number;
export declare const getRateLimit: (provider: string, tier: string) => ProviderRateLimit;
export declare const getWSLimits: (provider: string, tier: string) => WSTier;
export {};
//# sourceMappingURL=index.d.ts.map