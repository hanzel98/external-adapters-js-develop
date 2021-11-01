"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const customParams = {
    symbol: ['base', 'from', 'coin', 'symbol'],
    days: ['days', 'period', 'result', 'key'],
};
const daysConversion = {
    1: 'oneDayIv',
    2: 'twoDayIv',
    7: 'sevenDayIv',
    14: 'fourteenDayIv',
    21: 'twentyOneDayIv',
    28: 'twentyEightDayIv',
};
// TODO: Run tests with valid pro tier + API Key
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, customParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const url = '/graphql';
    const symbol = validator.validated.data.symbol.toUpperCase();
    const daysInput = validator.validated.data.days;
    const days = daysConversion[daysInput] || daysInput;
    const query = 'query ChainlinkIv($symbol: SymbolEnumType){' +
        'ChainlinkIv(symbol: $symbol){' +
        'oneDayIv twoDayIv sevenDayIv fourteenDayIv twentyOneDayIv twentyEightDayIv' +
        '}' +
        '}';
    const data = {
        query: query,
        variables: { symbol },
    };
    const headers = {
        'x-oracle': config.apiKey,
    };
    const reqConfig = {
        ...config.api,
        url,
        method: 'GET',
        headers,
        data,
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, [
        'data',
        'ChainlinkIv',
        0,
        days,
    ]);
    return ea_bootstrap_1.Requester.success(jobRunID, response);
};
exports.execute = execute;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBEQUE4RDtBQUM5RCxxQ0FBcUM7QUFFckMsTUFBTSxZQUFZLEdBQUc7SUFDbkIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO0lBQzFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztDQUMxQyxDQUFBO0FBRUQsTUFBTSxjQUFjLEdBQTJCO0lBQzdDLENBQUMsRUFBRSxVQUFVO0lBQ2IsQ0FBQyxFQUFFLFVBQVU7SUFDYixDQUFDLEVBQUUsWUFBWTtJQUNmLEVBQUUsRUFBRSxlQUFlO0lBQ25CLEVBQUUsRUFBRSxnQkFBZ0I7SUFDcEIsRUFBRSxFQUFFLGtCQUFrQjtDQUN2QixDQUFBO0FBRUQsZ0RBQWdEO0FBQ3pDLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ3RELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFBO0lBQ3RCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUM1RCxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDL0MsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQTtJQUVuRCxNQUFNLEtBQUssR0FDVCw2Q0FBNkM7UUFDN0MsK0JBQStCO1FBQy9CLDRFQUE0RTtRQUM1RSxHQUFHO1FBQ0gsR0FBRyxDQUFBO0lBRUwsTUFBTSxJQUFJLEdBQUc7UUFDWCxLQUFLLEVBQUUsS0FBSztRQUNaLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRTtLQUN0QixDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUc7UUFDZCxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU07S0FDMUIsQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHO1FBQ2hCLEdBQUcsTUFBTSxDQUFDLEdBQUc7UUFDYixHQUFHO1FBQ0gsTUFBTSxFQUFFLEtBQVk7UUFDcEIsT0FBTztRQUNQLElBQUk7S0FDTCxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDbkUsTUFBTTtRQUNOLGFBQWE7UUFDYixDQUFDO1FBQ0QsSUFBSTtLQUNMLENBQUMsQ0FBQTtJQUNGLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQzlDLENBQUMsQ0FBQTtBQTFDWSxRQUFBLE9BQU8sV0EwQ25CO0FBRU0sTUFBTSxXQUFXLEdBQTJCLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDNUQsT0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLG1CQUFVLEVBQUUsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQTtBQUZZLFFBQUEsV0FBVyxlQUV2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZywgRXhlY3V0ZUZhY3RvcnksIEV4ZWN1dGVXaXRoQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBtYWtlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IGN1c3RvbVBhcmFtcyA9IHtcbiAgc3ltYm9sOiBbJ2Jhc2UnLCAnZnJvbScsICdjb2luJywgJ3N5bWJvbCddLFxuICBkYXlzOiBbJ2RheXMnLCAncGVyaW9kJywgJ3Jlc3VsdCcsICdrZXknXSxcbn1cblxuY29uc3QgZGF5c0NvbnZlcnNpb246IFJlY29yZDxudW1iZXIsIHN0cmluZz4gPSB7XG4gIDE6ICdvbmVEYXlJdicsXG4gIDI6ICd0d29EYXlJdicsXG4gIDc6ICdzZXZlbkRheUl2JyxcbiAgMTQ6ICdmb3VydGVlbkRheUl2JyxcbiAgMjE6ICd0d2VudHlPbmVEYXlJdicsXG4gIDI4OiAndHdlbnR5RWlnaHREYXlJdicsXG59XG5cbi8vIFRPRE86IFJ1biB0ZXN0cyB3aXRoIHZhbGlkIHBybyB0aWVyICsgQVBJIEtleVxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgY3VzdG9tUGFyYW1zKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgdXJsID0gJy9ncmFwaHFsJ1xuICBjb25zdCBzeW1ib2wgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuc3ltYm9sLnRvVXBwZXJDYXNlKClcbiAgY29uc3QgZGF5c0lucHV0ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmRheXNcbiAgY29uc3QgZGF5cyA9IGRheXNDb252ZXJzaW9uW2RheXNJbnB1dF0gfHwgZGF5c0lucHV0XG5cbiAgY29uc3QgcXVlcnkgPVxuICAgICdxdWVyeSBDaGFpbmxpbmtJdigkc3ltYm9sOiBTeW1ib2xFbnVtVHlwZSl7JyArXG4gICAgJ0NoYWlubGlua0l2KHN5bWJvbDogJHN5bWJvbCl7JyArXG4gICAgJ29uZURheUl2IHR3b0RheUl2IHNldmVuRGF5SXYgZm91cnRlZW5EYXlJdiB0d2VudHlPbmVEYXlJdiB0d2VudHlFaWdodERheUl2JyArXG4gICAgJ30nICtcbiAgICAnfSdcblxuICBjb25zdCBkYXRhID0ge1xuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICB2YXJpYWJsZXM6IHsgc3ltYm9sIH0sXG4gIH1cblxuICBjb25zdCBoZWFkZXJzID0ge1xuICAgICd4LW9yYWNsZSc6IGNvbmZpZy5hcGlLZXksXG4gIH1cblxuICBjb25zdCByZXFDb25maWcgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICB1cmwsXG4gICAgbWV0aG9kOiAnR0VUJyBhcyBhbnksXG4gICAgaGVhZGVycyxcbiAgICBkYXRhLFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChyZXFDb25maWcpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFtcbiAgICAnZGF0YScsXG4gICAgJ0NoYWlubGlua0l2JyxcbiAgICAwLFxuICAgIGRheXMsXG4gIF0pXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UpXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZTogRXhlY3V0ZUZhY3Rvcnk8Q29uZmlnPiA9IChjb25maWcpID0+IHtcbiAgcmV0dXJuIGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0KSA9PiBleGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZyB8fCBtYWtlQ29uZmlnKCkpXG59XG4iXX0=