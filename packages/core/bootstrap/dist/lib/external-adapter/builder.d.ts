import { AdapterRequest, Config, APIEndpoint, AdapterResponse, InputParameters, AdapterContext } from '@chainlink/types';
export declare const inputParameters: InputParameters;
export declare const Builder: {
    selectEndpoint: <C extends Config>(request: AdapterRequest, config: C, apiEndpoints: Record<string, APIEndpoint<C>>, customParams?: InputParameters | undefined) => APIEndpoint<C>;
    buildSelector: <C_1 extends Config>(request: AdapterRequest, context: AdapterContext, config: C_1, apiEndpoints: Record<string, APIEndpoint<C_1>>, customParams?: InputParameters | undefined) => Promise<AdapterResponse>;
};
//# sourceMappingURL=builder.d.ts.map