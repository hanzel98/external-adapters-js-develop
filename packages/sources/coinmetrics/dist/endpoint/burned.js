"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = exports.DEFAULT_PAGE_SIZE = exports.DEFAULT_FREQUENCY = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
const ethers_1 = require("ethers");
exports.DEFAULT_FREQUENCY = '1d';
exports.DEFAULT_PAGE_SIZE = 1;
exports.supportedEndpoints = ['burned'];
exports.inputParameters = {
    asset: true,
    frequency: false,
    pageSize: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const asset = validator.overrideSymbol(config_1.NAME, validator.validated.data.asset);
    const frequency = validator.validated.data.frequency || exports.DEFAULT_FREQUENCY;
    const pageSize = validator.validated.data.pageSize || exports.DEFAULT_PAGE_SIZE;
    const url = 'timeseries/asset-metrics';
    const metrics = 'FeeTotNtv,RevNtv,IssTotNtv';
    const params = {
        assets: asset.toLowerCase(),
        metrics,
        frequency,
        api_key: config.apiKey,
        page_size: pageSize,
    };
    const options = { ...config.api, params, url };
    const response = await ea_bootstrap_1.Requester.request(options);
    const FeeTotNtv = ethers_1.ethers.utils.parseEther(response.data.data[0].FeeTotNtv);
    const RevNtv = ethers_1.ethers.utils.parseEther(response.data.data[0].RevNtv);
    const IssTotNtv = ethers_1.ethers.utils.parseEther(response.data.data[0].IssTotNtv);
    const result = FeeTotNtv.sub(RevNtv.sub(IssTotNtv));
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, ethers_1.ethers.utils.formatEther(result)), config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2J1cm5lZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEQ7QUFFOUQsc0NBQStDO0FBQy9DLG1DQUErQjtBQUVsQixRQUFBLGlCQUFpQixHQUFHLElBQUksQ0FBQTtBQUN4QixRQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBQTtBQUVyQixRQUFBLGtCQUFrQixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7QUFnQi9CLFFBQUEsZUFBZSxHQUFvQjtJQUM5QyxLQUFLLEVBQUUsSUFBSTtJQUNYLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDN0UsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSx1QkFBZSxDQUFDLENBQUE7SUFDekQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLGFBQVcsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuRixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUkseUJBQWlCLENBQUE7SUFDekUsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLHlCQUFpQixDQUFBO0lBQ3ZFLE1BQU0sR0FBRyxHQUFHLDBCQUEwQixDQUFBO0lBQ3RDLE1BQU0sT0FBTyxHQUFHLDRCQUE0QixDQUFBO0lBRTVDLE1BQU0sTUFBTSxHQUFHO1FBQ2IsTUFBTSxFQUFHLEtBQWdCLENBQUMsV0FBVyxFQUFFO1FBQ3ZDLE9BQU87UUFDUCxTQUFTO1FBQ1QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxRQUFRO0tBQ3BCLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFFOUMsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBaUIsT0FBTyxDQUFDLENBQUE7SUFDakUsTUFBTSxTQUFTLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDMUUsTUFBTSxNQUFNLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDcEUsTUFBTSxTQUFTLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDMUUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7SUFFbkQsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FDdEIsUUFBUSxFQUNSLHdCQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxlQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUNoRSxNQUFNLENBQUMsT0FBTyxDQUNmLENBQUE7QUFDSCxDQUFDLENBQUE7QUFoQ1ksUUFBQSxPQUFPLFdBZ0NuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcsIEV4ZWN1dGVXaXRoQ29uZmlnLCBJbnB1dFBhcmFtZXRlcnMgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgTkFNRSBhcyBBZGFwdGVyTmFtZSB9IGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCB7IGV0aGVycyB9IGZyb20gJ2V0aGVycydcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRlJFUVVFTkNZID0gJzFkJ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gMVxuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWydidXJuZWQnXVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3BvbnNlU2NoZW1hIHtcbiAgZGF0YTogW1xuICAgIHtcbiAgICAgIGFzc2V0OiBzdHJpbmdcbiAgICAgIHRpbWU6IHN0cmluZ1xuICAgICAgRmVlVG90TnR2OiBzdHJpbmdcbiAgICAgIElzc1RvdE50djogc3RyaW5nXG4gICAgICBSZXZOdHY6IHN0cmluZ1xuICAgIH0sXG4gIF1cbiAgbmV4dF9wYWdlX3Rva2VuOiBzdHJpbmdcbiAgbmV4dF9wYWdlX3VybDogc3RyaW5nXG59XG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgYXNzZXQ6IHRydWUsXG4gIGZyZXF1ZW5jeTogZmFsc2UsXG4gIHBhZ2VTaXplOiBmYWxzZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbWV0ZXJzKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgYXNzZXQgPSB2YWxpZGF0b3Iub3ZlcnJpZGVTeW1ib2woQWRhcHRlck5hbWUsIHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5hc3NldClcbiAgY29uc3QgZnJlcXVlbmN5ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmZyZXF1ZW5jeSB8fCBERUZBVUxUX0ZSRVFVRU5DWVxuICBjb25zdCBwYWdlU2l6ZSA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5wYWdlU2l6ZSB8fCBERUZBVUxUX1BBR0VfU0laRVxuICBjb25zdCB1cmwgPSAndGltZXNlcmllcy9hc3NldC1tZXRyaWNzJ1xuICBjb25zdCBtZXRyaWNzID0gJ0ZlZVRvdE50dixSZXZOdHYsSXNzVG90TnR2J1xuXG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBhc3NldHM6IChhc3NldCBhcyBzdHJpbmcpLnRvTG93ZXJDYXNlKCksXG4gICAgbWV0cmljcyxcbiAgICBmcmVxdWVuY3ksXG4gICAgYXBpX2tleTogY29uZmlnLmFwaUtleSxcbiAgICBwYWdlX3NpemU6IHBhZ2VTaXplLFxuICB9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHsgLi4uY29uZmlnLmFwaSwgcGFyYW1zLCB1cmwgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3Q8UmVzcG9uc2VTY2hlbWE+KG9wdGlvbnMpXG4gIGNvbnN0IEZlZVRvdE50diA9IGV0aGVycy51dGlscy5wYXJzZUV0aGVyKHJlc3BvbnNlLmRhdGEuZGF0YVswXS5GZWVUb3ROdHYpXG4gIGNvbnN0IFJldk50diA9IGV0aGVycy51dGlscy5wYXJzZUV0aGVyKHJlc3BvbnNlLmRhdGEuZGF0YVswXS5SZXZOdHYpXG4gIGNvbnN0IElzc1RvdE50diA9IGV0aGVycy51dGlscy5wYXJzZUV0aGVyKHJlc3BvbnNlLmRhdGEuZGF0YVswXS5Jc3NUb3ROdHYpXG4gIGNvbnN0IHJlc3VsdCA9IEZlZVRvdE50di5zdWIoUmV2TnR2LnN1YihJc3NUb3ROdHYpKVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2VzcyhcbiAgICBqb2JSdW5JRCxcbiAgICBSZXF1ZXN0ZXIud2l0aFJlc3VsdChyZXNwb25zZSwgZXRoZXJzLnV0aWxzLmZvcm1hdEV0aGVyKHJlc3VsdCkpLFxuICAgIGNvbmZpZy52ZXJib3NlLFxuICApXG59XG4iXX0=