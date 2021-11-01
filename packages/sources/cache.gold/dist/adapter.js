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
    switch (endpoint.toLowerCase()) {
        case endpoint_1.lockedGold.NAME: {
            return await endpoint_1.lockedGold.execute(request, context, config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE0RTtBQUU1RSxxQ0FBdUQ7QUFDdkQseUNBQXVDO0FBRXZDLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbkYsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLHdCQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRTNCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSx5QkFBZ0IsQ0FBQTtJQUV0RSxRQUFRLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUM5QixLQUFLLHFCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsT0FBTyxNQUFNLHFCQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDMUQ7UUFDRCxPQUFPLENBQUMsQ0FBQztZQUNQLE1BQU0sSUFBSSwyQkFBWSxDQUFDO2dCQUNyQixRQUFRO2dCQUNSLE9BQU8sRUFBRSxZQUFZLFFBQVEsaUJBQWlCO2dCQUM5QyxVQUFVLEVBQUUsR0FBRzthQUNoQixDQUFDLENBQUE7U0FDSDtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBckJZLFFBQUEsT0FBTyxXQXFCbkI7QUFFTSxNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUM1RCxPQUFPLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQVUsRUFBRSxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IsIEFkYXB0ZXJFcnJvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnLCBFeGVjdXRlV2l0aENvbmZpZywgRXhlY3V0ZUZhY3RvcnkgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZywgREVGQVVMVF9FTkRQT0lOVCB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgbG9ja2VkR29sZCB9IGZyb20gJy4vZW5kcG9pbnQnXG5cbmNvbnN0IGlucHV0UGFyYW1zID0ge1xuICBlbmRwb2ludDogZmFsc2UsXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKHJlcXVlc3QsIGlucHV0UGFyYW1zKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBSZXF1ZXN0ZXIubG9nQ29uZmlnKGNvbmZpZylcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgZW5kcG9pbnQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuZW5kcG9pbnQgfHwgREVGQVVMVF9FTkRQT0lOVFxuXG4gIHN3aXRjaCAoZW5kcG9pbnQudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgbG9ja2VkR29sZC5OQU1FOiB7XG4gICAgICByZXR1cm4gYXdhaXQgbG9ja2VkR29sZC5leGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZylcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgdGhyb3cgbmV3IEFkYXB0ZXJFcnJvcih7XG4gICAgICAgIGpvYlJ1bklELFxuICAgICAgICBtZXNzYWdlOiBgRW5kcG9pbnQgJHtlbmRwb2ludH0gbm90IHN1cHBvcnRlZC5gLFxuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUV4ZWN1dGU6IEV4ZWN1dGVGYWN0b3J5PENvbmZpZz4gPSAoY29uZmlnKSA9PiB7XG4gIHJldHVybiBhc3luYyAocmVxdWVzdCwgY29udGV4dCkgPT4gZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcgfHwgbWFrZUNvbmZpZygpKVxufVxuIl19