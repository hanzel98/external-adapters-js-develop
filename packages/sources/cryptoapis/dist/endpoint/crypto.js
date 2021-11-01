"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['price'];
exports.inputParameters = {
    base: ['base', 'from', 'coin'],
    quote: ['quote', 'to', 'market'],
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const coin = validator.validated.data.base;
    const market = validator.validated.data.quote;
    const url = `/v1/exchange-rates/${coin}/${market}`;
    const reqConfig = { ...config.api, url };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, [
        'payload',
        'weightedAveragePrice',
    ]);
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2NyeXB0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEQ7QUFHakQsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRTlCLFFBQUEsZUFBZSxHQUFvQjtJQUM5QyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUM5QixLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQztDQUNqQyxDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsdUJBQWUsQ0FBQyxDQUFBO0lBQ3pELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQzFDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUM3QyxNQUFNLEdBQUcsR0FBRyxzQkFBc0IsSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFBO0lBRWxELE1BQU0sU0FBUyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBRXhDLE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQ25FLFNBQVM7UUFDVCxzQkFBc0I7S0FDdkIsQ0FBQyxDQUFBO0lBQ0YsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM5RCxDQUFDLENBQUE7QUFqQlksUUFBQSxPQUFPLFdBaUJuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBFeGVjdXRlV2l0aENvbmZpZywgQ29uZmlnLCBJbnB1dFBhcmFtZXRlcnMgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWydwcmljZSddXG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgYmFzZTogWydiYXNlJywgJ2Zyb20nLCAnY29pbiddLFxuICBxdW90ZTogWydxdW90ZScsICd0bycsICdtYXJrZXQnXSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbWV0ZXJzKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgY29pbiA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5iYXNlXG4gIGNvbnN0IG1hcmtldCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5xdW90ZVxuICBjb25zdCB1cmwgPSBgL3YxL2V4Y2hhbmdlLXJhdGVzLyR7Y29pbn0vJHttYXJrZXR9YFxuXG4gIGNvbnN0IHJlcUNvbmZpZyA9IHsgLi4uY29uZmlnLmFwaSwgdXJsIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KHJlcUNvbmZpZylcbiAgcmVzcG9uc2UuZGF0YS5yZXN1bHQgPSBSZXF1ZXN0ZXIudmFsaWRhdGVSZXN1bHROdW1iZXIocmVzcG9uc2UuZGF0YSwgW1xuICAgICdwYXlsb2FkJyxcbiAgICAnd2VpZ2h0ZWRBdmVyYWdlUHJpY2UnLFxuICBdKVxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3BvbnNlLCBjb25maWcudmVyYm9zZSlcbn1cbiJdfQ==