"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withBurstLimit = exports.reducer = exports.actions = void 0;
const tslib_1 = require("tslib");
const reducer_1 = require("./reducer");
const actions = tslib_1.__importStar(require("./actions"));
const config_1 = require("../cache-warmer/config");
const external_adapter_1 = require("../external-adapter");
exports.actions = tslib_1.__importStar(require("./actions"));
exports.reducer = tslib_1.__importStar(require("./reducer"));
const SECOND_LIMIT_RETRIES = 10;
const MINUTE_LIMIT_WARMER_BUFFER = 0.9;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const availableSecondLimitCapacity = async (store, burstCapacity1s) => {
    for (let retry = SECOND_LIMIT_RETRIES; retry > 0; retry--) {
        const state = store.getState();
        const { requests } = state;
        const observedRequestsInSecond = reducer_1.selectTotalNumberOfRequestsFor(requests, reducer_1.IntervalNames.SECOND);
        if (observedRequestsInSecond > burstCapacity1s) {
            external_adapter_1.logger.debug(`Per Second Burst rate limit cap of ${burstCapacity1s} reached. ${observedRequestsInSecond} requests sent in the last minute. Waiting 1 second. Retry number: ${retry}`);
            await delay(1000);
        }
        else
            return true;
    }
    return false;
};
const withBurstLimit = (store) => async (execute, context) => async (input) => {
    const config = context.rateLimit ?? {};
    if (!store || !config.enabled || (!config.burstCapacity1m && !config.burstCapacity1s))
        return await execute(input, context);
    const state = store.getState();
    const { requests } = state;
    // Limit by Second
    if (config.burstCapacity1s) {
        const availableCapacity = availableSecondLimitCapacity(store, config.burstCapacity1s);
        if (!availableCapacity) {
            external_adapter_1.logger.warn(`External Adapter backing off. Provider's limit of ${config.burstCapacity1s} requests per second reached.`);
            throw new external_adapter_1.AdapterError({
                jobRunID: input.id,
                message: 'New request backoff: Second Burst rate limit cap reached.',
                statusCode: 429,
            });
        }
    }
    // Limit by Minute
    if (config.burstCapacity1m) {
        const observedRequestsInMinute = reducer_1.selectTotalNumberOfRequestsFor(requests, reducer_1.IntervalNames.MINUTE);
        if (input.id !== config_1.WARMUP_BATCH_REQUEST_ID && // Always allow Batch Warmer requests through
            observedRequestsInMinute > config.burstCapacity1m * MINUTE_LIMIT_WARMER_BUFFER
        // TODO: determine BATCH_REQUEST_BUFFER dynamically based on (number of batch warmers * 3)
        ) {
            external_adapter_1.logger.warn(`External Adapter backing off. Provider's limit of ${config.burstCapacity1m * MINUTE_LIMIT_WARMER_BUFFER} requests per minute reached. ${observedRequestsInMinute} requests sent in the last minute.`);
            throw new external_adapter_1.AdapterError({
                jobRunID: input.id,
                message: 'New request backoff: Minute Burst rate limit cap reached.',
                statusCode: 429,
            });
        }
    }
    const requestObservedPayload = {
        input,
    };
    store.dispatch(actions.requestObserved(requestObservedPayload));
    return await execute(input, context);
};
exports.withBurstLimit = withBurstLimit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2J1cnN0LWxpbWl0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSx1Q0FLa0I7QUFDbEIsMkRBQW9DO0FBQ3BDLG1EQUFnRTtBQUNoRSwwREFBMEQ7QUFFMUQsNkRBQW9DO0FBQ3BDLDZEQUFvQztBQUVwQyxNQUFNLG9CQUFvQixHQUFHLEVBQUUsQ0FBQTtBQUMvQixNQUFNLDBCQUEwQixHQUFHLEdBQUcsQ0FBQTtBQUV0QyxNQUFNLEtBQUssR0FBRyxDQUFDLEVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUUvRSxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFDeEMsS0FBNkIsRUFDN0IsZUFBdUIsRUFDdkIsRUFBRTtJQUNGLEtBQUssSUFBSSxLQUFLLEdBQUcsb0JBQW9CLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN6RCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDOUIsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFnQyxLQUFLLENBQUE7UUFFdkQsTUFBTSx3QkFBd0IsR0FBRyx3Q0FBOEIsQ0FBQyxRQUFRLEVBQUUsdUJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUUvRixJQUFJLHdCQUF3QixHQUFHLGVBQWUsRUFBRTtZQUM5Qyx5QkFBTSxDQUFDLEtBQUssQ0FDVixzQ0FBc0MsZUFBZSxhQUFhLHdCQUF3QixzRUFBc0UsS0FBSyxFQUFFLENBQ3hLLENBQUE7WUFDRCxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNsQjs7WUFBTSxPQUFPLElBQUksQ0FBQTtLQUNuQjtJQUNELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBO0FBRU0sTUFBTSxjQUFjLEdBQ3pCLENBQUMsS0FBOEIsRUFBYyxFQUFFLENBQy9DLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FDM0IsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ2QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUE7SUFDdEMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQ25GLE9BQU8sTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRXRDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUM5QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQWdDLEtBQUssQ0FBQTtJQUV2RCxrQkFBa0I7SUFDbEIsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFO1FBQzFCLE1BQU0saUJBQWlCLEdBQUcsNEJBQTRCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNyRixJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDdEIseUJBQU0sQ0FBQyxJQUFJLENBQ1QscURBQXFELE1BQU0sQ0FBQyxlQUFlLCtCQUErQixDQUMzRyxDQUFBO1lBQ0QsTUFBTSxJQUFJLCtCQUFZLENBQUM7Z0JBQ3JCLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbEIsT0FBTyxFQUFFLDJEQUEyRDtnQkFDcEUsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFBO1NBQ0g7S0FDRjtJQUVELGtCQUFrQjtJQUNsQixJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7UUFDMUIsTUFBTSx3QkFBd0IsR0FBRyx3Q0FBOEIsQ0FDN0QsUUFBUSxFQUNSLHVCQUFhLENBQUMsTUFBTSxDQUNyQixDQUFBO1FBRUQsSUFDRSxLQUFLLENBQUMsRUFBRSxLQUFLLGdDQUF1QixJQUFJLDZDQUE2QztZQUNyRix3QkFBd0IsR0FBRyxNQUFNLENBQUMsZUFBZSxHQUFHLDBCQUEwQjtRQUM5RSwwRkFBMEY7VUFDMUY7WUFDQSx5QkFBTSxDQUFDLElBQUksQ0FDVCxxREFDRSxNQUFNLENBQUMsZUFBZSxHQUFHLDBCQUMzQixpQ0FBaUMsd0JBQXdCLG9DQUFvQyxDQUM5RixDQUFBO1lBQ0QsTUFBTSxJQUFJLCtCQUFZLENBQUM7Z0JBQ3JCLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbEIsT0FBTyxFQUFFLDJEQUEyRDtnQkFDcEUsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFBO1NBQ0g7S0FDRjtJQUVELE1BQU0sc0JBQXNCLEdBQW1DO1FBQzdELEtBQUs7S0FDTixDQUFBO0lBQ0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQTtJQUUvRCxPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUE7QUF6RFUsUUFBQSxjQUFjLGtCQXlEeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNaWRkbGV3YXJlIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQge1xuICBCdXJzdExpbWl0U3RhdGUsXG4gIEludGVydmFsTmFtZXMsXG4gIFJlcXVlc3RzU3RhdGUsXG4gIHNlbGVjdFRvdGFsTnVtYmVyT2ZSZXF1ZXN0c0Zvcixcbn0gZnJvbSAnLi9yZWR1Y2VyJ1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnXG5pbXBvcnQgeyBXQVJNVVBfQkFUQ0hfUkVRVUVTVF9JRCB9IGZyb20gJy4uL2NhY2hlLXdhcm1lci9jb25maWcnXG5pbXBvcnQgeyBBZGFwdGVyRXJyb3IsIGxvZ2dlciB9IGZyb20gJy4uL2V4dGVybmFsLWFkYXB0ZXInXG5cbmV4cG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJ1xuZXhwb3J0ICogYXMgcmVkdWNlciBmcm9tICcuL3JlZHVjZXInXG5cbmNvbnN0IFNFQ09ORF9MSU1JVF9SRVRSSUVTID0gMTBcbmNvbnN0IE1JTlVURV9MSU1JVF9XQVJNRVJfQlVGRkVSID0gMC45XG5cbmNvbnN0IGRlbGF5ID0gKG1zOiBudW1iZXIpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSlcblxuY29uc3QgYXZhaWxhYmxlU2Vjb25kTGltaXRDYXBhY2l0eSA9IGFzeW5jIChcbiAgc3RvcmU6IFN0b3JlPEJ1cnN0TGltaXRTdGF0ZT4sXG4gIGJ1cnN0Q2FwYWNpdHkxczogbnVtYmVyLFxuKSA9PiB7XG4gIGZvciAobGV0IHJldHJ5ID0gU0VDT05EX0xJTUlUX1JFVFJJRVM7IHJldHJ5ID4gMDsgcmV0cnktLSkge1xuICAgIGNvbnN0IHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKVxuICAgIGNvbnN0IHsgcmVxdWVzdHMgfTogeyByZXF1ZXN0czogUmVxdWVzdHNTdGF0ZSB9ID0gc3RhdGVcblxuICAgIGNvbnN0IG9ic2VydmVkUmVxdWVzdHNJblNlY29uZCA9IHNlbGVjdFRvdGFsTnVtYmVyT2ZSZXF1ZXN0c0ZvcihyZXF1ZXN0cywgSW50ZXJ2YWxOYW1lcy5TRUNPTkQpXG5cbiAgICBpZiAob2JzZXJ2ZWRSZXF1ZXN0c0luU2Vjb25kID4gYnVyc3RDYXBhY2l0eTFzKSB7XG4gICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgIGBQZXIgU2Vjb25kIEJ1cnN0IHJhdGUgbGltaXQgY2FwIG9mICR7YnVyc3RDYXBhY2l0eTFzfSByZWFjaGVkLiAke29ic2VydmVkUmVxdWVzdHNJblNlY29uZH0gcmVxdWVzdHMgc2VudCBpbiB0aGUgbGFzdCBtaW51dGUuIFdhaXRpbmcgMSBzZWNvbmQuIFJldHJ5IG51bWJlcjogJHtyZXRyeX1gLFxuICAgICAgKVxuICAgICAgYXdhaXQgZGVsYXkoMTAwMClcbiAgICB9IGVsc2UgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGNvbnN0IHdpdGhCdXJzdExpbWl0ID1cbiAgKHN0b3JlPzogU3RvcmU8QnVyc3RMaW1pdFN0YXRlPik6IE1pZGRsZXdhcmUgPT5cbiAgYXN5bmMgKGV4ZWN1dGUsIGNvbnRleHQpID0+XG4gIGFzeW5jIChpbnB1dCkgPT4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IGNvbnRleHQucmF0ZUxpbWl0ID8/IHt9XG4gICAgaWYgKCFzdG9yZSB8fCAhY29uZmlnLmVuYWJsZWQgfHwgKCFjb25maWcuYnVyc3RDYXBhY2l0eTFtICYmICFjb25maWcuYnVyc3RDYXBhY2l0eTFzKSlcbiAgICAgIHJldHVybiBhd2FpdCBleGVjdXRlKGlucHV0LCBjb250ZXh0KVxuXG4gICAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpXG4gICAgY29uc3QgeyByZXF1ZXN0cyB9OiB7IHJlcXVlc3RzOiBSZXF1ZXN0c1N0YXRlIH0gPSBzdGF0ZVxuXG4gICAgLy8gTGltaXQgYnkgU2Vjb25kXG4gICAgaWYgKGNvbmZpZy5idXJzdENhcGFjaXR5MXMpIHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZUNhcGFjaXR5ID0gYXZhaWxhYmxlU2Vjb25kTGltaXRDYXBhY2l0eShzdG9yZSwgY29uZmlnLmJ1cnN0Q2FwYWNpdHkxcylcbiAgICAgIGlmICghYXZhaWxhYmxlQ2FwYWNpdHkpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgICAgYEV4dGVybmFsIEFkYXB0ZXIgYmFja2luZyBvZmYuIFByb3ZpZGVyJ3MgbGltaXQgb2YgJHtjb25maWcuYnVyc3RDYXBhY2l0eTFzfSByZXF1ZXN0cyBwZXIgc2Vjb25kIHJlYWNoZWQuYCxcbiAgICAgICAgKVxuICAgICAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgICAgICBqb2JSdW5JRDogaW5wdXQuaWQsXG4gICAgICAgICAgbWVzc2FnZTogJ05ldyByZXF1ZXN0IGJhY2tvZmY6IFNlY29uZCBCdXJzdCByYXRlIGxpbWl0IGNhcCByZWFjaGVkLicsXG4gICAgICAgICAgc3RhdHVzQ29kZTogNDI5LFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIExpbWl0IGJ5IE1pbnV0ZVxuICAgIGlmIChjb25maWcuYnVyc3RDYXBhY2l0eTFtKSB7XG4gICAgICBjb25zdCBvYnNlcnZlZFJlcXVlc3RzSW5NaW51dGUgPSBzZWxlY3RUb3RhbE51bWJlck9mUmVxdWVzdHNGb3IoXG4gICAgICAgIHJlcXVlc3RzLFxuICAgICAgICBJbnRlcnZhbE5hbWVzLk1JTlVURSxcbiAgICAgIClcblxuICAgICAgaWYgKFxuICAgICAgICBpbnB1dC5pZCAhPT0gV0FSTVVQX0JBVENIX1JFUVVFU1RfSUQgJiYgLy8gQWx3YXlzIGFsbG93IEJhdGNoIFdhcm1lciByZXF1ZXN0cyB0aHJvdWdoXG4gICAgICAgIG9ic2VydmVkUmVxdWVzdHNJbk1pbnV0ZSA+IGNvbmZpZy5idXJzdENhcGFjaXR5MW0gKiBNSU5VVEVfTElNSVRfV0FSTUVSX0JVRkZFUlxuICAgICAgICAvLyBUT0RPOiBkZXRlcm1pbmUgQkFUQ0hfUkVRVUVTVF9CVUZGRVIgZHluYW1pY2FsbHkgYmFzZWQgb24gKG51bWJlciBvZiBiYXRjaCB3YXJtZXJzICogMylcbiAgICAgICkge1xuICAgICAgICBsb2dnZXIud2FybihcbiAgICAgICAgICBgRXh0ZXJuYWwgQWRhcHRlciBiYWNraW5nIG9mZi4gUHJvdmlkZXIncyBsaW1pdCBvZiAke1xuICAgICAgICAgICAgY29uZmlnLmJ1cnN0Q2FwYWNpdHkxbSAqIE1JTlVURV9MSU1JVF9XQVJNRVJfQlVGRkVSXG4gICAgICAgICAgfSByZXF1ZXN0cyBwZXIgbWludXRlIHJlYWNoZWQuICR7b2JzZXJ2ZWRSZXF1ZXN0c0luTWludXRlfSByZXF1ZXN0cyBzZW50IGluIHRoZSBsYXN0IG1pbnV0ZS5gLFxuICAgICAgICApXG4gICAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3Ioe1xuICAgICAgICAgIGpvYlJ1bklEOiBpbnB1dC5pZCxcbiAgICAgICAgICBtZXNzYWdlOiAnTmV3IHJlcXVlc3QgYmFja29mZjogTWludXRlIEJ1cnN0IHJhdGUgbGltaXQgY2FwIHJlYWNoZWQuJyxcbiAgICAgICAgICBzdGF0dXNDb2RlOiA0MjksXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdE9ic2VydmVkUGF5bG9hZDogYWN0aW9ucy5SZXF1ZXN0T2JzZXJ2ZWRQYXlsb2FkID0ge1xuICAgICAgaW5wdXQsXG4gICAgfVxuICAgIHN0b3JlLmRpc3BhdGNoKGFjdGlvbnMucmVxdWVzdE9ic2VydmVkKHJlcXVlc3RPYnNlcnZlZFBheWxvYWQpKVxuXG4gICAgcmV0dXJuIGF3YWl0IGV4ZWN1dGUoaW5wdXQsIGNvbnRleHQpXG4gIH1cbiJdfQ==