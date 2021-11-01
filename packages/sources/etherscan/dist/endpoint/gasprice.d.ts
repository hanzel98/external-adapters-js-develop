import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export interface ResponseSchema {
    status: number;
    message: string;
    result: {
        LastBlock: number;
        SafeGasPrice: number;
        ProposeGasPrice: number;
        FastGasPrice: number;
    };
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=gasprice.d.ts.map