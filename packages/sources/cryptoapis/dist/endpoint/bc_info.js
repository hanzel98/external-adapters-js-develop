"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.endpointResultPaths = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['height', 'difficulty'];
exports.endpointResultPaths = {
    height: 'headers',
    difficulty: 'difficulty',
};
exports.inputParameters = {
    blockchain: ['blockchain', 'coin'],
    resultPath: false,
    network: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const blockchain = validator.validated.data.blockchain;
    const network = validator.validated.data.network || 'mainnet';
    const resultPath = validator.validated.data.resultPath;
    const url = `/v1/bc/${blockchain.toLowerCase()}/${network.toLowerCase()}/info`;
    const reqConfig = { ...config.api, url };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, ['payload', resultPath]);
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNfaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9iY19pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE4RDtBQUdqRCxRQUFBLGtCQUFrQixHQUFHLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBRTdDLFFBQUEsbUJBQW1CLEdBQUc7SUFDakMsTUFBTSxFQUFFLFNBQVM7SUFDakIsVUFBVSxFQUFFLFlBQVk7Q0FDekIsQ0FBQTtBQUVZLFFBQUEsZUFBZSxHQUFvQjtJQUM5QyxVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO0lBQ2xDLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLE9BQU8sRUFBRSxLQUFLO0NBQ2YsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUN0RCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFBO0lBQzdELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUN0RCxNQUFNLEdBQUcsR0FBRyxVQUFVLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQTtJQUU5RSxNQUFNLFNBQVMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUV4QyxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLHdCQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFBO0lBRTdGLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBaEJZLFFBQUEsT0FBTyxXQWdCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnaGVpZ2h0JywgJ2RpZmZpY3VsdHknXVxuXG5leHBvcnQgY29uc3QgZW5kcG9pbnRSZXN1bHRQYXRocyA9IHtcbiAgaGVpZ2h0OiAnaGVhZGVycycsXG4gIGRpZmZpY3VsdHk6ICdkaWZmaWN1bHR5Jyxcbn1cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBibG9ja2NoYWluOiBbJ2Jsb2NrY2hhaW4nLCAnY29pbiddLFxuICByZXN1bHRQYXRoOiBmYWxzZSxcbiAgbmV0d29yazogZmFsc2UsXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIF8sIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKHJlcXVlc3QsIGlucHV0UGFyYW1ldGVycylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IGJsb2NrY2hhaW4gPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuYmxvY2tjaGFpblxuICBjb25zdCBuZXR3b3JrID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLm5ldHdvcmsgfHwgJ21haW5uZXQnXG4gIGNvbnN0IHJlc3VsdFBhdGggPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEucmVzdWx0UGF0aFxuICBjb25zdCB1cmwgPSBgL3YxL2JjLyR7YmxvY2tjaGFpbi50b0xvd2VyQ2FzZSgpfS8ke25ldHdvcmsudG9Mb3dlckNhc2UoKX0vaW5mb2BcblxuICBjb25zdCByZXFDb25maWcgPSB7IC4uLmNvbmZpZy5hcGksIHVybCB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChyZXFDb25maWcpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFsncGF5bG9hZCcsIHJlc3VsdFBhdGhdKVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIGNvbmZpZy52ZXJib3NlKVxufVxuIl19