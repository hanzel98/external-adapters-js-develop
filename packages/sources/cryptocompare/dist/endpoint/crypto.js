"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.endpointResultPaths = exports.batchablePropertyPath = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['crypto', 'price', 'marketcap', 'volume'];
exports.batchablePropertyPath = [
    { name: 'base', limit: 1000 },
    { name: 'quote', limit: 100 },
];
exports.endpointResultPaths = {
    crypto: 'PRICE',
    price: 'PRICE',
    marketcap: 'MKTCAP',
    volume: 'VOLUME24HOURTO',
};
exports.inputParameters = {
    base: ['base', 'from', 'coin', 'fsym'],
    quote: ['quote', 'to', 'market', 'tsyms'],
    resultPath: false,
    endpoint: false,
};
const handleBatchedRequest = (jobRunID, request, response, validator, resultPath) => {
    const payload = [];
    for (const base of request.data.base) {
        const baseWithOverride = validator.overrideSymbol(config_1.NAME, base);
        for (const quote in response.data.RAW[baseWithOverride]) {
            // Skip this pair if CC doesn't have resultPath for this pair
            if (!(resultPath in response.data.RAW[baseWithOverride][quote]))
                continue;
            payload.push([
                {
                    ...request,
                    data: { ...request.data, base: base.toUpperCase(), quote: quote.toUpperCase() },
                },
                ea_bootstrap_1.Requester.validateResultNumber(response.data, [
                    'RAW',
                    baseWithOverride,
                    quote,
                    resultPath,
                ]),
            ]);
        }
    }
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, undefined, payload), true, exports.batchablePropertyPath);
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const url = `/data/pricemultifull`;
    const symbol = validator.overrideSymbol(config_1.NAME);
    const quote = validator.validated.data.quote;
    const resultPath = validator.validated.data.resultPath;
    const params = {
        fsyms: (Array.isArray(symbol)
            ? symbol.map((s) => s.toUpperCase())
            : [symbol.toUpperCase()]).join(),
        tsyms: (Array.isArray(quote)
            ? quote.map((q) => q.toUpperCase())
            : [quote.toUpperCase()]).join(),
    };
    const options = {
        ...config.api,
        url,
        params,
    };
    const response = await ea_bootstrap_1.Requester.request(options);
    if (Array.isArray(symbol) || Array.isArray(quote))
        return handleBatchedRequest(jobRunID, request, response, validator, resultPath);
    const result = ea_bootstrap_1.Requester.validateResultNumber(response.data, ['RAW', symbol, quote, resultPath]);
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, result), config.verbose, exports.batchablePropertyPath);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2NyeXB0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEQ7QUFROUQsc0NBQStDO0FBRWxDLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUMvRCxRQUFBLHFCQUFxQixHQUFHO0lBQ25DLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO0lBQzdCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO0NBQzlCLENBQUE7QUFFWSxRQUFBLG1CQUFtQixHQUFHO0lBQ2pDLE1BQU0sRUFBRSxPQUFPO0lBQ2YsS0FBSyxFQUFFLE9BQU87SUFDZCxTQUFTLEVBQUUsUUFBUTtJQUNuQixNQUFNLEVBQUUsZ0JBQWdCO0NBQ3pCLENBQUE7QUF3R1ksUUFBQSxlQUFlLEdBQW9CO0lBQzlDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUN0QyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUM7SUFDekMsVUFBVSxFQUFFLEtBQUs7SUFDakIsUUFBUSxFQUFFLEtBQUs7Q0FDaEIsQ0FBQTtBQUVELE1BQU0sb0JBQW9CLEdBQUcsQ0FDM0IsUUFBZ0IsRUFDaEIsT0FBdUIsRUFDdkIsUUFBeUMsRUFDekMsU0FBb0IsRUFDcEIsVUFBa0IsRUFDbEIsRUFBRTtJQUNGLE1BQU0sT0FBTyxHQUErQixFQUFFLENBQUE7SUFDOUMsS0FBSyxNQUFNLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNwQyxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsYUFBVyxFQUFFLElB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QUFTLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFFakYsTUFBTSxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQTtJQUVoRyxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUN0QixRQUFRLEVBQ1Isd0JBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUN0QyxNQUFNLENBQUMsT0FBTyxFQUNkLDZCQUFxQixDQUN0QixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBeENZLFFBQUEsT0FBTyxXQXdDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHtcbiAgRXhlY3V0ZVdpdGhDb25maWcsXG4gIENvbmZpZyxcbiAgQXhpb3NSZXNwb25zZSxcbiAgQWRhcHRlclJlcXVlc3QsXG4gIElucHV0UGFyYW1ldGVycyxcbn0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IE5BTUUgYXMgQWRhcHRlck5hbWUgfSBmcm9tICcuLi9jb25maWcnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ2NyeXB0bycsICdwcmljZScsICdtYXJrZXRjYXAnLCAndm9sdW1lJ11cbmV4cG9ydCBjb25zdCBiYXRjaGFibGVQcm9wZXJ0eVBhdGggPSBbXG4gIHsgbmFtZTogJ2Jhc2UnLCBsaW1pdDogMTAwMCB9LFxuICB7IG5hbWU6ICdxdW90ZScsIGxpbWl0OiAxMDAgfSxcbl1cblxuZXhwb3J0IGNvbnN0IGVuZHBvaW50UmVzdWx0UGF0aHMgPSB7XG4gIGNyeXB0bzogJ1BSSUNFJyxcbiAgcHJpY2U6ICdQUklDRScsXG4gIG1hcmtldGNhcDogJ01LVENBUCcsXG4gIHZvbHVtZTogJ1ZPTFVNRTI0SE9VUlRPJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZVNjaGVtYSB7XG4gIFJBVzoge1xuICAgIFtmc3ltOiBzdHJpbmddOiB7XG4gICAgICBbdHN5bTogc3RyaW5nXToge1xuICAgICAgICBUWVBFOiBzdHJpbmdcbiAgICAgICAgTUFSS0VUOiBzdHJpbmdcbiAgICAgICAgRlJPTVNZTUJPTDogc3RyaW5nXG4gICAgICAgIFRPU1lNQk9MOiBzdHJpbmdcbiAgICAgICAgRkxBR1M6IHN0cmluZ1xuICAgICAgICBQUklDRT86IG51bWJlclxuICAgICAgICBMQVNUVVBEQVRFOiBudW1iZXJcbiAgICAgICAgTUVESUFOOiBudW1iZXJcbiAgICAgICAgTEFTVFZPTFVNRTogbnVtYmVyXG4gICAgICAgIExBU1RWT0xVTUVUTzogbnVtYmVyXG4gICAgICAgIExBU1RUUkFERUlEOiBzdHJpbmdcbiAgICAgICAgVk9MVU1FREFZOiBudW1iZXJcbiAgICAgICAgVk9MVU1FREFZVE86IG51bWJlclxuICAgICAgICBWT0xVTUUyNEhPVVI6IG51bWJlclxuICAgICAgICBWT0xVTUUyNEhPVVJUTzogbnVtYmVyXG4gICAgICAgIE9QRU5EQVk6IG51bWJlclxuICAgICAgICBISUdIREFZOiBudW1iZXJcbiAgICAgICAgTE9XREFZOiBudW1iZXJcbiAgICAgICAgT1BFTjI0SE9VUjogbnVtYmVyXG4gICAgICAgIEhJR0gyNEhPVVI6IG51bWJlclxuICAgICAgICBMT1cyNEhPVVI6IG51bWJlclxuICAgICAgICBMQVNUTUFSS0VUOiBzdHJpbmdcbiAgICAgICAgVk9MVU1FSE9VUjogbnVtYmVyXG4gICAgICAgIFZPTFVNRUhPVVJUTzogbnVtYmVyXG4gICAgICAgIE9QRU5IT1VSOiBudW1iZXJcbiAgICAgICAgSElHSEhPVVI6IG51bWJlclxuICAgICAgICBMT1dIT1VSOiBudW1iZXJcbiAgICAgICAgVE9QVElFUlZPTFVNRTI0SE9VUjogbnVtYmVyXG4gICAgICAgIFRPUFRJRVJWT0xVTUUyNEhPVVJUTzogbnVtYmVyXG4gICAgICAgIENIQU5HRTI0SE9VUjogbnVtYmVyXG4gICAgICAgIENIQU5HRVBDVDI0SE9VUjogbnVtYmVyXG4gICAgICAgIENIQU5HRURBWTogbnVtYmVyXG4gICAgICAgIENIQU5HRVBDVERBWTogbnVtYmVyXG4gICAgICAgIENIQU5HRUhPVVI6IG51bWJlclxuICAgICAgICBDSEFOR0VQQ1RIT1VSOiBudW1iZXJcbiAgICAgICAgQ09OVkVSU0lPTlRZUEU6IHN0cmluZ1xuICAgICAgICBDT05WRVJTSU9OU1lNQk9MOiBzdHJpbmdcbiAgICAgICAgU1VQUExZOiBudW1iZXJcbiAgICAgICAgTUtUQ0FQOiBudW1iZXJcbiAgICAgICAgTUtUQ0FQUEVOQUxUWTogbnVtYmVyXG4gICAgICAgIFRPVEFMVk9MVU1FMjRIOiBudW1iZXJcbiAgICAgICAgVE9UQUxWT0xVTUUyNEhUTzogbnVtYmVyXG4gICAgICAgIFRPVEFMVE9QVElFUlZPTFVNRTI0SDogbnVtYmVyXG4gICAgICAgIFRPVEFMVE9QVElFUlZPTFVNRTI0SFRPOiBudW1iZXJcbiAgICAgICAgSU1BR0VVUkw6IHN0cmluZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBESVNQTEFZOiB7XG4gICAgW2ZzeW06IHN0cmluZ106IHtcbiAgICAgIFt0c3ltOiBzdHJpbmddOiB7XG4gICAgICAgIEZST01TWU1CT0w6IHN0cmluZ1xuICAgICAgICBUT1NZTUJPTDogc3RyaW5nXG4gICAgICAgIE1BUktFVDogc3RyaW5nXG4gICAgICAgIFBSSUNFOiBzdHJpbmdcbiAgICAgICAgTEFTVFVQREFURTogc3RyaW5nXG4gICAgICAgIExBU1RWT0xVTUU6IHN0cmluZ1xuICAgICAgICBMQVNUVk9MVU1FVE86IHN0cmluZ1xuICAgICAgICBMQVNUVFJBREVJRDogc3RyaW5nXG4gICAgICAgIFZPTFVNRURBWTogc3RyaW5nXG4gICAgICAgIFZPTFVNRURBWVRPOiBzdHJpbmdcbiAgICAgICAgVk9MVU1FMjRIT1VSOiBzdHJpbmdcbiAgICAgICAgVk9MVU1FMjRIT1VSVE86IHN0cmluZ1xuICAgICAgICBPUEVOREFZOiBzdHJpbmdcbiAgICAgICAgSElHSERBWTogc3RyaW5nXG4gICAgICAgIExPV0RBWTogc3RyaW5nXG4gICAgICAgIE9QRU4yNEhPVVI6IHN0cmluZ1xuICAgICAgICBISUdIMjRIT1VSOiBzdHJpbmdcbiAgICAgICAgTE9XMjRIT1VSOiBzdHJpbmdcbiAgICAgICAgTEFTVE1BUktFVDogc3RyaW5nXG4gICAgICAgIFZPTFVNRUhPVVI6IHN0cmluZ1xuICAgICAgICBWT0xVTUVIT1VSVE86IHN0cmluZ1xuICAgICAgICBPUEVOSE9VUjogc3RyaW5nXG4gICAgICAgIEhJR0hIT1VSOiBzdHJpbmdcbiAgICAgICAgTE9XSE9VUjogc3RyaW5nXG4gICAgICAgIFRPUFRJRVJWT0xVTUUyNEhPVVI6IHN0cmluZ1xuICAgICAgICBUT1BUSUVSVk9MVU1FMjRIT1VSVE86IHN0cmluZ1xuICAgICAgICBDSEFOR0UyNEhPVVI6IHN0cmluZ1xuICAgICAgICBDSEFOR0VQQ1QyNEhPVVI6IHN0cmluZ1xuICAgICAgICBDSEFOR0VEQVk6IHN0cmluZ1xuICAgICAgICBDSEFOR0VQQ1REQVk6IHN0cmluZ1xuICAgICAgICBDSEFOR0VIT1VSOiBzdHJpbmdcbiAgICAgICAgQ0hBTkdFUENUSE9VUjogc3RyaW5nXG4gICAgICAgIENPTlZFUlNJT05UWVBFOiBzdHJpbmdcbiAgICAgICAgQ09OVkVSU0lPTlNZTUJPTDogc3RyaW5nXG4gICAgICAgIFNVUFBMWTogc3RyaW5nXG4gICAgICAgIE1LVENBUDogc3RyaW5nXG4gICAgICAgIE1LVENBUFBFTkFMVFk6IHN0cmluZ1xuICAgICAgICBUT1RBTFZPTFVNRTI0SDogc3RyaW5nXG4gICAgICAgIFRPVEFMVk9MVU1FMjRIVE86IHN0cmluZ1xuICAgICAgICBUT1RBTFRPUFRJRVJWT0xVTUUyNEg6IHN0cmluZ1xuICAgICAgICBUT1RBTFRPUFRJRVJWT0xVTUUyNEhUTzogc3RyaW5nXG4gICAgICAgIElNQUdFVVJMOiBzdHJpbmdcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBiYXNlOiBbJ2Jhc2UnLCAnZnJvbScsICdjb2luJywgJ2ZzeW0nXSxcbiAgcXVvdGU6IFsncXVvdGUnLCAndG8nLCAnbWFya2V0JywgJ3RzeW1zJ10sXG4gIHJlc3VsdFBhdGg6IGZhbHNlLFxuICBlbmRwb2ludDogZmFsc2UsXG59XG5cbmNvbnN0IGhhbmRsZUJhdGNoZWRSZXF1ZXN0ID0gKFxuICBqb2JSdW5JRDogc3RyaW5nLFxuICByZXF1ZXN0OiBBZGFwdGVyUmVxdWVzdCxcbiAgcmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8UmVzcG9uc2VTY2hlbWFbXT4sXG4gIHZhbGlkYXRvcjogVmFsaWRhdG9yLFxuICByZXN1bHRQYXRoOiBzdHJpbmcsXG4pID0+IHtcbiAgY29uc3QgcGF5bG9hZDogW0FkYXB0ZXJSZXF1ZXN0LCBudW1iZXJdW10gPSBbXVxuICBmb3IgKGNvbnN0IGJhc2Ugb2YgcmVxdWVzdC5kYXRhLmJhc2UpIHtcbiAgICBjb25zdCBiYXNlV2l0aE92ZXJyaWRlID0gdmFsaWRhdG9yLm92ZXJyaWRlU3ltYm9sKEFkYXB0ZXJOYW1lLCBiYXNlKVxuICAgIGZvciAoY29uc3QgcXVvdGUgaW4gcmVzcG9uc2UuZGF0YS5SQVdbYmFzZVdpdGhPdmVycmlkZV0pIHtcbiAgICAgIC8vIFNraXAgdGhpcyBwYWlyIGlmIENDIGRvZXNuJ3QgaGF2ZSByZXN1bHRQYXRoIGZvciB0aGlzIHBhaXJcbiAgICAgIGlmICghKHJlc3VsdFBhdGggaW4gcmVzcG9uc2UuZGF0YS5SQVdbYmFzZVdpdGhPdmVycmlkZV1bcXVvdGVdKSkgY29udGludWVcblxuICAgICAgcGF5bG9hZC5wdXNoKFtcbiAgICAgICAge1xuICAgICAgICAgIC4uLnJlcXVlc3QsXG4gICAgICAgICAgZGF0YTogeyAuLi5yZXF1ZXN0LmRhdGEsIGJhc2U6IGJhc2UudG9VcHBlckNhc2UoKSwgcXVvdGU6IHF1b3RlLnRvVXBwZXJDYXNlKCkgfSxcbiAgICAgICAgfSxcbiAgICAgICAgUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFtcbiAgICAgICAgICAnUkFXJyxcbiAgICAgICAgICBiYXNlV2l0aE92ZXJyaWRlIGFzIHN0cmluZyxcbiAgICAgICAgICBxdW90ZSxcbiAgICAgICAgICByZXN1bHRQYXRoLFxuICAgICAgICBdKSxcbiAgICAgIF0pXG4gICAgfVxuICB9XG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2VzcyhcbiAgICBqb2JSdW5JRCxcbiAgICBSZXF1ZXN0ZXIud2l0aFJlc3VsdChyZXNwb25zZSwgdW5kZWZpbmVkLCBwYXlsb2FkKSxcbiAgICB0cnVlLFxuICAgIGJhdGNoYWJsZVByb3BlcnR5UGF0aCxcbiAgKVxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCB1cmwgPSBgL2RhdGEvcHJpY2VtdWx0aWZ1bGxgXG4gIGNvbnN0IHN5bWJvbCA9IHZhbGlkYXRvci5vdmVycmlkZVN5bWJvbChBZGFwdGVyTmFtZSlcbiAgY29uc3QgcXVvdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEucXVvdGVcbiAgY29uc3QgcmVzdWx0UGF0aCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5yZXN1bHRQYXRoXG5cbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIGZzeW1zOiAoQXJyYXkuaXNBcnJheShzeW1ib2wpXG4gICAgICA/IHN5bWJvbC5tYXAoKHMpID0+IHMudG9VcHBlckNhc2UoKSlcbiAgICAgIDogW3N5bWJvbC50b1VwcGVyQ2FzZSgpXVxuICAgICkuam9pbigpLFxuICAgIHRzeW1zOiAoQXJyYXkuaXNBcnJheShxdW90ZSlcbiAgICAgID8gcXVvdGUubWFwKChxKSA9PiBxLnRvVXBwZXJDYXNlKCkpXG4gICAgICA6IFtxdW90ZS50b1VwcGVyQ2FzZSgpXVxuICAgICkuam9pbigpLFxuICB9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5jb25maWcuYXBpLFxuICAgIHVybCxcbiAgICBwYXJhbXMsXG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0PFJlc3BvbnNlU2NoZW1hPihvcHRpb25zKVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHN5bWJvbCkgfHwgQXJyYXkuaXNBcnJheShxdW90ZSkpXG4gICAgcmV0dXJuIGhhbmRsZUJhdGNoZWRSZXF1ZXN0KGpvYlJ1bklELCByZXF1ZXN0LCByZXNwb25zZSwgdmFsaWRhdG9yLCByZXN1bHRQYXRoKVxuXG4gIGNvbnN0IHJlc3VsdCA9IFJlcXVlc3Rlci52YWxpZGF0ZVJlc3VsdE51bWJlcihyZXNwb25zZS5kYXRhLCBbJ1JBVycsIHN5bWJvbCwgcXVvdGUsIHJlc3VsdFBhdGhdKVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2VzcyhcbiAgICBqb2JSdW5JRCxcbiAgICBSZXF1ZXN0ZXIud2l0aFJlc3VsdChyZXNwb25zZSwgcmVzdWx0KSxcbiAgICBjb25maWcudmVyYm9zZSxcbiAgICBiYXRjaGFibGVQcm9wZXJ0eVBhdGgsXG4gIClcbn1cbiJdfQ==