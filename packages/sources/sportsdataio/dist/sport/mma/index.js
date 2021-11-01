"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../../config");
const endpoint_1 = require("./endpoint");
exports.NAME = 'mma';
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
        case endpoint_1.schedule.NAME: {
            return await endpoint_1.schedule.execute(request, context, config);
        }
        case endpoint_1.event.NAME: {
            return await endpoint_1.event.execute(request, context, config);
        }
        case endpoint_1.fight.NAME: {
            return await endpoint_1.fight.execute(request, context, config);
        }
        case endpoint_1.leagues.NAME: {
            return await endpoint_1.leagues.execute(request, context, config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3BvcnQvbW1hL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUFpRTtBQUVqRSx5Q0FBeUM7QUFDekMseUNBQTREO0FBRS9DLFFBQUEsSUFBSSxHQUFHLEtBQUssQ0FBQTtBQUV6QixNQUFNLFdBQVcsR0FBRztJQUNsQixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbkYsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUVsRCxRQUFRLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUM5QixLQUFLLG1CQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsT0FBTyxNQUFNLG1CQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDeEQ7UUFDRCxLQUFLLGdCQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZixPQUFPLE1BQU0sZ0JBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUNyRDtRQUNELEtBQUssZ0JBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNmLE9BQU8sTUFBTSxnQkFBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ3JEO1FBQ0QsS0FBSyxrQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sTUFBTSxrQkFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ3ZEO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDUCxNQUFNLElBQUksMkJBQVksQ0FBQztnQkFDckIsUUFBUTtnQkFDUixPQUFPLEVBQUUsWUFBWSxRQUFRLGlCQUFpQjtnQkFDOUMsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFBO1NBQ0g7S0FDRjtBQUNILENBQUMsQ0FBQTtBQTVCWSxRQUFBLE9BQU8sV0E0Qm5CO0FBRU0sTUFBTSxXQUFXLEdBQTJCLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDNUQsT0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLG1CQUFVLEVBQUUsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQTtBQUZZLFFBQUEsV0FBVyxlQUV2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkYXB0ZXJFcnJvciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcsIEV4ZWN1dGVGYWN0b3J5LCBFeGVjdXRlV2l0aENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBtYWtlQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnJ1xuaW1wb3J0IHsgc2NoZWR1bGUsIGV2ZW50LCBmaWdodCwgbGVhZ3VlcyB9IGZyb20gJy4vZW5kcG9pbnQnXG5cbmV4cG9ydCBjb25zdCBOQU1FID0gJ21tYSdcblxuY29uc3QgaW5wdXRQYXJhbXMgPSB7XG4gIGVuZHBvaW50OiB0cnVlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtcylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IGVuZHBvaW50ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmVuZHBvaW50XG5cbiAgc3dpdGNoIChlbmRwb2ludC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSBzY2hlZHVsZS5OQU1FOiB7XG4gICAgICByZXR1cm4gYXdhaXQgc2NoZWR1bGUuZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpXG4gICAgfVxuICAgIGNhc2UgZXZlbnQuTkFNRToge1xuICAgICAgcmV0dXJuIGF3YWl0IGV2ZW50LmV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKVxuICAgIH1cbiAgICBjYXNlIGZpZ2h0Lk5BTUU6IHtcbiAgICAgIHJldHVybiBhd2FpdCBmaWdodC5leGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZylcbiAgICB9XG4gICAgY2FzZSBsZWFndWVzLk5BTUU6IHtcbiAgICAgIHJldHVybiBhd2FpdCBsZWFndWVzLmV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKVxuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgICAgam9iUnVuSUQsXG4gICAgICAgIG1lc3NhZ2U6IGBFbmRwb2ludCAke2VuZHBvaW50fSBub3Qgc3VwcG9ydGVkLmAsXG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZTogRXhlY3V0ZUZhY3Rvcnk8Q29uZmlnPiA9IChjb25maWcpID0+IHtcbiAgcmV0dXJuIGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0KSA9PiBleGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZyB8fCBtYWtlQ29uZmlnKCkpXG59XG4iXX0=