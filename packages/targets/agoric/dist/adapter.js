"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = exports.getRequiredFee = void 0;
const ethers_1 = require("ethers");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
// We're on localhost, so retries just confuse the oracle state.
const NUM_RETRIES = 1;
const inputParams = {
    request_id: ['request_id'],
    result: ['result'],
    payment: ['payment'],
};
// FIXME: Ideally, these would be the same.
const LINK_UNIT = ethers_1.BigNumber.from(10).pow(ethers_1.BigNumber.from(18));
const LINK_AGORIC_UNIT = ethers_1.BigNumber.from(10).pow(ethers_1.BigNumber.from(6));
// Convert the payment in $LINK into Agoric's pegged $LINK token.
const getRequiredFee = (value) => {
    const paymentCL = ethers_1.BigNumber.from(value);
    const paymentAgoricLink = paymentCL.mul(LINK_AGORIC_UNIT).div(LINK_UNIT);
    return paymentAgoricLink.toNumber();
};
exports.getRequiredFee = getRequiredFee;
const executeImpl = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, inputParams);
    if (validator.error) {
        throw validator.error;
    }
    ea_bootstrap_1.Requester.logConfig(config);
    const jobRunID = validator.validated.id;
    const { request_id: queryId, result, payment } = validator.validated.data;
    const requiredFee = exports.getRequiredFee(payment);
    const obj = {
        type: 'oracleServer/reply',
        data: { queryId, reply: result, requiredFee },
    };
    const response = await ea_bootstrap_1.Requester.request({
        ...config.api,
        method: 'POST',
        data: obj,
    }, undefined, NUM_RETRIES);
    const pr = response.data;
    if (!pr.ok) {
        throw Error(`${obj.type} response failed: ${pr.rej}`);
    }
    return ea_bootstrap_1.Requester.success(jobRunID, {
        data: { result },
        status: 200,
    });
};
const tryExecuteLogError = (execute) => async (request, context, config) => {
    try {
        return await execute(request, context, config);
    }
    catch (e) {
        const queryId = request.data?.request_id;
        const rest = { queryId };
        await ea_bootstrap_1.Requester.request({
            ...config.api,
            method: 'POST',
            data: {
                type: 'oracleServer/error',
                data: { error: `${(e && e.message) || e}`, ...(queryId && rest) },
            },
        }, undefined, NUM_RETRIES).catch((e2) => console.error(`Cannot reflect error to caller:`, e2));
        // See https://github.com/smartcontractkit/external-adapters-js/issues/204
        // for discussion of why this code is necessary.
        if (e instanceof ea_bootstrap_1.AdapterError) {
            throw e;
        }
        throw new ea_bootstrap_1.AdapterError({
            jobRunID: request.id,
            statusCode: 500,
            message: `${(e && e.message) || e}`,
            cause: e,
        });
    }
};
exports.execute = tryExecuteLogError(executeImpl);
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFrQztBQUdsQywwREFBNEU7QUFFNUUscUNBQXFDO0FBRXJDLGdFQUFnRTtBQUNoRSxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUE7QUFPckIsTUFBTSxXQUFXLEdBQUc7SUFDbEIsVUFBVSxFQUFFLENBQUMsWUFBWSxDQUFDO0lBQzFCLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUNsQixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7Q0FDckIsQ0FBQTtBQUVELDJDQUEyQztBQUMzQyxNQUFNLFNBQVMsR0FBRyxrQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUM1RCxNQUFNLGdCQUFnQixHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBRWxFLGlFQUFpRTtBQUMxRCxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQXNCLEVBQVUsRUFBRTtJQUMvRCxNQUFNLFNBQVMsR0FBRyxrQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN2QyxNQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDeEUsT0FBTyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUNyQyxDQUFDLENBQUE7QUFKWSxRQUFBLGNBQWMsa0JBSTFCO0FBUUQsTUFBTSxXQUFXLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzFFLE1BQU0sU0FBUyxH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LENBQUMsQ0FBQTtLQUNIO0FBQ0gsQ0FBQyxDQUFBO0FBRVUsUUFBQSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDL0MsTUFBTSxXQUFXLEdBQTJCLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDNUQsT0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLG1CQUFVLEVBQUUsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQTtBQUZZLFFBQUEsV0FBVyxlQUV2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJpZ051bWJlciB9IGZyb20gJ2V0aGVycydcblxuaW1wb3J0IHsgQ29uZmlnLCBFeGVjdXRlV2l0aENvbmZpZywgRXhlY3V0ZUZhY3RvcnkgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IsIEFkYXB0ZXJFcnJvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuXG5pbXBvcnQgeyBtYWtlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5cbi8vIFdlJ3JlIG9uIGxvY2FsaG9zdCwgc28gcmV0cmllcyBqdXN0IGNvbmZ1c2UgdGhlIG9yYWNsZSBzdGF0ZS5cbmNvbnN0IE5VTV9SRVRSSUVTID0gMVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbiB7XG4gIHR5cGU6IHN0cmluZ1xuICBkYXRhOiB1bmtub3duXG59XG5cbmNvbnN0IGlucHV0UGFyYW1zID0ge1xuICByZXF1ZXN0X2lkOiBbJ3JlcXVlc3RfaWQnXSxcbiAgcmVzdWx0OiBbJ3Jlc3VsdCddLFxuICBwYXltZW50OiBbJ3BheW1lbnQnXSxcbn1cblxuLy8gRklYTUU6IElkZWFsbHksIHRoZXNlIHdvdWxkIGJlIHRoZSBzYW1lLlxuY29uc3QgTElOS19VTklUID0gQmlnTnVtYmVyLmZyb20oMTApLnBvdyhCaWdOdW1iZXIuZnJvbSgxOCkpXG5jb25zdCBMSU5LX0FHT1JJQ19VTklUID0gQmlnTnVtYmVyLmZyb20oMTApLnBvdyhCaWdOdW1iZXIuZnJvbSg2KSlcblxuLy8gQ29udmVydCB0aGUgcGF5bWVudCBpbiAkTElOSyBpbnRvIEFnb3JpYydzIHBlZ2dlZCAkTElOSyB0b2tlbi5cbmV4cG9ydCBjb25zdCBnZXRSZXF1aXJlZEZlZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgY29uc3QgcGF5bWVudENMID0gQmlnTnVtYmVyLmZyb20odmFsdWUpXG4gIGNvbnN0IHBheW1lbnRBZ29yaWNMaW5rID0gcGF5bWVudENMLm11bChMSU5LX0FHT1JJQ19VTklUKS5kaXYoTElOS19VTklUKVxuICByZXR1cm4gcGF5bWVudEFnb3JpY0xpbmsudG9OdW1iZXIoKVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBvc3RSZXBseSB7XG4gIG9rOiBib29sZWFuXG4gIHJlcz86IHVua25vd25cbiAgcmVqPzogdW5rbm93blxufVxuXG5jb25zdCBleGVjdXRlSW1wbDogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtcylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikge1xuICAgIHRocm93IHZhbGlkYXRvci5lcnJvclxuICB9XG5cbiAgUmVxdWVzdGVyLmxvZ0NvbmZpZyhjb25maWcpXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IHsgcmVxdWVzdF9pZDogcXVlcnlJZCwgcmVzdWx0LCBwYXltZW50IH0gPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGFcbiAgY29uc3QgcmVxdWlyZWRGZWUgPSBnZXRSZXF1aXJlZEZlZShwYXltZW50KVxuXG4gIGNvbnN0IG9iaiA9IHtcbiAgICB0eXBlOiAnb3JhY2xlU2VydmVyL3JlcGx5JyxcbiAgICBkYXRhOiB7IHF1ZXJ5SWQsIHJlcGx5OiByZXN1bHQsIHJlcXVpcmVkRmVlIH0sXG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KFxuICAgIHtcbiAgICAgIC4uLmNvbmZpZy5hcGksXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGE6IG9iaixcbiAgICB9LFxuICAgIHVuZGVmaW5lZCxcbiAgICBOVU1fUkVUUklFUyxcbiAgKVxuXG4gIGNvbnN0IHByID0gcmVzcG9uc2UuZGF0YSBhcyBQb3N0UmVwbHlcbiAgaWYgKCFwci5vaykge1xuICAgIHRocm93IEVycm9yKGAke29iai50eXBlfSByZXNwb25zZSBmYWlsZWQ6ICR7cHIucmVqfWApXG4gIH1cblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHtcbiAgICBkYXRhOiB7IHJlc3VsdCB9LFxuICAgIHN0YXR1czogMjAwLFxuICB9KVxufVxuXG5jb25zdCB0cnlFeGVjdXRlTG9nRXJyb3IgPVxuICAoZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPik6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPT5cbiAgYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc3QgcXVlcnlJZDogYW55ID0gcmVxdWVzdC5kYXRhPy5yZXF1ZXN0X2lkXG4gICAgICBjb25zdCByZXN0OiBhbnkgPSB7IHF1ZXJ5SWQgfVxuXG4gICAgICBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChcbiAgICAgICAge1xuICAgICAgICAgIC4uLmNvbmZpZy5hcGksXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdHlwZTogJ29yYWNsZVNlcnZlci9lcnJvcicsXG4gICAgICAgICAgICBkYXRhOiB7IGVycm9yOiBgJHsoZSAmJiBlLm1lc3NhZ2UpIHx8IGV9YCwgLi4uKHF1ZXJ5SWQgJiYgcmVzdCkgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIE5VTV9SRVRSSUVTLFxuICAgICAgKS5jYXRjaCgoZTI6IEVycm9yKSA9PiBjb25zb2xlLmVycm9yKGBDYW5ub3QgcmVmbGVjdCBlcnJvciB0byBjYWxsZXI6YCwgZTIpKVxuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3NtYXJ0Y29udHJhY3RraXQvZXh0ZXJuYWwtYWRhcHRlcnMtanMvaXNzdWVzLzIwNFxuICAgICAgLy8gZm9yIGRpc2N1c3Npb24gb2Ygd2h5IHRoaXMgY29kZSBpcyBuZWNlc3NhcnkuXG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEFkYXB0ZXJFcnJvcikge1xuICAgICAgICB0aHJvdyBlXG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgICAgam9iUnVuSUQ6IHJlcXVlc3QuaWQsXG4gICAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgICAgbWVzc2FnZTogYCR7KGUgJiYgZS5tZXNzYWdlKSB8fCBlfWAsXG4gICAgICAgIGNhdXNlOiBlLFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGUgPSB0cnlFeGVjdXRlTG9nRXJyb3IoZXhlY3V0ZUltcGwpXG5leHBvcnQgY29uc3QgbWFrZUV4ZWN1dGU6IEV4ZWN1dGVGYWN0b3J5PENvbmZpZz4gPSAoY29uZmlnKSA9PiB7XG4gIHJldHVybiBhc3luYyAocmVxdWVzdCwgY29udGV4dCkgPT4gZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcgfHwgbWFrZUNvbmZpZygpKVxufVxuIl19