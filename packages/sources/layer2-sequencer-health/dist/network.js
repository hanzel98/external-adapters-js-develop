"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusByTransaction = exports.getL1RollupStatus = exports.requestBlockHeight = exports.getSequencerHealth = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const ethers_1 = require("ethers");
const getSequencerHealth = async (network) => {
    if (!config_1.HEALTH_ENDPOINTS[network].endpoint) {
        ea_bootstrap_1.Logger.info(`Health endpoint not available for network: ${network}`);
        return;
    }
    const response = await ea_bootstrap_1.Requester.request({
        url: config_1.HEALTH_ENDPOINTS[network]?.endpoint,
    });
    const isHealthy = !!ea_bootstrap_1.Requester.getResult(response.data, config_1.HEALTH_ENDPOINTS[network]?.responsePath);
    ea_bootstrap_1.Logger.info(`Health endpoint for network ${network} returned a ${isHealthy ? 'healthy' : 'unhealthy'} response`);
    return isHealthy;
};
exports.getSequencerHealth = getSequencerHealth;
const requestBlockHeight = async (network) => {
    const request = {
        method: 'POST',
        url: config_1.RPC_ENDPOINTS[network],
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1,
        },
    };
    const response = await ea_bootstrap_1.Requester.request(request);
    const hexBlock = response?.data?.result;
    if (!hexBlock) {
        throw new Error(`Block number not found on network: ${network}`);
    }
    return ethers_1.BigNumber.from(hexBlock).toNumber();
};
exports.requestBlockHeight = requestBlockHeight;
// TODO: Implement when ready
const getL1RollupStatus = async () => {
    return true;
};
exports.getL1RollupStatus = getL1RollupStatus;
const getStatusByTransaction = async (network, timeout) => {
    const rpcEndpoint = config_1.RPC_ENDPOINTS[network];
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcEndpoint);
    const wallet = new ethers_1.ethers.Wallet(ethers_1.ethers.Wallet.createRandom()?.privateKey, provider);
    // These errors come from the Sequencer when submitting an empty transaction
    const sequencerOnlineErrors = {
        [config_1.Networks.Arbitrum]: ['gas price too low', 'forbidden sender address'],
        // TODO: Optimism error needs to be confirmed by their team
        [config_1.Networks.Optimism]: ['cannot accept 0 gas price transaction'],
    };
    const networkTx = {
        // Arbitrum zero gas price will be auto adjusted by the network to the minimum
        [config_1.Networks.Arbitrum]: {
            value: 0,
            gasLimit: 0,
            gasPrice: 1,
            to: wallet.address,
        },
        [config_1.Networks.Optimism]: {
            value: 0,
            gasLimit: 0,
            gasPrice: 0,
            to: wallet.address,
        },
    };
    const _getErrorMessage = (e) => {
        const paths = {
            [config_1.Networks.Arbitrum]: ['error', 'message'],
            [config_1.Networks.Optimism]: ['error', 'message'],
        };
        return ea_bootstrap_1.Requester.getResult(e, paths[network]) || '';
    };
    const _setTxTimeout = (timeout) => new Promise((_, rej) => setTimeout(() => rej(new Error(`Transaction receipt not received in ${timeout} milliseconds`)), timeout));
    try {
        ea_bootstrap_1.Logger.info(`Submitting empty transaction for network: ${network}`);
        const receipt = await Promise.race([
            _setTxTimeout(timeout),
            wallet.sendTransaction(networkTx[network]),
        ]);
        ea_bootstrap_1.Logger.info(`Transaction receipt received with hash ${receipt.hash} for network: ${network}`);
        return (await receipt.wait()).confirmations > 0;
    }
    catch (e) {
        if (sequencerOnlineErrors[network].includes(_getErrorMessage(e))) {
            ea_bootstrap_1.Logger.info(`Transaction submission failed with an expected error: ${_getErrorMessage(e)}`);
            return true;
        }
        ea_bootstrap_1.Logger.error(`Transaction submission failed with an unexpected error: ${e.message}`);
        return false;
    }
};
exports.getStatusByTransaction = getStatusByTransaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXR3b3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUEyRDtBQUMzRCxxQ0FBb0U7QUFDcEUsbUNBQTBDO0FBTW5DLE1BQU0sa0JBQWtCLEdBQXVCLEtBQUssRUFDekQsT0FBaUIsRUFDYSxFQUFFO0lBQ2hDLElBQUksQ0FBQyx5QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDdkMscUJBQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDcEUsT0FBTTtLQUNQO0lBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQztRQUN2QyxHQUFHLEVBQUUseUJBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUTtLQUN6QyxDQUFDLENBQUE7SUFDRixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsd0JBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSx5QkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUMvRixxQkFBTSxDQUFDLElBQUksQ0FDVCwrQkFBK0IsT0FBTyxlQUNwQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FDMUIsV0FBVyxDQUNaLENBQUE7SUFDRCxPQUFPLFNBQVMsQ0FBQTtBQUNsQixDQUFDLENBQUE7QUFqQlksUUFBQSxrQkFBa0Isc0JBaUI5QjtBQUVNLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxFQUFFLE9BQWlCLEVBQW1CLEVBQUU7SUFDN0UsTUFBTSxPQUFPLEdBQUc7UUFDZCxNQUFNLEVBQUUsTUFBTTtRQUNkLEdBQUcsRUFBRSxzQkFBYSxDQUFDLE9BQU8sQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsa0JBQWtCO1NBQ25DO1FBQ0QsSUFBSSxFQUFFO1lBQ0os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LElBQUksQ0FBQyw2Q0FBNkMsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUNuRSxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDakMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUN0QixNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQyxDQUFDLENBQUE7UUFDRixxQkFBTSxDQUFDLElBQUksQ0FBQywwQ0FBMEMsT0FBTyxDQUFDLElBQUksaUJBQWlCLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDN0YsT0FBTyxDQUFDLE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQTtLQUNoRDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsSUFBSSxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoRSxxQkFBTSxDQUFDLElBQUksQ0FBQyx5REFBeUQsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQzNGLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFDRCxxQkFBTSxDQUFDLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDcEYsT0FBTyxLQUFLLENBQUE7S0FDYjtBQUNILENBQUMsQ0FBQTtBQTVEWSxRQUFBLHNCQUFzQiwwQkE0RGxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyLCBSZXF1ZXN0ZXIgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEhFQUxUSF9FTkRQT0lOVFMsIE5ldHdvcmtzLCBSUENfRU5EUE9JTlRTIH0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgeyBCaWdOdW1iZXIsIGV0aGVycyB9IGZyb20gJ2V0aGVycydcblxuZXhwb3J0IGludGVyZmFjZSBOZXR3b3JrSGVhbHRoQ2hlY2sge1xuICAobmV0d29yazogTmV0d29ya3MsIGRlbHRhOiBudW1iZXIsIGRlbHRhQmxvY2tzOiBudW1iZXIpOiBQcm9taXNlPHVuZGVmaW5lZCB8IGJvb2xlYW4+XG59XG5cbmV4cG9ydCBjb25zdCBnZXRTZXF1ZW5jZXJIZWFsdGg6IE5ldHdvcmtIZWFsdGhDaGVjayA9IGFzeW5jIChcbiAgbmV0d29yazogTmV0d29ya3MsXG4pOiBQcm9taXNlPHVuZGVmaW5lZCB8IGJvb2xlYW4+ID0+IHtcbiAgaWYgKCFIRUFMVEhfRU5EUE9JTlRTW25ldHdvcmtdLmVuZHBvaW50KSB7XG4gICAgTG9nZ2VyLmluZm8oYEhlYWx0aCBlbmRwb2ludCBub3QgYXZhaWxhYmxlIGZvciBuZXR3b3JrOiAke25ldHdvcmt9YClcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KHtcbiAgICB1cmw6IEhFQUxUSF9FTkRQT0lOVFNbbmV0d29ya10/LmVuZHBvaW50LFxuICB9KVxuICBjb25zdCBpc0hlYWx0aHkgPSAhIVJlcXVlc3Rlci5nZXRSZXN1bHQocmVzcG9uc2UuZGF0YSwgSEVBTFRIX0VORFBPSU5UU1tuZXR3b3JrXT8ucmVzcG9uc2VQYXRoKVxuICBMb2dnZXIuaW5mbyhcbiAgICBgSGVhbHRoIGVuZHBvaW50IGZvciBuZXR3b3JrICR7bmV0d29ya30gcmV0dXJuZWQgYSAke1xuICAgICAgaXNIZWFsdGh5ID8gJ2hlYWx0aHknIDogJ3VuaGVhbHRoeSdcbiAgICB9IHJlc3BvbnNlYCxcbiAgKVxuICByZXR1cm4gaXNIZWFsdGh5XG59XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0QmxvY2tIZWlnaHQgPSBhc3luYyAobmV0d29yazogTmV0d29ya3MpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICBjb25zdCByZXF1ZXN0ID0ge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogUlBDX0VORFBPSU5UU1tuZXR3b3JrXSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAganNvbnJwYzogJzIuMCcsXG4gICAgICBtZXRob2Q6ICdldGhfYmxvY2tOdW1iZXInLFxuICAgICAgcGFyYW1zOiBbXSxcbiAgICAgIGlkOiAxLFxuICAgIH0sXG4gIH1cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChyZXF1ZXN0KVxuICBjb25zdCBoZXhCbG9jayA9IHJlc3BvbnNlPy5kYXRhPy5yZXN1bHRcbiAgaWYgKCFoZXhCbG9jaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgQmxvY2sgbnVtYmVyIG5vdCBmb3VuZCBvbiBuZXR3b3JrOiAke25ldHdvcmt9YClcbiAgfVxuICByZXR1cm4gQmlnTnVtYmVyLmZyb20oaGV4QmxvY2spLnRvTnVtYmVyKClcbn1cblxuLy8gVE9ETzogSW1wbGVtZW50IHdoZW4gcmVhZHlcbmV4cG9ydCBjb25zdCBnZXRMMVJvbGx1cFN0YXR1czogTmV0d29ya0hlYWx0aENoZWNrID0gYXN5bmMgKCk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgY29uc3QgZ2V0U3RhdHVzQnlUcmFuc2FjdGlvbiA9IGFzeW5jIChcbiAgbmV0d29yazogTmV0d29ya3MsXG4gIHRpbWVvdXQ6IG51bWJlcixcbik6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICBjb25zdCBycGNFbmRwb2ludCA9IFJQQ19FTkRQT0lOVFNbbmV0d29ya11cbiAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZXRoZXJzLnByb3ZpZGVycy5Kc29uUnBjUHJvdmlkZXIocnBjRW5kcG9pbnQpXG4gIGNvbnN0IHdhbGxldCA9IG5ldyBldGhlcnMuV2FsbGV0KGV0aGVycy5XYWxsZXQuY3JlYXRlUmFuZG9tKCk/LnByaXZhdGVLZXksIHByb3ZpZGVyKVxuXG4gIC8vIFRoZXNlIGVycm9ycyBjb21lIGZyb20gdGhlIFNlcXVlbmNlciB3aGVuIHN1Ym1pdHRpbmcgYW4gZW1wdHkgdHJhbnNhY3Rpb25cbiAgY29uc3Qgc2VxdWVuY2VyT25saW5lRXJyb3JzOiBSZWNvcmQ8TmV0d29ya3MsIHN0cmluZ1tdPiA9IHtcbiAgICBbTmV0d29ya3MuQXJiaXRydW1dOiBbJ2dhcyBwcmljZSB0b28gbG93JywgJ2ZvcmJpZGRlbiBzZW5kZXIgYWRkcmVzcyddLFxuICAgIC8vIFRPRE86IE9wdGltaXNtIGVycm9yIG5lZWRzIHRvIGJlIGNvbmZpcm1lZCBieSB0aGVpciB0ZWFtXG4gICAgW05ldHdvcmtzLk9wdGltaXNtXTogWydjYW5ub3QgYWNjZXB0IDAgZ2FzIHByaWNlIHRyYW5zYWN0aW9uJ10sXG4gIH1cblxuICBjb25zdCBuZXR3b3JrVHg6IFJlY29yZDxOZXR3b3JrcywgZXRoZXJzLnByb3ZpZGVycy5UcmFuc2FjdGlvblJlcXVlc3Q+ID0ge1xuICAgIC8vIEFyYml0cnVtIHplcm8gZ2FzIHByaWNlIHdpbGwgYmUgYXV0byBhZGp1c3RlZCBieSB0aGUgbmV0d29yayB0byB0aGUgbWluaW11bVxuICAgIFtOZXR3b3Jrcy5BcmJpdHJ1bV06IHtcbiAgICAgIHZhbHVlOiAwLFxuICAgICAgZ2FzTGltaXQ6IDAsXG4gICAgICBnYXNQcmljZTogMSxcbiAgICAgIHRvOiB3YWxsZXQuYWRkcmVzcyxcbiAgICB9LFxuICAgIFtOZXR3b3Jrcy5PcHRpbWlzbV06IHtcbiAgICAgIHZhbHVlOiAwLFxuICAgICAgZ2FzTGltaXQ6IDAsXG4gICAgICBnYXNQcmljZTogMCxcbiAgICAgIHRvOiB3YWxsZXQuYWRkcmVzcyxcbiAgICB9LFxuICB9XG4gIGNvbnN0IF9nZXRFcnJvck1lc3NhZ2UgPSAoZTogYW55KTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBwYXRocyA9IHtcbiAgICAgIFtOZXR3b3Jrcy5BcmJpdHJ1bV06IFsnZXJyb3InLCAnbWVzc2FnZSddLFxuICAgICAgW05ldHdvcmtzLk9wdGltaXNtXTogWydlcnJvcicsICdtZXNzYWdlJ10sXG4gICAgfVxuICAgIHJldHVybiAoUmVxdWVzdGVyLmdldFJlc3VsdChlLCBwYXRoc1tuZXR3b3JrXSkgYXMgc3RyaW5nKSB8fCAnJ1xuICB9XG4gIGNvbnN0IF9zZXRUeFRpbWVvdXQgPSAodGltZW91dDogbnVtYmVyKTogUHJvbWlzZTxuZXZlcj4gPT5cbiAgICBuZXcgUHJvbWlzZSgoXywgcmVqKSA9PlxuICAgICAgc2V0VGltZW91dChcbiAgICAgICAgKCkgPT4gcmVqKG5ldyBFcnJvcihgVHJhbnNhY3Rpb24gcmVjZWlwdCBub3QgcmVjZWl2ZWQgaW4gJHt0aW1lb3V0fSBtaWxsaXNlY29uZHNgKSksXG4gICAgICAgIHRpbWVvdXQsXG4gICAgICApLFxuICAgIClcbiAgdHJ5IHtcbiAgICBMb2dnZXIuaW5mbyhgU3VibWl0dGluZyBlbXB0eSB0cmFuc2FjdGlvbiBmb3IgbmV0d29yazogJHtuZXR3b3JrfWApXG4gICAgY29uc3QgcmVjZWlwdCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICBfc2V0VHhUaW1lb3V0KHRpbWVvdXQpLFxuICAgICAgd2FsbGV0LnNlbmRUcmFuc2FjdGlvbihuZXR3b3JrVHhbbmV0d29ya10pLFxuICAgIF0pXG4gICAgTG9nZ2VyLmluZm8oYFRyYW5zYWN0aW9uIHJlY2VpcHQgcmVjZWl2ZWQgd2l0aCBoYXNoICR7cmVjZWlwdC5oYXNofSBmb3IgbmV0d29yazogJHtuZXR3b3JrfWApXG4gICAgcmV0dXJuIChhd2FpdCByZWNlaXB0LndhaXQoKSkuY29uZmlybWF0aW9ucyA+IDBcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChzZXF1ZW5jZXJPbmxpbmVFcnJvcnNbbmV0d29ya10uaW5jbHVkZXMoX2dldEVycm9yTWVzc2FnZShlKSkpIHtcbiAgICAgIExvZ2dlci5pbmZvKGBUcmFuc2FjdGlvbiBzdWJtaXNzaW9uIGZhaWxlZCB3aXRoIGFuIGV4cGVjdGVkIGVycm9yOiAke19nZXRFcnJvck1lc3NhZ2UoZSl9YClcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIExvZ2dlci5lcnJvcihgVHJhbnNhY3Rpb24gc3VibWlzc2lvbiBmYWlsZWQgd2l0aCBhbiB1bmV4cGVjdGVkIGVycm9yOiAke2UubWVzc2FnZX1gKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG4iXX0=