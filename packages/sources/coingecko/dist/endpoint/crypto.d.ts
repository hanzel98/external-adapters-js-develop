import { Config, ExecuteWithConfig, AdapterRequest, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const batchablePropertyPath: {
    name: string;
}[];
declare const buildResultPath: (path: string) => (request: AdapterRequest) => string;
export declare const endpointResultPaths: {
    [endpoint: string]: ReturnType<typeof buildResultPath>;
};
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
export {};
//# sourceMappingURL=crypto.d.ts.map