import { Config as BaseConfig } from '@chainlink/types';
import { ethers } from 'ethers';
export declare const NAME = "ETH_BALANCE";
export declare const ENV_RPC_URL = "RPC_URL";
export declare const DEFAULT_ENDPOINT = "balance";
export declare type Config = BaseConfig & {
    provider: ethers.providers.Provider;
};
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map