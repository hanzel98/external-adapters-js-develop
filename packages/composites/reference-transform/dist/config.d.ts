import { Config as DefaultConfig } from '@chainlink/types';
export declare const DEFAULT_NETWORK = "ETHEREUM";
export declare type Config = {
    sources: {
        [name: string]: DefaultConfig;
    };
};
export declare const makeConfig: (prefix?: string) => Config;
//# sourceMappingURL=config.d.ts.map