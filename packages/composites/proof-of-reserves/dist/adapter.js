"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = exports.callAdapter = exports.makeRequestFactory = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ea_bootstrap_2 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const protocol_1 = require("./protocol");
const balance_1 = require("./balance");
const reduce_1 = require("./reduce");
const makeRequestFactory = (config, prefix) => async (input) => (await ea_bootstrap_2.Requester.request({
    ...config.api,
    method: 'post',
    url: ea_bootstrap_1.util.getURL(prefix, true),
    data: input,
})).data;
exports.makeRequestFactory = makeRequestFactory;
// Run, log, throw on error
const callAdapter = async (execute, context, input, tag) => {
    const output = await execute(input, context);
    ea_bootstrap_1.Logger.debug(tag, { output });
    return output;
};
exports.callAdapter = callAdapter;
const inputParams = {
    protocol: true,
    indexer: true,
    confirmations: false,
};
const execute = async (input, context, config) => {
    const paramOptions = config_1.makeOptions();
    const validator = new ea_bootstrap_2.Validator(input, inputParams, paramOptions);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.jobRunID;
    const protocol = validator.validated.data.protocol.toUpperCase();
    const indexer = validator.validated.data.indexer.toUpperCase();
    const confirmations = validator.validated.data.confirmations || config_1.DEFAULT_CONFIRMATIONS;
    const protocolOutput = await protocol_1.runProtocolAdapter(jobRunID, context, protocol, input.data, config);
    const balanceOutput = await balance_1.runBalanceAdapter(indexer, context, confirmations, config, protocolOutput);
    const reduceOutput = await reduce_1.runReduceAdapter(indexer, context, balanceOutput);
    return reduceOutput;
};
exports.execute = execute;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUFzRDtBQVV0RCwwREFBOEQ7QUFDOUQscUNBQXlFO0FBQ3pFLHlDQUErQztBQUMvQyx1Q0FBc0Q7QUFDdEQscUNBQTJDO0FBRXBDLE1BQU0sa0JBQWtCLEdBQzdCLENBQUMsTUFBYyxFQUFFLE1BQWMsRUFBVyxFQUFFLENBQzVDLEtBQUssRUFBRSxLQUFxQixFQUFFLEVBQUUsQ0FDOUIsQ0FDRSxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDO0lBQ3RCLEdBQUcsTUFBTSxDQUFDLEdBQUc7SUFDYixNQUFNLEVBQUUsTUFBTTtJQUNkLEdBQUcsRUFBRSxtQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO0lBQzlCLElBQUksRUFBRSxLQUFLO0NBQ1osQ0FBQyxDQUNILENBQUMsSUFBdUIsQ0FBQTtBQVZoQixRQUFBLGtCQUFrQixzQkFVRjtBQUU3QiwyQkFBMkI7QUFDcEIsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixPQUFnQixFQUNoQixPQUF1QixFQUN2QixLQUFxQixFQUNyQixHQUFXLEVBQ2UsRUFBRTtJQUM1QixNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDNUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUM3QixPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQVRZLFFBQUEsV0FBVyxlQVN2QjtBQUVELE1BQU0sV0FBVyxHQUFHO0lBQ2xCLFFBQVEsRUFBRSxJQUFJO0lBQ2QsT0FBTyxFQUFFLElBQUk7SUFDYixhQUFhLEVBQUUsS0FBSztDQUNyQixDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ2pGLE1BQU0sWUFBWSxHQUFHLG9CQUFXLEVBQUUsQ0FBQTtJQUNsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUNqRSxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFBO0lBQzdDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNoRSxNQUFNLE9BQU8sR0FBWSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDdkUsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLDhCQUFxQixDQUFBO0lBRXJGLE1BQU0sY0FBYyxHQUFHLE1BQU0sNkJBQWtCLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNoRyxNQUFNLGFBQWEsR0FBRyxNQUFNLDJCQUFpQixDQUMzQyxPQUFPLEVBQ1AsT0FBTyxFQUNQLGFBQWEsRUFDYixNQUFNLEVBQ04sY0FBYyxDQUNmLENBQUE7SUFDRCxNQUFNLFlBQVksR0FBRyxNQUFNLHlCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDNUUsT0FBTyxZQUFZLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBcEJZLFFBQUEsT0FBTyxXQW9CbkI7QUFFTSxNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUM1RCxPQUFPLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQVUsRUFBRSxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyLCB1dGlsIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQge1xuICBBZGFwdGVyUmVxdWVzdCxcbiAgRXhlY3V0ZVdpdGhDb25maWcsXG4gIENvbmZpZyxcbiAgRXhlY3V0ZUZhY3RvcnksXG4gIEV4ZWN1dGUsXG4gIEFkYXB0ZXJSZXNwb25zZSxcbiAgQWRhcHRlckNvbnRleHQsXG59IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBWYWxpZGF0b3IsIFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZywgbWFrZU9wdGlvbnMsIERFRkFVTFRfQ09ORklSTUFUSU9OUyB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgcnVuUHJvdG9jb2xBZGFwdGVyIH0gZnJvbSAnLi9wcm90b2NvbCdcbmltcG9ydCB7IEluZGV4ZXIsIHJ1bkJhbGFuY2VBZGFwdGVyIH0gZnJvbSAnLi9iYWxhbmNlJ1xuaW1wb3J0IHsgcnVuUmVkdWNlQWRhcHRlciB9IGZyb20gJy4vcmVkdWNlJ1xuXG5leHBvcnQgY29uc3QgbWFrZVJlcXVlc3RGYWN0b3J5ID1cbiAgKGNvbmZpZzogQ29uZmlnLCBwcmVmaXg6IHN0cmluZyk6IEV4ZWN1dGUgPT5cbiAgYXN5bmMgKGlucHV0OiBBZGFwdGVyUmVxdWVzdCkgPT5cbiAgICAoXG4gICAgICBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdCh7XG4gICAgICAgIC4uLmNvbmZpZy5hcGksXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICB1cmw6IHV0aWwuZ2V0VVJMKHByZWZpeCwgdHJ1ZSksXG4gICAgICAgIGRhdGE6IGlucHV0LFxuICAgICAgfSlcbiAgICApLmRhdGEgYXMgQWRhcHRlclJlc3BvbnNlXG5cbi8vIFJ1biwgbG9nLCB0aHJvdyBvbiBlcnJvclxuZXhwb3J0IGNvbnN0IGNhbGxBZGFwdGVyID0gYXN5bmMgKFxuICBleGVjdXRlOiBFeGVjdXRlLFxuICBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCxcbiAgaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0LFxuICB0YWc6IHN0cmluZyxcbik6IFByb21pc2U8QWRhcHRlclJlc3BvbnNlPiA9PiB7XG4gIGNvbnN0IG91dHB1dCA9IGF3YWl0IGV4ZWN1dGUoaW5wdXQsIGNvbnRleHQpXG4gIExvZ2dlci5kZWJ1Zyh0YWcsIHsgb3V0cHV0IH0pXG4gIHJldHVybiBvdXRwdXRcbn1cblxuY29uc3QgaW5wdXRQYXJhbXMgPSB7XG4gIHByb3RvY29sOiB0cnVlLFxuICBpbmRleGVyOiB0cnVlLFxuICBjb25maXJtYXRpb25zOiBmYWxzZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAoaW5wdXQsIGNvbnRleHQsIGNvbmZpZykgPT4ge1xuICBjb25zdCBwYXJhbU9wdGlvbnMgPSBtYWtlT3B0aW9ucygpXG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoaW5wdXQsIGlucHV0UGFyYW1zLCBwYXJhbU9wdGlvbnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5qb2JSdW5JRFxuICBjb25zdCBwcm90b2NvbCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5wcm90b2NvbC50b1VwcGVyQ2FzZSgpXG4gIGNvbnN0IGluZGV4ZXI6IEluZGV4ZXIgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuaW5kZXhlci50b1VwcGVyQ2FzZSgpXG4gIGNvbnN0IGNvbmZpcm1hdGlvbnMgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuY29uZmlybWF0aW9ucyB8fCBERUZBVUxUX0NPTkZJUk1BVElPTlNcblxuICBjb25zdCBwcm90b2NvbE91dHB1dCA9IGF3YWl0IHJ1blByb3RvY29sQWRhcHRlcihqb2JSdW5JRCwgY29udGV4dCwgcHJvdG9jb2wsIGlucHV0LmRhdGEsIGNvbmZpZylcbiAgY29uc3QgYmFsYW5jZU91dHB1dCA9IGF3YWl0IHJ1bkJhbGFuY2VBZGFwdGVyKFxuICAgIGluZGV4ZXIsXG4gICAgY29udGV4dCxcbiAgICBjb25maXJtYXRpb25zLFxuICAgIGNvbmZpZyxcbiAgICBwcm90b2NvbE91dHB1dCxcbiAgKVxuICBjb25zdCByZWR1Y2VPdXRwdXQgPSBhd2FpdCBydW5SZWR1Y2VBZGFwdGVyKGluZGV4ZXIsIGNvbnRleHQsIGJhbGFuY2VPdXRwdXQpXG4gIHJldHVybiByZWR1Y2VPdXRwdXRcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VFeGVjdXRlOiBFeGVjdXRlRmFjdG9yeTxDb25maWc+ID0gKGNvbmZpZykgPT4ge1xuICByZXR1cm4gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQpID0+IGV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnIHx8IG1ha2VDb25maWcoKSlcbn1cbiJdfQ==