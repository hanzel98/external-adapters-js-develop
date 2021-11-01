import * as types from '@chainlink/types';
export declare const NAME = "SET_TOKEN_INDEX";
export declare const DEFAULT_ENDPOINT = "token-index";
export declare type Config = types.Config & {
    rpcUrl: string;
    network: string;
};
export declare const makeConfig: (prefix?: string | undefined, network?: string) => Config;
//# sourceMappingURL=config.d.ts.map