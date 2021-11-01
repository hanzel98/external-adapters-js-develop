import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const endpointResultPaths: {};
interface Candidate {
    first: string;
    last: string;
    abbrv: string;
    party: string;
    candidateID: string;
    pollID: string;
    ballotOrder: number;
    polNum: string;
    voteCount: number;
    winner?: string;
}
interface ReportingUnit {
    statePostal: string;
    stateName: string;
    level: string;
    lastUpdated: string;
    precinctsReporting: number;
    precinctsTotal: number;
    precinctsReportingPct: number;
    candidates: Candidate[];
}
export interface ResponseSchema {
    precinctsReporting: number;
    precinctsReportingPct: number;
    winnerFirstName: string;
    winnerLastName: string;
    winnerVoteCount: number;
    winnerCandidateId: string;
    winnerParty: string;
    candidates: string[];
    electionDate: string;
    timestamp: string;
    races: {
        test: boolean;
        resultsType: string;
        raceID: string;
        raceType: string;
        raceTypeID: string;
        offceID: string;
        officeName: string;
        party: string;
        eevp: number;
        national: boolean;
        reportingUnits: ReportingUnit[];
    }[];
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
export {};
//# sourceMappingURL=election.d.ts.map