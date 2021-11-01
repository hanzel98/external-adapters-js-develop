import { Config as BaseConfig } from '@chainlink/types';
export declare const INDICES: string[];
export declare type IndexType = typeof INDICES[number];
export declare type Config = BaseConfig & {
    indices: {
        [key in IndexType]: string;
    };
};
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map