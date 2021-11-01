import { Config as BaseConfig, ConfigFactory } from '@chainlink/types';
import { ethers } from 'ethers';
export declare const NAME = "UNISWAP_V3";
export declare const ENV_RPC_URL = "RPC_URL";
export declare const ENV_BLOCKCHAIN_NETWORK = "BLOCKCHAIN_NETWORK";
export declare const ENV_QUOTER_CONTRACT = "QUOTER_CONTRACT";
export declare const ENV_FEE_TIERS = "DEFAULT_FEE_TIERS";
export declare const DEFAULT_ENDPOINT = "crypto";
export declare const DEFAULT_BLOCKCHAIN_NETWORK = "ethereum";
export declare const DEFAULT_FEE_TIERS = "500,3000,10000";
export declare const DEFAULT_QUOTER_CONTRACT = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
export declare type Config = BaseConfig & {
    provider: ethers.providers.Provider;
    network: string;
    uniswapQuoter: string;
    feeTiers: number[];
};
export declare const makeConfig: ConfigFactory<Config>;
//# sourceMappingURL=config.d.ts.map