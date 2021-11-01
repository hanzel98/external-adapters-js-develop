import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export interface ResponseSchema {
    data: {
        balance: number;
    };
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=balance.d.ts.map