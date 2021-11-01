import { ExecuteWithConfig, ExecuteFactory, AdapterRequest, APIEndpoint } from '@chainlink/types';
import { Config } from './config';
export declare const execute: ExecuteWithConfig<Config>;
export declare const endpointSelector: (request: AdapterRequest) => APIEndpoint<Config>;
export declare const makeExecute: ExecuteFactory<Config>;
//# sourceMappingURL=adapter.d.ts.map