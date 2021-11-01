import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export interface ResponseSchema {
    data: {
        addresses: string[];
    };
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=wallet.d.ts.map