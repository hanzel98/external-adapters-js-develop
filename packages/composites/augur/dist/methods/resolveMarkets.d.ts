import { ExecuteWithConfig } from '@chainlink/types';
import { Config } from '../config';
import { ethers } from 'ethers';
export interface ResolveTeam {
    id: ethers.BigNumber;
    status: number;
    homeScore: number;
    awayScore: number;
}
export interface ResolveFight {
    id: ethers.BigNumber;
    status: number;
    fighterA: number;
    fighterB: number;
    winnerId?: number;
    draw: boolean;
}
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=resolveMarkets.d.ts.map