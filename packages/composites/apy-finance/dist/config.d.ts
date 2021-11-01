import * as types from '@chainlink/types';
export declare type Config = types.Config & {
    rpcUrl: string;
    registryAddr: string;
};
export declare const DEFAULT_ENDPOINT = "tvl";
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map