import { AdapterRequest } from '@chainlink/types';
export declare type Check = (input: AdapterRequest) => Promise<boolean>;
export declare enum CheckProvider {
    Schedule = "schedule",
    TradingHours = "tradinghours"
}
export declare const getCheckProvider: (check: string) => CheckProvider | undefined;
export declare const getCheckImpl: (type: CheckProvider | undefined) => Check;
//# sourceMappingURL=index.d.ts.map