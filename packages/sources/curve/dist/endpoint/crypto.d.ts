import { ExecuteWithConfig, InputParameters } from '@chainlink/types';
import { Config } from '../config';
export declare const supportedEndpoints: string[];
export declare const endpointResultPaths: {
    crypto: string;
};
export interface ResponseSchema {
    pool: string;
    input: string;
    inputToken: string;
    inputDecimals: number;
    output: string;
    outputToken: string;
    outputDecimals: number;
    rate: number;
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=crypto.d.ts.map