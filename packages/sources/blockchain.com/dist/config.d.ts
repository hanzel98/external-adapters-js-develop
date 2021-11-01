import { Config } from '@chainlink/types';
export declare const NAME = "BLOCKCHAIN_COM";
export declare const ENV_API_KEY = "API_KEY";
export declare const ENV_API_TIMEOUT = "API_TIMEOUT";
export declare const API_ENDPOINT_MAIN = "https://blockchain.info/";
export declare const API_ENDPOINT_TEST = "https://testnet.blockchain.info/";
export declare const DEFAULT_TIMEOUT = 30000;
export declare const DEFAULT_ENDPOINT = "balance";
export declare const COIN_KEYS: readonly ["btc"];
export declare type CoinType = typeof COIN_KEYS[number];
export declare function isCoinType(key: string): key is CoinType;
export declare const CHAIN_KEYS: readonly ["mainnet", "testnet"];
export declare type ChainType = typeof CHAIN_KEYS[number];
export declare function isChainType(key: string): key is ChainType;
export declare const getBaseURL: (chain: ChainType) => string;
export declare const makeConfig: (prefix?: string) => Config;
//# sourceMappingURL=config.d.ts.map