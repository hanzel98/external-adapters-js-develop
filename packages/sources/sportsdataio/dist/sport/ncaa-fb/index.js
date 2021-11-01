"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../../config");
const endpoint_1 = require("./endpoint");
exports.NAME = 'ncaa-fb';
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
        case endpoint_1.currentSeason.NAME: {
            return await endpoint_1.currentSeason.execute(request, context, config);
        }
        case 'schedule':
        case endpoint_1.scores.NAME: {
            return await endpoint_1.scores.execute(request, context, config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3BvcnQvbmNhYS1mYi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBaUU7QUFFakUseUNBQXlDO0FBQ3pDLHlDQUFrRDtBQUVyQyxRQUFBLElBQUksR0FBRyxTQUFTLENBQUE7QUFFN0IsTUFBTSxXQUFXLEdBQUc7SUFDbEIsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ25GLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDckQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7SUFFbEQsUUFBUSxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDOUIsS0FBSyx3QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sTUFBTSx3QkFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQzdEO1FBQ0QsS0FBSyxVQUFVLENBQUM7UUFDaEIsS0FBSyxpQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sTUFBTSxpQkFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ3REO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDUCxNQUFNLElBQUksMkJBQVksQ0FBQztnQkFDckIsUUFBUTtnQkFDUixPQUFPLEVBQUUsWUFBWSxRQUFRLGlCQUFpQjtnQkFDOUMsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFBO1NBQ0g7S0FDRjtBQUNILENBQUMsQ0FBQTtBQXZCWSxRQUFBLE9BQU8sV0F1Qm5CO0FBRU0sTUFBTSxXQUFXLEdBQTJCLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDNUQsT0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLG1CQUFVLEVBQUUsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQTtBQUZZLFFBQUEsV0FBVyxlQUV2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkYXB0ZXJFcnJvciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcsIEV4ZWN1dGVGYWN0b3J5LCBFeGVjdXRlV2l0aENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBtYWtlQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnJ1xuaW1wb3J0IHsgY3VycmVudFNlYXNvbiwgc2NvcmVzIH0gZnJvbSAnLi9lbmRwb2ludCdcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnbmNhYS1mYidcblxuY29uc3QgaW5wdXRQYXJhbXMgPSB7XG4gIGVuZHBvaW50OiB0cnVlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtcylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IGVuZHBvaW50ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmVuZHBvaW50XG5cbiAgc3dpdGNoIChlbmRwb2ludC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSBjdXJyZW50U2Vhc29uLk5BTUU6IHtcbiAgICAgIHJldHVybiBhd2FpdCBjdXJyZW50U2Vhc29uLmV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKVxuICAgIH1cbiAgICBjYXNlICdzY2hlZHVsZSc6XG4gICAgY2FzZSBzY29yZXMuTkFNRToge1xuICAgICAgcmV0dXJuIGF3YWl0IHNjb3Jlcy5leGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZylcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgdGhyb3cgbmV3IEFkYXB0ZXJFcnJvcih7XG4gICAgICAgIGpvYlJ1bklELFxuICAgICAgICBtZXNzYWdlOiBgRW5kcG9pbnQgJHtlbmRwb2ludH0gbm90IHN1cHBvcnRlZC5gLFxuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUV4ZWN1dGU6IEV4ZWN1dGVGYWN0b3J5PENvbmZpZz4gPSAoY29uZmlnKSA9PiB7XG4gIHJldHVybiBhc3luYyAocmVxdWVzdCwgY29udGV4dCkgPT4gZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcgfHwgbWFrZUNvbmZpZygpKVxufVxuIl19