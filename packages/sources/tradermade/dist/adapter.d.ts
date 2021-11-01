import { Config, ExecuteWithConfig, MakeWSHandler, AdapterRequest, ExecuteFactory, APIEndpoint } from '@chainlink/types';
export declare const execute: ExecuteWithConfig<Config>;
export declare const endpointSelector: (request: AdapterRequest) => APIEndpoint;
export declare const makeExecute: ExecuteFactory<Config>;
export declare const makeWSHandler: (config?: Config | undefined) => MakeWSHandler | undefined;
//# sourceMappingURL=adapter.d.ts.map