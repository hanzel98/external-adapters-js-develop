"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.endpointResultPaths = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['eod'];
exports.endpointResultPaths = {
    eod: 'close',
};
exports.inputParameters = {
    ticker: ['ticker', 'base', 'from', 'coin'],
    resultPath: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const ticker = validator.validated.data.ticker;
    const resultPath = validator.validated.data.resultPath;
    const url = `/tiingo/daily/${ticker.toLowerCase()}/prices`;
    const reqConfig = {
        ...config.api,
        params: {
            token: config.apiKey,
        },
        url,
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, [0, resultPath]);
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2VvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEQ7QUFHakQsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBRTVCLFFBQUEsbUJBQW1CLEdBQXdCO0lBQ3RELEdBQUcsRUFBRSxPQUFPO0NBQ2IsQ0FBQTtBQUVZLFFBQUEsZUFBZSxHQUFvQjtJQUM5QyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDMUMsVUFBVSxFQUFFLEtBQUs7Q0FDbEIsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUM5QyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDdEQsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLE1BQU0sQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFBO0lBRTFELE1BQU0sU0FBUyxHQUFHO1FBQ2hCLEdBQUcsTUFBTSxDQUFDLEdBQUc7UUFDYixNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU07U0FDckI7UUFDRCxHQUFHO0tBQ0osQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUE7SUFFckYsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM5RCxDQUFDLENBQUE7QUFyQlksUUFBQSxPQUFPLFdBcUJuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBFeGVjdXRlV2l0aENvbmZpZywgQ29uZmlnLCBJbnB1dFBhcmFtZXRlcnMsIEVuZHBvaW50UmVzdWx0UGF0aHMgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWydlb2QnXVxuXG5leHBvcnQgY29uc3QgZW5kcG9pbnRSZXN1bHRQYXRoczogRW5kcG9pbnRSZXN1bHRQYXRocyA9IHtcbiAgZW9kOiAnY2xvc2UnLFxufVxuXG5leHBvcnQgY29uc3QgaW5wdXRQYXJhbWV0ZXJzOiBJbnB1dFBhcmFtZXRlcnMgPSB7XG4gIHRpY2tlcjogWyd0aWNrZXInLCAnYmFzZScsICdmcm9tJywgJ2NvaW4nXSxcbiAgcmVzdWx0UGF0aDogZmFsc2UsXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIF8sIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKHJlcXVlc3QsIGlucHV0UGFyYW1ldGVycylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IHRpY2tlciA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS50aWNrZXJcbiAgY29uc3QgcmVzdWx0UGF0aCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5yZXN1bHRQYXRoXG4gIGNvbnN0IHVybCA9IGAvdGlpbmdvL2RhaWx5LyR7dGlja2VyLnRvTG93ZXJDYXNlKCl9L3ByaWNlc2BcblxuICBjb25zdCByZXFDb25maWcgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICBwYXJhbXM6IHtcbiAgICAgIHRva2VuOiBjb25maWcuYXBpS2V5LFxuICAgIH0sXG4gICAgdXJsLFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChyZXFDb25maWcpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFswLCByZXN1bHRQYXRoXSlcblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3BvbnNlLCBjb25maWcudmVyYm9zZSlcbn1cbiJdfQ==