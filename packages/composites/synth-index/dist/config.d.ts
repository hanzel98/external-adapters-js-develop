import * as ta from '@chainlink/token-allocation-adapter';
import { Config as BaseConfig } from '@chainlink/types';
export interface Config extends BaseConfig {
    defaultNetwork: string;
    taConfig: ta.types.Config;
}
export declare const makeConfig: (prefix?: string) => Config;
//# sourceMappingURL=config.d.ts.map