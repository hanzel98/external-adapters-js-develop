import { Config } from '@chainlink/types';
export declare const NAME = "BLOCKCHAIR";
export declare const DEFAULT_BASE_URL = "https://api.blockchair.com";
export declare const DEFAULT_ENDPOINT = "balance";
export declare const COIN_KEYS: readonly ["btc", "dash", "doge", "ltc", "bch"];
export declare type CoinType = typeof COIN_KEYS[number];
export declare function isCoinType(key: string): key is CoinType;
export declare const CHAIN_KEYS: readonly ["mainnet"];
export declare type ChainType = typeof CHAIN_KEYS[number];
export declare function isChainType(key: string): key is ChainType;
export declare const COINS: {
    [ticker: string]: string;
};
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map