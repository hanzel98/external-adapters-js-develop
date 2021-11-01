import { AdapterRequest, AdapterResponse, Config, MakeWSHandler } from '@chainlink/types';
export declare const customParams: {
    base: string[];
};
export declare const execute: (input: AdapterRequest, config: Config) => Promise<AdapterResponse>;
export declare const makeExecute: (config?: Config | undefined) => (request: AdapterRequest) => Promise<AdapterResponse>;
export declare const makeWSHandler: (config?: Config | undefined) => MakeWSHandler;
//# sourceMappingURL=adapter.d.ts.map