import { Config as BaseConfig, ConfigFactory } from '@chainlink/types';
import { ethers } from 'ethers';
export declare const NAME = "UNISWAP_V2";
export declare const ENV_RPC_URL = "RPC_URL";
export declare const ENV_BLOCKCHAIN_NETWORK = "BLOCKCHAIN_NETWORK";
export declare const ENV_ROUTER_CONTRACT = "ROUTER_CONTRACT";
export declare const DEFAULT_ENDPOINT = "crypto";
export declare const DEFAULT_BLOCKCHAIN_NETWORK = "ethereum";
export declare const DEFAULT_ROUTER_CONTRACT = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
export declare const SUSHISWAP_ROUTER_CONTRACT = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
export declare type Config = BaseConfig & {
    provider: ethers.providers.Provider;
    network: string;
    uniswapRouter: string;
};
export declare const makeConfig: ConfigFactory<Config>;
//# sourceMappingURL=config.d.ts.map