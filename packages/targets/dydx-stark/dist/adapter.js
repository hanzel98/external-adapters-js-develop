"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const endpoint_1 = require("./endpoint");
const inputParams = {
    endpoint: false,
};
const execute = async (request, context, config) => {
    const validator = new ea_bootstrap_1.Validator(request, inputParams);
    if (validator.error)
        throw validator.error;
    ea_bootstrap_1.Requester.logConfig(config);
    const jobRunID = validator.validated.id;
    const endpoint = validator.validated.data.endpoint || config_1.DEFAULT_ENDPOINT;
    switch (endpoint) {
        case endpoint_1.send.NAME: {
            return await endpoint_1.send.execute(request, context, config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE0RTtBQUU1RSxxQ0FBK0Q7QUFDL0QseUNBQWlDO0FBRWpDLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbkYsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLHdCQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRTNCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSx5QkFBZ0IsQ0FBQTtJQUV0RSxRQUFRLFFBQVEsRUFBRTtRQUNoQixLQUFLLGVBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNkLE9BQU8sTUFBTSxlQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDcEQ7UUFDRCxPQUFPLENBQUMsQ0FBQztZQUNQLE1BQU0sSUFBSSwyQkFBWSxDQUFDO2dCQUNyQixRQUFRO2dCQUNSLE9BQU8sRUFBRSxZQUFZLFFBQVEsaUJBQWlCO2dCQUM5QyxVQUFVLEVBQUUsR0FBRzthQUNoQixDQUFDLENBQUE7U0FDSDtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBckJZLFFBQUEsT0FBTyxXQXFCbkI7QUFFTSxNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUM1RCxPQUFPLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQVUsRUFBRSxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IsIEFkYXB0ZXJFcnJvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIEV4ZWN1dGVGYWN0b3J5IH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IENvbmZpZywgbWFrZUNvbmZpZywgREVGQVVMVF9FTkRQT0lOVCB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgc2VuZCB9IGZyb20gJy4vZW5kcG9pbnQnXG5cbmNvbnN0IGlucHV0UGFyYW1zID0ge1xuICBlbmRwb2ludDogZmFsc2UsXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKHJlcXVlc3QsIGlucHV0UGFyYW1zKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBSZXF1ZXN0ZXIubG9nQ29uZmlnKGNvbmZpZylcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgZW5kcG9pbnQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuZW5kcG9pbnQgfHwgREVGQVVMVF9FTkRQT0lOVFxuXG4gIHN3aXRjaCAoZW5kcG9pbnQpIHtcbiAgICBjYXNlIHNlbmQuTkFNRToge1xuICAgICAgcmV0dXJuIGF3YWl0IHNlbmQuZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpXG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3Ioe1xuICAgICAgICBqb2JSdW5JRCxcbiAgICAgICAgbWVzc2FnZTogYEVuZHBvaW50ICR7ZW5kcG9pbnR9IG5vdCBzdXBwb3J0ZWQuYCxcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VFeGVjdXRlOiBFeGVjdXRlRmFjdG9yeTxDb25maWc+ID0gKGNvbmZpZykgPT4ge1xuICByZXR1cm4gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQpID0+IGV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnIHx8IG1ha2VDb25maWcoKSlcbn1cbiJdfQ==