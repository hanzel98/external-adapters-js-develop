import { Config } from '@chainlink/types';
export declare const NAME = "BTC_COM";
export declare const DEFAULT_BASE_URL = "https://chain.api.btc.com";
export declare const DEFAULT_ENDPOINT = "balance";
export declare const COIN_KEYS: readonly ["btc"];
export declare type CoinType = typeof COIN_KEYS[number];
export declare function isCoinType(key: string): key is CoinType;
export declare const CHAIN_KEYS: readonly ["mainnet"];
export declare type ChainType = typeof CHAIN_KEYS[number];
export declare function isChainType(key: string): key is ChainType;
export declare const makeConfig: (prefix?: string) => Config;
//# sourceMappingURL=config.d.ts.map