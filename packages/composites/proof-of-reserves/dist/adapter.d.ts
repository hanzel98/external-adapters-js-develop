import { AdapterRequest, ExecuteWithConfig, Config, ExecuteFactory, Execute, AdapterResponse, AdapterContext } from '@chainlink/types';
export declare const makeRequestFactory: (config: Config, prefix: string) => Execute;
export declare const callAdapter: (execute: Execute, context: AdapterContext, input: AdapterRequest, tag: string) => Promise<AdapterResponse>;
export declare const execute: ExecuteWithConfig<Config>;
export declare const makeExecute: ExecuteFactory<Config>;
//# sourceMappingURL=adapter.d.ts.map