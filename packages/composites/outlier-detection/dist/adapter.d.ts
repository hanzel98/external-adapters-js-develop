import { ExecuteFactory, RequestConfig } from '@chainlink/types';
import { Config } from './config';
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
export declare const makeExecute: ExecuteFactory<Config>;
//# sourceMappingURL=adapter.d.ts.map