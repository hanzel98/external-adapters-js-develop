import { Config } from '@chainlink/types';
export declare const NAME = "L2_SEQUENCER_HEALTH";
export declare const DEFAULT_DELTA_TIME: number;
export declare const DEFAULT_DELTA_BLOCKS = 6;
export declare const DEFAULT_TIMEOUT_LIMIT: number;
export declare enum Networks {
    Arbitrum = "arbitrum",
    Optimism = "optimism"
}
export declare const RPC_ENDPOINTS: {
    arbitrum: string;
    optimism: string;
};
export declare const HEALTH_ENDPOINTS: {
    arbitrum: {
        endpoint: string | undefined;
        responsePath: never[];
    };
    optimism: {
        endpoint: string;
        responsePath: string[];
    };
};
export interface ExtendedConfig extends Config {
    delta: number;
    deltaBlocks: number;
    timeoutLimit: number;
}
export declare const makeConfig: (prefix?: string | undefined) => ExtendedConfig;
//# sourceMappingURL=config.d.ts.map