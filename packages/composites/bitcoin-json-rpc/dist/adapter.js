"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = void 0;
const tslib_1 = require("tslib");
const json_rpc_adapter_1 = tslib_1.__importDefault(require("@chainlink/json-rpc-adapter"));
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
        case 'difficulty':
        case endpoint_1.getblockchaininfo.NAME: {
            return endpoint_1.getblockchaininfo.execute(request, context, config);
        }
        case endpoint_1.scantxoutset.NAME: {
            return endpoint_1.scantxoutset.execute(request, context, config);
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
    return async (request, context) => exports.execute(request, context, config || json_rpc_adapter_1.default.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwyRkFBaUQ7QUFFakQsMERBQWlFO0FBQ2pFLHFDQUEyQztBQUMzQyx5Q0FBNEQ7QUFFNUQsTUFBTSxXQUFXLEdBQUc7SUFDbEIsUUFBUSxFQUFFLEtBQUs7Q0FDaEIsQ0FBQTtBQUVELG1EQUFtRDtBQUM1QyxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbkYsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSx5QkFBZ0IsQ0FBQTtJQUN0RSxRQUFRLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUM5QixLQUFLLFlBQVksQ0FBQztRQUNsQixLQUFLLDRCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLE9BQU8sNEJBQWlCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDM0Q7UUFDRCxLQUFLLHVCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsT0FBTyx1QkFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ3REO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDUCxNQUFNLElBQUksMkJBQVksQ0FBQztnQkFDckIsUUFBUTtnQkFDUixPQUFPLEVBQUUsWUFBWSxRQUFRLGlCQUFpQjtnQkFDOUMsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFBO1NBQ0g7S0FDRjtBQUNILENBQUMsQ0FBQTtBQXRCWSxRQUFBLE9BQU8sV0FzQm5CO0FBRU0sTUFBTSxXQUFXLEdBQTJCLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDNUQsT0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtBQUM5RixDQUFDLENBQUE7QUFGWSxRQUFBLFdBQVcsZUFFdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNPTlJQQyBmcm9tICdAY2hhaW5saW5rL2pzb24tcnBjLWFkYXB0ZXInXG5pbXBvcnQgeyBDb25maWcsIEV4ZWN1dGVXaXRoQ29uZmlnLCBFeGVjdXRlRmFjdG9yeSB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFkYXB0ZXJFcnJvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgREVGQVVMVF9FTkRQT0lOVCB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgZ2V0YmxvY2tjaGFpbmluZm8sIHNjYW50eG91dHNldCB9IGZyb20gJy4vZW5kcG9pbnQnXG5cbmNvbnN0IGlucHV0UGFyYW1zID0ge1xuICBlbmRwb2ludDogZmFsc2UsXG59XG5cbi8vIEV4cG9ydCBmdW5jdGlvbiB0byBpbnRlZ3JhdGUgd2l0aCBDaGFpbmxpbmsgbm9kZVxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBlbmRwb2ludCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5lbmRwb2ludCB8fCBERUZBVUxUX0VORFBPSU5UXG4gIHN3aXRjaCAoZW5kcG9pbnQudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2RpZmZpY3VsdHknOlxuICAgIGNhc2UgZ2V0YmxvY2tjaGFpbmluZm8uTkFNRToge1xuICAgICAgcmV0dXJuIGdldGJsb2NrY2hhaW5pbmZvLmV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKVxuICAgIH1cbiAgICBjYXNlIHNjYW50eG91dHNldC5OQU1FOiB7XG4gICAgICByZXR1cm4gc2NhbnR4b3V0c2V0LmV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKVxuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgICAgam9iUnVuSUQsXG4gICAgICAgIG1lc3NhZ2U6IGBFbmRwb2ludCAke2VuZHBvaW50fSBub3Qgc3VwcG9ydGVkLmAsXG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZTogRXhlY3V0ZUZhY3Rvcnk8Q29uZmlnPiA9IChjb25maWcpID0+IHtcbiAgcmV0dXJuIGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0KSA9PiBleGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZyB8fCBKU09OUlBDLm1ha2VDb25maWcoKSlcbn1cbiJdfQ==