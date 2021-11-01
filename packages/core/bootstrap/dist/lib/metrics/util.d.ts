import { AdapterRequest } from '@chainlink/types';
/**
 * Normalizes http status codes.
 *
 * Returns strings in the format (2|3|4|5)XX.
 *
 * @author https://github.com/joao-fontenele/express-prometheus-middleware
 * @param {!number} status - status code of the requests
 * @returns {string} the normalized status code.
 */
export declare function normalizeStatusCode(status?: number): string;
/**
 * Maxiumum number of characters that a feedId can contain.
 */
export declare const MAX_FEED_ID_LENGTH = 300;
/**
 * Get feed id name based on input params
 * @param input The adapter input request
 * @returns {string}
 */
export declare const getFeedId: (input: AdapterRequest) => string;
//# sourceMappingURL=util.d.ts.map