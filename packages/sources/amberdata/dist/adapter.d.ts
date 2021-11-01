import { AdapterRequest, Config, ExecuteFactory, ExecuteWithConfig, MakeWSHandler, APIEndpoint } from '@chainlink/types';
export declare const execute: ExecuteWithConfig<Config>;
export declare const endpointSelector: (request: AdapterRequest) => APIEndpoint;
export declare const makeExecute: ExecuteFactory<Config>;
export declare const makeWSHandler: (defaultConfig?: Config | undefined) => MakeWSHandler;
//# sourceMappingURL=adapter.d.ts.map