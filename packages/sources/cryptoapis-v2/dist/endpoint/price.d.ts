import { ExecuteWithConfig, Config, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export interface ResponseSchema {
    apiVersion: string;
    requestId: string;
    data: {
        item: {
            calculationTimestamp: number;
            fromAssetId: string;
            fromAssetSymbol: string;
            rate: number;
            toAssetId: string;
            toAssetSymbol: string;
        };
    };
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=price.d.ts.map