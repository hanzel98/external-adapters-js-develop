import { BigNumber } from 'ethers';
export declare type PriceDataPoint = {
    oracleName: string;
    assetName: string;
    timestamp: number;
    price: string;
};
export declare type PriceStarkPayload = PriceDataPoint & {
    starkKey: string;
    signatureR: string;
    signatureS: string;
};
/**
 * Normalize price as string or throw on:
 *  - negative price
 *  - loss of precision using number type
 *  - using more than available decimal points
 *
 * @param jobRunID job id reported on error
 * @param price price data point
 */
export declare const requireNormalizedPrice: (price: number | string) => string;
/**
 * Generate the STARK signed price data payload
 *
 * @param privateKey Ethereum private key
 * @param starkMessage Constant message used to generate STARK pk
 * @param data price data point used to generate the payload
 */
export declare const getPricePayload: (privateKey: string, starkMessage: string, data: PriceDataPoint) => Promise<PriceStarkPayload>;
/**
 * Get STARK private key from a Ethereum pk and a constant message
 *
 * @param privateKey Ethereum private key
 * @param starkMessage Constant message used to generate STARK pk
 */
export declare const getKeyPair: (privateKey: string, starkMessage: string) => any;
/**
 * Apply pedersen hash on this price data point
 *
 * @param data price data point to hash
 */
export declare const getPriceMessage: (data: PriceDataPoint) => BigNumber;
//# sourceMappingURL=starkex.d.ts.map