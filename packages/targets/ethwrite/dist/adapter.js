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
        case endpoint_1.txsend.NAME: {
            return await endpoint_1.txsend.execute(request, context, config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE0RTtBQUU1RSxxQ0FBK0Q7QUFDL0QseUNBQW1DO0FBRW5DLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbkYsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLHdCQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRTNCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSx5QkFBZ0IsQ0FBQTtJQUV0RSxRQUFRLFFBQVEsRUFBRTtRQUNoQixLQUFLLGlCQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsT0FBTyxNQUFNLGlCQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDdEQ7UUFDRCxPQUFPLENBQUMsQ0FBQztZQUNQLE1BQU0sSUFBSSwyQkFBWSxDQUFDO2dCQUNyQixRQUFRO2dCQUNSLE9BQU8sRUFBRSxZQUFZLFFBQVEsaUJBQWlCO2dCQUM5QyxVQUFVLEVBQUUsR0FBRzthQUNoQixDQUFDLENBQUE7U0FDSDtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBckJZLFFBQUEsT0FBTyxXQXFCbkI7QUFFTSxNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUM1RCxPQUFPLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQVUsRUFBRSxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IsIEFkYXB0ZXJFcnJvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIEV4ZWN1dGVGYWN0b3J5IH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IG1ha2VDb25maWcsIERFRkFVTFRfRU5EUE9JTlQsIENvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgdHhzZW5kIH0gZnJvbSAnLi9lbmRwb2ludCdcblxuY29uc3QgaW5wdXRQYXJhbXMgPSB7XG4gIGVuZHBvaW50OiBmYWxzZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIFJlcXVlc3Rlci5sb2dDb25maWcoY29uZmlnKVxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBlbmRwb2ludCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5lbmRwb2ludCB8fCBERUZBVUxUX0VORFBPSU5UXG5cbiAgc3dpdGNoIChlbmRwb2ludCkge1xuICAgIGNhc2UgdHhzZW5kLk5BTUU6IHtcbiAgICAgIHJldHVybiBhd2FpdCB0eHNlbmQuZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpXG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3Ioe1xuICAgICAgICBqb2JSdW5JRCxcbiAgICAgICAgbWVzc2FnZTogYEVuZHBvaW50ICR7ZW5kcG9pbnR9IG5vdCBzdXBwb3J0ZWQuYCxcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VFeGVjdXRlOiBFeGVjdXRlRmFjdG9yeTxDb25maWc+ID0gKGNvbmZpZykgPT4ge1xuICByZXR1cm4gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQpID0+IGV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnIHx8IG1ha2VDb25maWcoKSlcbn1cbiJdfQ==