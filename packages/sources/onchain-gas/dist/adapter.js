"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWSHandler = exports.makeExecute = exports.endpointSelector = exports.execute = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const endpoints = tslib_1.__importStar(require("./endpoint"));
const execute = async (request, context, config) => {
    return ea_bootstrap_1.Builder.buildSelector(request, context, config, endpoints);
};
exports.execute = execute;
const endpointSelector = (request) => ea_bootstrap_1.Builder.selectEndpoint(request, config_1.makeConfig(), endpoints);
exports.endpointSelector = endpointSelector;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
const makeWSHandler = (config) => {
    return () => {
        const defaultConfig = config || config_1.makeConfig();
        return {
            connection: {
                url: defaultConfig.api.baseURL,
            },
            toSaveFromFirstMessage: (message) => {
                if (message.method !== 'eth_subscription' || !message.params)
                    return null;
                return {
                    subscriptionId: message.params.subscription,
                };
            },
            noHttp: true,
            subscribe: (input) => ({
                id: input.id,
                method: 'eth_subscribe',
                params: ['newHeads'],
            }),
            unsubscribe: (input, subscriptionParams) => ({
                id: input.id,
                method: 'eth_unsubscribe',
                params: [subscriptionParams.subscriptionId],
            }),
            subsFromMessage: (_, subscriptionMsg) => {
                return {
                    id: subscriptionMsg.id,
                    method: 'eth_subscribe',
                    params: ['newHeads'],
                };
            },
            isError: () => false,
            filter: (message) => message.method === 'eth_subscription',
            toResponse: async (message, input) => {
                const validator = new ea_bootstrap_1.Validator(input, endpoints.gas.inputParameters);
                if (validator.error)
                    throw validator.error;
                const hexedBlockNum = message.params.result.number;
                const medianGasPrices = await endpoints.gas.getTransactionsInPastBlocks(input.id, message.jsonrpc, hexedBlockNum, validator.validated.data.numBlocks, defaultConfig);
                const blockIdx = validator.validated.data.blockIdx || config_1.DEFAULT_BLOCK_IDX;
                return ea_bootstrap_1.Requester.success(input.id, {
                    data: {
                        values: medianGasPrices,
                        result: medianGasPrices[Math.min(blockIdx, medianGasPrices.length - 1)],
                    },
                }, defaultConfig.verbose);
            },
        };
    };
};
exports.makeWSHandler = makeWSHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBdUU7QUFTdkUscUNBQXdEO0FBQ3hELDhEQUF1QztBQUVoQyxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbkYsT0FBTyxzQkFBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUNuRSxDQUFDLENBQUE7QUFGWSxRQUFBLE9BQU8sV0FFbkI7QUFFTSxNQUFNLGdCQUFnQixHQUFHLENBQUMsT0FBdUIsRUFBZSxFQUFFLENBQ3ZFLHNCQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxtQkFBVSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFEN0MsUUFBQSxnQkFBZ0Isb0JBQzZCO0FBRW5ELE1BQU0sV0FBVyxHQUEyQixDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQzVELE9BQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxtQkFBVSxFQUFFLENBQUMsQ0FBQTtBQUN0RixDQUFDLENBQUE7QUFGWSxRQUFBLFdBQVcsZUFFdkI7QUFFTSxNQUFNLGFBQWEsR0FBRyxDQUFDLE1BQWUsRUFBaUIsRUFBRTtJQUM5RCxPQUFPLEdBQUcsRUFBRTtRQUNWLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxtQkFBVSxFQUFFLENBQUE7UUFDNUMsT0FBTztZQUNMLFVBQVUsRUFBRTtnQkFDVixHQUFHLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPO2FBQy9CO1lBQ0Qsc0JBQXNCLEVBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLGtCQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07b0JBQUUsT0FBTyxJQUFJLENBQUE7Z0JBQ3pFLE9BQU87b0JBQ0wsY0FBYyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWTtpQkFDNUMsQ0FBQTtZQUNILENBQUM7WUFDRCxNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDckIsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNaLE1BQU0sRUFBRSxlQUFlO2dCQUN2QixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDckIsQ0FBQztZQUNGLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDM0MsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNaLE1BQU0sRUFBRSxpQkFBaUI7Z0JBQ3pCLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQzthQUM1QyxDQUFDO1lBQ0YsZUFBZSxFQUFFLENBQUMsQ0FBQyxFQUFFLGVBQWUsRUFBRSxFQUFFO2dCQUN0QyxPQUFPO29CQUNMLEVBQUUsRUFBRSxlQUFlLENBQUMsRUFBRTtvQkFDdEIsTUFBTSxFQUFFLGVBQWU7b0JBQ3ZCLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztpQkFDckIsQ0FBQTtZQUNILENBQUM7WUFDRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSztZQUNwQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssa0JBQWtCO1lBQzFELFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBWSxFQUFFLEtBQXFCLEVBQUUsRUFBRTtnQkFDeEQsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO2dCQUNyRSxJQUFJLFNBQVMsQ0FBQyxLQUFLO29CQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtnQkFDMUMsTUFBTSxhQUFhLEdBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO2dCQUMxRCxNQUFNLGVBQWUsR0FBRyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQ3JFLEtBQUssQ0FBQyxFQUFFLEVBQ1IsT0FBTyxDQUFDLE9BQU8sRUFDZixhQUFhLEVBQ2IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUNsQyxhQUFhLENBQ2QsQ0FBQTtnQkFDRCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksMEJBQWlCLENBQUE7Z0JBQ3ZFLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQ3RCLEtBQUssQ0FBQyxFQUFFLEVBQ1I7b0JBQ0UsSUFBSSxFQUFFO3dCQUNKLE1BQU0sRUFBRSxlQUFlO3dCQUN2QixNQUFNLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ3hFO2lCQUNGLEVBQ0QsYUFBYSxDQUFDLE9BQU8sQ0FDdEIsQ0FBQTtZQUNILENBQUM7U0FDRixDQUFBO0lBQ0gsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBMURZLFFBQUEsYUFBYSxpQkEwRHpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVpbGRlciwgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7XG4gIENvbmZpZyxcbiAgRXhlY3V0ZVdpdGhDb25maWcsXG4gIEV4ZWN1dGVGYWN0b3J5LFxuICBBZGFwdGVyUmVxdWVzdCxcbiAgQVBJRW5kcG9pbnQsXG4gIE1ha2VXU0hhbmRsZXIsXG59IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBERUZBVUxUX0JMT0NLX0lEWCwgbWFrZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0ICogYXMgZW5kcG9pbnRzIGZyb20gJy4vZW5kcG9pbnQnXG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZykgPT4ge1xuICByZXR1cm4gQnVpbGRlci5idWlsZFNlbGVjdG9yKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZywgZW5kcG9pbnRzKVxufVxuXG5leHBvcnQgY29uc3QgZW5kcG9pbnRTZWxlY3RvciA9IChyZXF1ZXN0OiBBZGFwdGVyUmVxdWVzdCk6IEFQSUVuZHBvaW50ID0+XG4gIEJ1aWxkZXIuc2VsZWN0RW5kcG9pbnQocmVxdWVzdCwgbWFrZUNvbmZpZygpLCBlbmRwb2ludHMpXG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZTogRXhlY3V0ZUZhY3Rvcnk8Q29uZmlnPiA9IChjb25maWcpID0+IHtcbiAgcmV0dXJuIGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0KSA9PiBleGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZyB8fCBtYWtlQ29uZmlnKCkpXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlV1NIYW5kbGVyID0gKGNvbmZpZz86IENvbmZpZyk6IE1ha2VXU0hhbmRsZXIgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWcgPSBjb25maWcgfHwgbWFrZUNvbmZpZygpXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbm5lY3Rpb246IHtcbiAgICAgICAgdXJsOiBkZWZhdWx0Q29uZmlnLmFwaS5iYXNlVVJMLFxuICAgICAgfSxcbiAgICAgIHRvU2F2ZUZyb21GaXJzdE1lc3NhZ2U6IChtZXNzYWdlOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKG1lc3NhZ2UubWV0aG9kICE9PSAnZXRoX3N1YnNjcmlwdGlvbicgfHwgIW1lc3NhZ2UucGFyYW1zKSByZXR1cm4gbnVsbFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN1YnNjcmlwdGlvbklkOiBtZXNzYWdlLnBhcmFtcy5zdWJzY3JpcHRpb24sXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub0h0dHA6IHRydWUsXG4gICAgICBzdWJzY3JpYmU6IChpbnB1dCkgPT4gKHtcbiAgICAgICAgaWQ6IGlucHV0LmlkLFxuICAgICAgICBtZXRob2Q6ICdldGhfc3Vic2NyaWJlJyxcbiAgICAgICAgcGFyYW1zOiBbJ25ld0hlYWRzJ10sXG4gICAgICB9KSxcbiAgICAgIHVuc3Vic2NyaWJlOiAoaW5wdXQsIHN1YnNjcmlwdGlvblBhcmFtcykgPT4gKHtcbiAgICAgICAgaWQ6IGlucHV0LmlkLFxuICAgICAgICBtZXRob2Q6ICdldGhfdW5zdWJzY3JpYmUnLFxuICAgICAgICBwYXJhbXM6IFtzdWJzY3JpcHRpb25QYXJhbXMuc3Vic2NyaXB0aW9uSWRdLFxuICAgICAgfSksXG4gICAgICBzdWJzRnJvbU1lc3NhZ2U6IChfLCBzdWJzY3JpcHRpb25Nc2cpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogc3Vic2NyaXB0aW9uTXNnLmlkLFxuICAgICAgICAgIG1ldGhvZDogJ2V0aF9zdWJzY3JpYmUnLFxuICAgICAgICAgIHBhcmFtczogWyduZXdIZWFkcyddLFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNFcnJvcjogKCkgPT4gZmFsc2UsXG4gICAgICBmaWx0ZXI6IChtZXNzYWdlKSA9PiBtZXNzYWdlLm1ldGhvZCA9PT0gJ2V0aF9zdWJzY3JpcHRpb24nLFxuICAgICAgdG9SZXNwb25zZTogYXN5bmMgKG1lc3NhZ2U6IGFueSwgaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoaW5wdXQsIGVuZHBvaW50cy5nYXMuaW5wdXRQYXJhbWV0ZXJzKVxuICAgICAgICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcbiAgICAgICAgY29uc3QgaGV4ZWRCbG9ja051bTogc3RyaW5nID0gbWVzc2FnZS5wYXJhbXMucmVzdWx0Lm51bWJlclxuICAgICAgICBjb25zdCBtZWRpYW5HYXNQcmljZXMgPSBhd2FpdCBlbmRwb2ludHMuZ2FzLmdldFRyYW5zYWN0aW9uc0luUGFzdEJsb2NrcyhcbiAgICAgICAgICBpbnB1dC5pZCxcbiAgICAgICAgICBtZXNzYWdlLmpzb25ycGMsXG4gICAgICAgICAgaGV4ZWRCbG9ja051bSxcbiAgICAgICAgICB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEubnVtQmxvY2tzLFxuICAgICAgICAgIGRlZmF1bHRDb25maWcsXG4gICAgICAgIClcbiAgICAgICAgY29uc3QgYmxvY2tJZHggPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuYmxvY2tJZHggfHwgREVGQVVMVF9CTE9DS19JRFhcbiAgICAgICAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKFxuICAgICAgICAgIGlucHV0LmlkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgdmFsdWVzOiBtZWRpYW5HYXNQcmljZXMsXG4gICAgICAgICAgICAgIHJlc3VsdDogbWVkaWFuR2FzUHJpY2VzW01hdGgubWluKGJsb2NrSWR4LCBtZWRpYW5HYXNQcmljZXMubGVuZ3RoIC0gMSldLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlZmF1bHRDb25maWcudmVyYm9zZSxcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICB9XG4gIH1cbn1cbiJdfQ==