import { AdapterContext, ExecuteWithConfig, InputParameters } from '@chainlink/types';
import { Config } from '../config';
import * as TA from '@chainlink/token-allocation-adapter';
export declare const supportedEndpoints: string[];
export declare function getAllocations(context: AdapterContext, id: string, contractAddress: string, setAddress: string): Promise<TA.types.TokenAllocation[]>;
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=token-index.d.ts.map