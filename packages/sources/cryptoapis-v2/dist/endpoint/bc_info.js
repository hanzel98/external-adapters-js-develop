"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['height', 'difficulty'];
exports.inputParameters = {
    blockchain: ['blockchain', 'coin'],
    endpoint: false,
    network: false,
};
const payloadDataPaths = {
    height: ['data', 'item', 'height'],
    difficulty: ['data', 'item', 'blockchainSpecific', 'difficulty'],
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const blockchain = validator.validated.data.blockchain;
    if (blockchain.toLowerCase() !== 'btc')
        throw new ea_bootstrap_1.AdapterError({
            jobRunID,
            message: `Blockchain must be BTC`,
            statusCode: 400,
        });
    const network = validator.validated.data.network || 'mainnet';
    const endpoint = validator.validated.data.endpoint || config_1.DEFAULT_ENDPOINT;
    const payloadDataPath = payloadDataPaths[endpoint];
    if (!payloadDataPath) {
        throw new Error(`${endpoint} has no payload data path and is invalid`);
    }
    const url = `/v2/blockchain-data/${config_1.BLOCKCHAIN_NAME_BY_TICKER[blockchain.toLowerCase()]}-specific/${network.toLowerCase()}/blocks/last`;
    const options = { ...config.api, url };
    const response = await ea_bootstrap_1.Requester.request(options);
    const result = ea_bootstrap_1.Requester.validateResultNumber(response.data, payloadDataPath);
    const responseWithCost = { ...response, data: { ...response.data } };
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(responseWithCost, result), config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNfaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9iY19pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE0RTtBQUU1RSxzQ0FBMEY7QUFFN0UsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQTtBQTRCN0MsUUFBQSxlQUFlLEdBQW9CO0lBQzlDLFVBQVUsRUFBRSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7SUFDbEMsUUFBUSxFQUFFLEtBQUs7SUFDZixPQUFPLEVBQUUsS0FBSztDQUNmLENBQUE7QUFFRCxNQUFNLGdCQUFnQixHQUFnQztJQUNwRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztJQUNsQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLFlBQVksQ0FBQztDQUNqRSxDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsdUJBQWUsQ0FBQyxDQUFBO0lBQ3pELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFDMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQ3RELElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUs7UUFDcEMsTUFBTSxJQUFJLDJCQUFZLENBQUM7WUFDckIsUUFBUTtZQUNSLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsVUFBVSxFQUFFLEdBQUc7U0FDaEIsQ0FBQyxDQUFBO0lBQ0osTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQTtJQUM3RCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUkseUJBQWdCLENBQUE7SUFDdEUsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbEQsSUFBSSxDQUFDLGVBQWUsRUFBRTtRQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsUUFBUSwwQ0FBMEMsQ0FBQyxDQUFBO0tBQ3ZFO0lBQ0QsTUFBTSxHQUFHLEdBQUcsdUJBQ1Ysa0NBQXlCLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBdUIsQ0FDekUsYUFBYSxPQUFPLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQTtJQUNoRCxNQUFNLE9BQU8sR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUN0QyxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFpQixPQUFPLENBQUMsQ0FBQTtJQUNqRSxNQUFNLE1BQU0sR0FBRyx3QkFBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFDN0UsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLEdBQUcsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUE7SUFDcEUsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsd0JBQVMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3BHLENBQUMsQ0FBQTtBQXpCWSxRQUFBLE9BQU8sV0F5Qm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRhcHRlckVycm9yLCBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IERFRkFVTFRfRU5EUE9JTlQsIEJMT0NLQ0hBSU5fTkFNRV9CWV9USUNLRVIsIEJsb2NrY2hhaW5UaWNrZXJzIH0gZnJvbSAnLi4vY29uZmlnJ1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWydoZWlnaHQnLCAnZGlmZmljdWx0eSddXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uc2VTY2hlbWEge1xuICBhcGlWZXJzaW9uOiBzdHJpbmdcbiAgcmVxdWVzdElkOiBzdHJpbmdcbiAgZGF0YToge1xuICAgIGl0ZW06IHtcbiAgICAgIGhhc2g6IHN0cmluZ1xuICAgICAgaGVpZ2h0OiBudW1iZXJcbiAgICAgIHByZXZpb3VzQmxvY2tIYXNoOiBzdHJpbmdcbiAgICAgIHRpbWVzdGFtcDogbnVtYmVyXG4gICAgICB0cmFuc2FjdGlvbnNDb3VudDogbnVtYmVyXG4gICAgICBibG9ja2NoYWluU3BlY2lmaWM6IHtcbiAgICAgICAgZGlmZmljdWx0eTogc3RyaW5nXG4gICAgICAgIG5vbmNlOiBudW1iZXJcbiAgICAgICAgc2l6ZTogbnVtYmVyXG4gICAgICAgIGJpdHM6IHN0cmluZ1xuICAgICAgICBjaGFpbndvcms6IHN0cmluZ1xuICAgICAgICBtZXJrbGVSb290OiBzdHJpbmdcbiAgICAgICAgc3RyaXBwZWRTaXplOiBudW1iZXJcbiAgICAgICAgdmVyc2lvbjogbnVtYmVyXG4gICAgICAgIHZlcnNpb25IZXg6IHN0cmluZ1xuICAgICAgICB3ZWlnaHQ6IG51bWJlclxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgaW5wdXRQYXJhbWV0ZXJzOiBJbnB1dFBhcmFtZXRlcnMgPSB7XG4gIGJsb2NrY2hhaW46IFsnYmxvY2tjaGFpbicsICdjb2luJ10sXG4gIGVuZHBvaW50OiBmYWxzZSxcbiAgbmV0d29yazogZmFsc2UsXG59XG5cbmNvbnN0IHBheWxvYWREYXRhUGF0aHM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSA9IHtcbiAgaGVpZ2h0OiBbJ2RhdGEnLCAnaXRlbScsICdoZWlnaHQnXSxcbiAgZGlmZmljdWx0eTogWydkYXRhJywgJ2l0ZW0nLCAnYmxvY2tjaGFpblNwZWNpZmljJywgJ2RpZmZpY3VsdHknXSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbWV0ZXJzKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IGJsb2NrY2hhaW4gPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuYmxvY2tjaGFpblxuICBpZiAoYmxvY2tjaGFpbi50b0xvd2VyQ2FzZSgpICE9PSAnYnRjJylcbiAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgIGpvYlJ1bklELFxuICAgICAgbWVzc2FnZTogYEJsb2NrY2hhaW4gbXVzdCBiZSBCVENgLFxuICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgIH0pXG4gIGNvbnN0IG5ldHdvcmsgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEubmV0d29yayB8fCAnbWFpbm5ldCdcbiAgY29uc3QgZW5kcG9pbnQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuZW5kcG9pbnQgfHwgREVGQVVMVF9FTkRQT0lOVFxuICBjb25zdCBwYXlsb2FkRGF0YVBhdGggPSBwYXlsb2FkRGF0YVBhdGhzW2VuZHBvaW50XVxuICBpZiAoIXBheWxvYWREYXRhUGF0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtlbmRwb2ludH0gaGFzIG5vIHBheWxvYWQgZGF0YSBwYXRoIGFuZCBpcyBpbnZhbGlkYClcbiAgfVxuICBjb25zdCB1cmwgPSBgL3YyL2Jsb2NrY2hhaW4tZGF0YS8ke1xuICAgIEJMT0NLQ0hBSU5fTkFNRV9CWV9USUNLRVJbYmxvY2tjaGFpbi50b0xvd2VyQ2FzZSgpIGFzIEJsb2NrY2hhaW5UaWNrZXJzXVxuICB9LXNwZWNpZmljLyR7bmV0d29yay50b0xvd2VyQ2FzZSgpfS9ibG9ja3MvbGFzdGBcbiAgY29uc3Qgb3B0aW9ucyA9IHsgLi4uY29uZmlnLmFwaSwgdXJsIH1cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdDxSZXNwb25zZVNjaGVtYT4ob3B0aW9ucylcbiAgY29uc3QgcmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIHBheWxvYWREYXRhUGF0aClcbiAgY29uc3QgcmVzcG9uc2VXaXRoQ29zdCA9IHsgLi4ucmVzcG9uc2UsIGRhdGE6IHsgLi4ucmVzcG9uc2UuZGF0YSB9IH1cbiAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGpvYlJ1bklELCBSZXF1ZXN0ZXIud2l0aFJlc3VsdChyZXNwb25zZVdpdGhDb3N0LCByZXN1bHQpLCBjb25maWcudmVyYm9zZSlcbn1cbiJdfQ==