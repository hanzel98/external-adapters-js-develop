import { Config as BaseConfig, ConfigFactory } from '@chainlink/types';
import { ethers } from 'ethers';
export declare const NAME = "CURVE";
export declare const ENV_RPC_URL = "RPC_URL";
export declare const ENV_ADDRESS_PROVIDER = "ADDRESS_PROVIDER";
export declare const ENV_EXCHANGE_PROVIDER_ID = "EXCHANGE_PROVIDER_ID";
export declare const ENV_BLOCKCHAIN_NETWORK = "BLOCKCHAIN_NETWORK";
export declare const DEFAULT_ENDPOINT = "crypto";
export declare const DEFAULT_ADDRESS_PROVIDER = "0x0000000022D53366457F9d5E68Ec105046FC4383";
export declare const DEFAULT_EXCHANGE_PROVIDER_ID = 2;
export declare const DEFAULT_BLOCKCHAIN_NETWORK = "ethereum";
export declare type Config = BaseConfig & {
    provider: ethers.providers.Provider;
    addressProviderAddress: string;
    exchangeProviderId: number;
    network: string;
};
export declare const makeConfig: ConfigFactory<Config>;
//# sourceMappingURL=config.d.ts.map