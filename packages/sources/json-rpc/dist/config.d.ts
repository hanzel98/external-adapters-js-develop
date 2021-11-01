import { Config } from '@chainlink/types';
export interface ExtendedConfig extends Config {
    RPC_URL?: string;
}
export declare const DEFAULT_BASE_URL = "http://localhost:8545";
export declare const makeConfig: (prefix?: string | undefined) => ExtendedConfig;
//# sourceMappingURL=config.d.ts.map