"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'fight';
const customParams = {
    fightId: true,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, customParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const fightId = validator.validated.data.fightId;
    const url = `/mma/stats/json/Fight/${fightId}`;
    const params = {
        key: config.mmaStatsKey,
    };
    const options = { ...config.api, params, url };
    const response = await ea_bootstrap_1.Requester.request(options);
    response.data.result = response.data;
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlnaHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3BvcnQvbW1hL2VuZHBvaW50L2ZpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE4RDtBQUlqRCxRQUFBLElBQUksR0FBRyxPQUFPLENBQUE7QUFFM0IsTUFBTSxZQUFZLEdBQUc7SUFDbkIsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDdEQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDaEQsTUFBTSxHQUFHLEdBQUcseUJBQXlCLE9BQU8sRUFBRSxDQUFBO0lBRTlDLE1BQU0sTUFBTSxHQUFHO1FBQ2IsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXO0tBQ3hCLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFFOUMsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO0lBRXBDLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBbEJZLFFBQUEsT0FBTyxXQWtCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnJ1xuXG5leHBvcnQgY29uc3QgTkFNRSA9ICdmaWdodCdcblxuY29uc3QgY3VzdG9tUGFyYW1zID0ge1xuICBmaWdodElkOiB0cnVlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBjdXN0b21QYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBmaWdodElkID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmZpZ2h0SWRcbiAgY29uc3QgdXJsID0gYC9tbWEvc3RhdHMvanNvbi9GaWdodC8ke2ZpZ2h0SWR9YFxuXG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBrZXk6IGNvbmZpZy5tbWFTdGF0c0tleSxcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7IC4uLmNvbmZpZy5hcGksIHBhcmFtcywgdXJsIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KG9wdGlvbnMpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gcmVzcG9uc2UuZGF0YVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIGNvbmZpZy52ZXJib3NlKVxufVxuIl19