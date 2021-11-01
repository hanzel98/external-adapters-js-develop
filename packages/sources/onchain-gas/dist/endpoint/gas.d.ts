import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
export declare const getTransactionsInPastBlocks: (id: string, jsonrpc: string, latestHexedBlockNum: string, numBlocksToQuery: number | undefined, config: Config) => Promise<number[]>;
//# sourceMappingURL=gas.d.ts.map