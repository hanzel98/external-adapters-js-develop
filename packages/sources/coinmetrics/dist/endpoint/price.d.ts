import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export interface ResponseSchema {
    data: {
        asset: string;
        time: string;
        ReferenceRateUSD?: string;
        ReferenceRateEUR?: string;
    }[];
    error?: {
        type: string;
        message: string;
    };
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=price.d.ts.map