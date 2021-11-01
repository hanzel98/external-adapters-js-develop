import { Config } from '@chainlink/types';
export declare const DEFAULT_ENDPOINT = "price";
export declare const NAME = "CRYPTOAPIS_V2";
export declare const makeConfig: (prefix?: string | undefined) => Config;
export declare const BLOCKCHAIN_NAME_BY_TICKER: {
    readonly btc: "bitcoin";
    readonly eth: "ethereum";
    readonly ltc: "litecoin";
    readonly etc: "ethereum-classic";
    readonly bch: "bitcoin-cash";
    readonly dash: "dash";
    readonly doge: "dogecoin";
};
export declare type BlockchainTickers = keyof typeof BLOCKCHAIN_NAME_BY_TICKER;
export declare function isCoinType(key: string): key is keyof typeof BLOCKCHAIN_NAME_BY_TICKER;
export declare const CHAIN_KEYS: readonly ["mainnet", "testnet"];
export declare type ChainType = typeof CHAIN_KEYS[number];
export declare function isChainType(key: string): key is ChainType;
export declare const TESTNET_BLOCKCHAINS_BY_PLATFORM: {
    readonly ethereum: "rinkeby";
    readonly 'ethereum-classic': "mordor";
};
//# sourceMappingURL=config.d.ts.map