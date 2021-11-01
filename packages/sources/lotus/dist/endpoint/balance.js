"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = exports.methodName = void 0;
const tslib_1 = require("tslib");
const json_rpc_adapter_1 = tslib_1.__importDefault(require("@chainlink/json-rpc-adapter"));
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ethers_1 = require("ethers");
exports.methodName = 'Filecoin.WalletBalance';
exports.supportedEndpoints = ['balance', exports.methodName];
exports.inputParameters = {
    addresses: ['addresses', 'result'],
};
const execute = async (request, context, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const addresses = validator.validated.data.addresses;
    const jsonRpcConfig = json_rpc_adapter_1.default.makeConfig();
    jsonRpcConfig.api.headers['Authorization'] = `Bearer ${config.apiKey}`;
    const _getBalance = async (address, requestId) => {
        const requestData = {
            id: jobRunID,
            data: {
                method: exports.methodName,
                params: [address],
                requestId: requestId + 1,
            },
        };
        const result = await json_rpc_adapter_1.default.execute(requestData, context, jsonRpcConfig);
        return {
            address,
            result: result.data.result,
        };
    };
    const balances = await Promise.all(addresses.map(_getBalance));
    const response = {
        statusText: 'OK',
        status: 200,
        data: { balances },
        headers: {},
        config: jsonRpcConfig.api,
    };
    const result = balances.reduce((sum, balance) => sum.add(balance.result), ethers_1.BigNumber.from(0));
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, result.toString()), config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9iYWxhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwyRkFBaUQ7QUFDakQsMERBQThEO0FBRTlELG1DQUFrQztBQUVyQixRQUFBLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQTtBQUVyQyxRQUFBLGtCQUFrQixHQUFHLENBQUMsU0FBUyxFQUFFLGtCQUFVLENBQUMsQ0FBQTtBQUU1QyxRQUFBLGVBQWUsR0FBb0I7SUFDOUMsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztDQUNuQyxDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ25GLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsdUJBQWUsQ0FBQyxDQUFBO0lBQ3pELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxTQUFTLEdBQWEsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFBO0lBRTlELE1BQU0sYUFBYSxHQUFHLDBCQUFPLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDMUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsVUFBVSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7SUFFdEUsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLE9BQWUsRUFBRSxTQUFpQixFQUFFLEVBQUU7UUFDL0QsTUFBTSxXQUFXLEdBQUc7WUFDbEIsRUFBRSxFQUFFLFFBQVE7WUFDWixJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLGtCQUFVO2dCQUNsQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLFNBQVMsRUFBRSxTQUFTLEdBQUcsQ0FBQzthQUN6QjtTQUNGLENBQUE7UUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLDBCQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDekUsT0FBTztZQUNMLE9BQU87WUFDUCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNO1NBQzNCLENBQUE7SUFDSCxDQUFDLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO0lBQzlELE1BQU0sUUFBUSxHQUFHO1FBQ2YsVUFBVSxFQUFFLElBQUk7UUFDaEIsTUFBTSxFQUFFLEdBQUc7UUFDWCxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUU7UUFDbEIsT0FBTyxFQUFFLEVBQUU7UUFDWCxNQUFNLEVBQUUsYUFBYSxDQUFDLEdBQUc7S0FDMUIsQ0FBQTtJQUVELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxrQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTVGLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQ3RCLFFBQVEsRUFDUix3QkFBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQ2pELE1BQU0sQ0FBQyxPQUFPLENBQ2YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQTFDWSxRQUFBLE9BQU8sV0EwQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTT05SUEMgZnJvbSAnQGNoYWlubGluay9qc29uLXJwYy1hZGFwdGVyJ1xuaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IENvbmZpZywgRXhlY3V0ZVdpdGhDb25maWcsIElucHV0UGFyYW1ldGVycyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdldGhlcnMnXG5cbmV4cG9ydCBjb25zdCBtZXRob2ROYW1lID0gJ0ZpbGVjb2luLldhbGxldEJhbGFuY2UnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ2JhbGFuY2UnLCBtZXRob2ROYW1lXVxuXG5leHBvcnQgY29uc3QgaW5wdXRQYXJhbWV0ZXJzOiBJbnB1dFBhcmFtZXRlcnMgPSB7XG4gIGFkZHJlc3NlczogWydhZGRyZXNzZXMnLCAncmVzdWx0J10sXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKHJlcXVlc3QsIGlucHV0UGFyYW1ldGVycylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IGFkZHJlc3Nlczogc3RyaW5nW10gPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuYWRkcmVzc2VzXG5cbiAgY29uc3QganNvblJwY0NvbmZpZyA9IEpTT05SUEMubWFrZUNvbmZpZygpXG4gIGpzb25ScGNDb25maWcuYXBpLmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHtjb25maWcuYXBpS2V5fWBcblxuICBjb25zdCBfZ2V0QmFsYW5jZSA9IGFzeW5jIChhZGRyZXNzOiBzdHJpbmcsIHJlcXVlc3RJZDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdERhdGEgPSB7XG4gICAgICBpZDogam9iUnVuSUQsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kTmFtZSxcbiAgICAgICAgcGFyYW1zOiBbYWRkcmVzc10sXG4gICAgICAgIHJlcXVlc3RJZDogcmVxdWVzdElkICsgMSxcbiAgICAgIH0sXG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEpTT05SUEMuZXhlY3V0ZShyZXF1ZXN0RGF0YSwgY29udGV4dCwganNvblJwY0NvbmZpZylcbiAgICByZXR1cm4ge1xuICAgICAgYWRkcmVzcyxcbiAgICAgIHJlc3VsdDogcmVzdWx0LmRhdGEucmVzdWx0LFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGJhbGFuY2VzID0gYXdhaXQgUHJvbWlzZS5hbGwoYWRkcmVzc2VzLm1hcChfZ2V0QmFsYW5jZSkpXG4gIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgIHN0YXR1c1RleHQ6ICdPSycsXG4gICAgc3RhdHVzOiAyMDAsXG4gICAgZGF0YTogeyBiYWxhbmNlcyB9LFxuICAgIGhlYWRlcnM6IHt9LFxuICAgIGNvbmZpZzoganNvblJwY0NvbmZpZy5hcGksXG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBiYWxhbmNlcy5yZWR1Y2UoKHN1bSwgYmFsYW5jZSkgPT4gc3VtLmFkZChiYWxhbmNlLnJlc3VsdCksIEJpZ051bWJlci5mcm9tKDApKVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2VzcyhcbiAgICBqb2JSdW5JRCxcbiAgICBSZXF1ZXN0ZXIud2l0aFJlc3VsdChyZXNwb25zZSwgcmVzdWx0LnRvU3RyaW5nKCkpLFxuICAgIGNvbmZpZy52ZXJib3NlLFxuICApXG59XG4iXX0=