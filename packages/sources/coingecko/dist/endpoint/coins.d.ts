import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const inputParameters: InputParameters;
export interface CoinsResponse {
    id: string;
    symbol: string;
    name: string;
}
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=coins.d.ts.map