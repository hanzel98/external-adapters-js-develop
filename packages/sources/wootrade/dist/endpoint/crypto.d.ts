import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export interface ResponseSchema {
    data: {
        success: boolean;
        rows: MarketTrades[];
    }[];
    error?: {
        type: string;
        message: string;
    };
}
export interface MarketTrades {
    symbol: string;
    side: string;
    executed_price: number;
    executed_quantity: number;
    executed_timestamp: string;
}
export declare const supportedEndpoints: string[];
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=crypto.d.ts.map