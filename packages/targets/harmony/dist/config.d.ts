import types from '@chainlink/types';
export declare const DEFAULT_API_ENDPOINT = "https://api.s0.t.hmny.io";
export declare const DEFAULT_CHAIN_ID = 1;
export declare const DEFAULT_GAS_LIMIT = 6721900;
export declare type Config = types.Config & {
    privateKey: string;
    chainID: string;
    gasLimit: string;
};
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map