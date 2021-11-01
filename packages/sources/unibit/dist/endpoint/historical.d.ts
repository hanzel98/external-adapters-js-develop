import { ExecuteWithConfig, Config } from '@chainlink/types';
export declare const NAME = "historical";
export interface ResponseSchema {
    meta_data: {
        api_name: string;
        num_total_data_points: number;
        credit_cost: number;
        start_date: string;
        end_date: string;
    };
    result_data: {
        [ticker: string]: [
            {
                date: string;
                volume: number;
                high: number;
                low: number;
                adj_close: number;
                close: number;
                open: number;
            }
        ];
    };
}
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=historical.d.ts.map