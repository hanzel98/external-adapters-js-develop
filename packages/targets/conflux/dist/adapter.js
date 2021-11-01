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
        case endpoint_1.conflux.NAME: {
            return await endpoint_1.conflux.execute(request, context, config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE0RTtBQUU1RSxxQ0FBK0Q7QUFDL0QseUNBQW9DO0FBRXBDLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUNyRCxPQUFPLEVBQ1AsT0FBTyxFQUNQLE1BQU0sRUFDb0IsRUFBRTtJQUM1QixNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3JELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsd0JBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFM0IsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLHlCQUFnQixDQUFBO0lBRXRFLFFBQVEsUUFBUSxFQUFFO1FBQ2hCLEtBQUssa0JBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQixPQUFPLE1BQU0sa0JBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUN2RDtRQUNELE9BQU8sQ0FBQyxDQUFDO1lBQ1AsTUFBTSxJQUFJLDJCQUFZLENBQUM7Z0JBQ3JCLFFBQVE7Z0JBQ1IsT0FBTyxFQUFFLFlBQVksUUFBUSxpQkFBaUI7Z0JBQzlDLFVBQVUsRUFBRSxHQUFHO2FBQ2hCLENBQUMsQ0FBQTtTQUNIO0tBQ0Y7QUFDSCxDQUFDLENBQUE7QUF6QlksUUFBQSxPQUFPLFdBeUJuQjtBQUVNLE1BQU0sV0FBVyxHQUFHLENBQUMsTUFBZSxFQUFXLEVBQUU7SUFDdEQsT0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLG1CQUFVLEVBQUUsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQTtBQUZZLFFBQUEsV0FBVyxlQUV2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yLCBBZGFwdGVyRXJyb3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEV4ZWN1dGUsIEFkYXB0ZXJSZXNwb25zZSwgRXhlY3V0ZVdpdGhDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZywgREVGQVVMVF9FTkRQT0lOVCwgQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgeyBjb25mbHV4IH0gZnJvbSAnLi9lbmRwb2ludCdcblxuY29uc3QgaW5wdXRQYXJhbXMgPSB7XG4gIGVuZHBvaW50OiBmYWxzZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAoXG4gIHJlcXVlc3QsXG4gIGNvbnRleHQsXG4gIGNvbmZpZyxcbik6IFByb21pc2U8QWRhcHRlclJlc3BvbnNlPiA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIFJlcXVlc3Rlci5sb2dDb25maWcoY29uZmlnKVxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBlbmRwb2ludCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5lbmRwb2ludCB8fCBERUZBVUxUX0VORFBPSU5UXG5cbiAgc3dpdGNoIChlbmRwb2ludCkge1xuICAgIGNhc2UgY29uZmx1eC5OQU1FOiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29uZmx1eC5leGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZylcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgdGhyb3cgbmV3IEFkYXB0ZXJFcnJvcih7XG4gICAgICAgIGpvYlJ1bklELFxuICAgICAgICBtZXNzYWdlOiBgRW5kcG9pbnQgJHtlbmRwb2ludH0gbm90IHN1cHBvcnRlZC5gLFxuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUV4ZWN1dGUgPSAoY29uZmlnPzogQ29uZmlnKTogRXhlY3V0ZSA9PiB7XG4gIHJldHVybiBhc3luYyAocmVxdWVzdCwgY29udGV4dCkgPT4gZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcgfHwgbWFrZUNvbmZpZygpKVxufVxuIl19