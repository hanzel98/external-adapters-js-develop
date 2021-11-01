"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withWebSockets = exports.types = exports.reducer = exports.epics = exports.config = exports.actions = void 0;
const tslib_1 = require("tslib");
const actions_1 = require("./actions");
const config_1 = require("./config");
const cache_1 = require("../cache");
const utils_1 = require("./utils");
exports.actions = tslib_1.__importStar(require("./actions"));
exports.config = tslib_1.__importStar(require("./config"));
exports.epics = tslib_1.__importStar(require("./epics"));
exports.reducer = tslib_1.__importStar(require("./reducer"));
exports.types = tslib_1.__importStar(require("./types"));
const config_2 = require("../cache-warmer/config");
const withWebSockets = (store, makeWsHandler) => async (execute, context) => async (input) => {
    const wsConfig = config_1.getWSConfig(input.data.endpoint);
    if (!makeWsHandler || !wsConfig.enabled)
        return await execute(input, context); // ignore middleware if conditions are met
    if (input.id === config_2.WARMUP_REQUEST_ID || input.id === config_2.WARMUP_BATCH_REQUEST_ID)
        return await execute(input, context); // ignore middleware if warmer request
    const wsHandler = await makeWsHandler();
    if (wsHandler.shouldNotServeInputUsingWS && wsHandler.shouldNotServeInputUsingWS(input)) {
        return await execute(input, context);
    }
    if (wsHandler.programmaticConnectionInfo) {
        const programmaticConnectionInfo = wsHandler.programmaticConnectionInfo(input);
        if (programmaticConnectionInfo) {
            wsConfig.connectionInfo.key = programmaticConnectionInfo.key;
            wsHandler.connection.url = programmaticConnectionInfo.url;
        }
    }
    store.dispatch(actions_1.connectRequested({ config: wsConfig, wsHandler, context, request: input }));
    if (isConnected(store, wsConfig.connectionInfo.key)) {
        await utils_1.separateBatches(input, async (singleInput) => {
            const subscriptionMsg = wsHandler.subscribe(singleInput);
            if (!subscriptionMsg)
                return;
            const subscriptionPayload = {
                connectionInfo: {
                    key: wsConfig.connectionInfo.key,
                    url: wsHandler.connection.url,
                },
                subscriptionMsg,
                input: singleInput,
                context,
            };
            store.dispatch(actions_1.subscribeRequested(subscriptionPayload));
        });
    }
    // Check if adapter only supports WS
    if (wsHandler.noHttp) {
        // If so, we try to get a result from cache within API_TIMEOUT
        const requestTimeout = Number(process.env.API_TIMEOUT) || 30000;
        const deadline = Date.now() + requestTimeout;
        return await awaitResult(context, input, deadline);
    }
    return await execute(input, context);
};
exports.withWebSockets = withWebSockets;
const isConnected = (store, connectionKey) => {
    const state = store.getState();
    const connectionState = state.connections.all[connectionKey];
    if (!connectionState) {
        return false;
    }
    const isActiveConnection = connectionState.active;
    const isConnecting = connectionState.connecting > 1;
    const hasOnConnectChainCompleted = connectionState.isOnConnectChainComplete;
    return isActiveConnection && !isConnecting && hasOnConnectChainCompleted;
};
const awaitResult = async (context, input, deadline) => {
    const adapterCache = new cache_1.AdapterCache(context);
    const pollInterval = 1000;
    while (Date.now() < deadline - pollInterval) {
        const cachedAdapterResponse = await adapterCache.getResultForRequest(input);
        if (cachedAdapterResponse)
            return cachedAdapterResponse;
        await sleep(pollInterval);
    }
    throw Error('timed out waiting for result to be cached');
};
const sleep = async (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3dzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSx1Q0FBdUY7QUFDdkYscUNBQXNDO0FBRXRDLG9DQUF1QztBQUN2QyxtQ0FBeUM7QUFFekMsNkRBQW9DO0FBQ3BDLDJEQUFrQztBQUNsQyx5REFBZ0M7QUFDaEMsNkRBQW9DO0FBQ3BDLHlEQUFnQztBQUVoQyxtREFBbUY7QUFFNUUsTUFBTSxjQUFjLEdBQ3pCLENBQUMsS0FBdUIsRUFBRSxhQUE2QixFQUFjLEVBQUUsQ0FDdkUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUMzQixLQUFLLEVBQUUsS0FBcUIsRUFBRSxFQUFFO0lBQzlCLE1BQU0sUUFBUSxHQUFHLG9CQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNqRCxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87UUFBRSxPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQSxDQUFDLDBDQUEwQztJQUN4SCxJQUFJLEtBQUssQ0FBQyxFQUFFLEtBQUssMEJBQWlCLElBQUksS0FBSyxDQUFDLEVBQUUsS0FBSyxnQ0FBdUI7UUFDeEUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUEsQ0FBQyxzQ0FBc0M7SUFFN0UsTUFBTSxTQUFTLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQTtJQUN2QyxJQUFJLFNBQVMsQ0FBQywwQkFBMEIsSUFBSSxTQUFTLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdkYsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7S0FDckM7SUFDRCxJQUFJLFNBQVMsQ0FBQywwQkFBMEIsRUFBRTtRQUN4QyxNQUFNLDBCQUEwQixH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bUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDM0UsSUFBSSxxQkFBcUI7WUFBRSxPQUFPLHFCQUFxQixDQUFBO1FBQ3ZELE1BQU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO0tBQzFCO0lBRUQsTUFBTSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtBQUMxRCxDQUFDLENBQUE7QUFFRCxNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsSUFBWSxFQUFpQixFQUFFO0lBQ2xELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUM1RCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGFwdGVyQ29udGV4dCwgQWRhcHRlclJlcXVlc3QsIE1ha2VXU0hhbmRsZXIsIE1pZGRsZXdhcmUgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3RSZXF1ZXN0ZWQsIHN1YnNjcmliZVJlcXVlc3RlZCwgV1NTdWJzY3JpcHRpb25QYXlsb2FkIH0gZnJvbSAnLi9hY3Rpb25zJ1xuaW1wb3J0IHsgZ2V0V1NDb25maWcgfSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gJy4vcmVkdWNlcidcbmltcG9ydCB7IEFkYXB0ZXJDYWNoZSB9IGZyb20gJy4uL2NhY2hlJ1xuaW1wb3J0IHsgc2VwYXJhdGVCYXRjaGVzIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnXG5leHBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnXG5leHBvcnQgKiBhcyBlcGljcyBmcm9tICcuL2VwaWNzJ1xuZXhwb3J0ICogYXMgcmVkdWNlciBmcm9tICcuL3JlZHVjZXInXG5leHBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL3R5cGVzJ1xuXG5pbXBvcnQgeyBXQVJNVVBfUkVRVUVTVF9JRCwgV0FSTVVQX0JBVENIX1JFUVVFU1RfSUQgfSBmcm9tICcuLi9jYWNoZS13YXJtZXIvY29uZmlnJ1xuXG5leHBvcnQgY29uc3Qgd2l0aFdlYlNvY2tldHMgPVxuICAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4sIG1ha2VXc0hhbmRsZXI/OiBNYWtlV1NIYW5kbGVyKTogTWlkZGxld2FyZSA9PlxuICBhc3luYyAoZXhlY3V0ZSwgY29udGV4dCkgPT5cbiAgYXN5bmMgKGlucHV0OiBBZGFwdGVyUmVxdWVzdCkgPT4ge1xuICAgIGNvbnN0IHdzQ29uZmlnID0gZ2V0V1NDb25maWcoaW5wdXQuZGF0YS5lbmRwb2ludClcbiAgICBpZiAoIW1ha2VXc0hhbmRsZXIgfHwgIXdzQ29uZmlnLmVuYWJsZWQpIHJldHVybiBhd2FpdCBleGVjdXRlKGlucHV0LCBjb250ZXh0KSAvLyBpZ25vcmUgbWlkZGxld2FyZSBpZiBjb25kaXRpb25zIGFyZSBtZXRcbiAgICBpZiAoaW5wdXQuaWQgPT09IFdBUk1VUF9SRVFVRVNUX0lEIHx8IGlucHV0LmlkID09PSBXQVJNVVBfQkFUQ0hfUkVRVUVTVF9JRClcbiAgICAgIHJldHVybiBhd2FpdCBleGVjdXRlKGlucHV0LCBjb250ZXh0KSAvLyBpZ25vcmUgbWlkZGxld2FyZSBpZiB3YXJtZXIgcmVxdWVzdFxuXG4gICAgY29uc3Qgd3NIYW5kbGVyID0gYXdhaXQgbWFrZVdzSGFuZGxlcigpXG4gICAgaWYgKHdzSGFuZGxlci5zaG91bGROb3RTZXJ2ZUlucHV0VXNpbmdXUyAmJiB3c0hhbmRsZXIuc2hvdWxkTm90U2VydmVJbnB1dFVzaW5nV1MoaW5wdXQpKSB7XG4gICAgICByZXR1cm4gYXdhaXQgZXhlY3V0ZShpbnB1dCwgY29udGV4dClcbiAgICB9XG4gICAgaWYgKHdzSGFuZGxlci5wcm9ncmFtbWF0aWNDb25uZWN0aW9uSW5mbykge1xuICAgICAgY29uc3QgcHJvZ3JhbW1hdGljQ29ubmVjdGlvbkluZm8gPSB3c0hhbmRsZXIucHJvZ3JhbW1hdGljQ29ubmVjdGlvbkluZm8oaW5wdXQpXG4gICAgICBpZiAocHJvZ3JhbW1hdGljQ29ubmVjdGlvbkluZm8pIHtcbiAgICAgICAgd3NDb25maWcuY29ubmVjdGlvbkluZm8ua2V5ID0gcHJvZ3JhbW1hdGljQ29ubmVjdGlvbkluZm8ua2V5XG4gICAgICAgIHdzSGFuZGxlci5jb25uZWN0aW9uLnVybCA9IHByb2dyYW1tYXRpY0Nvbm5lY3Rpb25JbmZvLnVybFxuICAgICAgfVxuICAgIH1cblxuICAgIHN0b3JlLmRpc3BhdGNoKGNvbm5lY3RSZXF1ZXN0ZWQoeyBjb25maWc6IHdzQ29uZmlnLCB3c0hhbmRsZXIsIGNvbnRleHQsIHJlcXVlc3Q6IGlucHV0IH0pKVxuXG4gICAgaWYgKGlzQ29ubmVjdGVkKHN0b3JlLCB3c0NvbmZpZy5jb25uZWN0aW9uSW5mby5rZXkpKSB7XG4gICAgICBhd2FpdCBzZXBhcmF0ZUJhdGNoZXMoaW5wdXQsIGFzeW5jIChzaW5nbGVJbnB1dDogQWRhcHRlclJlcXVlc3QpID0+IHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uTXNnID0gd3NIYW5kbGVyLnN1YnNjcmliZShzaW5nbGVJbnB1dClcbiAgICAgICAgaWYgKCFzdWJzY3JpcHRpb25Nc2cpIHJldHVyblxuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb25QYXlsb2FkOiBXU1N1YnNjcmlwdGlvblBheWxvYWQgPSB7XG4gICAgICAgICAgY29ubmVjdGlvbkluZm86IHtcbiAgICAgICAgICAgIGtleTogd3NDb25maWcuY29ubmVjdGlvbkluZm8ua2V5LFxuICAgICAgICAgICAgdXJsOiB3c0hhbmRsZXIuY29ubmVjdGlvbi51cmwsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWJzY3JpcHRpb25Nc2csXG4gICAgICAgICAgaW5wdXQ6IHNpbmdsZUlucHV0LFxuICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgIH1cblxuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdWJzY3JpYmVSZXF1ZXN0ZWQoc3Vic2NyaXB0aW9uUGF5bG9hZCkpXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIGFkYXB0ZXIgb25seSBzdXBwb3J0cyBXU1xuICAgIGlmICh3c0hhbmRsZXIubm9IdHRwKSB7XG4gICAgICAvLyBJZiBzbywgd2UgdHJ5IHRvIGdldCBhIHJlc3VsdCBmcm9tIGNhY2hlIHdpdGhpbiBBUElfVElNRU9VVFxuICAgICAgY29uc3QgcmVxdWVzdFRpbWVvdXQgPSBOdW1iZXIocHJvY2Vzcy5lbnYuQVBJX1RJTUVPVVQpIHx8IDMwMDAwXG4gICAgICBjb25zdCBkZWFkbGluZSA9IERhdGUubm93KCkgKyByZXF1ZXN0VGltZW91dFxuICAgICAgcmV0dXJuIGF3YWl0IGF3YWl0UmVzdWx0KGNvbnRleHQsIGlucHV0LCBkZWFkbGluZSlcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IGV4ZWN1dGUoaW5wdXQsIGNvbnRleHQpXG4gIH1cblxuY29uc3QgaXNDb25uZWN0ZWQgPSAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4sIGNvbm5lY3Rpb25LZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKClcbiAgY29uc3QgY29ubmVjdGlvblN0YXRlID0gc3RhdGUuY29ubmVjdGlvbnMuYWxsW2Nvbm5lY3Rpb25LZXldXG4gIGlmICghY29ubmVjdGlvblN0YXRlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgY29uc3QgaXNBY3RpdmVDb25uZWN0aW9uID0gY29ubmVjdGlvblN0YXRlLmFjdGl2ZVxuICBjb25zdCBpc0Nvbm5lY3RpbmcgPSBjb25uZWN0aW9uU3RhdGUuY29ubmVjdGluZyA+IDFcbiAgY29uc3QgaGFzT25Db25uZWN0Q2hhaW5Db21wbGV0ZWQgPSBjb25uZWN0aW9uU3RhdGUuaXNPbkNvbm5lY3RDaGFpbkNvbXBsZXRlXG4gIHJldHVybiBpc0FjdGl2ZUNvbm5lY3Rpb24gJiYgIWlzQ29ubmVjdGluZyAmJiBoYXNPbkNvbm5lY3RDaGFpbkNvbXBsZXRlZFxufVxuXG5jb25zdCBhd2FpdFJlc3VsdCA9IGFzeW5jIChjb250ZXh0OiBBZGFwdGVyQ29udGV4dCwgaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0LCBkZWFkbGluZTogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IGFkYXB0ZXJDYWNoZSA9IG5ldyBBZGFwdGVyQ2FjaGUoY29udGV4dClcbiAgY29uc3QgcG9sbEludGVydmFsID0gMV8wMDBcblxuICB3aGlsZSAoRGF0ZS5ub3coKSA8IGRlYWRsaW5lIC0gcG9sbEludGVydmFsKSB7XG4gICAgY29uc3QgY2FjaGVkQWRhcHRlclJlc3BvbnNlID0gYXdhaXQgYWRhcHRlckNhY2hlLmdldFJlc3VsdEZvclJlcXVlc3QoaW5wdXQpXG4gICAgaWYgKGNhY2hlZEFkYXB0ZXJSZXNwb25zZSkgcmV0dXJuIGNhY2hlZEFkYXB0ZXJSZXNwb25zZVxuICAgIGF3YWl0IHNsZWVwKHBvbGxJbnRlcnZhbClcbiAgfVxuXG4gIHRocm93IEVycm9yKCd0aW1lZCBvdXQgd2FpdGluZyBmb3IgcmVzdWx0IHRvIGJlIGNhY2hlZCcpXG59XG5cbmNvbnN0IHNsZWVwID0gYXN5bmMgKHRpbWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSkpXG59XG4iXX0=