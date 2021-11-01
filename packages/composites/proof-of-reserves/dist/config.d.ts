import { Config } from '@chainlink/types';
import { Indexer } from './balance';
import { Protocol } from './protocol';
export declare const DEFAULT_CONFIRMATIONS = 6;
export declare const makeConfig: (prefix?: string | undefined) => Config;
export declare type Options = {
    protocol: Protocol[];
    indexer: Indexer[];
};
export declare const makeOptions: () => Options;
//# sourceMappingURL=config.d.ts.map