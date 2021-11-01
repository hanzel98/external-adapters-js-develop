import { Config as DefaultConfig } from '@chainlink/types';
export declare const NAME = "SYNTHETIX_DEBT_POOL";
export declare const DEFAULT_ENDPOINT = "debt";
export declare const DEFAULT_DEBT_POOL_CACHE_ADDRESS = "0x9bB05EF2cA7DBAafFC3da1939D1492e6b00F39b8";
export interface Config extends DefaultConfig {
    debtPoolCacheAddress: string;
    rpcUrl: string;
}
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map