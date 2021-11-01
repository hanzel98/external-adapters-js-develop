import { ExecuteWithConfig, Config, InputParameters, EndpointResultPaths } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const endpointResultPaths: EndpointResultPaths;
export interface ResponseSchema {
    ticker: string;
    baseCurrency: string;
    quoteCurrency: string;
    topOfBookData: {
        askSize: number;
        bidSize: number;
        lastSaleTimestamp: string;
        lastPrice: number;
        askPrice: number;
        quoteTimestamp: string;
        bidExchange: string;
        lastSizeNotional: number;
        lastExchange: string;
        askExchange: string;
        bidPrice: number;
        lastSize: number;
    }[];
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=top.d.ts.map