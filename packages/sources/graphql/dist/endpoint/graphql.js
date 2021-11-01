"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.jobRunID;
    const { graphqlEndpoint, query, variables, headers } = request.data;
    const reqConfig = {
        ...config.api,
        url: graphqlEndpoint,
        data: {
            query,
            variables,
        },
        headers,
    };
    try {
        const response = await ea_bootstrap_1.Requester.request(reqConfig);
        // Prevent circular reference
        const responseData = JSON.parse(JSON.stringify(response.data));
        response.data.result = responseData;
        return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
    }
    catch (e) {
        throw new ea_bootstrap_1.AdapterError({
            jobRunID,
            message: `GraphQL request to ${graphqlEndpoint} failed with error ${e}`,
        });
    }
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9ncmFwaHFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE0RTtBQUdyRSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDN0UsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3hDLElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFDMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUE7SUFDN0MsTUFBTSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDbkUsTUFBTSxTQUFTLEdBQUc7UUFDaEIsR0FBRyxNQUFNLENBQUMsR0FBRztRQUNiLEdBQUcsRUFBRSxlQUFlO1FBQ3BCLElBQUksRUFBRTtZQUNKLEtBQUs7WUFDTCxTQUFTO1NBQ1Y7UUFDRCxPQUFPO0tBQ1IsQ0FBQTtJQUNELElBQUk7UUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRW5ELDZCQUE2QjtRQUM3QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDOUQsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFBO1FBQ25DLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDN0Q7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE1BQU0sSUFBSSwyQkFBWSxDQUFDO1lBQ3JCLFFBQVE7WUFDUixPQUFPLEVBQUUsc0JBQXNCLGVBQWUsc0JBQXNCLENBQUMsRUFBRTtTQUN4RSxDQUFDLENBQUE7S0FDSDtBQUNILENBQUMsQ0FBQTtBQTNCWSxRQUFBLE9BQU8sV0EyQm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IsIEFkYXB0ZXJFcnJvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIF8sIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKHJlcXVlc3QpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuam9iUnVuSURcbiAgY29uc3QgeyBncmFwaHFsRW5kcG9pbnQsIHF1ZXJ5LCB2YXJpYWJsZXMsIGhlYWRlcnMgfSA9IHJlcXVlc3QuZGF0YVxuICBjb25zdCByZXFDb25maWcgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICB1cmw6IGdyYXBocWxFbmRwb2ludCxcbiAgICBkYXRhOiB7XG4gICAgICBxdWVyeSxcbiAgICAgIHZhcmlhYmxlcyxcbiAgICB9LFxuICAgIGhlYWRlcnMsXG4gIH1cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KHJlcUNvbmZpZylcblxuICAgIC8vIFByZXZlbnQgY2lyY3VsYXIgcmVmZXJlbmNlXG4gICAgY29uc3QgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhKSlcbiAgICByZXNwb25zZS5kYXRhLnJlc3VsdCA9IHJlc3BvbnNlRGF0YVxuICAgIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIGNvbmZpZy52ZXJib3NlKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEFkYXB0ZXJFcnJvcih7XG4gICAgICBqb2JSdW5JRCxcbiAgICAgIG1lc3NhZ2U6IGBHcmFwaFFMIHJlcXVlc3QgdG8gJHtncmFwaHFsRW5kcG9pbnR9IGZhaWxlZCB3aXRoIGVycm9yICR7ZX1gLFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==