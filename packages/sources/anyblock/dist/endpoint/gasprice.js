"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['gasprice'];
const customError = (data) => {
    if (Object.keys(data).length < 1)
        return true;
    if (!('health' in data) || !data.health)
        return true;
    return false;
};
exports.inputParameters = {
    speed: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const speed = validator.validated.data.speed || 'standard';
    const url = `/latest-minimum-gasprice`;
    const options = {
        ...config.api,
        url,
    };
    const response = await ea_bootstrap_1.Requester.request(options, customError);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, [speed]) * 1e9;
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FzcHJpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnQvZ2FzcHJpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQThEO0FBR2pELFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUU5QyxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO0lBQ2hDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBQzdDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFDcEQsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUE7QUFFWSxRQUFBLGVBQWUsR0FBb0I7SUFDOUMsS0FBSyxFQUFFLEtBQUs7Q0FDYixDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsdUJBQWUsQ0FBQyxDQUFBO0lBQ3pELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQTtJQUMxRCxNQUFNLEdBQUcsR0FBRywwQkFBMEIsQ0FBQTtJQUV0QyxNQUFNLE9BQU8sR0FBRztRQUNkLEdBQUcsTUFBTSxDQUFDLEdBQUc7UUFDYixHQUFHO0tBQ0osQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzlELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLHdCQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO0lBRW5GLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBakJZLFFBQUEsT0FBTyxXQWlCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnZ2FzcHJpY2UnXVxuXG5jb25zdCBjdXN0b21FcnJvciA9IChkYXRhOiBhbnkpID0+IHtcbiAgaWYgKE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA8IDEpIHJldHVybiB0cnVlXG4gIGlmICghKCdoZWFsdGgnIGluIGRhdGEpIHx8ICFkYXRhLmhlYWx0aCkgcmV0dXJuIHRydWVcbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgc3BlZWQ6IGZhbHNlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBzcGVlZCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5zcGVlZCB8fCAnc3RhbmRhcmQnXG4gIGNvbnN0IHVybCA9IGAvbGF0ZXN0LW1pbmltdW0tZ2FzcHJpY2VgXG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5jb25maWcuYXBpLFxuICAgIHVybCxcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3Qob3B0aW9ucywgY3VzdG9tRXJyb3IpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFtzcGVlZF0pICogMWU5XG5cbiAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGpvYlJ1bklELCByZXNwb25zZSwgY29uZmlnLnZlcmJvc2UpXG59XG4iXX0=