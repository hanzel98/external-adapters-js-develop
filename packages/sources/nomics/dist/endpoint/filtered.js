"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.endpointResultPaths = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['filtered'];
exports.endpointResultPaths = {
    filtered: 'price',
};
const customError = (data) => {
    return Object.keys(data).length === 0;
};
exports.inputParameters = {
    base: ['base', 'from', 'coin', 'id'],
    exchanges: ['exchanges'],
    resultPath: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const symbol = validator.overrideSymbol(config_1.NAME);
    const jobRunID = validator.validated.id;
    const exchanges = validator.validated.data.exchanges;
    const resultPath = validator.validated.data.resultPath;
    const url = `/prices/restricted`;
    const params = {
        currency: symbol,
        key: config.apiKey,
        exchanges: exchanges,
    };
    const reqConfig = {
        ...config.api,
        url,
        params,
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig, customError);
    const result = ea_bootstrap_1.Requester.validateResultNumber(response.data, resultPath);
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, result), config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnQvZmlsdGVyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQThEO0FBRTlELHNDQUErQztBQUVsQyxRQUFBLGtCQUFrQixHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7QUFFakMsUUFBQSxtQkFBbUIsR0FBRztJQUNqQyxRQUFRLEVBQUUsT0FBTztDQUNsQixDQUFBO0FBRUQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRTtJQUNoQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQTtBQUN2QyxDQUFDLENBQUE7QUFFWSxRQUFBLGVBQWUsR0FBb0I7SUFDOUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDO0lBQ3BDLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUN4QixVQUFVLEVBQUUsS0FBSztDQUNsQixDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsdUJBQWUsQ0FBQyxDQUFBO0lBQ3pELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxhQUFXLENBQUMsQ0FBQTtJQUNwRCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUE7SUFDcEQsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBRXRELE1BQU0sR0FBRyxHQUFHLG9CQUFvQixDQUFBO0lBRWhDLE1BQU0sTUFBTSxHQUFHO1FBQ2IsUUFBUSxFQUFFLE1BQU07UUFDaEIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNO1FBQ2xCLFNBQVMsRUFBRSxTQUFTO0tBQ3JCLENBQUE7SUFDRCxNQUFNLFNBQVMsR0FBRztRQUNoQixHQUFHLE1BQU0sQ0FBQyxHQUFHO1FBQ2IsR0FBRztRQUNILE1BQU07S0FDUCxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFFaEUsTUFBTSxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ3hFLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLHdCQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDNUYsQ0FBQyxDQUFBO0FBMUJZLFFBQUEsT0FBTyxXQTBCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IE5BTUUgYXMgQWRhcHRlck5hbWUgfSBmcm9tICcuLi9jb25maWcnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ2ZpbHRlcmVkJ11cblxuZXhwb3J0IGNvbnN0IGVuZHBvaW50UmVzdWx0UGF0aHMgPSB7XG4gIGZpbHRlcmVkOiAncHJpY2UnLFxufVxuXG5jb25zdCBjdXN0b21FcnJvciA9IChkYXRhOiBhbnkpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMFxufVxuXG5leHBvcnQgY29uc3QgaW5wdXRQYXJhbWV0ZXJzOiBJbnB1dFBhcmFtZXRlcnMgPSB7XG4gIGJhc2U6IFsnYmFzZScsICdmcm9tJywgJ2NvaW4nLCAnaWQnXSxcbiAgZXhjaGFuZ2VzOiBbJ2V4Y2hhbmdlcyddLFxuICByZXN1bHRQYXRoOiBmYWxzZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbWV0ZXJzKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBzeW1ib2wgPSB2YWxpZGF0b3Iub3ZlcnJpZGVTeW1ib2woQWRhcHRlck5hbWUpXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBleGNoYW5nZXMgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuZXhjaGFuZ2VzXG4gIGNvbnN0IHJlc3VsdFBhdGggPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEucmVzdWx0UGF0aFxuXG4gIGNvbnN0IHVybCA9IGAvcHJpY2VzL3Jlc3RyaWN0ZWRgXG5cbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIGN1cnJlbmN5OiBzeW1ib2wsXG4gICAga2V5OiBjb25maWcuYXBpS2V5LFxuICAgIGV4Y2hhbmdlczogZXhjaGFuZ2VzLFxuICB9XG4gIGNvbnN0IHJlcUNvbmZpZyA9IHtcbiAgICAuLi5jb25maWcuYXBpLFxuICAgIHVybCxcbiAgICBwYXJhbXMsXG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KHJlcUNvbmZpZywgY3VzdG9tRXJyb3IpXG5cbiAgY29uc3QgcmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIHJlc3VsdFBhdGgpXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgUmVxdWVzdGVyLndpdGhSZXN1bHQocmVzcG9uc2UsIHJlc3VsdCksIGNvbmZpZy52ZXJib3NlKVxufVxuIl19