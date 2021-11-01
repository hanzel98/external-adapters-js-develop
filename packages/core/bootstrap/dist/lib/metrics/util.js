"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedId = exports.MAX_FEED_ID_LENGTH = exports.normalizeStatusCode = void 0;
const tslib_1 = require("tslib");
const external_adapter_1 = require("../external-adapter");
const util_1 = require("../util");
const crypto = tslib_1.__importStar(require("crypto"));
/**
 * Normalizes http status codes.
 *
 * Returns strings in the format (2|3|4|5)XX.
 *
 * @author https://github.com/joao-fontenele/express-prometheus-middleware
 * @param {!number} status - status code of the requests
 * @returns {string} the normalized status code.
 */
function normalizeStatusCode(status) {
    if (!status) {
        return '5XX';
    }
    if (status >= 200 && status < 300) {
        return '2XX';
    }
    if (status >= 300 && status < 400) {
        return '3XX';
    }
    if (status >= 400 && status < 500) {
        return '4XX';
    }
    return '5XX';
}
exports.normalizeStatusCode = normalizeStatusCode;
/**
 * Maxiumum number of characters that a feedId can contain.
 */
exports.MAX_FEED_ID_LENGTH = 300;
/**
 * Get feed id name based on input params
 * @param input The adapter input request
 * @returns {string}
 */
const getFeedId = (input) => {
    const commonFeedParams = {
        base: ['base', 'from', 'coin', 'symbol', 'asset'],
        quote: ['quote', 'to', 'convert'],
    };
    // check if string is within array
    function includesCheck(param) {
        return Object.keys(input.data).includes(param);
    }
    // run through validator if input.data object has keys that match potential base and quote parameters
    if (commonFeedParams.base.some(includesCheck) && commonFeedParams.quote.some(includesCheck)) {
        const validationResult = new external_adapter_1.Validator(input, commonFeedParams);
        if (validationResult.error) {
            external_adapter_1.logger.debug('Unable to validate feed name');
            return JSON.stringify(input);
        }
        const { base, quote } = validationResult.validated.data;
        /**
         * With batched requests, the base can either be an array of bases, or a single base.
         * Quotes are currently only a string
         */
        if (Array.isArray(base)) {
            const bases = `[${base.map((b) => b.toUpperCase()).join('|')}]`;
            return typeof quote === 'string' ? `${bases}/${quote.toUpperCase()}` : bases;
        }
        if (typeof base === 'string') {
            const upperBase = base.toUpperCase();
            return typeof quote === 'string' ? `${upperBase}/${quote.toUpperCase()}` : upperBase;
        }
    }
    const entries = Object.keys(input)
        .filter((prop) => !util_1.excludableAdapterRequestProperties[prop])
        .map((k) => [k, input[k]]);
    const rawFeedId = JSON.stringify(Object.fromEntries(entries));
    // If feedId exceed the max length use the md5 hash
    return rawFeedId.length > exports.MAX_FEED_ID_LENGTH
        ? crypto.createHash('md5').update(rawFeedId).digest('hex')
        : rawFeedId;
};
exports.getFeedId = getFeedId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWV0cmljcy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSwwREFBdUQ7QUFDdkQsa0NBQTREO0FBQzVELHVEQUFnQztBQUVoQzs7Ozs7Ozs7R0FRRztBQUNILFNBQWdCLG1CQUFtQixDQUFDLE1BQWU7SUFDakQsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNYLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRTtRQUNqQyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLEVBQUU7UUFDakMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELElBQUksTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLEdBQUcsR0FBRyxFQUFFO1FBQ2pDLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUM7QUFqQkQsa0RBaUJDO0FBRUQ7O0dBRUc7QUFDVSxRQUFBLGtCQUFrQixHQUFHLEdBQUcsQ0FBQTtBQUVyQzs7OztHQUlHO0FBQ0ksTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFxQixFQUFVLEVBQUU7SUFDekQsTUFBTSxnQkFBZ0IsR0FBRztRQUN2QixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBQ2pELEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDO0tBQ2xDLENBQUE7SUFFRCxrQ0FBa0M7SUFDbEMsU0FBUyxhQUFhLENBQUMsS0FBYTtRQUNsQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBRUQscUdBQXFHO0lBQ3JHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQzNGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSw0QkFBUyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBQy9ELElBQUksZ0JBQWdCLENBQUMsS0FBSyxFQUFFO1lBQzFCLHlCQUFNLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUE7WUFDNUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzdCO1FBRUQsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFBO1FBQ3ZEOzs7V0FHRztRQUNILElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFBO1lBQ3ZFLE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1NBQzdFO1FBRUQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ3BDLE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO1NBQ3JGO0tBQ0Y7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMvQixNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMseUNBQWtDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVwRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUU3RCxtREFBbUQ7SUFDbkQsT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLDBCQUFrQjtRQUMxQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxRCxDQUFDLENBQUMsU0FBUyxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBN0NZLFFBQUEsU0FBUyxhQTZDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGFwdGVyUmVxdWVzdCB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBsb2dnZXIsIFZhbGlkYXRvciB9IGZyb20gJy4uL2V4dGVybmFsLWFkYXB0ZXInXG5pbXBvcnQgeyBleGNsdWRhYmxlQWRhcHRlclJlcXVlc3RQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nXG5cbi8qKlxuICogTm9ybWFsaXplcyBodHRwIHN0YXR1cyBjb2Rlcy5cbiAqXG4gKiBSZXR1cm5zIHN0cmluZ3MgaW4gdGhlIGZvcm1hdCAoMnwzfDR8NSlYWC5cbiAqXG4gKiBAYXV0aG9yIGh0dHBzOi8vZ2l0aHViLmNvbS9qb2FvLWZvbnRlbmVsZS9leHByZXNzLXByb21ldGhldXMtbWlkZGxld2FyZVxuICogQHBhcmFtIHshbnVtYmVyfSBzdGF0dXMgLSBzdGF0dXMgY29kZSBvZiB0aGUgcmVxdWVzdHNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBub3JtYWxpemVkIHN0YXR1cyBjb2RlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplU3RhdHVzQ29kZShzdGF0dXM/OiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAoIXN0YXR1cykge1xuICAgIHJldHVybiAnNVhYJ1xuICB9XG5cbiAgaWYgKHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwKSB7XG4gICAgcmV0dXJuICcyWFgnXG4gIH1cblxuICBpZiAoc3RhdHVzID49IDMwMCAmJiBzdGF0dXMgPCA0MDApIHtcbiAgICByZXR1cm4gJzNYWCdcbiAgfVxuXG4gIGlmIChzdGF0dXMgPj0gNDAwICYmIHN0YXR1cyA8IDUwMCkge1xuICAgIHJldHVybiAnNFhYJ1xuICB9XG4gIHJldHVybiAnNVhYJ1xufVxuXG4vKipcbiAqIE1heGl1bXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgYSBmZWVkSWQgY2FuIGNvbnRhaW4uXG4gKi9cbmV4cG9ydCBjb25zdCBNQVhfRkVFRF9JRF9MRU5HVEggPSAzMDBcblxuLyoqXG4gKiBHZXQgZmVlZCBpZCBuYW1lIGJhc2VkIG9uIGlucHV0IHBhcmFtc1xuICogQHBhcmFtIGlucHV0IFRoZSBhZGFwdGVyIGlucHV0IHJlcXVlc3RcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRGZWVkSWQgPSAoaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0KTogc3RyaW5nID0+IHtcbiAgY29uc3QgY29tbW9uRmVlZFBhcmFtcyA9IHtcbiAgICBiYXNlOiBbJ2Jhc2UnLCAnZnJvbScsICdjb2luJywgJ3N5bWJvbCcsICdhc3NldCddLFxuICAgIHF1b3RlOiBbJ3F1b3RlJywgJ3RvJywgJ2NvbnZlcnQnXSxcbiAgfVxuXG4gIC8vIGNoZWNrIGlmIHN0cmluZyBpcyB3aXRoaW4gYXJyYXlcbiAgZnVuY3Rpb24gaW5jbHVkZXNDaGVjayhwYXJhbTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGlucHV0LmRhdGEpLmluY2x1ZGVzKHBhcmFtKVxuICB9XG5cbiAgLy8gcnVuIHRocm91Z2ggdmFsaWRhdG9yIGlmIGlucHV0LmRhdGEgb2JqZWN0IGhhcyBrZXlzIHRoYXQgbWF0Y2ggcG90ZW50aWFsIGJhc2UgYW5kIHF1b3RlIHBhcmFtZXRlcnNcbiAgaWYgKGNvbW1vbkZlZWRQYXJhbXMuYmFzZS5zb21lKGluY2x1ZGVzQ2hlY2spICYmIGNvbW1vbkZlZWRQYXJhbXMucXVvdGUuc29tZShpbmNsdWRlc0NoZWNrKSkge1xuICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSBuZXcgVmFsaWRhdG9yKGlucHV0LCBjb21tb25GZWVkUGFyYW1zKVxuICAgIGlmICh2YWxpZGF0aW9uUmVzdWx0LmVycm9yKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ1VuYWJsZSB0byB2YWxpZGF0ZSBmZWVkIG5hbWUnKVxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGlucHV0KVxuICAgIH1cblxuICAgIGNvbnN0IHsgYmFzZSwgcXVvdGUgfSA9IHZhbGlkYXRpb25SZXN1bHQudmFsaWRhdGVkLmRhdGFcbiAgICAvKipcbiAgICAgKiBXaXRoIGJhdGNoZWQgcmVxdWVzdHMsIHRoZSBiYXNlIGNhbiBlaXRoZXIgYmUgYW4gYXJyYXkgb2YgYmFzZXMsIG9yIGEgc2luZ2xlIGJhc2UuXG4gICAgICogUXVvdGVzIGFyZSBjdXJyZW50bHkgb25seSBhIHN0cmluZ1xuICAgICAqL1xuICAgIGlmIChBcnJheS5pc0FycmF5KGJhc2UpKSB7XG4gICAgICBjb25zdCBiYXNlcyA9IGBbJHtiYXNlLm1hcCgoYjogc3RyaW5nKSA9PiBiLnRvVXBwZXJDYXNlKCkpLmpvaW4oJ3wnKX1dYFxuICAgICAgcmV0dXJuIHR5cGVvZiBxdW90ZSA9PT0gJ3N0cmluZycgPyBgJHtiYXNlc30vJHtxdW90ZS50b1VwcGVyQ2FzZSgpfWAgOiBiYXNlc1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHVwcGVyQmFzZSA9IGJhc2UudG9VcHBlckNhc2UoKVxuICAgICAgcmV0dXJuIHR5cGVvZiBxdW90ZSA9PT0gJ3N0cmluZycgPyBgJHt1cHBlckJhc2V9LyR7cXVvdGUudG9VcHBlckNhc2UoKX1gIDogdXBwZXJCYXNlXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5rZXlzKGlucHV0KVxuICAgIC5maWx0ZXIoKHByb3ApID0+ICFleGNsdWRhYmxlQWRhcHRlclJlcXVlc3RQcm9wZXJ0aWVzW3Byb3BdKVxuICAgIC5tYXAoKGspID0+IFtrLCBpbnB1dFtrIGFzIGtleW9mIEFkYXB0ZXJSZXF1ZXN0XV0pXG5cbiAgY29uc3QgcmF3RmVlZElkID0gSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmZyb21FbnRyaWVzKGVudHJpZXMpKVxuXG4gIC8vIElmIGZlZWRJZCBleGNlZWQgdGhlIG1heCBsZW5ndGggdXNlIHRoZSBtZDUgaGFzaFxuICByZXR1cm4gcmF3RmVlZElkLmxlbmd0aCA+IE1BWF9GRUVEX0lEX0xFTkdUSFxuICAgID8gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpLnVwZGF0ZShyYXdGZWVkSWQpLmRpZ2VzdCgnaGV4JylcbiAgICA6IHJhd0ZlZWRJZFxufVxuIl19