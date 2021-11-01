"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.endpointResultPaths = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['crypto', 'price', 'marketcap'];
exports.endpointResultPaths = {
    crypto: 'price',
    price: 'price',
    marketcap: 'marketCap',
};
exports.inputParameters = {
    base: ['base', 'from', 'coin'],
    quote: ['quote', 'to', 'market'],
    coinid: false,
    resultPath: false,
    referenceCurrencyUuid: false,
};
const referenceSymbolToUuid = async (symbol, config) => {
    const url = 'reference-currencies';
    const options = {
        ...config.api,
        url,
    };
    const response = await ea_bootstrap_1.Requester.request(options);
    const currency = response.data.data.currencies.find((x) => x.symbol.toLowerCase() === symbol.toLowerCase());
    if (!currency)
        throw Error(`Currency not found for symbol: ${symbol}`);
    return currency.uuid;
};
const execute = async (input, _, config) => {
    const validator = new ea_bootstrap_1.Validator(input, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const symbol = validator.validated.data.base;
    const quote = validator.validated.data.quote;
    const coinid = validator.validated.data.coinid;
    const overridenCoinid = validator.overrideSymbol(config_1.NAME);
    let referenceCurrencyUuid = validator.validated.data.referenceCurrencyUuid;
    const resultPath = validator.validated.data.resultPath;
    let cost = 1;
    if (!referenceCurrencyUuid && quote.toUpperCase() !== 'USD') {
        referenceCurrencyUuid = await referenceSymbolToUuid(quote, config);
        cost = 2;
    }
    const params = { symbols: [symbol], referenceCurrencyUuid };
    const url = 'coins';
    const options = {
        ...config.api,
        url,
        params,
    };
    const response = await ea_bootstrap_1.Requester.request(options);
    // If coinid was provided or base was overridden, that UUID will be fetched
    const coinUuid = coinid || (overridenCoinid !== symbol && overridenCoinid);
    const coindata = response.data.data.coins.find((coin) => {
        if (coinUuid && coin.uuid === coinUuid)
            return true;
        else if (!coinUuid && coin.symbol.toUpperCase() === symbol.toUpperCase())
            return true;
        return false;
    });
    if (!coindata) {
        throw new Error(`Unable to find coin: ${coinUuid || symbol}`);
    }
    const result = ea_bootstrap_1.Requester.validateResultNumber(coindata, resultPath);
    response.data.cost = cost;
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, result), config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2NyeXB0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwwREFBOEQ7QUFDOUQsc0NBQStDO0FBRWxDLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0FBRXJELFFBQUEsbUJBQW1CLEdBQUc7SUFDakMsTUFBTSxFQUFFLE9BQU87SUFDZixLQUFLLEVBQUUsT0FBTztJQUNkLFNBQVMsRUFBRSxXQUFXO0NBQ3ZCLENBQUE7QUFnRFksUUFBQSxlQUFlLEdBQW9CO0lBQzlDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQzlCLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDO0lBQ2hDLE1BQU0sRUFBRSxLQUFLO0lBQ2IsVUFBVSxFQUFFLEtBQUs7SUFDakIscUJBQXFCLEVBQUUsS0FBSztDQUM3QixDQUFBO0FBRUQsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBbUIsRUFBRTtJQUN0RixNQUFNLEdBQUcsR0FBRyxzQkFBc0IsQ0FBQTtJQUNsQyxNQUFNLE9BQU8sR0FBRztRQUNkLEdBQUcsTUFBTSxDQUFDLEdBQUc7UUFDYixHQUFHO0tBQ0osQ0FBQTtJQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQW9DLE9BQU8sQ0FBQyxDQUFBO0lBQ3BGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ2pELENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FDdkQsQ0FBQTtJQUNELElBQUksQ0FBQyxRQUFR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QUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDNUYsQ0FBQyxDQUFBO0FBM0NZLFFBQUEsT0FBTyxXQTJDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeGVjdXRlV2l0aENvbmZpZywgQ29uZmlnLCBJbnB1dFBhcmFtZXRlcnMgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IE5BTUUgYXMgQWRhcHRlck5hbWUgfSBmcm9tICcuLi9jb25maWcnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ2NyeXB0bycsICdwcmljZScsICdtYXJrZXRjYXAnXVxuXG5leHBvcnQgY29uc3QgZW5kcG9pbnRSZXN1bHRQYXRocyA9IHtcbiAgY3J5cHRvOiAncHJpY2UnLFxuICBwcmljZTogJ3ByaWNlJyxcbiAgbWFya2V0Y2FwOiAnbWFya2V0Q2FwJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZVNjaGVtYSB7XG4gIGRhdGE6IHtcbiAgICBjb2luczoge1xuICAgICAgJzI0aFZvbHVtZSc6IHN0cmluZ1xuICAgICAgYnRjUHJpY2U6IHN0cmluZ1xuICAgICAgY2hhbmdlOiBzdHJpbmdcbiAgICAgIGNvaW5yYW5raW5nVXJsOiBzdHJpbmdcbiAgICAgIGNvbG9yOiBzdHJpbmdcbiAgICAgIGljb25Vcmw6IHN0cmluZ1xuICAgICAgbGlzdGVkQXQ6IG51bWJlclxuICAgICAgbG93Vm9sdW1lOiBib29sZWFuXG4gICAgICBtYXJrZXRDYXA6IHN0cmluZ1xuICAgICAgbmFtZTogc3RyaW5nXG4gICAgICBwcmljZTogc3RyaW5nXG4gICAgICByYW5rOiBudW1iZXJcbiAgICAgIHNwYXJrbGluZTogc3RyaW5nW11cbiAgICAgIHN5bWJvbDogc3RyaW5nXG4gICAgICB0aWVyOiBudW1iZXJcbiAgICAgIHV1aWQ6IHN0cmluZ1xuICAgIH1bXVxuICAgIHN0YXRzOiB7XG4gICAgICB0b3RhbDogbnVtYmVyXG4gICAgICB0b3RhbDI0aFZvbHVtZTogc3RyaW5nXG4gICAgICB0b3RhbEV4Y2hhbmdlczogbnVtYmVyXG4gICAgICB0b3RhbE1hcmtldENhcDogc3RyaW5nXG4gICAgICB0b3RhbE1hcmtldHM6IG51bWJlclxuICAgIH1cbiAgfVxuICBzdGF0dXM6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgUmVmZXJlbmNlQ3VycmVuY2llc1Jlc3BvbnNlU2NoZW1hIHtcbiAgZGF0YToge1xuICAgIGN1cnJlbmNpZXM6IHtcbiAgICAgIGljb25Vcmw6IHN0cmluZ1xuICAgICAgbmFtZTogc3RyaW5nXG4gICAgICBzaWduOiBzdHJpbmdcbiAgICAgIHN5bWJvbDogc3RyaW5nXG4gICAgICB0eXBlOiBzdHJpbmdcbiAgICAgIHV1aWQ6IHN0cmluZ1xuICAgIH1bXVxuICAgIHN0YXRzOiB7IHRvdGFsOiBudW1iZXIgfVxuICB9XG4gIHN0YXR1czogc3RyaW5nXG59XG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgYmFzZTogWydiYXNlJywgJ2Zyb20nLCAnY29pbiddLFxuICBxdW90ZTogWydxdW90ZScsICd0bycsICdtYXJrZXQnXSxcbiAgY29pbmlkOiBmYWxzZSxcbiAgcmVzdWx0UGF0aDogZmFsc2UsXG4gIHJlZmVyZW5jZUN1cnJlbmN5VXVpZDogZmFsc2UsXG59XG5cbmNvbnN0IHJlZmVyZW5jZVN5bWJvbFRvVXVpZCA9IGFzeW5jIChzeW1ib2w6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBjb25zdCB1cmwgPSAncmVmZXJlbmNlLWN1cnJlbmNpZXMnXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICB1cmwsXG4gIH1cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdDxSZWZlcmVuY2VDdXJyZW5jaWVzUmVzcG9uc2VTY2hlbWE+KG9wdGlvbnMpXG4gIGNvbnN0IGN1cnJlbmN5ID0gcmVzcG9uc2UuZGF0YS5kYXRhLmN1cnJlbmNpZXMuZmluZChcbiAgICAoeCkgPT4geC5zeW1ib2wudG9Mb3dlckNhc2UoKSA9PT0gc3ltYm9sLnRvTG93ZXJDYXNlKCksXG4gIClcbiAgaWYgKCFjdXJyZW5jeSkgdGhyb3cgRXJyb3IoYEN1cnJlbmN5IG5vdCBmb3VuZCBmb3Igc3ltYm9sOiAke3N5bWJvbH1gKVxuICByZXR1cm4gY3VycmVuY3kudXVpZFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChpbnB1dCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoaW5wdXQsIGlucHV0UGFyYW1ldGVycylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IHN5bWJvbCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5iYXNlXG4gIGNvbnN0IHF1b3RlID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLnF1b3RlXG4gIGNvbnN0IGNvaW5pZCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5jb2luaWRcbiAgY29uc3Qgb3ZlcnJpZGVuQ29pbmlkID0gdmFsaWRhdG9yLm92ZXJyaWRlU3ltYm9sKEFkYXB0ZXJOYW1lKSBhcyBzdHJpbmdcbiAgbGV0IHJlZmVyZW5jZUN1cnJlbmN5VXVpZCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5yZWZlcmVuY2VDdXJyZW5jeVV1aWQgYXMgc3RyaW5nIHwgdW5kZWZpbmVkXG4gIGNvbnN0IHJlc3VsdFBhdGggPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEucmVzdWx0UGF0aFxuXG4gIGxldCBjb3N0ID0gMVxuICBpZiAoIXJlZmVyZW5jZUN1cnJlbmN5VXVpZCAmJiBxdW90ZS50b1VwcGVyQ2FzZSgpICE9PSAnVVNEJykge1xuICAgIHJlZmVyZW5jZUN1cnJlbmN5VXVpZCA9IGF3YWl0IHJlZmVyZW5jZVN5bWJvbFRvVXVpZChxdW90ZSwgY29uZmlnKVxuICAgIGNvc3QgPSAyXG4gIH1cblxuICBjb25zdCBwYXJhbXMgPSB7IHN5bWJvbHM6IFtzeW1ib2xdLCByZWZlcmVuY2VDdXJyZW5jeVV1aWQgfVxuXG4gIGNvbnN0IHVybCA9ICdjb2lucydcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5jb25maWcuYXBpLFxuICAgIHVybCxcbiAgICBwYXJhbXMsXG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0PFJlc3BvbnNlU2NoZW1hICYgeyBjb3N0PzogbnVtYmVyIH0+KG9wdGlvbnMpXG5cbiAgLy8gSWYgY29pbmlkIHdhcyBwcm92aWRlZCBvciBiYXNlIHdhcyBvdmVycmlkZGVuLCB0aGF0IFVVSUQgd2lsbCBiZSBmZXRjaGVkXG4gIGNvbnN0IGNvaW5VdWlkID0gY29pbmlkIHx8IChvdmVycmlkZW5Db2luaWQgIT09IHN5bWJvbCAmJiBvdmVycmlkZW5Db2luaWQpXG4gIGNvbnN0IGNvaW5kYXRhID0gcmVzcG9uc2UuZGF0YS5kYXRhLmNvaW5zLmZpbmQoKGNvaW4pID0+IHtcbiAgICBpZiAoY29pblV1aWQgJiYgY29pbi51dWlkID09PSBjb2luVXVpZCkgcmV0dXJuIHRydWVcbiAgICBlbHNlIGlmICghY29pblV1aWQgJiYgY29pbi5zeW1ib2wudG9VcHBlckNhc2UoKSA9PT0gc3ltYm9sLnRvVXBwZXJDYXNlKCkpIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG4gIGlmICghY29pbmRhdGEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBmaW5kIGNvaW46ICR7Y29pblV1aWQgfHwgc3ltYm9sfWApXG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBSZXF1ZXN0ZXIudmFsaWRhdGVSZXN1bHROdW1iZXIoY29pbmRhdGEsIHJlc3VsdFBhdGgpXG4gIHJlc3BvbnNlLmRhdGEuY29zdCA9IGNvc3RcbiAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGpvYlJ1bklELCBSZXF1ZXN0ZXIud2l0aFJlc3VsdChyZXNwb25zZSwgcmVzdWx0KSwgY29uZmlnLnZlcmJvc2UpXG59XG4iXX0=