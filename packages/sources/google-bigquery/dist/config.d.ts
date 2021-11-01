import { RequestConfig } from '@chainlink/types';
export declare const NAME = "GOOGLE_BIGQUERY";
export declare type Config = {
    projectId?: string;
    keyFilename?: string;
    email?: string;
    autoRetry: boolean;
    maxRetries: number;
    location?: string;
    api: RequestConfig;
};
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map