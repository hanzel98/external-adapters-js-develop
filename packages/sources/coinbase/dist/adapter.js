"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWSHandler = exports.makeExecute = exports.endpointSelector = exports.execute = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const endpoint_1 = require("./endpoint");
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
    const getSubscription = (productId, subscribe = true) => {
        if (!productId)
            return;
        return {
            type: subscribe ? 'subscribe' : 'unsubscribe',
            channels: ['ticker'],
            product_ids: [productId],
        };
    };
    const getProductId = (input) => {
        const validator = new ea_bootstrap_1.Validator(input, endpoint_1.crypto.inputParameters, {}, false);
        if (validator.error)
            return;
        const symbol = validator.validated.data.symbol.toUpperCase();
        const convert = validator.validated.data.convert.toUpperCase();
        return `${symbol}-${convert}`;
    };
    return () => {
        const defaultConfig = config || config_1.makeConfig();
        return {
            connection: {
                url: defaultConfig.api.baseWsURL || config_1.DEFAULT_WS_API_ENDPOINT,
            },
            subscribe: (input) => getSubscription(getProductId(input)),
            unsubscribe: (input) => getSubscription(getProductId(input), false),
            subsFromMessage: (message) => getSubscription(`${message?.product_id}`),
            isError: (message) => message.type === 'error',
            // Ignore everything is not a ticker message. Throw an error on incoming errors.
            filter: (message) => message.type === 'ticker',
            toResponse: (message) => {
                const result = ea_bootstrap_1.Requester.validateResultNumber(message, ['price']);
                return ea_bootstrap_1.Requester.success('1', { data: { result } });
            },
        };
    };
};
exports.makeWSHandler = makeWSHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBdUU7QUFTdkUscUNBQThEO0FBQzlELHlDQUFtQztBQUNuQyw4REFBdUM7QUFFaEMsTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ25GLE9BQU8sc0JBQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDbkUsQ0FBQyxDQUFBO0FBRlksUUFBQSxPQUFPLFdBRW5CO0FBRU0sTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE9BQXVCLEVBQWUsRUFBRSxDQUN2RSxzQkFBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsbUJBQVUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBRDdDLFFBQUEsZ0JBQWdCLG9CQUM2QjtBQUVuRCxNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUM1RCxPQUFPLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQVUsRUFBRSxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCO0FBRU0sTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFlLEVBQWlCLEVBQUU7SUFDOUQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxTQUFrQixFQUFFLFNBQVMsR0FBRyxJQUFJLEVBQUUsRUFBRTtRQUMvRCxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU07UUFDdEIsT0FBTztZQUNMLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYTtZQUM3QyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDcEIsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3pCLENBQUE7SUFDSCxDQUFDLENBQUE7SUFDRCxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQXFCLEVBQUUsRUFBRTtRQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsS0FBSyxFQUFFLGlCQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN6RSxJQUFJLFNBQVMsQ0FBQyxLQUFLO1lBQUUsT0FBTTtRQUMzQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDNUQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQzlELE9BQU8sR0FBRyxNQUFNLElBQUksT0FBTyxFQUFFLENBQUE7SUFDL0IsQ0FBQyxDQUFBO0lBQ0QsT0FBTyxHQUFHLEVBQUU7UUFDVixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksbUJBQVUsRUFBRSxDQUFBO1FBQzVDLE9BQU87WUFDTCxVQUFVLEVBQUU7Z0JBQ1YsR0FBRyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLGdDQUF1QjthQUM1RDtZQUNELFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRCxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDO1lBQ25FLGVBQWUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEdBQUcsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO1lBQ3ZFLE9BQU8sRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPO1lBQ25ELGdGQUFnRjtZQUNoRixNQUFNLEVBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUNuRCxVQUFVLEVBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRTtnQkFDM0IsTUFBTSxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO2dCQUNqRSxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUNyRCxDQUFDO1NBQ0YsQ0FBQTtJQUNILENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQWxDWSxRQUFBLGFBQWEsaUJBa0N6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1aWxkZXIsIFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQge1xuICBBZGFwdGVyUmVxdWVzdCxcbiAgQ29uZmlnLFxuICBFeGVjdXRlRmFjdG9yeSxcbiAgRXhlY3V0ZVdpdGhDb25maWcsXG4gIE1ha2VXU0hhbmRsZXIsXG4gIEFQSUVuZHBvaW50LFxufSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgREVGQVVMVF9XU19BUElfRU5EUE9JTlQsIG1ha2VDb25maWcgfSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7IGNyeXB0byB9IGZyb20gJy4vZW5kcG9pbnQnXG5pbXBvcnQgKiBhcyBlbmRwb2ludHMgZnJvbSAnLi9lbmRwb2ludCdcblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKSA9PiB7XG4gIHJldHVybiBCdWlsZGVyLmJ1aWxkU2VsZWN0b3IocmVxdWVzdCwgY29udGV4dCwgY29uZmlnLCBlbmRwb2ludHMpXG59XG5cbmV4cG9ydCBjb25zdCBlbmRwb2ludFNlbGVjdG9yID0gKHJlcXVlc3Q6IEFkYXB0ZXJSZXF1ZXN0KTogQVBJRW5kcG9pbnQgPT5cbiAgQnVpbGRlci5zZWxlY3RFbmRwb2ludChyZXF1ZXN0LCBtYWtlQ29uZmlnKCksIGVuZHBvaW50cylcblxuZXhwb3J0IGNvbnN0IG1ha2VFeGVjdXRlOiBFeGVjdXRlRmFjdG9yeTxDb25maWc+ID0gKGNvbmZpZykgPT4ge1xuICByZXR1cm4gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQpID0+IGV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnIHx8IG1ha2VDb25maWcoKSlcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VXU0hhbmRsZXIgPSAoY29uZmlnPzogQ29uZmlnKTogTWFrZVdTSGFuZGxlciA9PiB7XG4gIGNvbnN0IGdldFN1YnNjcmlwdGlvbiA9IChwcm9kdWN0SWQ/OiBzdHJpbmcsIHN1YnNjcmliZSA9IHRydWUpID0+IHtcbiAgICBpZiAoIXByb2R1Y3RJZCkgcmV0dXJuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHN1YnNjcmliZSA/ICdzdWJzY3JpYmUnIDogJ3Vuc3Vic2NyaWJlJyxcbiAgICAgIGNoYW5uZWxzOiBbJ3RpY2tlciddLFxuICAgICAgcHJvZHVjdF9pZHM6IFtwcm9kdWN0SWRdLFxuICAgIH1cbiAgfVxuICBjb25zdCBnZXRQcm9kdWN0SWQgPSAoaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0KSA9PiB7XG4gICAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihpbnB1dCwgY3J5cHRvLmlucHV0UGFyYW1ldGVycywge30sIGZhbHNlKVxuICAgIGlmICh2YWxpZGF0b3IuZXJyb3IpIHJldHVyblxuICAgIGNvbnN0IHN5bWJvbCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5zeW1ib2wudG9VcHBlckNhc2UoKVxuICAgIGNvbnN0IGNvbnZlcnQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuY29udmVydC50b1VwcGVyQ2FzZSgpXG4gICAgcmV0dXJuIGAke3N5bWJvbH0tJHtjb252ZXJ0fWBcbiAgfVxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWcgPSBjb25maWcgfHwgbWFrZUNvbmZpZygpXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbm5lY3Rpb246IHtcbiAgICAgICAgdXJsOiBkZWZhdWx0Q29uZmlnLmFwaS5iYXNlV3NVUkwgfHwgREVGQVVMVF9XU19BUElfRU5EUE9JTlQsXG4gICAgICB9LFxuICAgICAgc3Vic2NyaWJlOiAoaW5wdXQpID0+IGdldFN1YnNjcmlwdGlvbihnZXRQcm9kdWN0SWQoaW5wdXQpKSxcbiAgICAgIHVuc3Vic2NyaWJlOiAoaW5wdXQpID0+IGdldFN1YnNjcmlwdGlvbihnZXRQcm9kdWN0SWQoaW5wdXQpLCBmYWxzZSksXG4gICAgICBzdWJzRnJvbU1lc3NhZ2U6IChtZXNzYWdlKSA9PiBnZXRTdWJzY3JpcHRpb24oYCR7bWVzc2FnZT8ucHJvZHVjdF9pZH1gKSxcbiAgICAgIGlzRXJyb3I6IChtZXNzYWdlOiBhbnkpID0+IG1lc3NhZ2UudHlwZSA9PT0gJ2Vycm9yJyxcbiAgICAgIC8vIElnbm9yZSBldmVyeXRoaW5nIGlzIG5vdCBhIHRpY2tlciBtZXNzYWdlLiBUaHJvdyBhbiBlcnJvciBvbiBpbmNvbWluZyBlcnJvcnMuXG4gICAgICBmaWx0ZXI6IChtZXNzYWdlOiBhbnkpID0+IG1lc3NhZ2UudHlwZSA9PT0gJ3RpY2tlcicsXG4gICAgICB0b1Jlc3BvbnNlOiAobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFJlcXVlc3Rlci52YWxpZGF0ZVJlc3VsdE51bWJlcihtZXNzYWdlLCBbJ3ByaWNlJ10pXG4gICAgICAgIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2VzcygnMScsIHsgZGF0YTogeyByZXN1bHQgfSB9KVxuICAgICAgfSxcbiAgICB9XG4gIH1cbn1cbiJdfQ==