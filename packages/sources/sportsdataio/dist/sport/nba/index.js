"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../../config");
const endpoint_1 = require("./endpoint");
exports.NAME = 'nba';
const inputParams = {
    endpoint: true,
};
const execute = async (request, context, config) => {
    const validator = new ea_bootstrap_1.Validator(request, inputParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const endpoint = validator.validated.data.endpoint;
    switch (endpoint.toLowerCase()) {
        case endpoint_1.playerStats.NAME: {
            return await endpoint_1.playerStats.execute(request, context, config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3BvcnQvbmJhL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUFpRTtBQUVqRSx5Q0FBeUM7QUFDekMseUNBQXdDO0FBRTNCLFFBQUEsSUFBSSxHQUFHLEtBQUssQ0FBQTtBQUV6QixNQUFNLFdBQVcsR0FBRztJQUNsQixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbkYsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUVsRCxRQUFRLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUM5QixLQUFLLHNCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsT0FBTyxNQUFNLHNCQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDM0Q7UUFDRCxPQUFPLENBQUMsQ0FBQztZQUNQLE1BQU0sSUFBSSwyQkFBWSxDQUFDO2dCQUNyQixRQUFRO2dCQUNSLE9BQU8sRUFBRSxZQUFZLFFBQVEsaUJBQWlCO2dCQUM5QyxVQUFVLEVBQUUsR0FBRzthQUNoQixDQUFDLENBQUE7U0FDSDtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBbkJZLFFBQUEsT0FBTyxXQW1CbkI7QUFFTSxNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUM1RCxPQUFPLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQVUsRUFBRSxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRhcHRlckVycm9yLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IENvbmZpZywgRXhlY3V0ZUZhY3RvcnksIEV4ZWN1dGVXaXRoQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IG1ha2VDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWcnXG5pbXBvcnQgeyBwbGF5ZXJTdGF0cyB9IGZyb20gJy4vZW5kcG9pbnQnXG5cbmV4cG9ydCBjb25zdCBOQU1FID0gJ25iYSdcblxuY29uc3QgaW5wdXRQYXJhbXMgPSB7XG4gIGVuZHBvaW50OiB0cnVlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtcylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IGVuZHBvaW50ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmVuZHBvaW50XG5cbiAgc3dpdGNoIChlbmRwb2ludC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSBwbGF5ZXJTdGF0cy5OQU1FOiB7XG4gICAgICByZXR1cm4gYXdhaXQgcGxheWVyU3RhdHMuZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpXG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3Ioe1xuICAgICAgICBqb2JSdW5JRCxcbiAgICAgICAgbWVzc2FnZTogYEVuZHBvaW50ICR7ZW5kcG9pbnR9IG5vdCBzdXBwb3J0ZWQuYCxcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VFeGVjdXRlOiBFeGVjdXRlRmFjdG9yeTxDb25maWc+ID0gKGNvbmZpZykgPT4ge1xuICByZXR1cm4gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQpID0+IGV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnIHx8IG1ha2VDb25maWcoKSlcbn1cbiJdfQ==