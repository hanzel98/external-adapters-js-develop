import { ExecuteWithConfig, Config } from '@chainlink/types';
/**
 * This endpoint is similar to live but is supposed to only be used to fetch forex data.  This is why quote is a required parameter.
 * The reason for this split is that we want to enable WS for this endpoint but not for live.
 */
export declare const supportedEndpoints: string[];
export declare const customParams: {
    base: string[];
    quote: string[];
};
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=forex.d.ts.map