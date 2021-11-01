import { AdapterRequest } from '@chainlink/types';
import * as TokenAllocation from '@chainlink/token-allocation-adapter';
import { Config } from '../config';
export declare const NAME = "TVL";
export declare const getTokenAllocations: (request: AdapterRequest, config: Config) => Promise<TokenAllocation.types.TokenAllocation[]>;
//# sourceMappingURL=tvl.d.ts.map