"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const method_1 = require("./method");
const inputParams = {
    method: false,
};
const execute = async (request, context, config) => {
    const validator = new ea_bootstrap_1.Validator(request, inputParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const method = validator.validated.data.method || config_1.DEFAULT_METHOD;
    switch (method.toLowerCase()) {
        case method_1.poke.NAME: {
            return await method_1.poke.execute(request, context, config);
        }
        default: {
            throw new ea_bootstrap_1.AdapterError({
                jobRunID,
                message: `Method ${method} not supported.`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUFpRTtBQUVqRSxxQ0FBNkQ7QUFDN0QscUNBQStCO0FBRS9CLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLE1BQU0sRUFBRSxLQUFLO0NBQ2QsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNuRixNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3JELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLHVCQUFjLENBQUE7SUFFaEUsUUFBUSxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDNUIsS0FBSyxhQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCxPQUFPLE1BQU0sYUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ3BEO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDUCxNQUFNLElBQUksMkJBQVksQ0FBQztnQkFDckIsUUFBUTtnQkFDUixPQUFPLEVBQUUsVUFBVSxNQUFNLGlCQUFpQjtnQkFDMUMsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFBO1NBQ0g7S0FDRjtBQUNILENBQUMsQ0FBQTtBQW5CWSxRQUFBLE9BQU8sV0FtQm5CO0FBRU0sTUFBTSxXQUFXLEdBQTJCLENBQUMsTUFBZSxFQUFFLEVBQUU7SUFDckUsT0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLG1CQUFVLEVBQUUsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQTtBQUZZLFFBQUEsV0FBVyxlQUV2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkYXB0ZXJFcnJvciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBFeGVjdXRlRmFjdG9yeSwgRXhlY3V0ZVdpdGhDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgREVGQVVMVF9NRVRIT0QsIG1ha2VDb25maWcsIENvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgcG9rZSB9IGZyb20gJy4vbWV0aG9kJ1xuXG5jb25zdCBpbnB1dFBhcmFtcyA9IHtcbiAgbWV0aG9kOiBmYWxzZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBtZXRob2QgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEubWV0aG9kIHx8IERFRkFVTFRfTUVUSE9EXG5cbiAgc3dpdGNoIChtZXRob2QudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgcG9rZS5OQU1FOiB7XG4gICAgICByZXR1cm4gYXdhaXQgcG9rZS5leGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZylcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgdGhyb3cgbmV3IEFkYXB0ZXJFcnJvcih7XG4gICAgICAgIGpvYlJ1bklELFxuICAgICAgICBtZXNzYWdlOiBgTWV0aG9kICR7bWV0aG9kfSBub3Qgc3VwcG9ydGVkLmAsXG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZTogRXhlY3V0ZUZhY3Rvcnk8Q29uZmlnPiA9IChjb25maWc/OiBDb25maWcpID0+IHtcbiAgcmV0dXJuIGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0KSA9PiBleGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZyB8fCBtYWtlQ29uZmlnKCkpXG59XG4iXX0=