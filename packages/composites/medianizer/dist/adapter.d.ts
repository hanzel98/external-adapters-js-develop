import { ExecuteWithConfig, Config, ExecuteFactory, RequestConfig } from '@chainlink/types';
export declare type SourceRequestOptions = {
    [source: string]: RequestConfig;
};
export declare type CheckRequestOptions = {
    [check: string]: RequestConfig;
};
export declare type AdapterOptions = {
    sources: SourceRequestOptions;
    checks: CheckRequestOptions;
    api: any;
};
export declare const execute: ExecuteWithConfig<Config>;
export declare const parseSources: (sources: string | string[]) => string[];
export declare const makeExecute: ExecuteFactory<Config>;
export declare const median: (values: number[]) => number;
//# sourceMappingURL=adapter.d.ts.map