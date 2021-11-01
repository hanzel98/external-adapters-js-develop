"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPriceProvider = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ea_bootstrap_2 = require("@chainlink/ea-bootstrap");
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
const getPriceProvider = (source, jobRunID, apiConfig) => async (symbols, quote, withMarketCap = false) => {
    const results = await Promise.all(symbols.map(async (base) => {
        const data = {
            id: jobRunID,
            data: { base, quote, endpoint: withMarketCap ? 'marketcap' : 'crypto' },
        };
        try {
            const response = await ea_bootstrap_1.Requester.request({ ...apiConfig, data: data });
            return response.data.result;
        }
        catch (error) {
            ea_bootstrap_2.Logger.error(`Request to ${source} adapter failed: ${error}`);
            throw new Error(`Failed to request the ${source} adapter. Ensure that the ${source.toUpperCase()}_ADAPTER_URL environment variable is correctly pointed to the adapter location.`);
        }
    }));
    const payloadEntries = symbols.map((symbol, i) => {
        const key = symbol;
        const val = {
            quote: {
                [quote]: { [withMarketCap ? 'marketCap' : 'price']: results[i] },
            },
        };
        return [key, val];
    });
    return Object.fromEntries(payloadEntries);
};
exports.getPriceProvider = getPriceProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RhdGFQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHbkQsMERBQWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUksTUFBTSxnQkFBZ0IsR0FDM0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxTQUF3QixFQUFFLEVBQUUsQ0FDL0QsS0FBSyxFQUFFLE9BQWlCLEVBQUUsS0FBYSxFQUFFLGFBQWEsR0FBRyxLQUFLLEVBQTRCLEVBQUU7SUFDMUYsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN6QixNQUFNLElBQUksR0FBRztZQUNYLEVBQUUsRUFBRSxRQUFRO1lBQ1osSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtTQUN4RSxDQUFBO1FBQ0QsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN0RSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO1NBQzVCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxxQkFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLE1BQU0sb0JBQW9CLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDN0QsTUFBTSxJQUFJLEtBQUssQ0FDYix5QkFBeUIsTUFBTSw2QkFBNkIsTUFBTSxDQUFDLFdBQVcsRUFBRSxpRkFBaUYsQ0FDbEssQ0FBQTtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtJQUNELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFBO1FBQ2xCLE1BQU0sR0FBRyxHQUFHO1lBQ1YsS0FBSyxFQUFFO2dCQUNMLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7YUFDakU7U0FDRixDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNuQixDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUE7QUE5QlUsUUFBQSxnQkFBZ0Isb0JBOEIxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgUmVxdWVzdENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBSZXNwb25zZVBheWxvYWQgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGZhY3RvcnkgdGhhdCByZXR1cm5zIGEgZnVuY3Rpb24gZm9yIGdldHRpbmcgcHJpY2Ugb3IgbWFya2V0Y2FwIGRhdGEgZnJvbSBhIHByb3ZpZGVyLlxuICogSWYgdGhlIGRhdGEgcHJvdmlkZXIgc3VwcG9ydHMgYmF0Y2hpbmcgdGhlbiBpdCB3aWxsIGJlIHNlbnQgYXMgYSBiYXRjaCByZXF1ZXN0LlxuICogVGhlIHJlc3BvbnNlIGRhdGEgaXMgbm9ybWFsaXplZCB0byB0aGUgdHlwZSBSZXNwb25zZVBheWxvYWQgcmVnYXJkbGVzcyBvZiB0aGUgdHlwZSBvZiByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zXG4gKiBgYGBcbiAqIHtcbiAqICAgIFtzeW1ib2w6IHN0cmluZ106IHtcbiAqICAgICAgICBxdW90ZToge1xuICogICAgICAgICAgICBbc3ltYm9sOiBzdHJpbmddOiB7XG4gKiAgICAgICAgICAgICAgICBwcmljZT86IG51bWJlciB8IHVuZGVmaW5lZDtcbiAqICAgICAgICAgICAgICAgIG1hcmtldENhcD86IG51bWJlciB8IHVuZGVmaW5lZDtcbiAqICAgICAgICAgICAgfTtcbiAqICAgICAgICB9O1xuICogICAgfTtcbiAqfVxuICogYGBgXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFByaWNlUHJvdmlkZXIgPVxuICAoc291cmNlOiBzdHJpbmcsIGpvYlJ1bklEOiBzdHJpbmcsIGFwaUNvbmZpZzogUmVxdWVzdENvbmZpZykgPT5cbiAgYXN5bmMgKHN5bWJvbHM6IHN0cmluZ1tdLCBxdW90ZTogc3RyaW5nLCB3aXRoTWFya2V0Q2FwID0gZmFsc2UpOiBQcm9taXNlPFJlc3BvbnNlUGF5bG9hZD4gPT4ge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHN5bWJvbHMubWFwKGFzeW5jIChiYXNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgaWQ6IGpvYlJ1bklELFxuICAgICAgICAgIGRhdGE6IHsgYmFzZSwgcXVvdGUsIGVuZHBvaW50OiB3aXRoTWFya2V0Q2FwID8gJ21hcmtldGNhcCcgOiAnY3J5cHRvJyB9LFxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdCh7IC4uLmFwaUNvbmZpZywgZGF0YTogZGF0YSB9KVxuICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLnJlc3VsdFxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIExvZ2dlci5lcnJvcihgUmVxdWVzdCB0byAke3NvdXJjZX0gYWRhcHRlciBmYWlsZWQ6ICR7ZXJyb3J9YClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgRmFpbGVkIHRvIHJlcXVlc3QgdGhlICR7c291cmNlfSBhZGFwdGVyLiBFbnN1cmUgdGhhdCB0aGUgJHtzb3VyY2UudG9VcHBlckNhc2UoKX1fQURBUFRFUl9VUkwgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgY29ycmVjdGx5IHBvaW50ZWQgdG8gdGhlIGFkYXB0ZXIgbG9jYXRpb24uYCxcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgIClcbiAgICBjb25zdCBwYXlsb2FkRW50cmllcyA9IHN5bWJvbHMubWFwKChzeW1ib2wsIGkpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHN5bWJvbFxuICAgICAgY29uc3QgdmFsID0ge1xuICAgICAgICBxdW90ZToge1xuICAgICAgICAgIFtxdW90ZV06IHsgW3dpdGhNYXJrZXRDYXAgPyAnbWFya2V0Q2FwJyA6ICdwcmljZSddOiByZXN1bHRzW2ldIH0sXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgICByZXR1cm4gW2tleSwgdmFsXVxuICAgIH0pXG4gICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhwYXlsb2FkRW50cmllcylcbiAgfVxuIl19