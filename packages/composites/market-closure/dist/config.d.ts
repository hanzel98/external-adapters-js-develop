import { PriceAdapter } from './dataProvider';
export declare const DEFAULT_NETWORK = "ETHEREUM";
export declare type GetPriceAdapter = (name: string) => PriceAdapter;
export declare type Config = {
    getPriceAdapter: GetPriceAdapter;
};
export declare const makeConfig: (prefix?: string) => Config;
//# sourceMappingURL=config.d.ts.map