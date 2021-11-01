import { ExecuteFactory } from '@chainlink/types';
import { ExecuteWithConfig, InputParameters } from '@chainlink/types';
import { ExtendedConfig, Networks } from './config';
import { NetworkHealthCheck } from './network';
export declare const makeNetworkStatusCheck: (network: Networks) => (delta: number, deltaBlocks: number) => Promise<boolean>;
export declare const getL2NetworkStatus: NetworkHealthCheck;
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<ExtendedConfig>;
export declare const makeExecute: ExecuteFactory<ExtendedConfig>;
//# sourceMappingURL=adapter.d.ts.map