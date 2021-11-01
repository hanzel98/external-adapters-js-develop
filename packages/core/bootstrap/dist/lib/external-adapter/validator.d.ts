import { AdapterErrorResponse, Override, AdapterRequest, APIEndpoint, IncludePair, Config } from '@chainlink/types';
import { AdapterError } from './errors';
export declare type OverrideType = 'overrides' | 'tokenOverrides' | 'includes';
export declare class Validator {
    input: any;
    customParams: any;
    options: Record<string, any[]>;
    validated: any;
    error: AdapterError | undefined;
    errored: AdapterErrorResponse | undefined;
    constructor(input?: {}, customParams?: {}, options?: {}, shouldLogError?: boolean);
    validateInput(shouldLogError: boolean): void;
    validateOverrides(shouldLogError: boolean): void;
    validateTokenOverrides(shouldLogError: boolean): void;
    validateIncludeOverrides(shouldLogError: boolean): void;
    parseError(error: any, context: any, shouldLogError: boolean): void;
    overrideSymbol: (adapter: string, symbol?: string | string[] | undefined) => string | string[];
    overrideToken: (symbol: string, network?: string) => string | undefined;
    overrideIncludes: (adapter: string, from: string, to: string) => IncludePair | undefined;
    overrideReverseLookup: (adapter: string, type: OverrideType, symbol: string) => string;
    formatOverride: (param: any) => Override;
    formatTokenOverrides: (param: any) => Override;
    formatIncludeOverrides: (param: any) => Override;
    validateOptionalParam(param: any, key: string, options: any[]): void;
    validateRequiredParam(param: any, key: string, options: any[]): void;
    getRequiredArrayParam(keyArray: string[]): any;
}
export declare function normalizeInput<C extends Config>(request: AdapterRequest, apiEndpoint: APIEndpoint<C>): AdapterRequest;
//# sourceMappingURL=validator.d.ts.map