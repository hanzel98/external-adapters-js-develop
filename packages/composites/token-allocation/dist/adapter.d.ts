import { AdapterResponse, Execute, AdapterRequest } from '@chainlink/types';
import { TokenAllocations, Config, ResponsePayload } from './types';
export declare const priceTotalValue: (source: string, allocations: TokenAllocations, quote: string, data: ResponsePayload) => number;
export declare const marketCapTotalValue: (source: string, allocations: TokenAllocations, quote: string, data: ResponsePayload) => number;
export declare const execute: (input: AdapterRequest, config: Config) => Promise<AdapterResponse>;
export declare const makeExecute: (config?: Config | undefined) => Execute;
//# sourceMappingURL=adapter.d.ts.map