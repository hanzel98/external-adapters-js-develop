import { ExecuteWithConfig, Config, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const inputParameters: InputParameters;
interface PayloadValue {
    value: string;
    time: number;
}
export interface ResponseSchema {
    payload: PayloadValue[];
}
export declare const execute: ExecuteWithConfig<Config>;
export {};
//# sourceMappingURL=values.d.ts.map