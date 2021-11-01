import { ExecuteWithConfig, Config, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const endpointResultPaths: {
    prices: string;
    crypto: string;
    volume: string;
};
export interface ResponseSchema {
    ticker: string;
    baseCurrency: string;
    quoteCurrency: string;
    priceData: {
        date: string;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
        volumeNotional: number;
        fxOpen: number;
        fxHigh: number;
        fxLow: number;
        fxClose: number;
        fxVolumeNotional: number;
        fxRate: number;
        tradesDone: number;
    }[];
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=prices.d.ts.map