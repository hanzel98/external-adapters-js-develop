"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const customParams = {
    blockchain: ['blockchain', 'coin'],
    endpoint: false,
};
const endpointToApiFunctionName = {
    difficulty: 'getdifficulty',
    height: 'getblockcount',
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, customParams);
    if (validator.error)
        throw validator.error;
    ea_bootstrap_1.Requester.logConfig(config);
    const jobRunID = validator.validated.id;
    const endpoint = validator.validated.data.endpoint || config_1.DEFAULT_ENDPOINT;
    const blockchain = validator.validated.data.blockchain.toLowerCase();
    const key = config.apiKey;
    const apiFunctionName = endpointToApiFunctionName[endpoint];
    const params = { key, q: apiFunctionName };
    const reqConfig = {
        ...config.api,
        params,
        baseURL: config.api.baseURL || `https://${blockchain}.cryptoid.info/${blockchain}/api.dws`,
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    response.data = { result: response.data };
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE4RDtBQUU5RCxxQ0FBdUQ7QUFFdkQsTUFBTSxZQUFZLEdBQUc7SUFDbkIsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQztJQUNsQyxRQUFRLEVBQUUsS0FBSztDQUNoQixDQUFBO0FBRUQsTUFBTSx5QkFBeUIsR0FBOEI7SUFDM0QsVUFBVSxFQUFFLGVBQWU7SUFDM0IsTUFBTSxFQUFFLGVBQWU7Q0FDeEIsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ3RELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsd0JBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFM0IsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLHlCQUFnQixDQUFBO0lBQ3RFLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUVwRSxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO0lBQ3pCLE1BQU0sZUFBZSxHQUFHLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzNELE1BQU0sTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxlQUFlLEVBQUUsQ0FBQTtJQUUxQyxNQUFNLFNBQVMsR0FBRztRQUNoQixHQUFHLE1BQU0sQ0FBQyxHQUFHO1FBQ2IsTUFBTTtRQUNOLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxXQUFXLFVBQVUsa0JBQWtCLFVBQVUsVUFBVTtLQUMzRixDQUFBO0lBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNuRCxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUV6QyxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlELENBQUMsQ0FBQTtBQXZCWSxRQUFBLE9BQU8sV0F1Qm5CO0FBRU0sTUFBTSxXQUFXLEdBQTJCLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDNUQsT0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLG1CQUFVLEVBQUUsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQTtBQUZZLFFBQUEsV0FBVyxlQUV2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcsIEV4ZWN1dGVXaXRoQ29uZmlnLCBFeGVjdXRlRmFjdG9yeSB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBtYWtlQ29uZmlnLCBERUZBVUxUX0VORFBPSU5UIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IGN1c3RvbVBhcmFtcyA9IHtcbiAgYmxvY2tjaGFpbjogWydibG9ja2NoYWluJywgJ2NvaW4nXSxcbiAgZW5kcG9pbnQ6IGZhbHNlLFxufVxuXG5jb25zdCBlbmRwb2ludFRvQXBpRnVuY3Rpb25OYW1lOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICBkaWZmaWN1bHR5OiAnZ2V0ZGlmZmljdWx0eScsXG4gIGhlaWdodDogJ2dldGJsb2NrY291bnQnLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBjdXN0b21QYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIFJlcXVlc3Rlci5sb2dDb25maWcoY29uZmlnKVxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBlbmRwb2ludCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5lbmRwb2ludCB8fCBERUZBVUxUX0VORFBPSU5UXG4gIGNvbnN0IGJsb2NrY2hhaW4gPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuYmxvY2tjaGFpbi50b0xvd2VyQ2FzZSgpXG5cbiAgY29uc3Qga2V5ID0gY29uZmlnLmFwaUtleVxuICBjb25zdCBhcGlGdW5jdGlvbk5hbWUgPSBlbmRwb2ludFRvQXBpRnVuY3Rpb25OYW1lW2VuZHBvaW50XVxuICBjb25zdCBwYXJhbXMgPSB7IGtleSwgcTogYXBpRnVuY3Rpb25OYW1lIH1cblxuICBjb25zdCByZXFDb25maWcgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICBwYXJhbXMsXG4gICAgYmFzZVVSTDogY29uZmlnLmFwaS5iYXNlVVJMIHx8IGBodHRwczovLyR7YmxvY2tjaGFpbn0uY3J5cHRvaWQuaW5mby8ke2Jsb2NrY2hhaW59L2FwaS5kd3NgLFxuICB9XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3QocmVxQ29uZmlnKVxuICByZXNwb25zZS5kYXRhID0geyByZXN1bHQ6IHJlc3BvbnNlLmRhdGEgfVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIGNvbmZpZy52ZXJib3NlKVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUV4ZWN1dGU6IEV4ZWN1dGVGYWN0b3J5PENvbmZpZz4gPSAoY29uZmlnKSA9PiB7XG4gIHJldHVybiBhc3luYyAocmVxdWVzdCwgY29udGV4dCkgPT4gZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcgfHwgbWFrZUNvbmZpZygpKVxufVxuIl19