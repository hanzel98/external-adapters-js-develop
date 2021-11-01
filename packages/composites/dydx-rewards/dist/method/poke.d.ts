/// <reference types="node" />
import { ExecuteWithConfig, Execute, AdapterContext } from '@chainlink/types';
import { Config } from '../config';
import { BigNumber } from 'ethers';
import { AddressRewards, MerkleTreeData, OracleRewardsData } from '../ipfs-data';
import { MerkleTree } from 'merkletreejs';
import * as bn from 'bignumber.js';
export declare const NAME = "poke";
export declare const deconstructJsonTree: (data: MerkleTreeData) => AddressRewards;
export interface Input {
    traderRewardsAmount: bn.BigNumber;
    marketMakerRewardsAmount: bn.BigNumber;
    ipnsName: string;
    traderScoreAlpha: number;
    newEpoch: BigNumber;
    activeRootIpfsCid: string;
    treasuryClaimAddress: string;
}
export declare const execute: ExecuteWithConfig<Config>;
export declare const calculateRewards: (jobRunID: string, input: Input, ipfs: Execute, context: AdapterContext) => Promise<AddressRewards>;
export declare const calcRetroactiveRewards: (epochData: OracleRewardsData, addressRewards: AddressRewards, treasuryClaimAddress: string) => void;
export declare const calcTraderRewards: (epochData: OracleRewardsData, addressRewards: AddressRewards, traderRewardsAmount: bn.BigNumber, traderScoreAlpha: number) => void;
export declare const calcMarketMakerRewards: (epochData: OracleRewardsData, addressRewards: AddressRewards, marketMakerRewardsAmount: bn.BigNumber) => void;
export declare const keccakReward: (address: string, reward: BigNumber) => Buffer;
export declare const hashFn: (value: Buffer) => Buffer;
export declare const constructMerkleTree: (addressRewards: AddressRewards) => MerkleTree;
export declare const constructJsonTree: (addressRewards: AddressRewards) => MerkleTreeData;
//# sourceMappingURL=poke.d.ts.map