import { AdapterImplementation, AdapterRequest } from '@chainlink/types';
import { Decimal } from 'decimal.js';
import objectHash from 'object-hash';
import { CacheEntry } from './cache/types';
export declare const isObject: (o: unknown) => boolean;
export declare const isArray: (o: unknown) => boolean;
export declare const parseBool: (value: any) => boolean;
export declare const toObjectWithNumbers: (obj: any) => {
    [k: string]: any;
};
export declare const getRandomEnv: (name: string, delimiter?: string, prefix?: string) => string | undefined;
export declare const getRandomRequiredEnv: (name: string, delimiter?: string, prefix?: string) => string | undefined;
export declare const uuid: () => string;
export declare const delay: (ms: number) => Promise<number>;
/**
 * Return a value used for exponential backoff in milliseconds.
 * @example
 * exponentialBackOffMs(1,100,1000,2) === 100
 * exponentialBackOffMs(2,100,1000,2) === 200
 * exponentialBackOffMs(3,100,1000,2) === 400
 *
 * @param retryCount The amount of retries that have passed
 * @param interval The interval in ms
 * @param max The maximum back-off in ms
 * @param coefficient The base multiplier
 */
export declare const exponentialBackOffMs: (retryCount?: number, interval?: number, max?: number, coefficient?: number) => number;
export declare const getWithCoalescing: ({ get, isInFlight, retries, interval, }: {
    get: (retryCount: number) => Promise<CacheEntry | undefined>;
    isInFlight: (retryCount: number) => Promise<boolean>;
    retries: number;
    interval: (retryCount: number) => number;
}) => Promise<CacheEntry | undefined>;
export declare const getEnv: (name: string, prefix?: string) => string | undefined;
export declare class RequiredEnvError extends Error {
    constructor(name: string);
}
/**
 * Get variable from environments
 * @param name The name of environment variable
 * @throws {RequiredEnvError} Will throw an error if environment variable is not defined.
 * @returns {string}
 */
export declare const getRequiredEnv: (name: string, prefix?: string) => string;
/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
export declare function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>>;
/**
 * Predicate used to find adapter by name
 *
 * @param name string adapter name
 */
export declare const byName: (name?: string | undefined) => (a: AdapterImplementation) => boolean;
/**
 * Covert number to max number of decimals, trim trailing zeros
 *
 * @param num number to convert to fixed max number of decimals
 * @param decimals max number of decimals
 */
export declare const toFixedMax: (num: number | string | Decimal, decimals: number) => string;
/** Common keys within adapter requests that should be ignored to generate a stable key*/
export declare const excludableAdapterRequestProperties: Record<string, true>;
/** Common keys within adapter requests that should be used to generate a stable key*/
export declare const includableAdapterRequestProperties: string[];
export declare const getKeyData: (data: AdapterRequest) => any;
export declare type HashMode = 'include' | 'exclude';
/**
 * Generates a key by hashing input data
 *
 * @param data Adapter request input data
 * @param hashOptions Additional configuration for the objectHash package
 * @param mode Which behavior to use:
 *    include (default) - hash only selected properties throwing out everything else
 *    exclude           - hash the entire data object after excluding certain properties
 *
 * @returns string
 */
export declare const hash: (data: AdapterRequest, hashOptions: Required<Parameters<typeof objectHash>>['1'], mode?: HashMode) => string;
export declare const getHashOpts: () => Required<Parameters<typeof objectHash>>['1'];
export declare const isDebug: () => boolean;
export declare const isDebugLogLevel: () => boolean;
/**
 * @description
 * Builds a permutation set from a list of options
 *
 * @param options The options to create a permutation from
 * @param delimiter (Optional) Joins the permutation results to a string
 *
 * @returns Array of permutations
 */
export declare const permutator: (options: string[], delimiter?: string | undefined) => string[] | string[][];
/**
 * @description
 * Check existing (non-undefined) value for its type.
 *
 * @url
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#real-world_usage
 *
 * @param value The value to type check
 * @param fullClass (Optional) Whether to use polyfill for checking null
 *
 * @returns String describing type of obj
 */
export declare function deepType(value: unknown, fullClass?: boolean): string;
export declare const LEGACY_ENV_ADAPTER_URL = "DATA_PROVIDER_URL";
export declare const ENV_ADAPTER_URL = "ADAPTER_URL";
export declare const getURL: (prefix: string, required?: boolean) => string | undefined;
export declare const getRequiredURL: (prefix: string) => string;
//# sourceMappingURL=util.d.ts.map