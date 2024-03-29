"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWSHandler = exports.makeExecute = exports.endpointSelector = exports.execute = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const endpoints = tslib_1.__importStar(require("./endpoint"));
const execute = async (request, context, config) => {
    return ea_bootstrap_1.Builder.buildSelector(request, context, config, endpoints);
};
exports.execute = execute;
const endpointSelector = (request) => ea_bootstrap_1.Builder.selectEndpoint(request, config_1.makeConfig(), endpoints);
exports.endpointSelector = endpointSelector;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
const makeWSHandler = (config) => {
    const getSubscription = (symbol, subscribe = true) => {
        if (!symbol)
            return;
        return {
            event: subscribe ? 'subscribe' : 'unsubscribe',
            topic: `${symbol}@bbo`,
            id: 1,
        };
    };
    const getSymbol = (input) => {
        const validator = new ea_bootstrap_1.Validator(input, endpoints.crypto.inputParameters, {}, false);
        if (validator.error)
            return;
        const symbol = validator.validated.data.base.toUpperCase();
        const convert = validator.validated.data.quote.toUpperCase();
        return `SPOT_${symbol}_${convert}`;
    };
    return () => {
        const defaultConfig = config || config_1.makeConfig();
        return {
            connection: {
                url: defaultConfig.api.baseWsURL,
            },
            subscribe: (input) => getSubscription(getSymbol(input)),
            unsubscribe: (input) => getSubscription(getSymbol(input), false),
            subsFromMessage: (message) => {
                if (!message.data)
                    return undefined;
                return getSubscription(message.data.symbol);
            },
            isError: (message) => message.type === 'error',
            // Ignore everything is not a ticker message. Throw an error on incoming errors.
            filter: (message) => message.data !== undefined,
            toResponse: (message) => {
                const ask = message.data.ask;
                const bid = message.data.bid;
                const price = (ask + bid) / 2; // average
                const result = ea_bootstrap_1.Requester.validateResultNumber({ price }, ['price']);
                return ea_bootstrap_1.Requester.success('1', { data: { result } });
            },
        };
    };
};
exports.makeWSHandler = makeWSHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBdUU7QUFTdkUscUNBQXFDO0FBQ3JDLDhEQUF1QztBQUVoQyxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbkYsT0FBTyxzQkFBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUNuRSxDQUFDLENBQUE7QUFGWSxRQUFBLE9BQU8sV0FFbkI7QUFFTSxNQUFNLGdCQUFnQixHQUFHLENBQUMsT0FBdUIsRUFBZSxFQUFFLENBQ3ZFLHNCQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxtQkFBVSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFEN0MsUUFBQSxnQkFBZ0Isb0JBQzZCO0FBRW5ELE1BQU0sV0FBVyxHQUEyQixDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQzVELE9BQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxtQkFBVSxFQUFFLENBQUMsQ0FBQTtBQUN0RixDQUFDLENBQUE7QUFGWSxRQUFBLFdBQVcsZUFFdkI7QUFFTSxNQUFNLGFBQWEsR0FBRyxDQUFDLE1BQWUsRUFBaUIsRUFBRTtJQUM5RCxNQUFNLGVBQWUsR0FBRyxDQUFDLE1BQWUsRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFFLEVBQUU7UUFDNUQsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFNO1FBQ25CLE9BQU87WUFDTCxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWE7WUFDOUMsS0FBSyxFQUFFLEdBQUcsTUFBTSxNQUFNO1lBQ3RCLEVBQUUsRUFBRSxDQUFDO1NBQ04sQ0FBQTtJQUNILENBQUMsQ0FBQTtJQUNELE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBcUIsRUFBRSxFQUFFO1FBQzFDLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ25GLElBQUksU0FBUyxDQUFDLEtBQUs7WUFBRSxPQUFNO1FBQzNCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUMxRCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDNUQsT0FBTyxRQUFRLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQTtJQUNwQyxDQUFDLENBQUE7SUFDRCxPQUFPLEdBQUcsRUFBRTtRQUNWLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxtQkFBVSxFQUFFLENBQUE7UUFDNUMsT0FBTztZQUNMLFVBQVUsRUFBRTtnQkFDVixHQUFHLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTO2FBQ2pDO1lBQ0QsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUM7WUFDaEUsZUFBZSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtvQkFBRSxPQUFPLFNBQVMsQ0FBQTtnQkFDbkMsT0FBTyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUM3QyxDQUFDO1lBQ0QsT0FBTyxFQUFFLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU87WUFDbkQsZ0ZBQWdGO1lBQ2hGLE1BQU0sRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTO1lBQ3BELFVBQVUsRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFO2dCQUMzQixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQTtnQkFDNUIsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUE7Z0JBQzVCLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLFVBQVU7Z0JBQ3hDLE1BQU0sTUFBTSxHQUFHLHdCQUFTLENBQUMsb0JBQW9CLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7Z0JBQ25FLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ3JELENBQUM7U0FDRixDQUFBO0lBQ0gsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBeENZLFFBQUEsYUFBYSxpQkF3Q3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVpbGRlciwgVmFsaWRhdG9yLCBSZXF1ZXN0ZXIgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7XG4gIENvbmZpZyxcbiAgRXhlY3V0ZVdpdGhDb25maWcsXG4gIEV4ZWN1dGVGYWN0b3J5LFxuICBBZGFwdGVyUmVxdWVzdCxcbiAgQVBJRW5kcG9pbnQsXG4gIE1ha2VXU0hhbmRsZXIsXG59IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBtYWtlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgKiBhcyBlbmRwb2ludHMgZnJvbSAnLi9lbmRwb2ludCdcblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKSA9PiB7XG4gIHJldHVybiBCdWlsZGVyLmJ1aWxkU2VsZWN0b3IocmVxdWVzdCwgY29udGV4dCwgY29uZmlnLCBlbmRwb2ludHMpXG59XG5cbmV4cG9ydCBjb25zdCBlbmRwb2ludFNlbGVjdG9yID0gKHJlcXVlc3Q6IEFkYXB0ZXJSZXF1ZXN0KTogQVBJRW5kcG9pbnQgPT5cbiAgQnVpbGRlci5zZWxlY3RFbmRwb2ludChyZXF1ZXN0LCBtYWtlQ29uZmlnKCksIGVuZHBvaW50cylcblxuZXhwb3J0IGNvbnN0IG1ha2VFeGVjdXRlOiBFeGVjdXRlRmFjdG9yeTxDb25maWc+ID0gKGNvbmZpZykgPT4ge1xuICByZXR1cm4gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQpID0+IGV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnIHx8IG1ha2VDb25maWcoKSlcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VXU0hhbmRsZXIgPSAoY29uZmlnPzogQ29uZmlnKTogTWFrZVdTSGFuZGxlciA9PiB7XG4gIGNvbnN0IGdldFN1YnNjcmlwdGlvbiA9IChzeW1ib2w/OiBzdHJpbmcsIHN1YnNjcmliZSA9IHRydWUpID0+IHtcbiAgICBpZiAoIXN5bWJvbCkgcmV0dXJuXG4gICAgcmV0dXJuIHtcbiAgICAgIGV2ZW50OiBzdWJzY3JpYmUgPyAnc3Vic2NyaWJlJyA6ICd1bnN1YnNjcmliZScsXG4gICAgICB0b3BpYzogYCR7c3ltYm9sfUBiYm9gLFxuICAgICAgaWQ6IDEsXG4gICAgfVxuICB9XG4gIGNvbnN0IGdldFN5bWJvbCA9IChpbnB1dDogQWRhcHRlclJlcXVlc3QpID0+IHtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKGlucHV0LCBlbmRwb2ludHMuY3J5cHRvLmlucHV0UGFyYW1ldGVycywge30sIGZhbHNlKVxuICAgIGlmICh2YWxpZGF0b3IuZXJyb3IpIHJldHVyblxuICAgIGNvbnN0IHN5bWJvbCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5iYXNlLnRvVXBwZXJDYXNlKClcbiAgICBjb25zdCBjb252ZXJ0ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLnF1b3RlLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gYFNQT1RfJHtzeW1ib2x9XyR7Y29udmVydH1gXG4gIH1cbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gY29uZmlnIHx8IG1ha2VDb25maWcoKVxuICAgIHJldHVybiB7XG4gICAgICBjb25uZWN0aW9uOiB7XG4gICAgICAgIHVybDogZGVmYXVsdENvbmZpZy5hcGkuYmFzZVdzVVJMLFxuICAgICAgfSxcbiAgICAgIHN1YnNjcmliZTogKGlucHV0KSA9PiBnZXRTdWJzY3JpcHRpb24oZ2V0U3ltYm9sKGlucHV0KSksXG4gICAgICB1bnN1YnNjcmliZTogKGlucHV0KSA9PiBnZXRTdWJzY3JpcHRpb24oZ2V0U3ltYm9sKGlucHV0KSwgZmFsc2UpLFxuICAgICAgc3Vic0Zyb21NZXNzYWdlOiAobWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAoIW1lc3NhZ2UuZGF0YSkgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gZ2V0U3Vic2NyaXB0aW9uKG1lc3NhZ2UuZGF0YS5zeW1ib2wpXG4gICAgICB9LFxuICAgICAgaXNFcnJvcjogKG1lc3NhZ2U6IGFueSkgPT4gbWVzc2FnZS50eXBlID09PSAnZXJyb3InLFxuICAgICAgLy8gSWdub3JlIGV2ZXJ5dGhpbmcgaXMgbm90IGEgdGlja2VyIG1lc3NhZ2UuIFRocm93IGFuIGVycm9yIG9uIGluY29taW5nIGVycm9ycy5cbiAgICAgIGZpbHRlcjogKG1lc3NhZ2U6IGFueSkgPT4gbWVzc2FnZS5kYXRhICE9PSB1bmRlZmluZWQsXG4gICAgICB0b1Jlc3BvbnNlOiAobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGFzayA9IG1lc3NhZ2UuZGF0YS5hc2tcbiAgICAgICAgY29uc3QgYmlkID0gbWVzc2FnZS5kYXRhLmJpZFxuICAgICAgICBjb25zdCBwcmljZSA9IChhc2sgKyBiaWQpIC8gMiAvLyBhdmVyYWdlXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFJlcXVlc3Rlci52YWxpZGF0ZVJlc3VsdE51bWJlcih7IHByaWNlIH0sIFsncHJpY2UnXSlcbiAgICAgICAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKCcxJywgeyBkYXRhOiB7IHJlc3VsdCB9IH0pXG4gICAgICB9LFxuICAgIH1cbiAgfVxufVxuIl19