import { RequestConfig } from '@chainlink/types';
export declare const DEFAULT_DATASET = "bigquery-public-data.noaa_gsod";
export declare type Config = {
    dataset: string;
    api: RequestConfig;
};
export declare const makeConfig: (prefix?: string) => Config;
//# sourceMappingURL=config.d.ts.map