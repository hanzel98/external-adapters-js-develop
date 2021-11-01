"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['closing', 'eod'];
const customError = (data) => data.Response === 'Error';
exports.inputParameters = {
    base: ['base', 'from', 'coin', 'market', 'symbol'],
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const symbol = validator.overrideSymbol(config_1.NAME).toUpperCase();
    const url = `eod`;
    const params = {
        symbol,
        apikey: config.apiKey,
    };
    const options = {
        ...config.api,
        params,
        url,
    };
    const response = await ea_bootstrap_1.Requester.request(options, customError);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, ['close']);
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9jbG9zaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE4RDtBQUU5RCxzQ0FBK0M7QUFFbEMsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUVwRCxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUE7QUFFL0MsUUFBQSxlQUFlLEdBQW9CO0lBQzlDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7Q0FDbkQsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sTUFBTSxHQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsYUFBVyxDQUFZLENBQUMsV0FBVyxFQUFFLENBQUE7SUFFOUUsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFBO0lBQ2pCLE1BQU0sTUFBTSxHQUFHO1FBQ2IsTUFBTTtRQUNOLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtLQUN0QixDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUc7UUFDZCxHQUFHLE1BQU0sQ0FBQyxHQUFHO1FBQ2IsTUFBTTtRQUNOLEdBQUc7S0FDSixDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDOUQsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUUvRSxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlELENBQUMsQ0FBQTtBQXZCWSxRQUFBLE9BQU8sV0F1Qm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEV4ZWN1dGVXaXRoQ29uZmlnLCBDb25maWcsIElucHV0UGFyYW1ldGVycyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBOQU1FIGFzIEFkYXB0ZXJOYW1lIH0gZnJvbSAnLi4vY29uZmlnJ1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWydjbG9zaW5nJywgJ2VvZCddXG5cbmNvbnN0IGN1c3RvbUVycm9yID0gKGRhdGE6IGFueSkgPT4gZGF0YS5SZXNwb25zZSA9PT0gJ0Vycm9yJ1xuXG5leHBvcnQgY29uc3QgaW5wdXRQYXJhbWV0ZXJzOiBJbnB1dFBhcmFtZXRlcnMgPSB7XG4gIGJhc2U6IFsnYmFzZScsICdmcm9tJywgJ2NvaW4nLCAnbWFya2V0JywgJ3N5bWJvbCddLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBzeW1ib2wgPSAodmFsaWRhdG9yLm92ZXJyaWRlU3ltYm9sKEFkYXB0ZXJOYW1lKSBhcyBzdHJpbmcpLnRvVXBwZXJDYXNlKClcblxuICBjb25zdCB1cmwgPSBgZW9kYFxuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgc3ltYm9sLFxuICAgIGFwaWtleTogY29uZmlnLmFwaUtleSxcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICBwYXJhbXMsXG4gICAgdXJsLFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChvcHRpb25zLCBjdXN0b21FcnJvcilcbiAgcmVzcG9uc2UuZGF0YS5yZXN1bHQgPSBSZXF1ZXN0ZXIudmFsaWRhdGVSZXN1bHROdW1iZXIocmVzcG9uc2UuZGF0YSwgWydjbG9zZSddKVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIGNvbmZpZy52ZXJib3NlKVxufVxuIl19