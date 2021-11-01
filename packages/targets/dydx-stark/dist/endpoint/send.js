"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.NAME = void 0;
const tslib_1 = require("tslib");
const object_path_1 = tslib_1.__importDefault(require("object-path"));
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
const starkex_1 = require("./starkex");
exports.NAME = 'send';
const customParams = {
    dataPath: false,
    result: false,
    asset: true,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, customParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const { asset, ...data } = validator.validated.data;
    const dataPath = data.dataPath || config_1.DEFAULT_DATA_PATH;
    let price = object_path_1.default.get(data, dataPath);
    /* Remove me May 10th 2021 */
    if (!price)
        price = object_path_1.default.get(request, dataPath);
    /**************************/
    const priceData = {
        oracleName: config.oracleName,
        assetName: asset,
        // Get the current timestamp in seconds
        timestamp: Math.floor(Date.now() / 1000),
        price: starkex_1.requireNormalizedPrice(price),
    };
    const payload = await starkex_1.getPricePayload(config.privateKey, config.starkMessage, priceData);
    ea_bootstrap_1.Logger.debug('Sending payload: ', { payload });
    const options = {
        ...config.api,
        url: '',
        method: 'POST',
        data: payload,
    };
    const response = await ea_bootstrap_1.Requester.request(options);
    response.data.result = response.data;
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9zZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzRUFBb0M7QUFFcEMsMERBQXNFO0FBQ3RFLHNDQUFxRDtBQUNyRCx1Q0FBbUY7QUFFdEUsUUFBQSxJQUFJLEdBQUcsTUFBTSxDQUFBO0FBRTFCLE1BQU0sWUFBWSxHQUFHO0lBQ25CLFFBQVEsRUFBRSxLQUFLO0lBQ2YsTUFBTSxFQUFFLEtBQUs7SUFDYixLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDN0UsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUN0RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQTtJQUVuRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLDBCQUFpQixDQUFBO0lBQ25ELElBQUksS0FBSyxHQUFvQixxQkFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFM0QsNkJBQTZCO0lBQzdCLElBQUksQ0FBQyxLQUFLO1FBQUUsS0FBSyxHQUFvQixxQkFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDdEUsNEJBQTRCO0lBRTVCLE1BQU0sU0FBUyxHQUFtQjtRQUNoQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7UUFDN0IsU0FBUyxFQUFFLEtBQUs7UUFDaEIsdUNBQXVDO1FBQ3ZDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDeEMsS0FBSyxFQUFFLGdDQUFzQixDQUFDLEtBQUssQ0FBQztLQUNyQyxDQUFBO0lBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSx5QkFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUV4RixxQkFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFFOUMsTUFBTSxPQUFPLEdBQUc7UUFDZCxHQUFHLE1BQU0sQ0FBQyxHQUFHO1FBQ2IsR0FBRyxFQUFFLEVBQUU7UUFDUCxNQUFNLEVBQUUsTUFBYTtRQUNyQixJQUFJLEVBQUUsT0FBTztLQUNkLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUE7SUFFcEMsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM5RCxDQUFDLENBQUE7QUFwQ1ksUUFBQSxPQUFPLFdBb0NuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYmplY3RQYXRoIGZyb20gJ29iamVjdC1wYXRoJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IsIExvZ2dlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnLCBERUZBVUxUX0RBVEFfUEFUSCB9IGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCB7IFByaWNlRGF0YVBvaW50LCByZXF1aXJlTm9ybWFsaXplZFByaWNlLCBnZXRQcmljZVBheWxvYWQgfSBmcm9tICcuL3N0YXJrZXgnXG5cbmV4cG9ydCBjb25zdCBOQU1FID0gJ3NlbmQnXG5cbmNvbnN0IGN1c3RvbVBhcmFtcyA9IHtcbiAgZGF0YVBhdGg6IGZhbHNlLFxuICByZXN1bHQ6IGZhbHNlLFxuICBhc3NldDogdHJ1ZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgY3VzdG9tUGFyYW1zKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgeyBhc3NldCwgLi4uZGF0YSB9ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhXG5cbiAgY29uc3QgZGF0YVBhdGggPSBkYXRhLmRhdGFQYXRoIHx8IERFRkFVTFRfREFUQV9QQVRIXG4gIGxldCBwcmljZSA9IDxudW1iZXIgfCBzdHJpbmc+b2JqZWN0UGF0aC5nZXQoZGF0YSwgZGF0YVBhdGgpXG5cbiAgLyogUmVtb3ZlIG1lIE1heSAxMHRoIDIwMjEgKi9cbiAgaWYgKCFwcmljZSkgcHJpY2UgPSA8bnVtYmVyIHwgc3RyaW5nPm9iamVjdFBhdGguZ2V0KHJlcXVlc3QsIGRhdGFQYXRoKVxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgY29uc3QgcHJpY2VEYXRhOiBQcmljZURhdGFQb2ludCA9IHtcbiAgICBvcmFjbGVOYW1lOiBjb25maWcub3JhY2xlTmFtZSxcbiAgICBhc3NldE5hbWU6IGFzc2V0LFxuICAgIC8vIEdldCB0aGUgY3VycmVudCB0aW1lc3RhbXAgaW4gc2Vjb25kc1xuICAgIHRpbWVzdGFtcDogTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCksXG4gICAgcHJpY2U6IHJlcXVpcmVOb3JtYWxpemVkUHJpY2UocHJpY2UpLFxuICB9XG4gIGNvbnN0IHBheWxvYWQgPSBhd2FpdCBnZXRQcmljZVBheWxvYWQoY29uZmlnLnByaXZhdGVLZXksIGNvbmZpZy5zdGFya01lc3NhZ2UsIHByaWNlRGF0YSlcblxuICBMb2dnZXIuZGVidWcoJ1NlbmRpbmcgcGF5bG9hZDogJywgeyBwYXlsb2FkIH0pXG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5jb25maWcuYXBpLFxuICAgIHVybDogJycsXG4gICAgbWV0aG9kOiAnUE9TVCcgYXMgYW55LFxuICAgIGRhdGE6IHBheWxvYWQsXG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KG9wdGlvbnMpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gcmVzcG9uc2UuZGF0YVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIGNvbmZpZy52ZXJib3NlKVxufVxuIl19