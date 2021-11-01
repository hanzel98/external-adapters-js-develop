"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const endpoint_1 = require("./endpoint");
const inputParams = {
    endpoint: false,
};
// Export function to integrate with Chainlink node
const execute = async (request, context, config) => {
    const validator = new ea_bootstrap_1.Validator(request, inputParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const endpoint = validator.validated.data.endpoint || config_1.DEFAULT_ENDPOINT;
    switch (endpoint.toLowerCase()) {
        case endpoint_1.format.NAME: {
            return endpoint_1.format.execute(request, context, config);
        }
        default: {
            throw new ea_bootstrap_1.AdapterError({
                jobRunID,
                message: `Endpoint ${endpoint} not supported.`,
                statusCode: 400,
            });
        }
    }
};
exports.execute = execute;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBEQUFpRTtBQUNqRSxxQ0FBdUU7QUFDdkUseUNBQW1DO0FBRW5DLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUE7QUFFRCxtREFBbUQ7QUFDNUMsTUFBTSxPQUFPLEdBQXNDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzNGLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDckQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUMxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUkseUJBQWdCLENBQUE7SUFDdEUsUUFBUSxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDOUIsS0FBSyxpQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLE9BQU8saUJBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUNoRDtRQUNELE9BQU8sQ0FBQyxDQUFDO1lBQ1AsTUFBTSxJQUFJLDJCQUFZLENBQUM7Z0JBQ3JCLFFBQVE7Z0JBQ1IsT0FBTyxFQUFFLFlBQVksUUFBUSxpQkFBaUI7Z0JBQzlDLFVBQVUsRUFBRSxHQUFHO2FBQ2hCLENBQUMsQ0FBQTtTQUNIO0tBQ0Y7QUFDSCxDQUFDLENBQUE7QUFqQlksUUFBQSxPQUFPLFdBaUJuQjtBQUVNLE1BQU0sV0FBVyxHQUFtQyxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQ3BFLE9BQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxtQkFBVSxFQUFFLENBQUMsQ0FBQTtBQUN0RixDQUFDLENBQUE7QUFGWSxRQUFBLFdBQVcsZUFFdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeGVjdXRlRmFjdG9yeSwgRXhlY3V0ZVdpdGhDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBZGFwdGVyRXJyb3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IERFRkFVTFRfRU5EUE9JTlQsIG1ha2VDb25maWcsIEV4dGVuZGVkQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICcuL2VuZHBvaW50J1xuXG5jb25zdCBpbnB1dFBhcmFtcyA9IHtcbiAgZW5kcG9pbnQ6IGZhbHNlLFxufVxuXG4vLyBFeHBvcnQgZnVuY3Rpb24gdG8gaW50ZWdyYXRlIHdpdGggQ2hhaW5saW5rIG5vZGVcbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxFeHRlbmRlZENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgZW5kcG9pbnQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuZW5kcG9pbnQgfHwgREVGQVVMVF9FTkRQT0lOVFxuICBzd2l0Y2ggKGVuZHBvaW50LnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlIGZvcm1hdC5OQU1FOiB7XG4gICAgICByZXR1cm4gZm9ybWF0LmV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKVxuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgICAgam9iUnVuSUQsXG4gICAgICAgIG1lc3NhZ2U6IGBFbmRwb2ludCAke2VuZHBvaW50fSBub3Qgc3VwcG9ydGVkLmAsXG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZTogRXhlY3V0ZUZhY3Rvcnk8RXh0ZW5kZWRDb25maWc+ID0gKGNvbmZpZykgPT4ge1xuICByZXR1cm4gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQpID0+IGV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnIHx8IG1ha2VDb25maWcoKSlcbn1cbiJdfQ==