import { ExecuteWithConfig, Config, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const inputParameters: InputParameters;
export interface CoinsResponse {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=coins.d.ts.map