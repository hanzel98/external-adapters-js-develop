import * as client from 'prom-client';
export * as util from './util';
export declare const METRICS_ENABLED: boolean;
export declare enum HttpRequestType {
    CACHE_HIT = "cacheHit",
    DATA_PROVIDER_HIT = "dataProviderHit"
}
export declare const httpRequestsTotal: client.Counter<"type" | "feed_id" | "status_code" | "method" | "retry" | "is_cache_warming">;
export declare const httpRequestDurationSeconds: client.Histogram<string>;
export declare const cacheWarmerRequests: client.Counter<"statusCode" | "apiKey" | "method" | "retry">;
export declare const httpRequestsCacheHits: client.Counter<"statusCode" | "apiKey" | "method" | "retry">;
export declare const httpRequestsDataProviderHits: client.Counter<"statusCode" | "apiKey" | "method" | "retry">;
//# sourceMappingURL=index.d.ts.map