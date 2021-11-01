import { ExecuteWithConfig, Config, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const endpointResultPaths: {
    crypto: string;
    price: string;
    marketcap: string;
};
export interface ResponseSchema {
    data: {
        coins: {
            '24hVolume': string;
            btcPrice: string;
            change: string;
            coinrankingUrl: string;
            color: string;
            iconUrl: string;
            listedAt: number;
            lowVolume: boolean;
            marketCap: string;
            name: string;
            price: string;
            rank: number;
            sparkline: string[];
            symbol: string;
            tier: number;
            uuid: string;
        }[];
        stats: {
            total: number;
            total24hVolume: string;
            totalExchanges: number;
            totalMarketCap: string;
            totalMarkets: number;
        };
    };
    status: string;
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=crypto.d.ts.map