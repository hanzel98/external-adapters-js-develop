import { Config, ExecuteWithConfig, ExecuteFactory } from '@chainlink/types';
export interface Action {
    type: string;
    data: unknown;
}
export declare const getRequiredFee: (value: string | number) => number;
export interface PostReply {
    ok: boolean;
    res?: unknown;
    rej?: unknown;
}
export declare const execute: ExecuteWithConfig<Config>;
export declare const makeExecute: ExecuteFactory<Config>;
//# sourceMappingURL=adapter.d.ts.map