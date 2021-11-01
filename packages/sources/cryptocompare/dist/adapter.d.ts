import { AdapterRequest, Config, ExecuteFactory, ExecuteWithConfig, MakeWSHandler, APIEndpoint } from '@chainlink/types';
export declare const execute: ExecuteWithConfig<Config>;
export declare const endpointSelector: (request: AdapterRequest) => APIEndpoint;
export declare const makeExecute: ExecuteFactory<Config>;
export interface WSErrorType {
    TYPE: string;
    MESSAGE: string;
    PARAMETER: string;
    INFO: string;
}
export declare const INVALID_SUB = "INVALID_SUB";
export declare const makeWSHandler: (config?: Config | undefined) => MakeWSHandler;
//# sourceMappingURL=adapter.d.ts.map