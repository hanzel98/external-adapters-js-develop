import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const endpointResultPaths: {
    series: string;
};
export interface ResponseSchema {
    status: string;
    responseTime: number;
    message: [];
    Results: {
        series: [
            {
                seriesId: string;
                data: [DataSchema];
            }
        ];
    };
}
export interface DataSchema {
    year: string;
    period: string;
    periodName: string;
    latest: string;
    value: string;
    footnotes: [];
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=series.d.ts.map