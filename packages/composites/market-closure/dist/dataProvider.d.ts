import { AdapterRequest } from '@chainlink/types';
export declare type PriceAdapter = (input: AdapterRequest) => Promise<any>;
export declare const getDataProvider: (apiConfig: any) => PriceAdapter;
//# sourceMappingURL=dataProvider.d.ts.map