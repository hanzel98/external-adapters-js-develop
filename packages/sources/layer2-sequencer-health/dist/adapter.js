"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = exports.inputParameters = exports.getL2NetworkStatus = exports.makeNetworkStatusCheck = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const network_1 = require("./network");
const makeNetworkStatusCheck = (network) => {
    let lastSeenBlock = {
        block: 0,
        timestamp: 0,
    };
    const _isPastBlock = (block) => block <= lastSeenBlock.block;
    const _isStaleBlock = (block, delta) => {
        return _isPastBlock(block) && Date.now() - lastSeenBlock.timestamp >= delta;
    };
    // If the request hit a replica node that fell behind, the block could be previous to the last seen. Including a deltaBlocks range to consider this case.
    const _isValidBlock = (block, deltaBlocks) => lastSeenBlock.block - block <= deltaBlocks;
    const _updateLastSeenBlock = (block) => {
        lastSeenBlock = {
            block,
            timestamp: Date.now(),
        };
    };
    return async (delta, deltaBlocks) => {
        const block = await network_1.requestBlockHeight(network);
        if (!_isValidBlock(block, deltaBlocks))
            throw new Error(`Block found #${block} is previous to last seen #${lastSeenBlock.block} with more than ${deltaBlocks} difference`);
        if (!_isStaleBlock(block, delta)) {
            if (!_isPastBlock(block))
                _updateLastSeenBlock(block);
            ea_bootstrap_1.Logger.info(`Block #${block} is not considered stale at ${Date.now()}. Last seen block #${lastSeenBlock.block} was at ${lastSeenBlock.timestamp}`);
            return true;
        }
        ea_bootstrap_1.Logger.warn(`Block #${block} is considered stale at ${Date.now()}. Last seen block #${lastSeenBlock.block} was at ${lastSeenBlock.timestamp}, more than ${delta} milliseconds ago.`);
        return false;
    };
};
exports.makeNetworkStatusCheck = makeNetworkStatusCheck;
const networks = {
    [config_1.Networks.Arbitrum]: exports.makeNetworkStatusCheck(config_1.Networks.Arbitrum),
    [config_1.Networks.Optimism]: exports.makeNetworkStatusCheck(config_1.Networks.Optimism),
};
const getL2NetworkStatus = (network, delta, deltaBlocks) => {
    return networks[network](delta, deltaBlocks);
};
exports.getL2NetworkStatus = getL2NetworkStatus;
exports.inputParameters = {
    network: true,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const network = validator.validated.data.network;
    const _translateIntoFeedResponse = (isHealthy) => {
        return isHealthy ? 0 : 1;
    };
    const _respond = (isHealthy) => ea_bootstrap_1.Requester.success(jobRunID, {
        data: {
            isHealthy: _translateIntoFeedResponse(isHealthy),
            result: _translateIntoFeedResponse(isHealthy),
        },
    }, config.verbose);
    const _tryMethod = (fn) => async (network, delta, deltaBlocks) => {
        try {
            const isHealthy = await fn(network, delta, deltaBlocks);
            if (isHealthy === false) {
                ea_bootstrap_1.Logger.warn(`Method ${fn.name} reported an unhealthy response. Network ${network} considered unhealthy`);
                return false;
            }
        }
        catch (e) {
            ea_bootstrap_1.Logger.error(`Method ${fn.name} failed: ${e.message}. Network ${network} considered unhealthy`);
            return false;
        }
        return true;
    };
    // #1 Option: Direct check on health endpoint
    // #2 Option: Check block height
    // #3 Option: Check L1 Rollup Contract
    // If every method succeeds, the Network is considered healthy
    // If any method fails, an empty tx is sent. This determines the final state
    const wrappedMethods = [network_1.getSequencerHealth, exports.getL2NetworkStatus, network_1.getL1RollupStatus].map(_tryMethod);
    for (let i = 0; i < wrappedMethods.length; i++) {
        const method = wrappedMethods[i];
        const isHealthy = await method(network, config.delta, config.deltaBlocks);
        if (!isHealthy) {
            ea_bootstrap_1.Logger.info(`Checking unhealthy network ${network} with transaction submission`);
            const isHealthyByTransaction = await network_1.getStatusByTransaction(network, config.timeoutLimit);
            if (isHealthyByTransaction) {
                ea_bootstrap_1.Logger.info(`Transaction submission check succeeded. Network ${network} can be considered healthy`);
                return _respond(true);
            }
            return _respond(false);
        }
    }
    // Every method succeded. Network is healthy
    return _respond(true);
};
exports.execute = execute;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBEQUFzRTtBQUV0RSxxQ0FBK0Q7QUFDL0QsdUNBTWtCO0FBRVgsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLE9BQWlCLEVBQUUsRUFBRTtJQUMxRCxJQUFJLGFBQWEsR0FBeUM7UUFDeEQsS0FBSyxFQUFFLENBQUM7UUFDUixTQUFTLEVBQUUsQ0FBQztLQUNiLENBQUE7SUFFRCxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUE7SUFDcEUsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFhLEVBQUUsS0FBYSxFQUFXLEVBQUU7UUFDOUQsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLGFBQWEsQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFBO0lBQzdFLENBQUMsQ0FBQTtJQUNELHlKQUF5SjtJQUN6SixNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQWEsRUFBRSxXQUFtQixFQUFFLEVBQUUsQ0FDM0QsYUFBYSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksV0FBVyxDQUFBO0lBQzVDLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxLQUFhLEVBQVEsRUFBRTtRQUNuRCxhQUFhLEdBQUc7WUFDZCxLQUFLO1lBQ0wsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDdEIsQ0FBQTtJQUNILENBQUMsQ0FBQTtJQUVELE9BQU8sS0FBSyxFQUFFLEtBQWEsRUFBRSxXQUFtQixFQUFvQixFQUFFO1FBQ3BFLE1BQU0sS0FBSyxHQUFHLE1BQU0sNEJBQWtCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDO1lBQ3BDLE1BQU0sSUFBSSxLQUFL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QTthQUN0QjtZQUNELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3ZCO0tBQ0Y7SUFFRCw0Q0FBNEM7SUFDNUMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDdkIsQ0FBQyxDQUFBO0FBbkVZLFFBQUEsT0FBTyxXQW1FbkI7QUFFTSxNQUFNLFdBQVcsR0FBbUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUNwRSxPQUFPLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQVUsRUFBRSxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhlY3V0ZUZhY3RvcnkgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgTG9nZ2VyLCBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIElucHV0UGFyYW1ldGVycyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBFeHRlbmRlZENvbmZpZywgTmV0d29ya3MsIG1ha2VDb25maWcgfSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7XG4gIHJlcXVlc3RCbG9ja0hlaWdodCxcbiAgZ2V0U2VxdWVuY2VySGVhbHRoLFxuICBnZXRMMVJvbGx1cFN0YXR1cyxcbiAgTmV0d29ya0hlYWx0aENoZWNrLFxuICBnZXRTdGF0dXNCeVRyYW5zYWN0aW9uLFxufSBmcm9tICcuL25ldHdvcmsnXG5cbmV4cG9ydCBjb25zdCBtYWtlTmV0d29ya1N0YXR1c0NoZWNrID0gKG5ldHdvcms6IE5ldHdvcmtzKSA9PiB7XG4gIGxldCBsYXN0U2VlbkJsb2NrOiB7IGJsb2NrOiBudW1iZXI7IHRpbWVzdGFtcDogbnVtYmVyIH0gPSB7XG4gICAgYmxvY2s6IDAsXG4gICAgdGltZXN0YW1wOiAwLFxuICB9XG5cbiAgY29uc3QgX2lzUGFzdEJsb2NrID0gKGJsb2NrOiBudW1iZXIpID0+IGJsb2NrIDw9IGxhc3RTZWVuQmxvY2suYmxvY2tcbiAgY29uc3QgX2lzU3RhbGVCbG9jayA9IChibG9jazogbnVtYmVyLCBkZWx0YTogbnVtYmVyKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIF9pc1Bhc3RCbG9jayhibG9jaykgJiYgRGF0ZS5ub3coKSAtIGxhc3RTZWVuQmxvY2sudGltZXN0YW1wID49IGRlbHRhXG4gIH1cbiAgLy8gSWYgdGhlIHJlcXVlc3QgaGl0IGEgcmVwbGljYSBub2RlIHRoYXQgZmVsbCBiZWhpbmQsIHRoZSBibG9jayBjb3VsZCBiZSBwcmV2aW91cyB0byB0aGUgbGFzdCBzZWVuLiBJbmNsdWRpbmcgYSBkZWx0YUJsb2NrcyByYW5nZSB0byBjb25zaWRlciB0aGlzIGNhc2UuXG4gIGNvbnN0IF9pc1ZhbGlkQmxvY2sgPSAoYmxvY2s6IG51bWJlciwgZGVsdGFCbG9ja3M6IG51bWJlcikgPT5cbiAgICBsYXN0U2VlbkJsb2NrLmJsb2NrIC0gYmxvY2sgPD0gZGVsdGFCbG9ja3NcbiAgY29uc3QgX3VwZGF0ZUxhc3RTZWVuQmxvY2sgPSAoYmxvY2s6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIGxhc3RTZWVuQmxvY2sgPSB7XG4gICAgICBibG9jayxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXN5bmMgKGRlbHRhOiBudW1iZXIsIGRlbHRhQmxvY2tzOiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICBjb25zdCBibG9jayA9IGF3YWl0IHJlcXVlc3RCbG9ja0hlaWdodChuZXR3b3JrKVxuICAgIGlmICghX2lzVmFsaWRCbG9jayhibG9jaywgZGVsdGFCbG9ja3MpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgQmxvY2sgZm91bmQgIyR7YmxvY2t9IGlzIHByZXZpb3VzIHRvIGxhc3Qgc2VlbiAjJHtsYXN0U2VlbkJsb2NrLmJsb2NrfSB3aXRoIG1vcmUgdGhhbiAke2RlbHRhQmxvY2tzfSBkaWZmZXJlbmNlYCxcbiAgICAgIClcbiAgICBpZiAoIV9pc1N0YWxlQmxvY2soYmxvY2ssIGRlbHRhKSkge1xuICAgICAgaWYgKCFfaXNQYXN0QmxvY2soYmxvY2spKSBfdXBkYXRlTGFzdFNlZW5CbG9jayhibG9jaylcbiAgICAgIExvZ2dlci5pbmZvKFxuICAgICAgICBgQmxvY2sgIyR7YmxvY2t9IGlzIG5vdCBjb25zaWRlcmVkIHN0YWxlIGF0ICR7RGF0ZS5ub3coKX0uIExhc3Qgc2VlbiBibG9jayAjJHtcbiAgICAgICAgICBsYXN0U2VlbkJsb2NrLmJsb2NrXG4gICAgICAgIH0gd2FzIGF0ICR7bGFzdFNlZW5CbG9jay50aW1lc3RhbXB9YCxcbiAgICAgIClcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIExvZ2dlci53YXJuKFxuICAgICAgYEJsb2NrICMke2Jsb2NrfSBpcyBjb25zaWRlcmVkIHN0YWxlIGF0ICR7RGF0ZS5ub3coKX0uIExhc3Qgc2VlbiBibG9jayAjJHtcbiAgICAgICAgbGFzdFNlZW5CbG9jay5ibG9ja1xuICAgICAgfSB3YXMgYXQgJHtsYXN0U2VlbkJsb2NrLnRpbWVzdGFtcH0sIG1vcmUgdGhhbiAke2RlbHRhfSBtaWxsaXNlY29uZHMgYWdvLmAsXG4gICAgKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IG5ldHdvcmtzOiBSZWNvcmQ8TmV0d29ya3MsIChkZWx0YTogbnVtYmVyLCBkZWx0YUJsb2NrczogbnVtYmVyKSA9PiBQcm9taXNlPGJvb2xlYW4+PiA9IHtcbiAgW05ldHdvcmtzLkFyYml0cnVtXTogbWFrZU5ldHdvcmtTdGF0dXNDaGVjayhOZXR3b3Jrcy5BcmJpdHJ1bSksXG4gIFtOZXR3b3Jrcy5PcHRpbWlzbV06IG1ha2VOZXR3b3JrU3RhdHVzQ2hlY2soTmV0d29ya3MuT3B0aW1pc20pLFxufVxuXG5leHBvcnQgY29uc3QgZ2V0TDJOZXR3b3JrU3RhdHVzOiBOZXR3b3JrSGVhbHRoQ2hlY2sgPSAoXG4gIG5ldHdvcms6IE5ldHdvcmtzLFxuICBkZWx0YTogbnVtYmVyLFxuICBkZWx0YUJsb2NrczogbnVtYmVyLFxuKSA9PiB7XG4gIHJldHVybiBuZXR3b3Jrc1tuZXR3b3JrXShkZWx0YSwgZGVsdGFCbG9ja3MpXG59XG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgbmV0d29yazogdHJ1ZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPEV4dGVuZGVkQ29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBuZXR3b3JrID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLm5ldHdvcmsgYXMgTmV0d29ya3NcblxuICBjb25zdCBfdHJhbnNsYXRlSW50b0ZlZWRSZXNwb25zZSA9IChpc0hlYWx0aHk6IGJvb2xlYW4pOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBpc0hlYWx0aHkgPyAwIDogMVxuICB9XG5cbiAgY29uc3QgX3Jlc3BvbmQgPSAoaXNIZWFsdGh5OiBib29sZWFuKSA9PlxuICAgIFJlcXVlc3Rlci5zdWNjZXNzKFxuICAgICAgam9iUnVuSUQsXG4gICAgICB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpc0hlYWx0aHk6IF90cmFuc2xhdGVJbnRvRmVlZFJlc3BvbnNlKGlzSGVhbHRoeSksXG4gICAgICAgICAgcmVzdWx0OiBfdHJhbnNsYXRlSW50b0ZlZWRSZXNwb25zZShpc0hlYWx0aHkpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNvbmZpZy52ZXJib3NlLFxuICAgIClcblxuICBjb25zdCBfdHJ5TWV0aG9kID1cbiAgICAoZm46IE5ldHdvcmtIZWFsdGhDaGVjaykgPT5cbiAgICBhc3luYyAobmV0d29yazogTmV0d29ya3MsIGRlbHRhOiBudW1iZXIsIGRlbHRhQmxvY2tzOiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGlzSGVhbHRoeSA9IGF3YWl0IGZuKG5ldHdvcmssIGRlbHRhLCBkZWx0YUJsb2NrcylcbiAgICAgICAgaWYgKGlzSGVhbHRoeSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBMb2dnZXIud2FybihcbiAgICAgICAgICAgIGBNZXRob2QgJHtmbi5uYW1lfSByZXBvcnRlZCBhbiB1bmhlYWx0aHkgcmVzcG9uc2UuIE5ldHdvcmsgJHtuZXR3b3JrfSBjb25zaWRlcmVkIHVuaGVhbHRoeWAsXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIExvZ2dlci5lcnJvcihcbiAgICAgICAgICBgTWV0aG9kICR7Zm4ubmFtZX0gZmFpbGVkOiAke2UubWVzc2FnZX0uIE5ldHdvcmsgJHtuZXR3b3JrfSBjb25zaWRlcmVkIHVuaGVhbHRoeWAsXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAvLyAjMSBPcHRpb246IERpcmVjdCBjaGVjayBvbiBoZWFsdGggZW5kcG9pbnRcbiAgLy8gIzIgT3B0aW9uOiBDaGVjayBibG9jayBoZWlnaHRcbiAgLy8gIzMgT3B0aW9uOiBDaGVjayBMMSBSb2xsdXAgQ29udHJhY3RcbiAgLy8gSWYgZXZlcnkgbWV0aG9kIHN1Y2NlZWRzLCB0aGUgTmV0d29yayBpcyBjb25zaWRlcmVkIGhlYWx0aHlcbiAgLy8gSWYgYW55IG1ldGhvZCBmYWlscywgYW4gZW1wdHkgdHggaXMgc2VudC4gVGhpcyBkZXRlcm1pbmVzIHRoZSBmaW5hbCBzdGF0ZVxuICBjb25zdCB3cmFwcGVkTWV0aG9kcyA9IFtnZXRTZXF1ZW5jZXJIZWFsdGgsIGdldEwyTmV0d29ya1N0YXR1cywgZ2V0TDFSb2xsdXBTdGF0dXNdLm1hcChfdHJ5TWV0aG9kKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHdyYXBwZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbWV0aG9kID0gd3JhcHBlZE1ldGhvZHNbaV1cbiAgICBjb25zdCBpc0hlYWx0aHkgPSBhd2FpdCBtZXRob2QobmV0d29yaywgY29uZmlnLmRlbHRhLCBjb25maWcuZGVsdGFCbG9ja3MpXG4gICAgaWYgKCFpc0hlYWx0aHkpIHtcbiAgICAgIExvZ2dlci5pbmZvKGBDaGVja2luZyB1bmhlYWx0aHkgbmV0d29yayAke25ldHdvcmt9IHdpdGggdHJhbnNhY3Rpb24gc3VibWlzc2lvbmApXG4gICAgICBjb25zdCBpc0hlYWx0aHlCeVRyYW5zYWN0aW9uID0gYXdhaXQgZ2V0U3RhdHVzQnlUcmFuc2FjdGlvbihuZXR3b3JrLCBjb25maWcudGltZW91dExpbWl0KVxuICAgICAgaWYgKGlzSGVhbHRoeUJ5VHJhbnNhY3Rpb24pIHtcbiAgICAgICAgTG9nZ2VyLmluZm8oXG4gICAgICAgICAgYFRyYW5zYWN0aW9uIHN1Ym1pc3Npb24gY2hlY2sgc3VjY2VlZGVkLiBOZXR3b3JrICR7bmV0d29ya30gY2FuIGJlIGNvbnNpZGVyZWQgaGVhbHRoeWAsXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIF9yZXNwb25kKHRydWUpXG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3BvbmQoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLy8gRXZlcnkgbWV0aG9kIHN1Y2NlZGVkLiBOZXR3b3JrIGlzIGhlYWx0aHlcbiAgcmV0dXJuIF9yZXNwb25kKHRydWUpXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZTogRXhlY3V0ZUZhY3Rvcnk8RXh0ZW5kZWRDb25maWc+ID0gKGNvbmZpZykgPT4ge1xuICByZXR1cm4gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQpID0+IGV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnIHx8IG1ha2VDb25maWcoKSlcbn1cbiJdfQ==