/// <reference types="node" />
import { AdapterRequest, AdapterContext, Execute, ExecuteSync, MakeWSHandler, Middleware, APIEndpoint, Config } from '@chainlink/types';
import { Store } from 'redux';
import { Cache } from './lib/cache';
import * as cacheWarmer from './lib/cache-warmer';
import { AdapterError, logger as Logger, Requester, Validator, Builder } from './lib/external-adapter';
import * as RateLimit from './lib/rate-limit';
import * as burstLimit from './lib/burst-limit';
import * as server from './lib/server';
import * as util from './lib/util';
import * as ws from './lib/ws';
import http from 'http';
declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    burstLimit: import("redux").CombinedState<{
        requests: burstLimit.reducer.RequestsState;
    }>;
    cacheWarmer: import("redux").CombinedState<{
        subscriptions: cacheWarmer.reducer.SubscriptionState;
        warmups: cacheWarmer.reducer.RequestState;
    }>;
    rateLimit: import("redux").CombinedState<{
        heartbeats: RateLimit.reducer.Heartbeats;
    }>;
    ws: import("redux").CombinedState<{
        connections: ws.reducer.ConnectionsState;
        subscriptions: ws.reducer.SubscriptionsState;
    }>;
}>, import("redux").AnyAction>;
export declare type RootState = ReturnType<typeof rootReducer>;
export declare const store: Store<any, import("redux").AnyAction>;
export declare const withDebug: Middleware;
export declare const withNormalizedInput: <C extends Config>(endpointSelector?: (request: AdapterRequest) => APIEndpoint<C>) => Middleware;
export declare const makeMiddleware: <C extends Config>(execute: Execute, makeWsHandler?: MakeWSHandler | undefined, endpointSelector?: ((request: AdapterRequest) => APIEndpoint<C>) | undefined) => Middleware[];
export declare const withMiddleware: (execute: Execute, context: AdapterContext, middleware: Middleware[]) => Promise<Execute>;
export declare const executeSync: ExecuteSync;
export declare type ExternalAdapter = {
    execute: Execute;
    makeWsHandler?: MakeWSHandler;
    endpointSelector?: (request: AdapterRequest) => APIEndpoint;
};
export declare type ExecuteHandler = {
    server: () => Promise<http.Server>;
};
export declare const expose: <C extends Config>(name: string, execute: Execute, makeWsHandler?: MakeWSHandler | undefined, endpointSelector?: ((request: AdapterRequest) => APIEndpoint<C>) | undefined) => ExecuteHandler;
export { Requester, Validator, AdapterError, Builder, Logger, util, server, Cache, RateLimit };
//# sourceMappingURL=index.d.ts.map