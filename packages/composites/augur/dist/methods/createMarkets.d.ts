import { ExecuteWithConfig } from '@chainlink/types';
import { Config } from '../config';
import { ethers } from 'ethers';
export interface CreateTeamEvent {
    id: ethers.BigNumber;
    homeTeamName: string;
    homeTeamId: number;
    awayTeamName: string;
    awayTeamId: number;
    startTime: number;
    homeSpread: number;
    totalScore: number;
    createSpread: boolean;
    createTotalScore: boolean;
    moneylines: number[];
}
export interface CreateFighterEvent {
    id: ethers.BigNumber;
    fighterA: number;
    fighterAname: string;
    fighterB: number;
    fighterBname: string;
    startTime: number;
    moneylines: number[];
}
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=createMarkets.d.ts.map