import { ExecuteWithConfig, Config, AdapterRequest, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: never[];
export declare const endpointResultPaths: {
    crypto: (request: AdapterRequest) => string;
    price: (request: AdapterRequest) => string;
    marketcap: (request: AdapterRequest) => string;
};
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=crypto-single.d.ts.map