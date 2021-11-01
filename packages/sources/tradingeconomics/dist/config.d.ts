import { Config as config } from '@chainlink/types';
export declare type Config = config & {
    client: {
        key: string;
        secret: string;
    };
};
export declare const NAME = "TRADINGECONOMICS";
export declare const DEFAULT_API_ENDPOINT = "https://api.tradingeconomics.com/markets";
export declare const DEFAULT_WS_API_ENDPOINT = "wss://stream.tradingeconomics.com/";
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map