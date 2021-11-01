"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['event'];
exports.inputParameters = {
    eventId: true,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const eventId = validator.validated.data.eventId;
    const url = `/events/${eventId}`;
    const reqConfig = {
        ...config.api,
        headers: {
            ...config.api.headers,
            'x-rapidapi-key': config.apiKey,
        },
        params: {
            include: 'scores',
        },
        url,
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    response.data.result = response.data;
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnQvZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQThEO0FBR2pELFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUU5QixRQUFBLGVBQWUsR0FBb0I7SUFDOUMsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsdUJBQWUsQ0FBQyxDQUFBO0lBQ3pELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ2hELE1BQU0sR0FBRyxHQUFHLFdBQVcsT0FBTyxFQUFFLENBQUE7SUFFaEMsTUFBTSxTQUFTLEdBQUc7UUFDaEIsR0FBRyxNQUFNLENBQUMsR0FBRztRQUNiLE9BQU8sRUFBRTtZQUNQLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPO1lBQ3JCLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ2hDO1FBQ0QsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxHQUFHO0tBQ0osQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTtJQUVwQyxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlELENBQUMsQ0FBQTtBQXhCWSxRQUFBLE9BQU8sV0F3Qm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEV4ZWN1dGVXaXRoQ29uZmlnLCBDb25maWcsIElucHV0UGFyYW1ldGVycyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ2V2ZW50J11cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBldmVudElkOiB0cnVlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBldmVudElkID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmV2ZW50SWRcbiAgY29uc3QgdXJsID0gYC9ldmVudHMvJHtldmVudElkfWBcblxuICBjb25zdCByZXFDb25maWcgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAuLi5jb25maWcuYXBpLmhlYWRlcnMsXG4gICAgICAneC1yYXBpZGFwaS1rZXknOiBjb25maWcuYXBpS2V5LFxuICAgIH0sXG4gICAgcGFyYW1zOiB7XG4gICAgICBpbmNsdWRlOiAnc2NvcmVzJyxcbiAgICB9LFxuICAgIHVybCxcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3QocmVxQ29uZmlnKVxuICByZXNwb25zZS5kYXRhLnJlc3VsdCA9IHJlc3BvbnNlLmRhdGFcblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3BvbnNlLCBjb25maWcudmVyYm9zZSlcbn1cbiJdfQ==