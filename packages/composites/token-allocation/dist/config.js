"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOptions = exports.makeConfig = exports.DEFAULT_TOKEN_BALANCE = exports.DEFAULT_TOKEN_DECIMALS = exports.adapters = void 0;
const tslib_1 = require("tslib");
const amberdata_adapter_1 = tslib_1.__importDefault(require("@chainlink/amberdata-adapter"));
const CoinGecko = tslib_1.__importStar(require("@chainlink/coingecko-adapter"));
const CoinApi = tslib_1.__importStar(require("@chainlink/coinapi-adapter"));
const CoinMarketCap = tslib_1.__importStar(require("@chainlink/coinmarketcap-adapter"));
const CoinPaprika = tslib_1.__importStar(require("@chainlink/coinpaprika-adapter"));
const CryptoCompare = tslib_1.__importStar(require("@chainlink/cryptocompare-adapter"));
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const Kaiko = tslib_1.__importStar(require("@chainlink/kaiko-adapter"));
const Nomics = tslib_1.__importStar(require("@chainlink/nomics-adapter"));
const Tiingo = tslib_1.__importStar(require("@chainlink/tiingo-adapter"));
exports.adapters = [
    amberdata_adapter_1.default,
    CoinApi,
    CoinGecko,
    CoinMarketCap,
    CoinPaprika,
    CryptoCompare,
    Kaiko,
    Nomics,
    Tiingo,
];
exports.DEFAULT_TOKEN_DECIMALS = 18;
exports.DEFAULT_TOKEN_BALANCE = 1;
const makeConfig = (prefix = '') => {
    const sources = {};
    for (const a of exports.adapters) {
        const name = a.NAME;
        const url = ea_bootstrap_1.util.getURL(name.toUpperCase());
        if (url) {
            const defaultConfig = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
            defaultConfig.api.baseURL = url;
            defaultConfig.api.method = 'post';
            sources[name.toLowerCase()] = defaultConfig;
        }
    }
    return {
        sources,
        defaultMethod: ea_bootstrap_1.util.getEnv('DEFAULT_METHOD', prefix) || 'price',
        defaultQuote: ea_bootstrap_1.util.getEnv('DEFAULT_QUOTE') || 'USD',
        defaultSource: ea_bootstrap_1.util.getEnv('DEFAULT_SOURCE'),
    };
};
exports.makeConfig = makeConfig;
const makeOptions = ({ sources }) => {
    const sourceOptions = Object.keys(sources).map((s) => s.toLowerCase());
    return {
        source: sourceOptions,
    };
};
exports.makeOptions = makeOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNkZBQW9EO0FBQ3BELGdGQUF5RDtBQUN6RCw0RUFBcUQ7QUFDckQsd0ZBQWlFO0FBQ2pFLG9GQUE2RDtBQUM3RCx3RkFBaUU7QUFDakUsMERBQXlEO0FBQ3pELHdFQUFpRDtBQUNqRCwwRUFBbUQ7QUFDbkQsMEVBQW1EO0FBSXRDLFFBQUEsUUFBUSxHQUE0QjtJQUMvQywyQkFBUztJQUNULE9BQU87SUFDUCxTQUFTO0lBQ1QsYUFBYTtJQUNiLFdBQVc7SUFDWCxhQUFhO0lBQ2IsS0FBSztJQUNMLE1BQU07SUFDTixNQUFNO0NBQ1AsQ0FBQTtBQUlZLFFBQUEsc0JBQXNCLEdBQUcsRUFBRSxDQUFBO0FBQzNCLFFBQUEscUJBQXFCLEdBQUcsQ0FBQyxDQUFBO0FBRS9CLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBVSxFQUFFO0lBQ2hELE1BQU0sT0FBTyxHQUF5QixFQUFFLENBQUE7SUFFeEMsS0FBSyxNQUFNLENBQUMsSUFBSSxnQkFBUSxFQUFFO1FBQ3hCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUE7UUFDbkIsTUFBTSxHQUFHLEdBQUcsbUJBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFDM0MsSUFBSSxHQUFHLEVBQUU7WUFDUCxNQUFNLGFBQWEsR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3hELGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtZQUMvQixhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7WUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQTtTQUM1QztLQUNGO0lBRUQsT0FBTztRQUNMLE9BQU87UUFDUCxhQUFhLEVBQUUsbUJBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLElBQUksT0FBTztRQUMvRCxZQUFZLEVBQUUsbUJBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksS0FBSztRQUNuRCxhQUFhLEVBQUUsbUJBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7S0FDN0MsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQXBCWSxRQUFBLFVBQVUsY0FvQnRCO0FBRU0sTUFBTSxXQUFXLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBVSxFQUFFLEVBQUU7SUFDakQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO0lBQ3RFLE9BQU87UUFDTCxNQUFNLEVBQUUsYUFBYTtLQUN0QixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBTFksUUFBQSxXQUFXLGVBS3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFtYmVyZGF0YSBmcm9tICdAY2hhaW5saW5rL2FtYmVyZGF0YS1hZGFwdGVyJ1xuaW1wb3J0ICogYXMgQ29pbkdlY2tvIGZyb20gJ0BjaGFpbmxpbmsvY29pbmdlY2tvLWFkYXB0ZXInXG5pbXBvcnQgKiBhcyBDb2luQXBpIGZyb20gJ0BjaGFpbmxpbmsvY29pbmFwaS1hZGFwdGVyJ1xuaW1wb3J0ICogYXMgQ29pbk1hcmtldENhcCBmcm9tICdAY2hhaW5saW5rL2NvaW5tYXJrZXRjYXAtYWRhcHRlcidcbmltcG9ydCAqIGFzIENvaW5QYXByaWthIGZyb20gJ0BjaGFpbmxpbmsvY29pbnBhcHJpa2EtYWRhcHRlcidcbmltcG9ydCAqIGFzIENyeXB0b0NvbXBhcmUgZnJvbSAnQGNoYWlubGluay9jcnlwdG9jb21wYXJlLWFkYXB0ZXInXG5pbXBvcnQgeyBSZXF1ZXN0ZXIsIHV0aWwgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCAqIGFzIEthaWtvIGZyb20gJ0BjaGFpbmxpbmsva2Fpa28tYWRhcHRlcidcbmltcG9ydCAqIGFzIE5vbWljcyBmcm9tICdAY2hhaW5saW5rL25vbWljcy1hZGFwdGVyJ1xuaW1wb3J0ICogYXMgVGlpbmdvIGZyb20gJ0BjaGFpbmxpbmsvdGlpbmdvLWFkYXB0ZXInXG5pbXBvcnQgeyBBZGFwdGVySW1wbGVtZW50YXRpb24gfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgQ29uZmlnLCBTb3VyY2VSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBhZGFwdGVyczogQWRhcHRlckltcGxlbWVudGF0aW9uW10gPSBbXG4gIEFtYmVyZGF0YSxcbiAgQ29pbkFwaSxcbiAgQ29pbkdlY2tvLFxuICBDb2luTWFya2V0Q2FwLFxuICBDb2luUGFwcmlrYSxcbiAgQ3J5cHRvQ29tcGFyZSxcbiAgS2Fpa28sXG4gIE5vbWljcyxcbiAgVGlpbmdvLFxuXVxuXG5leHBvcnQgdHlwZSBTb3VyY2UgPSB0eXBlb2YgYWRhcHRlcnNbbnVtYmVyXVsnTkFNRSddXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RPS0VOX0RFQ0lNQUxTID0gMThcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RPS0VOX0JBTEFOQ0UgPSAxXG5cbmV4cG9ydCBjb25zdCBtYWtlQ29uZmlnID0gKHByZWZpeCA9ICcnKTogQ29uZmlnID0+IHtcbiAgY29uc3Qgc291cmNlczogU291cmNlUmVxdWVzdE9wdGlvbnMgPSB7fVxuXG4gIGZvciAoY29uc3QgYSBvZiBhZGFwdGVycykge1xuICAgIGNvbnN0IG5hbWUgPSBhLk5BTUVcbiAgICBjb25zdCB1cmwgPSB1dGlsLmdldFVSTChuYW1lLnRvVXBwZXJDYXNlKCkpXG4gICAgaWYgKHVybCkge1xuICAgICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IFJlcXVlc3Rlci5nZXREZWZhdWx0Q29uZmlnKHByZWZpeClcbiAgICAgIGRlZmF1bHRDb25maWcuYXBpLmJhc2VVUkwgPSB1cmxcbiAgICAgIGRlZmF1bHRDb25maWcuYXBpLm1ldGhvZCA9ICdwb3N0J1xuICAgICAgc291cmNlc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gZGVmYXVsdENvbmZpZ1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc291cmNlcyxcbiAgICBkZWZhdWx0TWV0aG9kOiB1dGlsLmdldEVudignREVGQVVMVF9NRVRIT0QnLCBwcmVmaXgpIHx8ICdwcmljZScsXG4gICAgZGVmYXVsdFF1b3RlOiB1dGlsLmdldEVudignREVGQVVMVF9RVU9URScpIHx8ICdVU0QnLFxuICAgIGRlZmF1bHRTb3VyY2U6IHV0aWwuZ2V0RW52KCdERUZBVUxUX1NPVVJDRScpLFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlT3B0aW9ucyA9ICh7IHNvdXJjZXMgfTogQ29uZmlnKSA9PiB7XG4gIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSBPYmplY3Qua2V5cyhzb3VyY2VzKS5tYXAoKHMpID0+IHMudG9Mb3dlckNhc2UoKSlcbiAgcmV0dXJuIHtcbiAgICBzb3VyY2U6IHNvdXJjZU9wdGlvbnMsXG4gIH1cbn1cbiJdfQ==