"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const customParams = {
    speed: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, customParams);
    if (validator.error)
        throw validator.error;
    ea_bootstrap_1.Requester.logConfig(config);
    const jobRunID = validator.validated.id;
    const speed = validator.validated.data.speed || 'standard';
    const reqConfig = {
        ...config.api,
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, [speed]) * 1e9;
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE4RDtBQUU5RCxxQ0FBcUM7QUFFckMsTUFBTSxZQUFZLEdBQUc7SUFDbkIsS0FBSyxFQUFFLEtBQUs7Q0FDYixDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDdEQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyx3QkFBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFBO0lBQzFELE1BQU0sU0FBUyxHQUFHO1FBQ2hCLEdBQUcsTUFBTSxDQUFDLEdBQUc7S0FDZCxDQUFBO0lBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtJQUNuRixPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlELENBQUMsQ0FBQTtBQWJZLFFBQUEsT0FBTyxXQWFuQjtBQUVNLE1BQU0sV0FBVyxHQUEyQixDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQzVELE9BQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxtQkFBVSxFQUFFLENBQUMsQ0FBQTtBQUN0RixDQUFDLENBQUE7QUFGWSxRQUFBLFdBQVcsZUFFdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnLCBFeGVjdXRlRmFjdG9yeSwgRXhlY3V0ZVdpdGhDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBjdXN0b21QYXJhbXMgPSB7XG4gIHNwZWVkOiBmYWxzZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgY3VzdG9tUGFyYW1zKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBSZXF1ZXN0ZXIubG9nQ29uZmlnKGNvbmZpZylcbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IHNwZWVkID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLnNwZWVkIHx8ICdzdGFuZGFyZCdcbiAgY29uc3QgcmVxQ29uZmlnID0ge1xuICAgIC4uLmNvbmZpZy5hcGksXG4gIH1cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChyZXFDb25maWcpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFtzcGVlZF0pICogMWU5XG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIGNvbmZpZy52ZXJib3NlKVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUV4ZWN1dGU6IEV4ZWN1dGVGYWN0b3J5PENvbmZpZz4gPSAoY29uZmlnKSA9PiB7XG4gIHJldHVybiBhc3luYyAocmVxdWVzdCwgY29udGV4dCkgPT4gZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcgfHwgbWFrZUNvbmZpZygpKVxufVxuIl19