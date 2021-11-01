import { ResponseSchema } from './endpoint/crypto';
import { CoinsResponse } from './endpoint/coins';
import { AdapterContext } from '@chainlink/types';
export declare const getCoin: (data: ResponseSchema[], symbol?: string | undefined, coinId?: string | undefined) => ResponseSchema | undefined;
export declare function getCoinIds(context: AdapterContext, id: string): Promise<CoinsResponse[]>;
export declare const getSymbolToId: (symbol: string, coinList: CoinsResponse[]) => string;
//# sourceMappingURL=util.d.ts.map