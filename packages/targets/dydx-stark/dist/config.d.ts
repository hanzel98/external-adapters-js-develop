import types from '@chainlink/types';
export declare const DEFAULT_DATA_PATH = "result";
export declare const DEFAULT_ENDPOINT = "send";
export declare const DEFAULT_API_ENDPOINT = "https://api.stage.dydx.exchange/v3/price";
export declare type Config = types.Config & {
    privateKey: string;
    starkMessage: string;
    oracleName: string;
};
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map