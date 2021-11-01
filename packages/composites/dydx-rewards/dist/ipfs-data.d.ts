import { Execute, AdapterContext } from '@chainlink/types';
import { BigNumber } from 'ethers';
import { types } from '@chainlink/ipfs-adapter';
export interface AddressRewards {
    [address: string]: BigNumber;
}
export declare type MerkleTreeData = [string, string][];
export interface OracleRewardsDataByEpoch {
    latestEpoch: number;
    dataByEpoch: {
        [epoch: number]: types.read.CID;
    };
}
export interface OracleRewardsData {
    epoch: number;
    retroactiveTradeVolume?: {
        [address: string]: number;
    };
    tradeVolume?: {
        [address: string]: number;
    };
    isExpoUser?: {
        [address: string]: boolean;
    };
    tradeFeesPaid: {
        [address: string]: number;
    };
    openInterest: {
        [address: string]: number;
    };
    quoteScore: {
        [address: string]: number;
    };
}
export declare const getDataFromIPNS: (jobRunID: string, ipfs: Execute, ipnsName: string, context: AdapterContext) => Promise<OracleRewardsDataByEpoch>;
export declare const getDataForCID: (jobRunID: string, ipfs: Execute, cid: types.read.IPFSPath, context: AdapterContext) => Promise<any>;
export declare const getDataForEpoch: (jobRunID: string, ipfs: Execute, ipnsName: string, epoch: number, context: AdapterContext) => Promise<OracleRewardsData>;
export declare const storeJsonTree: (jobRunID: string, ipfs: Execute, data: MerkleTreeData, context: AdapterContext) => Promise<any>;
//# sourceMappingURL=ipfs-data.d.ts.map