/// <reference types="@chainlink/types" />
import { BigNumber } from 'ethers';
import { SpectralAdapterConfig } from '../config';
export declare const MacroScoreAPIName = "spectral-proxy";
export interface ICustomError {
    Response: string;
}
export interface IRequestInput {
    id: string;
    data: {
        tokenIdInt: string;
        tickSetId: string;
        jobRunID: string;
    };
}
export interface ScoreResponse {
    address: string;
    score_aave: string;
    score_comp: string;
    score: string;
    updated_at: string;
    is_updating_aave: boolean;
    is_updating_comp: boolean;
    result: number;
}
export declare const computeTickWithScore: (score: number, tickSet: BigNumber[]) => number;
export declare const execute: (request: IRequestInput, config: SpectralAdapterConfig) => Promise<import("@chainlink/types").AdapterResponse>;
//# sourceMappingURL=macro-score-api.d.ts.map