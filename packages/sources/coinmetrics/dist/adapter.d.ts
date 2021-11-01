import { Config, ExecuteWithConfig, ExecuteFactory, MakeWSHandler, AdapterRequest, APIEndpoint } from '@chainlink/types';
export declare const execute: ExecuteWithConfig<Config>;
export declare const endpointSelector: (request: AdapterRequest) => APIEndpoint<Config>;
export declare const makeExecute: ExecuteFactory<Config>;
export interface WebsocketResponseSchema {
    time: string;
    asset: string;
    ReferenceRateUSD?: string;
    ReferenceRateEUR?: string;
    cm_sequence_id: string;
}
export interface WSError {
    error: {
        type: string;
        message: string;
    };
}
export declare const BAD_PARAMETERS = "bad_parameters";
export declare const BAD_PARAMETER = "bad_parameter";
export declare const makeWSHandler: (config?: Config | undefined) => MakeWSHandler;
//# sourceMappingURL=adapter.d.ts.map