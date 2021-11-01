import { Config } from '@chainlink/types';
export interface ExtendedConfig extends Config {
    RPC_URL?: string;
}
export declare const DEFAULT_RPC_URL = "http://localhost:8545";
export declare const DEFAULT_ENDPOINT = "format";
export declare const makeConfig: () => ExtendedConfig;
//# sourceMappingURL=config.d.ts.map