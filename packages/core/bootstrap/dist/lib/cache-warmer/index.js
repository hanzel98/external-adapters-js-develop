"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCacheWarmer = exports.DEFAULT_WARMUP_ENABLED = exports.reducer = exports.epics = exports.actions = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../index");
const external_adapter_1 = require("../external-adapter");
const util_1 = require("../metrics/util");
const util = tslib_1.__importStar(require("../util"));
const config_1 = require("../ws/config");
const reducer_1 = require("../ws/reducer");
const utils_1 = require("../ws/utils");
const actions = tslib_1.__importStar(require("./actions"));
const util_2 = require("./util");
const cache_1 = require("../cache");
exports.actions = tslib_1.__importStar(require("./actions"));
exports.epics = tslib_1.__importStar(require("./epics"));
exports.reducer = tslib_1.__importStar(require("./reducer"));
exports.DEFAULT_WARMUP_ENABLED = true;
const withCacheWarmer = (warmerStore, middleware, ws) => (rawExecute) => async (execute, context) => async (input) => {
    const isWarmerActive = util.parseBool(util.getEnv('CACHE_ENABLED') ?? cache_1.DEFAULT_CACHE_ENABLED) &&
        util.parseBool(util.getEnv('WARMUP_ENABLED') ?? exports.DEFAULT_WARMUP_ENABLED);
    if (!isWarmerActive)
        return await execute(input, context);
    const wsConfig = config_1.getWSConfig(input.data.endpoint);
    const warmupSubscribedPayload = {
        ...input,
        // We need to initilialize the middleware on every beat to open a connection with the cache
        // Wrapping `rawExecute` as `execute` is already wrapped with the default middleware. Warmer doesn't need every default middleware
        executeFn: async (input) => await (await index_1.withMiddleware(rawExecute, context, middleware))(input, context),
        // Dummy result
        result: {
            jobRunID: '1',
            statusCode: 200,
            data: {},
            result: 1,
        },
    };
    if (wsConfig.enabled && ws.makeWSHandler) {
        // If WS is available, and there is an active subscription, warmer should not be active
        const wsHandler = await ws.makeWSHandler();
        let batchMemberHasActiveWSSubscription = false;
        await utils_1.separateBatches(input, async (singleInput) => {
            const wsSubscriptionKey = reducer_1.getSubsId(wsHandler.subscribe(singleInput));
            const cacheWarmerKey = util_2.getSubscriptionKey(warmupSubscribedPayload);
            // Could happen that a subscription is still loading. If that's the case, warmer will open a subscription. If the WS becomes active, on next requests warmer will be unsubscribed
            const isActiveWSSubscription = ws.store.getState().subscriptions.all[wsSubscriptionKey]?.active;
            // If there is a WS subscription active, warmup subscription (if exists) should be removed, and not play for the moment
            const isActiveCWSubsciption = warmerStore.getState().subscriptions[cacheWarmerKey];
            if (isActiveWSSubscription) {
                if (isActiveCWSubsciption) {
                    external_adapter_1.logger.info(`Active WS feed detected: disabling cache warmer for ${util_1.getFeedId(singleInput)}`);
                    // If there is a Batch WS subscription active, warmup subscription should be removed
                    if (isActiveCWSubsciption.parent && isActiveCWSubsciption.batchablePropertyPath)
                        warmerStore.dispatch(actions.warmupLeaveGroup({
                            parent: isActiveCWSubsciption.parent,
                            childLastSeenById: { [cacheWarmerKey]: Date.now() },
                            batchablePropertyPath: isActiveCWSubsciption.batchablePropertyPath,
                        }));
                    warmerStore.dispatch(actions.warmupUnsubscribed({
                        key: cacheWarmerKey,
                        reason: 'Turning off Cache Warmer to use WS.',
                    }));
                }
                batchMemberHasActiveWSSubscription = true;
            }
        });
        if (batchMemberHasActiveWSSubscription) {
            return await execute(input, context);
        }
    }
    // In case WS is not available, or WS has no active subscription, warmer should be active
    // Dispatch subscription only if execute was succesful
    const result = await execute(input, context);
    const warmupExecutePayload = {
        ...input,
        executeFn: async (input) => await (await index_1.withMiddleware(rawExecute, context, middleware))(input, context),
        result,
    };
    warmerStore.dispatch(actions.warmupExecute(warmupExecutePayload));
    return result;
};
exports.withCacheWarmer = withCacheWarmer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NhY2hlLXdhcm1lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsdUNBQTRDO0FBQzVDLDBEQUE0QztBQUM1QywwQ0FBMkM7QUFDM0Msc0RBQStCO0FBQy9CLHlDQUEwQztBQUMxQywyQ0FBK0Q7QUFDL0QsdUNBQTZDO0FBQzdDLDJEQUFvQztBQUVwQyxpQ0FBMkM7QUFDM0Msb0NBQWdEO0FBRWhELDZEQUFvQztBQUNwQyx5REFBZ0M7QUFDaEMsNkRBQW9DO0FBRXZCLFFBQUEsc0JBQXNCLEdBQUcsSUFBSSxDQUFBO0FBT25DLE1BQU0sZUFBZSxHQUMxQixDQUFDLFdBQW9DLEVBQUUsVUFBd0IsRUFBRSxFQUFXLEVBQUUsRUFBRSxDQUNoRixDQUFDLFVBQW1CLEVBQWMsRUFBRSxDQUNwQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQzNCLEtBQUssRUFBRSxLQUFxQixFQUFFLEVBQUU7SUFDOUIsTUFBTSxjQUFjLEdBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSw2QkFBcUIsQ0FBQztRQUNyRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSw4QkFBc0IsQ0FBQyxDQUFBO0lBQ3pFLElBQUksQ0FBQyxjQUFjO1FBQUUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFekQsTUFBTSxRQUFRLEdBQUcsb0JBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2pELE1BQU0sdUJBQXVCLEdBQW9DO1FBQy9ELEdBQUcsS0FBSztRQUNSLDJGQUEyRjtRQUMzRixrSUFBa0k7UUFDbEksU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFxQixFQUFF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RlUsUUFBQSxlQUFlLG1CQXNGekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGFwdGVyUmVxdWVzdCwgRXhlY3V0ZSwgTWFrZVdTSGFuZGxlciwgTWlkZGxld2FyZSB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgd2l0aE1pZGRsZXdhcmUgfSBmcm9tICcuLi8uLi9pbmRleCdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uL2V4dGVybmFsLWFkYXB0ZXInXG5pbXBvcnQgeyBnZXRGZWVkSWQgfSBmcm9tICcuLi9tZXRyaWNzL3V0aWwnXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgeyBnZXRXU0NvbmZpZyB9IGZyb20gJy4uL3dzL2NvbmZpZydcbmltcG9ydCB7IGdldFN1YnNJZCwgUm9vdFN0YXRlIGFzIFdTU3RhdGUgfSBmcm9tICcuLi93cy9yZWR1Y2VyJ1xuaW1wb3J0IHsgc2VwYXJhdGVCYXRjaGVzIH0gZnJvbSAnLi4vd3MvdXRpbHMnXG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucydcbmltcG9ydCB7IENhY2hlV2FybWVyU3RhdGUgfSBmcm9tICcuL3JlZHVjZXInXG5pbXBvcnQgeyBnZXRTdWJzY3JpcHRpb25LZXkgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgeyBERUZBVUxUX0NBQ0hFX0VOQUJMRUQgfSBmcm9tICcuLi9jYWNoZSdcblxuZXhwb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnXG5leHBvcnQgKiBhcyBlcGljcyBmcm9tICcuL2VwaWNzJ1xuZXhwb3J0ICogYXMgcmVkdWNlciBmcm9tICcuL3JlZHVjZXInXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1dBUk1VUF9FTkFCTEVEID0gdHJ1ZVxuXG5pbnRlcmZhY2UgV1NJbnB1dCB7XG4gIHN0b3JlOiBTdG9yZTxXU1N0YXRlPlxuICBtYWtlV1NIYW5kbGVyPzogTWFrZVdTSGFuZGxlclxufVxuXG5leHBvcnQgY29uc3Qgd2l0aENhY2hlV2FybWVyID1cbiAgKHdhcm1lclN0b3JlOiBTdG9yZTxDYWNoZVdhcm1lclN0YXRlPiwgbWlkZGxld2FyZTogTWlkZGxld2FyZVtdLCB3czogV1NJbnB1dCkgPT5cbiAgKHJhd0V4ZWN1dGU6IEV4ZWN1dGUpOiBNaWRkbGV3YXJlID0+XG4gIGFzeW5jIChleGVjdXRlLCBjb250ZXh0KSA9PlxuICBhc3luYyAoaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0KSA9PiB7XG4gICAgY29uc3QgaXNXYXJtZXJBY3RpdmUgPVxuICAgICAgdXRpbC5wYXJzZUJvb2wodXRpbC5nZXRFbnYoJ0NBQ0hFX0VOQUJMRUQnKSA/PyBERUZBVUxUX0NBQ0hFX0VOQUJMRUQpICYmXG4gICAgICB1dGlsLnBhcnNlQm9vbCh1dGlsLmdldEVudignV0FSTVVQX0VOQUJMRUQnKSA/PyBERUZBVUxUX1dBUk1VUF9FTkFCTEVEKVxuICAgIGlmICghaXNXYXJtZXJBY3RpdmUpIHJldHVybiBhd2FpdCBleGVjdXRlKGlucHV0LCBjb250ZXh0KVxuXG4gICAgY29uc3Qgd3NDb25maWcgPSBnZXRXU0NvbmZpZyhpbnB1dC5kYXRhLmVuZHBvaW50KVxuICAgIGNvbnN0IHdhcm11cFN1YnNjcmliZWRQYXlsb2FkOiBhY3Rpb25zLldhcm11cFN1YnNjcmliZWRQYXlsb2FkID0ge1xuICAgICAgLi4uaW5wdXQsXG4gICAgICAvLyBXZSBuZWVkIHRvIGluaXRpbGlhbGl6ZSB0aGUgbWlkZGxld2FyZSBvbiBldmVyeSBiZWF0IHRvIG9wZW4gYSBjb25uZWN0aW9uIHdpdGggdGhlIGNhY2hlXG4gICAgICAvLyBXcmFwcGluZyBgcmF3RXhlY3V0ZWAgYXMgYGV4ZWN1dGVgIGlzIGFscmVhZHkgd3JhcHBlZCB3aXRoIHRoZSBkZWZhdWx0IG1pZGRsZXdhcmUuIFdhcm1lciBkb2Vzbid0IG5lZWQgZXZlcnkgZGVmYXVsdCBtaWRkbGV3YXJlXG4gICAgICBleGVjdXRlRm46IGFzeW5jIChpbnB1dDogQWRhcHRlclJlcXVlc3QpID0+XG4gICAgICAgIGF3YWl0IChcbiAgICAgICAgICBhd2FpdCB3aXRoTWlkZGxld2FyZShyYXdFeGVjdXRlLCBjb250ZXh0LCBtaWRkbGV3YXJlKVxuICAgICAgICApKGlucHV0LCBjb250ZXh0KSxcbiAgICAgIC8vIER1bW15IHJlc3VsdFxuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGpvYlJ1bklEOiAnMScsXG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgZGF0YToge30sXG4gICAgICAgIHJlc3VsdDogMSxcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgaWYgKHdzQ29uZmlnLmVuYWJsZWQgJiYgd3MubWFrZVdTSGFuZGxlcikge1xuICAgICAgLy8gSWYgV1MgaXMgYXZhaWxhYmxlLCBhbmQgdGhlcmUgaXMgYW4gYWN0aXZlIHN1YnNjcmlwdGlvbiwgd2FybWVyIHNob3VsZCBub3QgYmUgYWN0aXZlXG4gICAgICBjb25zdCB3c0hhbmRsZXIgPSBhd2FpdCB3cy5tYWtlV1NIYW5kbGVyKClcblxuICAgICAgbGV0IGJhdGNoTWVtYmVySGFzQWN0aXZlV1NTdWJzY3JpcHRpb24gPSBmYWxzZVxuICAgICAgYXdhaXQgc2VwYXJhdGVCYXRjaGVzKGlucHV0LCBhc3luYyAoc2luZ2xlSW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHdzU3Vic2NyaXB0aW9uS2V5ID0gZ2V0U3Vic0lkKHdzSGFuZGxlci5zdWJzY3JpYmUoc2luZ2xlSW5wdXQpKVxuICAgICAgICBjb25zdCBjYWNoZVdhcm1lcktleSA9IGdldFN1YnNjcmlwdGlvbktleSh3YXJtdXBTdWJzY3JpYmVkUGF5bG9hZClcblxuICAgICAgICAvLyBDb3VsZCBoYXBwZW4gdGhhdCBhIHN1YnNjcmlwdGlvbiBpcyBzdGlsbCBsb2FkaW5nLiBJZiB0aGF0J3MgdGhlIGNhc2UsIHdhcm1lciB3aWxsIG9wZW4gYSBzdWJzY3JpcHRpb24uIElmIHRoZSBXUyBiZWNvbWVzIGFjdGl2ZSwgb24gbmV4dCByZXF1ZXN0cyB3YXJtZXIgd2lsbCBiZSB1bnN1YnNjcmliZWRcbiAgICAgICAgY29uc3QgaXNBY3RpdmVXU1N1YnNjcmlwdGlvbiA9XG4gICAgICAgICAgd3Muc3RvcmUuZ2V0U3RhdGUoKS5zdWJzY3JpcHRpb25zLmFsbFt3c1N1YnNjcmlwdGlvbktleV0/LmFjdGl2ZVxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIFdTIHN1YnNjcmlwdGlvbiBhY3RpdmUsIHdhcm11cCBzdWJzY3JpcHRpb24gKGlmIGV4aXN0cykgc2hvdWxkIGJlIHJlbW92ZWQsIGFuZCBub3QgcGxheSBmb3IgdGhlIG1vbWVudFxuICAgICAgICBjb25zdCBpc0FjdGl2ZUNXU3Vic2NpcHRpb24gPSB3YXJtZXJTdG9yZS5nZXRTdGF0ZSgpLnN1YnNjcmlwdGlvbnNbY2FjaGVXYXJtZXJLZXldXG4gICAgICAgIGlmIChpc0FjdGl2ZVdTU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgaWYgKGlzQWN0aXZlQ1dTdWJzY2lwdGlvbikge1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oXG4gICAgICAgICAgICAgIGBBY3RpdmUgV1MgZmVlZCBkZXRlY3RlZDogZGlzYWJsaW5nIGNhY2hlIHdhcm1lciBmb3IgJHtnZXRGZWVkSWQoc2luZ2xlSW5wdXQpfWAsXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIEJhdGNoIFdTIHN1YnNjcmlwdGlvbiBhY3RpdmUsIHdhcm11cCBzdWJzY3JpcHRpb24gc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgICAgICAgIGlmIChpc0FjdGl2ZUNXU3Vic2NpcHRpb24ucGFyZW50ICYmIGlzQWN0aXZlQ1dTdWJzY2lwdGlvbi5iYXRjaGFibGVQcm9wZXJ0eVBhdGgpXG4gICAgICAgICAgICAgIHdhcm1lclN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIGFjdGlvbnMud2FybXVwTGVhdmVHcm91cCh7XG4gICAgICAgICAgICAgICAgICBwYXJlbnQ6IGlzQWN0aXZlQ1dTdWJzY2lwdGlvbi5wYXJlbnQsXG4gICAgICAgICAgICAgICAgICBjaGlsZExhc3RTZWVuQnlJZDogeyBbY2FjaGVXYXJtZXJLZXldOiBEYXRlLm5vdygpIH0sXG4gICAgICAgICAgICAgICAgICBiYXRjaGFibGVQcm9wZXJ0eVBhdGg6IGlzQWN0aXZlQ1dTdWJzY2lwdGlvbi5iYXRjaGFibGVQcm9wZXJ0eVBhdGgsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIHdhcm1lclN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICBhY3Rpb25zLndhcm11cFVuc3Vic2NyaWJlZCh7XG4gICAgICAgICAgICAgICAga2V5OiBjYWNoZVdhcm1lcktleSxcbiAgICAgICAgICAgICAgICByZWFzb246ICdUdXJuaW5nIG9mZiBDYWNoZSBXYXJtZXIgdG8gdXNlIFdTLicsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBiYXRjaE1lbWJlckhhc0FjdGl2ZVdTU3Vic2NyaXB0aW9uID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKGJhdGNoTWVtYmVySGFzQWN0aXZlV1NTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGV4ZWN1dGUoaW5wdXQsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW4gY2FzZSBXUyBpcyBub3QgYXZhaWxhYmxlLCBvciBXUyBoYXMgbm8gYWN0aXZlIHN1YnNjcmlwdGlvbiwgd2FybWVyIHNob3VsZCBiZSBhY3RpdmVcbiAgICAvLyBEaXNwYXRjaCBzdWJzY3JpcHRpb24gb25seSBpZiBleGVjdXRlIHdhcyBzdWNjZXNmdWxcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlKGlucHV0LCBjb250ZXh0KVxuXG4gICAgY29uc3Qgd2FybXVwRXhlY3V0ZVBheWxvYWQ6IGFjdGlvbnMuV2FybXVwRXhlY3V0ZVBheWxvYWQgPSB7XG4gICAgICAuLi5pbnB1dCxcbiAgICAgIGV4ZWN1dGVGbjogYXN5bmMgKGlucHV0OiBBZGFwdGVyUmVxdWVzdCkgPT5cbiAgICAgICAgYXdhaXQgKFxuICAgICAgICAgIGF3YWl0IHdpdGhNaWRkbGV3YXJlKHJhd0V4ZWN1dGUsIGNvbnRleHQsIG1pZGRsZXdhcmUpXG4gICAgICAgICkoaW5wdXQsIGNvbnRleHQpLFxuICAgICAgcmVzdWx0LFxuICAgIH1cbiAgICB3YXJtZXJTdG9yZS5kaXNwYXRjaChhY3Rpb25zLndhcm11cEV4ZWN1dGUod2FybXVwRXhlY3V0ZVBheWxvYWQpKVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG4iXX0=