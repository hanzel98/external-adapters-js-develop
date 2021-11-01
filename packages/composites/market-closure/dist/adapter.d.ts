import { AdapterRequest, AdapterResponse, Execute } from '@chainlink/types';
import { Config } from './config';
export declare const execute: (input: AdapterRequest, config: Config) => Promise<AdapterResponse>;
export declare const makeExecute: (config?: Config | undefined) => Execute;
//# sourceMappingURL=adapter.d.ts.map