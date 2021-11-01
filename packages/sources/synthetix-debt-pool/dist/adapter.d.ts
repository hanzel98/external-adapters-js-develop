import { AdapterResponse, AdapterContext, Execute, AdapterRequest } from '@chainlink/types';
import { Config as AdapterConfig } from './config';
export declare const execute: (request: AdapterRequest, context: AdapterContext, config: AdapterConfig) => Promise<AdapterResponse>;
export declare const makeExecute: (config?: AdapterConfig | undefined) => Execute;
//# sourceMappingURL=adapter.d.ts.map