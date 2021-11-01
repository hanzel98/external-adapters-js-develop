import { Config as DefaultConfig } from '@chainlink/types';
import { ethers } from 'ethers';
export declare type Config = DefaultConfig & {
    wallet: ethers.Wallet;
};
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map