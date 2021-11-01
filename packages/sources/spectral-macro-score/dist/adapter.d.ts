import { ExecuteFactory, AdapterRequest, AdapterContext, AdapterResponse } from '@chainlink/types';
import { SpectralAdapterConfig } from './config';
export declare const execute: (request: AdapterRequest, _: AdapterContext, config: SpectralAdapterConfig) => Promise<AdapterResponse>;
export declare const makeExecute: ExecuteFactory<SpectralAdapterConfig>;
//# sourceMappingURL=adapter.d.ts.map