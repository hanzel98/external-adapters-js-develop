import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export interface ResponseSchema {
    success: boolean;
    updated: string;
    estimates: {
        fastest: number;
        fast: number;
        medium: number;
        slow: number;
    };
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=gasprice.d.ts.map