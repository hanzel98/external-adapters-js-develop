import { RequestConfig } from '@chainlink/types';
import { ethers } from 'ethers';
export declare const DEFAULT_METHOD = "poke";
export declare const DEFAULT_TREASURY_CLAIM_ADDRESS = "0x95EaBB0248D013b9F59c5D5256CE11b0a8140B54";
export declare const DEFAULT_TRADER_REWARDS_AMOUNT = "3835616e18";
export declare const DEFAULT_MARKET_MAKER_REWARDS_AMOUNT = "1150685e18";
export declare const ENV_PRIVATE_KEY = "PRIVATE_KEY";
export declare const ENV_RPC_URL = "RPC_URL";
export declare const ENV_TREASURY_CLAIM_ADDRESS = "TREASURY_CLAIM_ADDRESS";
export declare const ENV_TRADER_REWARDS_AMOUNT = "TRADER_REWARDS_AMOUNT";
export declare const ENV_MARKET_MAKER_REWARDS_AMOUNT = "MARKET_MAKER_REWARDS_AMOUNT";
export declare type Config = {
    wallet: ethers.Wallet;
    api: RequestConfig;
    treasuryClaimAddress: string;
    traderRewardsAmount: string;
    marketMakerRewardsAmount: string;
};
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map