"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.endpointResultPaths = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['crypto', 'ticker'];
exports.endpointResultPaths = {
    crypto: 'bid',
    ticker: 'bid',
};
exports.inputParameters = {
    base: ['base', 'from', 'coin'],
    quote: ['quote', 'to', 'market'],
    resultPath: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const base = validator.validated.data.base.toUpperCase();
    const quote = validator.validated.data.quote.toUpperCase();
    const url = `ticker/${quote}`;
    const resultPath = validator.validated.data.resultPath;
    const options = {
        ...config.api,
        url,
    };
    const response = await ea_bootstrap_1.Requester.request(options);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, [
        'data',
        'ticker',
        base,
        resultPath,
    ]);
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2NyeXB0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEQ7QUFHakQsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUV6QyxRQUFBLG1CQUFtQixHQUFHO0lBQ2pDLE1BQU0sRUFBRSxLQUFLO0lBQ2IsTUFBTSxFQUFFLEtBQUs7Q0FDZCxDQUFBO0FBRVksUUFBQSxlQUFlLEdBQW9CO0lBQzlDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQzlCLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDO0lBQ2hDLFVBQVUsRUFBRSxLQUFLO0NBQ2xCLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDN0UsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSx1QkFBZSxDQUFDLENBQUE7SUFDekQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDeEQsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzFELE1BQU0sR0FBRyxHQUFHLFVBQVUsS0FBSyxFQUFFLENBQUE7SUFDN0IsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBRXRELE1BQU0sT0FBTyxHQUFHO1FBQ2QsR0FBRyxNQUFNLENBQUMsR0FBRztRQUNiLEdBQUc7S0FDSixDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDbkUsTUFBTTtRQUNOLFFBQVE7UUFDUixJQUFJO1FBQ0osVUFBVTtLQUNYLENBQUMsQ0FBQTtJQUVGLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBeEJZLFFBQUEsT0FBTyxXQXdCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnY3J5cHRvJywgJ3RpY2tlciddXG5cbmV4cG9ydCBjb25zdCBlbmRwb2ludFJlc3VsdFBhdGhzID0ge1xuICBjcnlwdG86ICdiaWQnLFxuICB0aWNrZXI6ICdiaWQnLFxufVxuXG5leHBvcnQgY29uc3QgaW5wdXRQYXJhbWV0ZXJzOiBJbnB1dFBhcmFtZXRlcnMgPSB7XG4gIGJhc2U6IFsnYmFzZScsICdmcm9tJywgJ2NvaW4nXSxcbiAgcXVvdGU6IFsncXVvdGUnLCAndG8nLCAnbWFya2V0J10sXG4gIHJlc3VsdFBhdGg6IGZhbHNlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBiYXNlID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmJhc2UudG9VcHBlckNhc2UoKVxuICBjb25zdCBxdW90ZSA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5xdW90ZS50b1VwcGVyQ2FzZSgpXG4gIGNvbnN0IHVybCA9IGB0aWNrZXIvJHtxdW90ZX1gXG4gIGNvbnN0IHJlc3VsdFBhdGggPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEucmVzdWx0UGF0aFxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICB1cmwsXG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KG9wdGlvbnMpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFtcbiAgICAnZGF0YScsXG4gICAgJ3RpY2tlcicsXG4gICAgYmFzZSxcbiAgICByZXN1bHRQYXRoLFxuICBdKVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIGNvbmZpZy52ZXJib3NlKVxufVxuIl19