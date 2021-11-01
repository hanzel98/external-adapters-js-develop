import { Decimal } from 'decimal.js';
import { CurrencyDerivativesData, OptionData } from './derivativesDataProvider';
export declare type SigmaData = {
    e1: number;
    e2: number;
    sigma1: Decimal;
    sigma2: Decimal;
    now: number;
};
export declare class SigmaCalculator {
    weightedSigma(sigmaData: SigmaData): Decimal;
    T(nowTime: number, e: number): number;
    oneSigma(expiration: number, exchangeRate: Decimal, calls: Array<OptionData>, puts: Array<OptionData>, now: number): Decimal;
    sortByStrikePrice(currencyDerivativesData: CurrencyDerivativesData): void;
}
//# sourceMappingURL=sigmaCalculator.d.ts.map