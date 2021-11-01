import { CoinsResponse } from './endpoint/coins';
import { AdapterContext } from '@chainlink/types';
export declare function getCoinIds(context: AdapterContext, id: string): Promise<CoinsResponse[]>;
export declare const getSymbolsToIds: (symbols: string[], coinList: CoinsResponse[]) => Record<string, string>;
//# sourceMappingURL=util.d.ts.map