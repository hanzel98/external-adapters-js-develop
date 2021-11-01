import { AdapterResponse, AdapterRequest, Execute, AdapterContext } from '@chainlink/types';
import { Config } from './config';
export declare const execute: (input: AdapterRequest, context: AdapterContext, config: Config) => Promise<AdapterResponse>;
export declare const makeExecute: (config?: Config | undefined) => Execute;
//# sourceMappingURL=adapter.d.ts.map