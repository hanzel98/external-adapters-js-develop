"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.makeConfig = exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const customParams = {
    market: false,
};
const endpoints = {
    brent: 'api',
    wti: 'api/index_cl',
};
const execute = async (input, _, config) => {
    const validator = new ea_bootstrap_1.Validator(input, customParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const market = validator.validated.data.market || 'brent';
    const url = `https://fpiw7f0axc.execute-api.us-east-1.amazonaws.com/${endpoints[market.toLowerCase()]}`;
    const auth = {
        username: '',
        password: config.apiKey || '',
    };
    const reqConfig = {
        ...config.api,
        url,
        auth,
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, ['index']);
    return ea_bootstrap_1.Requester.success(jobRunID, response);
};
exports.execute = execute;
const makeConfig = (prefix) => ea_bootstrap_1.Requester.getDefaultConfig(prefix, true);
exports.makeConfig = makeConfig;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || exports.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBEQUE4RDtBQUU5RCxNQUFNLFlBQVksR0FBRztJQUNuQixNQUFNLEVBQUUsS0FBSztDQUNkLENBQUE7QUFFRCxNQUFNLFNBQVMsR0FBMkI7SUFDeEMsS0FBSyxFQUFFLEtBQUs7SUFDWixHQUFHLEVBQUUsY0FBYztDQUNwQixDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzNFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDcEQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFBO0lBQ3pELE1BQU0sR0FBRyxHQUFHLDBEQUNWLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQ2hDLEVBQUUsQ0FBQTtJQUVGLE1BQU0sSUFBSSxHQUFHO1FBQ1gsUUFBUSxFQUFFLEVBQUU7UUFDWixRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFO0tBQzlCLENBQUE7SUFFRCxNQUFNLFNBQVMsR0FBRztRQUNoQixHQUFHLE1BQU0sQ0FBQyxHQUFHO1FBQ2IsR0FBRztRQUNILElBQUk7S0FDTCxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQy9FLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQzlDLENBQUMsQ0FBQTtBQXhCWSxRQUFBLE9BQU8sV0F3Qm5CO0FBRU0sTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFlLEVBQVUsRUFBRSxDQUFDLHdCQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQWxGLFFBQUEsVUFBVSxjQUF3RTtBQUV4RixNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUM1RCxPQUFPLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQVUsRUFBRSxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnLCBFeGVjdXRlRmFjdG9yeSwgRXhlY3V0ZVdpdGhDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcblxuY29uc3QgY3VzdG9tUGFyYW1zID0ge1xuICBtYXJrZXQ6IGZhbHNlLFxufVxuXG5jb25zdCBlbmRwb2ludHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIGJyZW50OiAnYXBpJyxcbiAgd3RpOiAnYXBpL2luZGV4X2NsJyxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAoaW5wdXQsIF8sIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKGlucHV0LCBjdXN0b21QYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBtYXJrZXQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEubWFya2V0IHx8ICdicmVudCdcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vZnBpdzdmMGF4Yy5leGVjdXRlLWFwaS51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS8ke1xuICAgIGVuZHBvaW50c1ttYXJrZXQudG9Mb3dlckNhc2UoKV1cbiAgfWBcblxuICBjb25zdCBhdXRoID0ge1xuICAgIHVzZXJuYW1lOiAnJyxcbiAgICBwYXNzd29yZDogY29uZmlnLmFwaUtleSB8fCAnJyxcbiAgfVxuXG4gIGNvbnN0IHJlcUNvbmZpZyA9IHtcbiAgICAuLi5jb25maWcuYXBpLFxuICAgIHVybCxcbiAgICBhdXRoLFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChyZXFDb25maWcpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFsnaW5kZXgnXSlcbiAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGpvYlJ1bklELCByZXNwb25zZSlcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4Pzogc3RyaW5nKTogQ29uZmlnID0+IFJlcXVlc3Rlci5nZXREZWZhdWx0Q29uZmlnKHByZWZpeCwgdHJ1ZSlcblxuZXhwb3J0IGNvbnN0IG1ha2VFeGVjdXRlOiBFeGVjdXRlRmFjdG9yeTxDb25maWc+ID0gKGNvbmZpZykgPT4ge1xuICByZXR1cm4gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQpID0+IGV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnIHx8IG1ha2VDb25maWcoKSlcbn1cbiJdfQ==