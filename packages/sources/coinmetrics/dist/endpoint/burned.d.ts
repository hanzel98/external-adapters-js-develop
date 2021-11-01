import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const DEFAULT_FREQUENCY = "1d";
export declare const DEFAULT_PAGE_SIZE = 1;
export declare const supportedEndpoints: string[];
export interface ResponseSchema {
    data: [
        {
            asset: string;
            time: string;
            FeeTotNtv: string;
            IssTotNtv: string;
            RevNtv: string;
        }
    ];
    next_page_token: string;
    next_page_url: string;
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=burned.d.ts.map