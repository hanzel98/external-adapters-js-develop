import { AdapterImplementation, Config, AdapterResponse, AdapterContext } from '@chainlink/types';
export declare const LIST_ADAPTER = "LIST";
export declare const adapters: AdapterImplementation[];
export declare type Protocol = typeof adapters[number]['NAME'];
export declare const runProtocolAdapter: (jobRunID: string, context: AdapterContext, protocol: Protocol, data: any, config: Config) => Promise<AdapterResponse>;
//# sourceMappingURL=protocol.d.ts.map