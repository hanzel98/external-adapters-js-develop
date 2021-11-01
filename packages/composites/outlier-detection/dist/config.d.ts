import { Config as BaseConfig, RequestConfig } from '@chainlink/types';
export declare const DEFAULT_CHECK_THRESHOLD = 0;
export declare const DEFAULT_ONCHAIN_THRESHOLD = 0;
export declare const DEFAULT_NETWORK = "ETHEREUM";
export declare type SourceRequestOptions = {
    [source: string]: RequestConfig;
};
export declare type CheckRequestOptions = {
    [check: string]: RequestConfig;
};
export declare type Config = BaseConfig & {
    sources: SourceRequestOptions;
    checks: CheckRequestOptions;
    api: any;
};
export declare const makeConfig: (prefix?: string) => Config;
export declare const makeRequestOptions: (prefix: string, url: string) => any;
export declare const makeOptions: ({ sources, checks }: Config) => {
    source: string[] | string[][];
    check: string[] | string[][];
};
//# sourceMappingURL=config.d.ts.map