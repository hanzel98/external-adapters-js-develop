import * as types from '@chainlink/types';
export declare type Config = types.Config & {
    rpcUrl: string;
    wethContractAddress: string;
};
export declare const NAME = "DX_DAO";
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map