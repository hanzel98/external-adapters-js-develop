import * as types from '@chainlink/types';
export declare type Config = types.Config & {
    rpcUrl: string;
    controllerAddress: string;
};
export declare const DEFAULT_CONTROLLER_ADDRESS = "0xa4F1671d3Aee73C05b552d57f2d16d3cfcBd0217";
export declare const DEFAULT_ENDPOINT = "tvl";
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map