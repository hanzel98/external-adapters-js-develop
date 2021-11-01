"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.endpointResultPaths = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['globalmarketcap', 'dominance'];
exports.endpointResultPaths = {
    globalmarketcap: 'total_market_cap',
    dominance: 'market_cap_percentage',
};
const customError = (data) => {
    if (Object.keys(data).length === 0)
        return true;
    return false;
};
exports.inputParameters = {
    market: ['quote', 'to', 'market', 'coin'],
    resultPath: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const market = validator.validated.data.market.toLowerCase();
    const resultPath = validator.validated.data.resultPath;
    const url = '/global';
    const options = {
        ...config.api,
        url,
        params: {
            x_cg_pro_api_key: config.apiKey,
        },
    };
    const response = await ea_bootstrap_1.Requester.request(options, customError);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, ['data', resultPath, market]);
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2dsb2JhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEQ7QUFHakQsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0FBRXJELFFBQUEsbUJBQW1CLEdBQUc7SUFDakMsZUFBZSxFQUFFLGtCQUFrQjtJQUNuQyxTQUFTLEVBQUUsdUJBQXVCO0NBQ25DLENBQUE7QUFFRCxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO0lBQ2hDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBQy9DLE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBO0FBRVksUUFBQSxlQUFlLEdBQW9CO0lBQzlDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztJQUN6QyxVQUFVLEVBQUUsS0FBSztDQUNsQixDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsdUJBQWUsQ0FBQyxDQUFBO0lBQ3pELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFDMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzVELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUV0RCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUE7SUFFckIsTUFBTSxPQUFPLEdBQUc7UUFDZCxHQUFHLE1BQU0sQ0FBQyxHQUFHO1FBQ2IsR0FBRztRQUNILE1BQU0sRUFBRTtZQUNOLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ2hDO0tBQ0YsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzlELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLHdCQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUVsRyxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlELENBQUMsQ0FBQTtBQXJCWSxRQUFBLE9BQU8sV0FxQm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IENvbmZpZywgRXhlY3V0ZVdpdGhDb25maWcsIElucHV0UGFyYW1ldGVycyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ2dsb2JhbG1hcmtldGNhcCcsICdkb21pbmFuY2UnXVxuXG5leHBvcnQgY29uc3QgZW5kcG9pbnRSZXN1bHRQYXRocyA9IHtcbiAgZ2xvYmFsbWFya2V0Y2FwOiAndG90YWxfbWFya2V0X2NhcCcsXG4gIGRvbWluYW5jZTogJ21hcmtldF9jYXBfcGVyY2VudGFnZScsXG59XG5cbmNvbnN0IGN1c3RvbUVycm9yID0gKGRhdGE6IGFueSkgPT4ge1xuICBpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBtYXJrZXQ6IFsncXVvdGUnLCAndG8nLCAnbWFya2V0JywgJ2NvaW4nXSxcbiAgcmVzdWx0UGF0aDogZmFsc2UsXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIF8sIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKHJlcXVlc3QsIGlucHV0UGFyYW1ldGVycylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBtYXJrZXQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEubWFya2V0LnRvTG93ZXJDYXNlKClcbiAgY29uc3QgcmVzdWx0UGF0aCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5yZXN1bHRQYXRoXG5cbiAgY29uc3QgdXJsID0gJy9nbG9iYWwnXG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5jb25maWcuYXBpLFxuICAgIHVybCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIHhfY2dfcHJvX2FwaV9rZXk6IGNvbmZpZy5hcGlLZXksXG4gICAgfSxcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3Qob3B0aW9ucywgY3VzdG9tRXJyb3IpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFsnZGF0YScsIHJlc3VsdFBhdGgsIG1hcmtldF0pXG5cbiAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGpvYlJ1bklELCByZXNwb25zZSwgY29uZmlnLnZlcmJvc2UpXG59XG4iXX0=