import { Config as DefaultConfig } from '@chainlink/types';
import { DexSubgraph } from './types';
export declare type Config = DefaultConfig & {
    dexSubgraphs: {
        [T: string]: DexSubgraph;
    };
};
export declare const DEFAULT_NETWORK = "ETHEREUM";
export declare const WETH = "WETH";
export declare const UNISWAP = "UNISWAP";
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map