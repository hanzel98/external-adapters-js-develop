import { BigNumber } from 'ethers/utils';
export interface RoundData {
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
}
export declare type ReferenceDataPrice = (network: string, contractAddress: string, multiply: number, meta?: Record<string, unknown>) => Promise<number>;
export declare type ReferenceDataRound = (network: string, contractAddress: string) => Promise<RoundData>;
export declare const getLatestAnswer: ReferenceDataPrice;
export declare const getRpcLatestAnswer: ReferenceDataPrice;
export declare const getRpcLatestRound: ReferenceDataRound;
export declare const getRpcUrl: (network: string) => string;
//# sourceMappingURL=index.d.ts.map