"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['forex', 'price'];
const customError = (data) => {
    if (data['Error Message'])
        return true;
    return false;
};
exports.inputParameters = {
    base: ['base', 'from', 'coin'],
    quote: ['quote', 'to', 'market'],
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const from = validator.overrideSymbol(config_1.NAME);
    const to = validator.validated.data.quote;
    const params = {
        ...config.api.params,
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: from,
        to_currency: to,
        from_symbol: from,
        to_symbol: to,
        symbol: from,
        market: to,
    };
    const options = {
        ...config.api,
        params,
    };
    const response = await ea_bootstrap_1.Requester.request(options, customError);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, [
        'Realtime Currency Exchange Rate',
        '5. Exchange Rate',
    ]);
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnQvZm9yZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQThEO0FBRTlELHNDQUErQztBQUVsQyxRQUFBLGtCQUFrQixHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBRXBELE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBUyxFQUFFLEVBQUU7SUFDaEMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFDdEMsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUE7QUFFWSxRQUFBLGVBQWUsR0FBb0I7SUFDOUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDOUIsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUM7Q0FDakMsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsYUFBVyxDQUFDLENBQUE7SUFDbEQsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBRXpDLE1BQU0sTUFBTSxHQUFHO1FBQ2IsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU07UUFDcEIsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyxhQUFhLEVBQUUsSUFBSTtRQUNuQixXQUFXLEVBQUUsRUFBRTtRQUNmLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRztRQUNkLEdBQUcsTUFBTSxDQUFDLEdBQUc7UUFDYixNQUFNO0tBQ1AsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzlELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLHdCQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtRQUNuRSxpQ0FBaUM7UUFDakMsa0JBQWtCO0tBQ25CLENBQUMsQ0FBQTtJQUVGLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBL0JZLFFBQUEsT0FBTyxXQStCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IE5BTUUgYXMgQWRhcHRlck5hbWUgfSBmcm9tICcuLi9jb25maWcnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ2ZvcmV4JywgJ3ByaWNlJ11cblxuY29uc3QgY3VzdG9tRXJyb3IgPSAoZGF0YTogYW55KSA9PiB7XG4gIGlmIChkYXRhWydFcnJvciBNZXNzYWdlJ10pIHJldHVybiB0cnVlXG4gIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgY29uc3QgaW5wdXRQYXJhbWV0ZXJzOiBJbnB1dFBhcmFtZXRlcnMgPSB7XG4gIGJhc2U6IFsnYmFzZScsICdmcm9tJywgJ2NvaW4nXSxcbiAgcXVvdGU6IFsncXVvdGUnLCAndG8nLCAnbWFya2V0J10sXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIF8sIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKHJlcXVlc3QsIGlucHV0UGFyYW1ldGVycylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IGZyb20gPSB2YWxpZGF0b3Iub3ZlcnJpZGVTeW1ib2woQWRhcHRlck5hbWUpXG4gIGNvbnN0IHRvID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLnF1b3RlXG5cbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIC4uLmNvbmZpZy5hcGkucGFyYW1zLFxuICAgIGZ1bmN0aW9uOiAnQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURScsXG4gICAgZnJvbV9jdXJyZW5jeTogZnJvbSxcbiAgICB0b19jdXJyZW5jeTogdG8sXG4gICAgZnJvbV9zeW1ib2w6IGZyb20sXG4gICAgdG9fc3ltYm9sOiB0byxcbiAgICBzeW1ib2w6IGZyb20sXG4gICAgbWFya2V0OiB0byxcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICBwYXJhbXMsXG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KG9wdGlvbnMsIGN1c3RvbUVycm9yKVxuICByZXNwb25zZS5kYXRhLnJlc3VsdCA9IFJlcXVlc3Rlci52YWxpZGF0ZVJlc3VsdE51bWJlcihyZXNwb25zZS5kYXRhLCBbXG4gICAgJ1JlYWx0aW1lIEN1cnJlbmN5IEV4Y2hhbmdlIFJhdGUnLFxuICAgICc1LiBFeGNoYW5nZSBSYXRlJyxcbiAgXSlcblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3BvbnNlLCBjb25maWcudmVyYm9zZSlcbn1cbiJdfQ==