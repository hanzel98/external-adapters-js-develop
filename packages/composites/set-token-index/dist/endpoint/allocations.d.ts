import { AdapterContext, ExecuteWithConfig, InputParameters } from '@chainlink/types';
import { Config } from '../config';
import * as TA from '../../../token-allocation';
export declare const supportedEndpoints: string[];
export declare function getToken(context: AdapterContext, id: string, address: string): Promise<TA.types.TokenAllocation[]>;
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=allocations.d.ts.map