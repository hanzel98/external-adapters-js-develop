import { Config } from '@chainlink/types';
export declare const NAME = "AMBERDATA";
export declare const DEFAULT_API_ENDPOINT = "https://web3api.io";
export declare const DEFAULT_WS_API_ENDPOINT = "wss://ws.web3api.io";
export declare const COIN_KEYS: readonly ["btc", "eth", "bch", "ltc", "btsv", "zec"];
export declare type CoinType = typeof COIN_KEYS[number];
export declare function isCoinType(key: string): key is CoinType;
export declare const CHAIN_KEYS: readonly ["mainnet"];
export declare type ChainType = typeof CHAIN_KEYS[number];
export declare function isChainType(key: string): key is ChainType;
export declare const BLOCKCHAINS: {
    [ticker: string]: string;
};
export declare const makeConfig: (prefix?: string) => Config;
//# sourceMappingURL=config.d.ts.map