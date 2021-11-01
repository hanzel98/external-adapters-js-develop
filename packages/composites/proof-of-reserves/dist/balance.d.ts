import { AdapterImplementation, AdapterResponse, Config, AdapterContext } from '@chainlink/types';
export declare const adapters: AdapterImplementation[];
export declare type Indexer = typeof adapters[number]['NAME'];
export declare const runBalanceAdapter: (indexer: Indexer, context: AdapterContext, confirmations: number, config: Config, input: AdapterResponse) => Promise<AdapterResponse>;
//# sourceMappingURL=balance.d.ts.map