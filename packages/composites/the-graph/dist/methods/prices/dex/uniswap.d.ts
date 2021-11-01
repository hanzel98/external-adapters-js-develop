import { DexSubgraph, TokenInformation } from '../../../types';
export declare class UniswapSubgraph implements DexSubgraph {
    private url;
    constructor(url: string);
    getToken(jobRunID: string, symbol: string): Promise<TokenInformation>;
    getTokenPairPrice(jobRunID: string, token0Address: string, token1Address: string): Promise<number | null>;
}
//# sourceMappingURL=uniswap.d.ts.map