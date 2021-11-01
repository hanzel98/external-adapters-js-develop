"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'schedule';
const customParams = {
    league: true,
    season: true,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, customParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const league = validator.validated.data.league;
    const season = validator.validated.data.season;
    const url = `/mma/scores/json/Schedule/${league}/${season}`;
    const params = {
        key: config.mmaStatsKey,
    };
    const options = { ...config.api, params, url };
    const response = await ea_bootstrap_1.Requester.request(options);
    response.data.result = response.data;
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3BvcnQvbW1hL2VuZHBvaW50L3NjaGVkdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE4RDtBQUlqRCxRQUFBLElBQUksR0FBRyxVQUFVLENBQUE7QUFFOUIsTUFBTSxZQUFZLEdBQUc7SUFDbkIsTUFBTSxFQUFFLElBQUk7SUFDWixNQUFNLEVBQUUsSUFBSTtDQUNiLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDN0UsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUN0RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUM5QyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDOUMsTUFBTSxHQUFHLEdBQUcsNkJBQTZCLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQTtJQUUzRCxNQUFNLE1BQU0sR0FBRztRQUNiLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVztLQUN4QixDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBRTlDLE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTtJQUVwQyxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlELENBQUMsQ0FBQTtBQW5CWSxRQUFBLE9BQU8sV0FtQm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEV4ZWN1dGVXaXRoQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZydcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnc2NoZWR1bGUnXG5cbmNvbnN0IGN1c3RvbVBhcmFtcyA9IHtcbiAgbGVhZ3VlOiB0cnVlLFxuICBzZWFzb246IHRydWUsXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIF8sIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKHJlcXVlc3QsIGN1c3RvbVBhcmFtcylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IGxlYWd1ZSA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5sZWFndWVcbiAgY29uc3Qgc2Vhc29uID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLnNlYXNvblxuICBjb25zdCB1cmwgPSBgL21tYS9zY29yZXMvanNvbi9TY2hlZHVsZS8ke2xlYWd1ZX0vJHtzZWFzb259YFxuXG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBrZXk6IGNvbmZpZy5tbWFTdGF0c0tleSxcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7IC4uLmNvbmZpZy5hcGksIHBhcmFtcywgdXJsIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KG9wdGlvbnMpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gcmVzcG9uc2UuZGF0YVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIGNvbmZpZy52ZXJib3NlKVxufVxuIl19