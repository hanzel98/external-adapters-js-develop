"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const helpers_1 = require("../helpers");
exports.supportedEndpoints = ['vwap'];
exports.inputParameters = {
    symbol: ['base', 'from', 'coin', 'symbol', 'assetId', 'indexId', 'asset'],
    indexType: false,
    timestamp: false, // TODO: currently unused, deprecate or utilize me
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const symbol = validator.validated.data.symbol;
    const url = `https://${helpers_1.host}/ohlcv`;
    const indexType = 'GWA';
    const token = await helpers_1.authenticate();
    const assetId = await helpers_1.getAssetId(symbol);
    const options = {
        url,
        headers: {
            ...helpers_1.apiHeaders,
            authorization: `Bearer ${token}`,
            useQueryString: true,
        },
        params: {
            indexId: assetId,
            indexType: indexType,
            timestamp: yesterday,
            size: 1,
        },
    };
    const response = await ea_bootstrap_1.Requester.request(options);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, ['content', 0, 'vwap']);
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidndhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC92d2FwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE4RDtBQUU5RCx3Q0FBdUU7QUFFMUQsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRTdCLFFBQUEsZUFBZSxHQUFvQjtJQUM5QyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDekUsU0FBUyxFQUFFLEtBQUs7SUFDaEIsU0FBUyxFQUFFLEtBQUssRUFBRSxrREFBa0Q7Q0FDckUsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7SUFDNUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDMUMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBRTlDLE1BQU0sR0FBRyxHQUFHLFdBQVcsY0FBSSxRQUFRLENBQUE7SUFDbkMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLE1BQU0sS0FBSyxHQUFHLE1BQU0sc0JBQVksRUFBRSxDQUFBO0lBQ2xDLE1BQU0sT0FBTyxHQUFHLE1BQU0sb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUV4QyxNQUFNLE9BQU8sR0FBRztRQUNkLEdBQUc7UUFDSCxPQUFPLEVBQUU7WUFDUCxHQUFHLG9CQUFVO1lBQ2IsYUFBYSxFQUFFLFVBQVUsS0FBSyxFQUFFO1lBQ2hDLGNBQWMsRUFBRSxJQUFJO1NBQ3JCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLE9BQU87WUFDaEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsSUFBSSxFQUFFLENBQUM7U0FDUjtLQUNGLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLHdCQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUU1RixPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlELENBQUMsQ0FBQTtBQWpDWSxRQUFBLE9BQU8sV0FpQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEV4ZWN1dGVXaXRoQ29uZmlnLCBDb25maWcsIElucHV0UGFyYW1ldGVycyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBhdXRoZW50aWNhdGUsIGFwaUhlYWRlcnMsIGdldEFzc2V0SWQsIGhvc3QgfSBmcm9tICcuLi9oZWxwZXJzJ1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWyd2d2FwJ11cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBzeW1ib2w6IFsnYmFzZScsICdmcm9tJywgJ2NvaW4nLCAnc3ltYm9sJywgJ2Fzc2V0SWQnLCAnaW5kZXhJZCcsICdhc3NldCddLFxuICBpbmRleFR5cGU6IGZhbHNlLFxuICB0aW1lc3RhbXA6IGZhbHNlLCAvLyBUT0RPOiBjdXJyZW50bHkgdW51c2VkLCBkZXByZWNhdGUgb3IgdXRpbGl6ZSBtZVxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgpXG4gIHllc3RlcmRheS5zZXREYXRlKHllc3RlcmRheS5nZXREYXRlKCkgLSAxKVxuICBjb25zdCBzeW1ib2wgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuc3ltYm9sXG5cbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vJHtob3N0fS9vaGxjdmBcbiAgY29uc3QgaW5kZXhUeXBlID0gJ0dXQSdcbiAgY29uc3QgdG9rZW4gPSBhd2FpdCBhdXRoZW50aWNhdGUoKVxuICBjb25zdCBhc3NldElkID0gYXdhaXQgZ2V0QXNzZXRJZChzeW1ib2wpXG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmwsXG4gICAgaGVhZGVyczoge1xuICAgICAgLi4uYXBpSGVhZGVycyxcbiAgICAgIGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgdXNlUXVlcnlTdHJpbmc6IHRydWUsXG4gICAgfSxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGluZGV4SWQ6IGFzc2V0SWQsXG4gICAgICBpbmRleFR5cGU6IGluZGV4VHlwZSxcbiAgICAgIHRpbWVzdGFtcDogeWVzdGVyZGF5LFxuICAgICAgc2l6ZTogMSxcbiAgICB9LFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChvcHRpb25zKVxuICByZXNwb25zZS5kYXRhLnJlc3VsdCA9IFJlcXVlc3Rlci52YWxpZGF0ZVJlc3VsdE51bWJlcihyZXNwb25zZS5kYXRhLCBbJ2NvbnRlbnQnLCAwLCAndndhcCddKVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIGNvbmZpZy52ZXJib3NlKVxufVxuIl19