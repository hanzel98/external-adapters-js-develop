"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['values', 'crypto', 'price'];
exports.inputParameters = {
    index: true,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const id = validator.overrideSymbol(config_1.NAME, validator.validated.data.index);
    const url = `/v1/values`;
    const params = {
        id,
    };
    const reqConfig = { ...config.api, params, url };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    const values = response.data.payload.sort((a, b) => {
        if (a.time < b.time)
            return 1;
        if (a.time > b.time)
            return -1;
        return 0;
    });
    const result = ea_bootstrap_1.Requester.validateResultNumber(values, [0, 'value']);
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, result), config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L3ZhbHVlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEQ7QUFFOUQsc0NBQWdDO0FBRW5CLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBRWxELFFBQUEsZUFBZSxHQUFvQjtJQUM5QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUE7QUFXTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDN0UsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSx1QkFBZSxDQUFDLENBQUE7SUFDekQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLGFBQUksRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN6RSxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUE7SUFFeEIsTUFBTSxNQUFNLEdBQUc7UUFDYixFQUFFO0tBQ0gsQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUVoRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFpQixTQUFTLENBQUMsQ0FBQTtJQUVuRSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJO1lBQUUsT0FBTyxDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJO1lBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUM5QixPQUFPLENBQUMsQ0FBQTtJQUNWLENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNuRSxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSx3QkFBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzVGLENBQUMsQ0FBQTtBQXhCWSxRQUFBLE9BQU8sV0F3Qm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEV4ZWN1dGVXaXRoQ29uZmlnLCBDb25maWcsIElucHV0UGFyYW1ldGVycyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBOQU1FIH0gZnJvbSAnLi4vY29uZmlnJ1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWyd2YWx1ZXMnLCAnY3J5cHRvJywgJ3ByaWNlJ11cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBpbmRleDogdHJ1ZSxcbn1cblxuaW50ZXJmYWNlIFBheWxvYWRWYWx1ZSB7XG4gIHZhbHVlOiBzdHJpbmdcbiAgdGltZTogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uc2VTY2hlbWEge1xuICBwYXlsb2FkOiBQYXlsb2FkVmFsdWVbXVxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBpZCA9IHZhbGlkYXRvci5vdmVycmlkZVN5bWJvbChOQU1FLCB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuaW5kZXgpXG4gIGNvbnN0IHVybCA9IGAvdjEvdmFsdWVzYFxuXG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBpZCxcbiAgfVxuXG4gIGNvbnN0IHJlcUNvbmZpZyA9IHsgLi4uY29uZmlnLmFwaSwgcGFyYW1zLCB1cmwgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3Q8UmVzcG9uc2VTY2hlbWE+KHJlcUNvbmZpZylcblxuICBjb25zdCB2YWx1ZXMgPSByZXNwb25zZS5kYXRhLnBheWxvYWQuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChhLnRpbWUgPCBiLnRpbWUpIHJldHVybiAxXG4gICAgaWYgKGEudGltZSA+IGIudGltZSkgcmV0dXJuIC0xXG4gICAgcmV0dXJuIDBcbiAgfSlcblxuICBjb25zdCByZXN1bHQgPSBSZXF1ZXN0ZXIudmFsaWRhdGVSZXN1bHROdW1iZXIodmFsdWVzLCBbMCwgJ3ZhbHVlJ10pXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgUmVxdWVzdGVyLndpdGhSZXN1bHQocmVzcG9uc2UsIHJlc3VsdCksIGNvbmZpZy52ZXJib3NlKVxufVxuIl19