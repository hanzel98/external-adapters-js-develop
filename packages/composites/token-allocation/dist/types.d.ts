import { Config as DefaultConfig } from '@chainlink/types';
import { BigNumberish } from 'ethers';
export declare type TokenAllocation = {
    symbol: string;
    decimals: number;
    balance: BigNumberish;
};
export declare type ResponsePayload = {
    [symbol: string]: {
        quote: {
            [symbol: string]: {
                price?: number;
                marketCap?: number;
            };
        };
    };
};
export declare type TokenAllocations = TokenAllocation[];
export declare type GetPrices = (baseSymbols: string[], quote: string, withMarketCap?: boolean) => Promise<ResponsePayload>;
export declare type SourceRequestOptions = {
    [source: string]: DefaultConfig;
};
export declare type Config = {
    sources: SourceRequestOptions;
    defaultMethod: string;
    defaultQuote: string;
    defaultSource?: string;
};
//# sourceMappingURL=types.d.ts.map