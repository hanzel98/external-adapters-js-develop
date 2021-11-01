import { Execute, ExecuteWithConfig } from '@chainlink/types';
import Decimal from 'decimal.js';
import { SetRequired } from 'type-fest';
import { Config } from './config';
export interface Synth {
    name: string;
    asset?: string;
    index?: {
        asset: string;
        category: string;
        units: number;
    }[];
    inverted?: Record<string, any>;
}
export declare type SynthIndex = SetRequired<Synth, 'index'>;
/**
 * Covert number to max number of decimals, trim trailing zeros
 *
 * @param num number to convert to fixed max number of decimals
 * @param decimals max number of decimals
 */
export declare function toFixedMax(num: Decimal.Value, decimals: number): string;
/**
 * Get a synth index token on a particular ethereum network
 *
 * @param network The ethereum network to use
 * @param base The name of the index token to fetch
 */
export declare function getSynthIndexFor(network: string, base: string): SynthIndex | undefined;
export declare const execute: ExecuteWithConfig<Config>;
export declare const makeExecute: (config?: Config | undefined) => Execute;
//# sourceMappingURL=adapter.d.ts.map