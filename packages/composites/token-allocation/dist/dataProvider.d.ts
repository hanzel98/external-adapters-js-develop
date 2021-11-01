import { ResponsePayload } from './types';
/**
 * @description
 * A factory that returns a function for getting price or marketcap data from a provider.
 * If the data provider supports batching then it will be sent as a batch request.
 * The response data is normalized to the type ResponsePayload regardless of the type of request.
 *
 * @returns
 * ```
 * {
 *    [symbol: string]: {
 *        quote: {
 *            [symbol: string]: {
 *                price?: number | undefined;
 *                marketCap?: number | undefined;
 *            };
 *        };
 *    };
 *}
 * ```
 */
export declare const getPriceProvider: (source: string, jobRunID: string, apiConfig: any) => (symbols: string[], quote: string, withMarketCap?: boolean) => Promise<ResponsePayload>;
//# sourceMappingURL=dataProvider.d.ts.map