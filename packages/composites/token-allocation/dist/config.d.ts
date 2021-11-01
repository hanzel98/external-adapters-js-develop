import { AdapterImplementation } from '@chainlink/types';
import { Config } from './types';
export declare const adapters: AdapterImplementation[];
export declare type Source = typeof adapters[number]['NAME'];
export declare const DEFAULT_TOKEN_DECIMALS = 18;
export declare const DEFAULT_TOKEN_BALANCE = 1;
export declare const makeConfig: (prefix?: string) => Config;
export declare const makeOptions: ({ sources }: Config) => {
    source: string[];
};
//# sourceMappingURL=config.d.ts.map