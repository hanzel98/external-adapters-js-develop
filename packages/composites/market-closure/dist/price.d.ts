import { Execute } from '@chainlink/types';
export declare enum PriceDataProvider {
    Finnhub = "finnhub",
    FCS_API = "fcsapi"
}
export declare const getPriceDataProvider: () => PriceDataProvider | undefined;
export declare const getImpl: (type?: PriceDataProvider | undefined) => Execute;
//# sourceMappingURL=price.d.ts.map