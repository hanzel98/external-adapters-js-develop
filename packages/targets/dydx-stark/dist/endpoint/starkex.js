"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPriceMessage = exports.getKeyPair = exports.getPricePayload = exports.requireNormalizedPrice = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const ethers_1 = require("ethers");
const starkwareCrypto = tslib_1.__importStar(require("@authereum/starkware-crypto"));
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ea_bootstrap_2 = require("@chainlink/ea-bootstrap");
const decimal_js_1 = require("decimal.js");
const MAX_DECIMALS = 18;
const ZERO_BN = ethers_1.BigNumber.from('0');
const TWO_BN = ethers_1.BigNumber.from('2');
const powOfTwo = (num) => TWO_BN.pow(num);
const ERROR_PRICE_NEGATIVE = 'Price must be a positive number.';
const WARN_PRECISION_LOSS_NUMBER = 'Please use string type to avoid precision loss with very small/big numbers.';
const WARN_PRECISION_LOSS_STRING = `Precision loss detected: over ${MAX_DECIMALS} decimals.`;
const error400 = (message) => new ea_bootstrap_1.AdapterError({ message, statusCode: 400 });
/**
 * Normalize price as string or throw on:
 *  - negative price
 *  - loss of precision using number type
 *  - using more than available decimal points
 *
 * @param jobRunID job id reported on error
 * @param price price data point
 */
const requireNormalizedPrice = (price) => {
    // Check if negative number
    if (isNaN(Number(price)) || Number(price) < 0) {
        throw error400(`${ERROR_PRICE_NEGATIVE} Got: ${price}`);
    }
    const _normalize = (num) => new decimal_js_1.Decimal(num).mul(10 ** MAX_DECIMALS);
    const _tooMuchPrecision = (num) => ea_bootstrap_2.util.toFixedMax(_normalize(num), 1).indexOf('.') !== -1;
    // Check if there is any loss of precision
    if (typeof price === 'number') {
        // TODO: more precision loss detection with floats
        const overSafeValue = price > Number.MAX_SAFE_INTEGER;
        if (overSafeValue || _tooMuchPrecision(price))
            ea_bootstrap_1.Logger.warn(`${WARN_PRECISION_LOSS_NUMBER} Got: ${price}`);
    }
    else if (_tooMuchPrecision(price)) {
        ea_bootstrap_1.Logger.warn(`${WARN_PRECISION_LOSS_STRING} Got: ${price}`);
    }
    return _normalize(price).toFixed(0);
};
exports.requireNormalizedPrice = requireNormalizedPrice;
/**
 * Generate the STARK signed price data payload
 *
 * @param privateKey Ethereum private key
 * @param starkMessage Constant message used to generate STARK pk
 * @param data price data point used to generate the payload
 */
const getPricePayload = async (privateKey, starkMessage, data) => {
    // 1-3. Generate STARK key pair
    const keyPair = await exports.getKeyPair(privateKey, starkMessage);
    // 4. Hash the required parameters
    const message = exports.getPriceMessage(data).toHexString().substr(2);
    // 5. Sign with your private stark key and the hash message to get r,s
    const { r, s } = starkwareCrypto.sign(keyPair, message);
    // 6. Generate the public key (pub_key) with your private key
    const starkPublicKey = starkwareCrypto.getStarkPublicKey(keyPair);
    // 7. Communicate (time, price, asset_name, r, s, pub_key) to dYdX
    return {
        ...data,
        signatureR: '0x' + r.toString(16),
        signatureS: '0x' + s.toString(16),
        starkKey: '0x' + starkPublicKey.substr(3),
    };
};
exports.getPricePayload = getPricePayload;
/**
 * Get STARK private key from a Ethereum pk and a constant message
 *
 * @param privateKey Ethereum private key
 * @param starkMessage Constant message used to generate STARK pk
 */
const getKeyPair = async (privateKey, starkMessage) => {
    // 1. Generate Ethereum signature on a constant message
    const wallet = new ethers_1.ethers.Wallet(privateKey);
    const flatSig = await wallet.signMessage(starkMessage);
    // 2. Perform Keccak256 on the signature to get one 256-bit word
    const hash = ethers_1.ethers.utils.keccak256(flatSig);
    // 3. Cut the last 5 bits of it to get your 251-bit-long private stark key
    const pk = ethers_1.BigNumber.from(hash).shr(5).toHexString().substr(2);
    return starkwareCrypto.getKeyPair(pk);
};
exports.getKeyPair = getKeyPair;
/**
 * Apply pedersen hash on this price data point
 *
 * @param data price data point to hash
 */
const getPriceMessage = (data) => {
    // padded to 40 bit
    const hexOracleName = '0x' + Buffer.from(data.oracleName).toString('hex').padEnd(10, '0');
    // padded to 128 bit
    const hexAssetName = '0x' + Buffer.from(data.assetName).toString('hex').padEnd(32, '0');
    return getPriceMessageRaw(ethers_1.BigNumber.from(hexOracleName), ethers_1.BigNumber.from(hexAssetName), ethers_1.BigNumber.from(data.timestamp), ethers_1.BigNumber.from(data.price));
};
exports.getPriceMessage = getPriceMessage;
/**
 * Outputs a number which is less than FIELD_PRIME, which can be used as data
 * to sign on in the sign method. This number is obtained by applying pedersen
 * on the following two numbers:
 *
 *  first number:
 * # --------------------------------------------------------------------------------- #
 * # | 0 (84 bits)      | asset_name (128 bits)         |   oracleName (40 bits)     | #
 * # --------------------------------------------------------------------------------- #
 *
 *  second number:
 * # --------------------------------------------------------------------------------- #
 * # | 0 (100 bits)         | price (120 bits)             |   timestamp (32 bits)   | #
 * # --------------------------------------------------------------------------------- #
 *
 * @param oracleName a 40-bit number, describes the oracle (i.e hex encoding of "Maker")
 * @param assetName a 128-bit number
 * @param timestamp a 32 bit number, represents seconds since epoch
 * @param price a 120-bit number
 */
const getPriceMessageRaw = (oracleName, assetName, timestamp, price) => {
    assert_1.default(oracleName.gte(ZERO_BN), error400('oracleName must be >= 0'));
    assert_1.default(oracleName.lt(powOfTwo(40)), error400('oracleName must be < 2 ** 40'));
    assert_1.default(assetName.gte(ZERO_BN), error400('assetName must be >= 0'));
    assert_1.default(assetName.lt(powOfTwo(128)), error400('assetName must be < 2 ** 128'));
    assert_1.default(timestamp.gte(ZERO_BN), error400('timestamp must be >= 0'));
    assert_1.default(timestamp.lt(powOfTwo(32)), error400('timestamp must be < 2 ** 32'));
    assert_1.default(price.gte(ZERO_BN), error400('price must be >= 0'));
    assert_1.default(price.lt(powOfTwo(120)), error400('price must be < 2 ** 120'));
    // The first number to hash is the oracle name (Maker) and the asset name.
    const first_number = assetName.shl(40).add(oracleName);
    // The second number is timestamp in the 32 LSB, then the price.
    const second_number = price.shl(32).add(timestamp);
    const w1 = first_number.toHexString().substr(2);
    const w2 = second_number.toHexString().substr(2);
    const hash = starkwareCrypto.hashMessage([w1, w2]);
    return ethers_1.BigNumber.from('0x' + hash);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcmtleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9zdGFya2V4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw0REFBMkI7QUFDM0IsbUNBQTBDO0FBQzFDLHFGQUE4RDtBQUM5RCwwREFBOEQ7QUFDOUQsMERBQThDO0FBQzlDLDJDQUFvQztBQWVwQyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUE7QUFFdkIsTUFBTSxPQUFPLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDbkMsTUFBTSxNQUFNLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFFbEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7QUFFakQsTUFBTSxvQkFBb0IsR0FBRyxrQ0FBa0MsQ0FBQTtBQUMvRCxNQUFNLDBCQUEwQixHQUM5Qiw2RUFBNkUsQ0FBQTtBQUMvRSxNQUFNLDBCQUEwQixHQUFHLGlDQUFpQyxZQUFZLFlBQVksQ0FBQTtBQUU1RixNQUFNLFFBQVEsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQUMsSUFBSSwyQkFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBRXBGOzs7Ozs7OztHQVFHO0FBQ0ksTUFBTSxzQkFBc0IsR0FBRyxDQUFDLEtBQXNCLEVBQVUsRUFBRTtJQUN2RSwyQkFBMkI7SUFDM0IsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM3QyxNQUFNLFFBQVEsQ0FBQyxHQUFHLG9CQUFvQixTQUFTLEtBQUssRUFBRSxDQUFDLENBQUE7S0FDeEQ7SUFFRCxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQW9C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QUMsQ0FBQyxDQUFDLENBQUE7SUFDaEQsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBRWxELE9BQU8sa0JBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFBO0FBQ3BDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0J1xuaW1wb3J0IHsgZXRoZXJzLCBCaWdOdW1iZXIgfSBmcm9tICdldGhlcnMnXG5pbXBvcnQgKiBhcyBzdGFya3dhcmVDcnlwdG8gZnJvbSAnQGF1dGhlcmV1bS9zdGFya3dhcmUtY3J5cHRvJ1xuaW1wb3J0IHsgTG9nZ2VyLCBBZGFwdGVyRXJyb3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IERlY2ltYWwgfSBmcm9tICdkZWNpbWFsLmpzJ1xuXG5leHBvcnQgdHlwZSBQcmljZURhdGFQb2ludCA9IHtcbiAgb3JhY2xlTmFtZTogc3RyaW5nXG4gIGFzc2V0TmFtZTogc3RyaW5nXG4gIHRpbWVzdGFtcDogbnVtYmVyXG4gIHByaWNlOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgUHJpY2VTdGFya1BheWxvYWQgPSBQcmljZURhdGFQb2ludCAmIHtcbiAgc3RhcmtLZXk6IHN0cmluZ1xuICBzaWduYXR1cmVSOiBzdHJpbmdcbiAgc2lnbmF0dXJlUzogc3RyaW5nXG59XG5cbmNvbnN0IE1BWF9ERUNJTUFMUyA9IDE4XG5cbmNvbnN0IFpFUk9fQk4gPSBCaWdOdW1iZXIuZnJvbSgnMCcpXG5jb25zdCBUV09fQk4gPSBCaWdOdW1iZXIuZnJvbSgnMicpXG5cbmNvbnN0IHBvd09mVHdvID0gKG51bTogbnVtYmVyKSA9PiBUV09fQk4ucG93KG51bSlcblxuY29uc3QgRVJST1JfUFJJQ0VfTkVHQVRJVkUgPSAnUHJpY2UgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlci4nXG5jb25zdCBXQVJOX1BSRUNJU0lPTl9MT1NTX05VTUJFUiA9XG4gICdQbGVhc2UgdXNlIHN0cmluZyB0eXBlIHRvIGF2b2lkIHByZWNpc2lvbiBsb3NzIHdpdGggdmVyeSBzbWFsbC9iaWcgbnVtYmVycy4nXG5jb25zdCBXQVJOX1BSRUNJU0lPTl9MT1NTX1NUUklORyA9IGBQcmVjaXNpb24gbG9zcyBkZXRlY3RlZDogb3ZlciAke01BWF9ERUNJTUFMU30gZGVjaW1hbHMuYFxuXG5jb25zdCBlcnJvcjQwMCA9IChtZXNzYWdlOiBzdHJpbmcpID0+IG5ldyBBZGFwdGVyRXJyb3IoeyBtZXNzYWdlLCBzdGF0dXNDb2RlOiA0MDAgfSlcblxuLyoqXG4gKiBOb3JtYWxpemUgcHJpY2UgYXMgc3RyaW5nIG9yIHRocm93IG9uOlxuICogIC0gbmVnYXRpdmUgcHJpY2VcbiAqICAtIGxvc3Mgb2YgcHJlY2lzaW9uIHVzaW5nIG51bWJlciB0eXBlXG4gKiAgLSB1c2luZyBtb3JlIHRoYW4gYXZhaWxhYmxlIGRlY2ltYWwgcG9pbnRzXG4gKlxuICogQHBhcmFtIGpvYlJ1bklEIGpvYiBpZCByZXBvcnRlZCBvbiBlcnJvclxuICogQHBhcmFtIHByaWNlIHByaWNlIGRhdGEgcG9pbnRcbiAqL1xuZXhwb3J0IGNvbnN0IHJlcXVpcmVOb3JtYWxpemVkUHJpY2UgPSAocHJpY2U6IG51bWJlciB8IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIC8vIENoZWNrIGlmIG5lZ2F0aXZlIG51bWJlclxuICBpZiAoaXNOYU4oTnVtYmVyKHByaWNlKSkgfHwgTnVtYmVyKHByaWNlKSA8IDApIHtcbiAgICB0aHJvdyBlcnJvcjQwMChgJHtFUlJPUl9QUklDRV9ORUdBVElWRX0gR290OiAke3ByaWNlfWApXG4gIH1cblxuICBjb25zdCBfbm9ybWFsaXplID0gKG51bTogbnVtYmVyIHwgc3RyaW5nKTogRGVjaW1hbCA9PiBuZXcgRGVjaW1hbChudW0pLm11bCgxMCAqKiBNQVhfREVDSU1BTFMpXG5cbiAgY29uc3QgX3Rvb011Y2hQcmVjaXNpb24gPSAobnVtOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuID0+XG4gICAgdXRpbC50b0ZpeGVkTWF4KF9ub3JtYWxpemUobnVtKSwgMSkuaW5kZXhPZignLicpICE9PSAtMVxuXG4gIC8vIENoZWNrIGlmIHRoZXJlIGlzIGFueSBsb3NzIG9mIHByZWNpc2lvblxuICBpZiAodHlwZW9mIHByaWNlID09PSAnbnVtYmVyJykge1xuICAgIC8vIFRPRE86IG1vcmUgcHJlY2lzaW9uIGxvc3MgZGV0ZWN0aW9uIHdpdGggZmxvYXRzXG4gICAgY29uc3Qgb3ZlclNhZmVWYWx1ZSA9IHByaWNlID4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbiAgICBpZiAob3ZlclNhZmVWYWx1ZSB8fCBfdG9vTXVjaFByZWNpc2lvbihwcmljZSkpXG4gICAgICBMb2dnZXIud2FybihgJHtXQVJOX1BSRUNJU0lPTl9MT1NTX05VTUJFUn0gR290OiAke3ByaWNlfWApXG4gIH0gZWxzZSBpZiAoX3Rvb011Y2hQcmVjaXNpb24ocHJpY2UpKSB7XG4gICAgTG9nZ2VyLndhcm4oYCR7V0FSTl9QUkVDSVNJT05fTE9TU19TVFJJTkd9IEdvdDogJHtwcmljZX1gKVxuICB9XG5cbiAgcmV0dXJuIF9ub3JtYWxpemUocHJpY2UpLnRvRml4ZWQoMClcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSB0aGUgU1RBUksgc2lnbmVkIHByaWNlIGRhdGEgcGF5bG9hZFxuICpcbiAqIEBwYXJhbSBwcml2YXRlS2V5IEV0aGVyZXVtIHByaXZhdGUga2V5XG4gKiBAcGFyYW0gc3RhcmtNZXNzYWdlIENvbnN0YW50IG1lc3NhZ2UgdXNlZCB0byBnZW5lcmF0ZSBTVEFSSyBwa1xuICogQHBhcmFtIGRhdGEgcHJpY2UgZGF0YSBwb2ludCB1c2VkIHRvIGdlbmVyYXRlIHRoZSBwYXlsb2FkXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmljZVBheWxvYWQgPSBhc3luYyAoXG4gIHByaXZhdGVLZXk6IHN0cmluZyxcbiAgc3RhcmtNZXNzYWdlOiBzdHJpbmcsXG4gIGRhdGE6IFByaWNlRGF0YVBvaW50LFxuKTogUHJvbWlzZTxQcmljZVN0YXJrUGF5bG9hZD4gPT4ge1xuICAvLyAxLTMuIEdlbmVyYXRlIFNUQVJLIGtleSBwYWlyXG4gIGNvbnN0IGtleVBhaXIgPSBhd2FpdCBnZXRLZXlQYWlyKHByaXZhdGVLZXksIHN0YXJrTWVzc2FnZSlcblxuICAvLyA0LiBIYXNoIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzXG4gIGNvbnN0IG1lc3NhZ2UgPSBnZXRQcmljZU1lc3NhZ2UoZGF0YSkudG9IZXhTdHJpbmcoKS5zdWJzdHIoMilcblxuICAvLyA1LiBTaWduIHdpdGggeW91ciBwcml2YXRlIHN0YXJrIGtleSBhbmQgdGhlIGhhc2ggbWVzc2FnZSB0byBnZXQgcixzXG4gIGNvbnN0IHsgciwgcyB9ID0gc3Rhcmt3YXJlQ3J5cHRvLnNpZ24oa2V5UGFpciwgbWVzc2FnZSlcblxuICAvLyA2LiBHZW5lcmF0ZSB0aGUgcHVibGljIGtleSAocHViX2tleSkgd2l0aCB5b3VyIHByaXZhdGUga2V5XG4gIGNvbnN0IHN0YXJrUHVibGljS2V5ID0gc3Rhcmt3YXJlQ3J5cHRvLmdldFN0YXJrUHVibGljS2V5KGtleVBhaXIpXG5cbiAgLy8gNy4gQ29tbXVuaWNhdGUgKHRpbWUsIHByaWNlLCBhc3NldF9uYW1lLCByLCBzLCBwdWJfa2V5KSB0byBkWWRYXG4gIHJldHVybiB7XG4gICAgLi4uZGF0YSxcbiAgICBzaWduYXR1cmVSOiAnMHgnICsgci50b1N0cmluZygxNiksXG4gICAgc2lnbmF0dXJlUzogJzB4JyArIHMudG9TdHJpbmcoMTYpLFxuICAgIHN0YXJrS2V5OiAnMHgnICsgc3RhcmtQdWJsaWNLZXkuc3Vic3RyKDMpLFxuICB9XG59XG5cbi8qKlxuICogR2V0IFNUQVJLIHByaXZhdGUga2V5IGZyb20gYSBFdGhlcmV1bSBwayBhbmQgYSBjb25zdGFudCBtZXNzYWdlXG4gKlxuICogQHBhcmFtIHByaXZhdGVLZXkgRXRoZXJldW0gcHJpdmF0ZSBrZXlcbiAqIEBwYXJhbSBzdGFya01lc3NhZ2UgQ29uc3RhbnQgbWVzc2FnZSB1c2VkIHRvIGdlbmVyYXRlIFNUQVJLIHBrXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRLZXlQYWlyID0gYXN5bmMgKFxuICBwcml2YXRlS2V5OiBzdHJpbmcsXG4gIHN0YXJrTWVzc2FnZTogc3RyaW5nLFxuKTogc3Rhcmt3YXJlQ3J5cHRvLktleVBhaXIgPT4ge1xuICAvLyAxLiBHZW5lcmF0ZSBFdGhlcmV1bSBzaWduYXR1cmUgb24gYSBjb25zdGFudCBtZXNzYWdlXG4gIGNvbnN0IHdhbGxldCA9IG5ldyBldGhlcnMuV2FsbGV0KHByaXZhdGVLZXkpXG4gIGNvbnN0IGZsYXRTaWcgPSBhd2FpdCB3YWxsZXQuc2lnbk1lc3NhZ2Uoc3RhcmtNZXNzYWdlKVxuXG4gIC8vIDIuIFBlcmZvcm0gS2VjY2FrMjU2IG9uIHRoZSBzaWduYXR1cmUgdG8gZ2V0IG9uZSAyNTYtYml0IHdvcmRcbiAgY29uc3QgaGFzaCA9IGV0aGVycy51dGlscy5rZWNjYWsyNTYoZmxhdFNpZylcblxuICAvLyAzLiBDdXQgdGhlIGxhc3QgNSBiaXRzIG9mIGl0IHRvIGdldCB5b3VyIDI1MS1iaXQtbG9uZyBwcml2YXRlIHN0YXJrIGtleVxuICBjb25zdCBwayA9IEJpZ051bWJlci5mcm9tKGhhc2gpLnNocig1KS50b0hleFN0cmluZygpLnN1YnN0cigyKVxuXG4gIHJldHVybiBzdGFya3dhcmVDcnlwdG8uZ2V0S2V5UGFpcihwaylcbn1cblxuLyoqXG4gKiBBcHBseSBwZWRlcnNlbiBoYXNoIG9uIHRoaXMgcHJpY2UgZGF0YSBwb2ludFxuICpcbiAqIEBwYXJhbSBkYXRhIHByaWNlIGRhdGEgcG9pbnQgdG8gaGFzaFxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpY2VNZXNzYWdlID0gKGRhdGE6IFByaWNlRGF0YVBvaW50KTogQmlnTnVtYmVyID0+IHtcbiAgLy8gcGFkZGVkIHRvIDQwIGJpdFxuICBjb25zdCBoZXhPcmFjbGVOYW1lID0gJzB4JyArIEJ1ZmZlci5mcm9tKGRhdGEub3JhY2xlTmFtZSkudG9TdHJpbmcoJ2hleCcpLnBhZEVuZCgxMCwgJzAnKVxuICAvLyBwYWRkZWQgdG8gMTI4IGJpdFxuICBjb25zdCBoZXhBc3NldE5hbWUgPSAnMHgnICsgQnVmZmVyLmZyb20oZGF0YS5hc3NldE5hbWUpLnRvU3RyaW5nKCdoZXgnKS5wYWRFbmQoMzIsICcwJylcblxuICByZXR1cm4gZ2V0UHJpY2VNZXNzYWdlUmF3KFxuICAgIEJpZ051bWJlci5mcm9tKGhleE9yYWNsZU5hbWUpLFxuICAgIEJpZ051bWJlci5mcm9tKGhleEFzc2V0TmFtZSksXG4gICAgQmlnTnVtYmVyLmZyb20oZGF0YS50aW1lc3RhbXApLFxuICAgIEJpZ051bWJlci5mcm9tKGRhdGEucHJpY2UpLFxuICApXG59XG5cbi8qKlxuICogT3V0cHV0cyBhIG51bWJlciB3aGljaCBpcyBsZXNzIHRoYW4gRklFTERfUFJJTUUsIHdoaWNoIGNhbiBiZSB1c2VkIGFzIGRhdGFcbiAqIHRvIHNpZ24gb24gaW4gdGhlIHNpZ24gbWV0aG9kLiBUaGlzIG51bWJlciBpcyBvYnRhaW5lZCBieSBhcHBseWluZyBwZWRlcnNlblxuICogb24gdGhlIGZvbGxvd2luZyB0d28gbnVtYmVyczpcbiAqXG4gKiAgZmlyc3QgbnVtYmVyOlxuICogIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gI1xuICogIyB8IDAgKDg0IGJpdHMpICAgICAgfCBhc3NldF9uYW1lICgxMjggYml0cykgICAgICAgICB8ICAgb3JhY2xlTmFtZSAoNDAgYml0cykgICAgIHwgI1xuICogIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gI1xuICpcbiAqICBzZWNvbmQgbnVtYmVyOlxuICogIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gI1xuICogIyB8IDAgKDEwMCBiaXRzKSAgICAgICAgIHwgcHJpY2UgKDEyMCBiaXRzKSAgICAgICAgICAgICB8ICAgdGltZXN0YW1wICgzMiBiaXRzKSAgIHwgI1xuICogIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gI1xuICpcbiAqIEBwYXJhbSBvcmFjbGVOYW1lIGEgNDAtYml0IG51bWJlciwgZGVzY3JpYmVzIHRoZSBvcmFjbGUgKGkuZSBoZXggZW5jb2Rpbmcgb2YgXCJNYWtlclwiKVxuICogQHBhcmFtIGFzc2V0TmFtZSBhIDEyOC1iaXQgbnVtYmVyXG4gKiBAcGFyYW0gdGltZXN0YW1wIGEgMzIgYml0IG51bWJlciwgcmVwcmVzZW50cyBzZWNvbmRzIHNpbmNlIGVwb2NoXG4gKiBAcGFyYW0gcHJpY2UgYSAxMjAtYml0IG51bWJlclxuICovXG5jb25zdCBnZXRQcmljZU1lc3NhZ2VSYXcgPSAoXG4gIG9yYWNsZU5hbWU6IEJpZ051bWJlcixcbiAgYXNzZXROYW1lOiBCaWdOdW1iZXIsXG4gIHRpbWVzdGFtcDogQmlnTnVtYmVyLFxuICBwcmljZTogQmlnTnVtYmVyLFxuKTogQmlnTnVtYmVyID0+IHtcbiAgYXNzZXJ0KG9yYWNsZU5hbWUuZ3RlKFpFUk9fQk4pLCBlcnJvcjQwMCgnb3JhY2xlTmFtZSBtdXN0IGJlID49IDAnKSlcbiAgYXNzZXJ0KG9yYWNsZU5hbWUubHQocG93T2ZUd28oNDApKSwgZXJyb3I0MDAoJ29yYWNsZU5hbWUgbXVzdCBiZSA8IDIgKiogNDAnKSlcblxuICBhc3NlcnQoYXNzZXROYW1lLmd0ZShaRVJPX0JOKSwgZXJyb3I0MDAoJ2Fzc2V0TmFtZSBtdXN0IGJlID49IDAnKSlcbiAgYXNzZXJ0KGFzc2V0TmFtZS5sdChwb3dPZlR3bygxMjgpKSwgZXJyb3I0MDAoJ2Fzc2V0TmFtZSBtdXN0IGJlIDwgMiAqKiAxMjgnKSlcblxuICBhc3NlcnQodGltZXN0YW1wLmd0ZShaRVJPX0JOKSwgZXJyb3I0MDAoJ3RpbWVzdGFtcCBtdXN0IGJlID49IDAnKSlcbiAgYXNzZXJ0KHRpbWVzdGFtcC5sdChwb3dPZlR3bygzMikpLCBlcnJvcjQwMCgndGltZXN0YW1wIG11c3QgYmUgPCAyICoqIDMyJykpXG5cbiAgYXNzZXJ0KHByaWNlLmd0ZShaRVJPX0JOKSwgZXJyb3I0MDAoJ3ByaWNlIG11c3QgYmUgPj0gMCcpKVxuICBhc3NlcnQocHJpY2UubHQocG93T2ZUd28oMTIwKSksIGVycm9yNDAwKCdwcmljZSBtdXN0IGJlIDwgMiAqKiAxMjAnKSlcblxuICAvLyBUaGUgZmlyc3QgbnVtYmVyIHRvIGhhc2ggaXMgdGhlIG9yYWNsZSBuYW1lIChNYWtlcikgYW5kIHRoZSBhc3NldCBuYW1lLlxuICBjb25zdCBmaXJzdF9udW1iZXIgPSBhc3NldE5hbWUuc2hsKDQwKS5hZGQob3JhY2xlTmFtZSlcblxuICAvLyBUaGUgc2Vjb25kIG51bWJlciBpcyB0aW1lc3RhbXAgaW4gdGhlIDMyIExTQiwgdGhlbiB0aGUgcHJpY2UuXG4gIGNvbnN0IHNlY29uZF9udW1iZXIgPSBwcmljZS5zaGwoMzIpLmFkZCh0aW1lc3RhbXApXG5cbiAgY29uc3QgdzEgPSBmaXJzdF9udW1iZXIudG9IZXhTdHJpbmcoKS5zdWJzdHIoMilcbiAgY29uc3QgdzIgPSBzZWNvbmRfbnVtYmVyLnRvSGV4U3RyaW5nKCkuc3Vic3RyKDIpXG4gIGNvbnN0IGhhc2ggPSBzdGFya3dhcmVDcnlwdG8uaGFzaE1lc3NhZ2UoW3cxLCB3Ml0pXG5cbiAgcmV0dXJuIEJpZ051bWJlci5mcm9tKCcweCcgKyBoYXNoKVxufVxuIl19