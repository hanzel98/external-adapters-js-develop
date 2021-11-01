import { Decimal } from 'decimal.js';
export declare type DeribitOptionDataResponse = {
    instrument_name: string;
    mid_price: string;
    underlying_price: number;
};
export declare type OptionData = {
    instrumentName: string;
    strikePrice: Decimal;
    midPrice: Decimal | undefined;
    underlyingPrice: Decimal;
    expiration: number;
    type: string;
};
export declare type CurrencyDerivativesData = {
    e1: number;
    e2: number;
    callsE1: Array<OptionData>;
    callsE2: Array<OptionData>;
    putsE1: Array<OptionData>;
    putsE2: Array<OptionData>;
    exchangeRate: Decimal;
};
export declare type InstrumentData = {
    instrument_name: string;
    creation_timestamp: number;
};
export declare const getDerivativesData: (cryptoCurrencies: Array<string>) => Promise<Record<string, CurrencyDerivativesData>>;
//# sourceMappingURL=derivativesDataProvider.d.ts.map