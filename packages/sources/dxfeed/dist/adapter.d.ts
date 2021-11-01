import { Config, ExecuteWithConfig, ExecuteFactory, AdapterRequest, APIEndpoint, MakeWSHandler } from '@chainlink/types';
export declare const execute: ExecuteWithConfig<Config>;
export declare const endpointSelector: (request: AdapterRequest) => APIEndpoint;
export declare const makeExecute: ExecuteFactory<Config>;
export declare type DXFeedMessage = {
    channel: string;
    clientId?: string;
    id: string;
    data: any[];
    successful?: boolean;
    advice?: {
        interval: number;
        timeout: number;
        reconnect: string;
    };
}[];
export declare const makeWSHandler: (config?: Config | undefined) => MakeWSHandler;
//# sourceMappingURL=adapter.d.ts.map