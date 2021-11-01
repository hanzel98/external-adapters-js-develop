import { ExecuteWithConfig } from '@chainlink/types';
import { Config } from '../config';
export declare const supportedEndpoints: string[];
export declare const endpointResultPaths: {
    debt: string;
};
export interface ResponseSchema {
    data: {
        total: string;
        isInvalid: boolean;
    };
}
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=debt.d.ts.map