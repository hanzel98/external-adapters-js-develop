"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runReduceAdapter = void 0;
const tslib_1 = require("tslib");
const reduce_adapter_1 = tslib_1.__importDefault(require("@chainlink/reduce-adapter"));
const adapter_1 = require("./adapter");
const bitcoin_json_rpc_adapter_1 = tslib_1.__importDefault(require("@chainlink/bitcoin-json-rpc-adapter"));
const adaBalance = tslib_1.__importStar(require("@chainlink/ada-balance-adapter"));
const lotus = tslib_1.__importStar(require("@chainlink/lotus-adapter"));
const ethers_1 = require("ethers");
const returnParsedUnits = (jobRunID, result, units) => {
    const convertedResult = units === 0 ? result : ethers_1.ethers.utils.parseUnits(result, units).toString();
    return {
        jobRunID,
        result: convertedResult,
        statusCode: 200,
        data: {
            result: convertedResult,
        },
    };
};
// Get reduce balances as total balance
const runReduceAdapter = async (indexer, context, input) => {
    // Some adapters' balances come already reduced
    // but needs to be converted from their base unit
    switch (indexer) {
        case bitcoin_json_rpc_adapter_1.default.NAME:
            return returnParsedUnits(input.jobRunID, input.data.result, 8);
        case lotus.NAME:
        case adaBalance.NAME:
            return returnParsedUnits(input.jobRunID, input.data.result, 0);
    }
    const next = {
        id: input.jobRunID,
        data: {
            result: input.data.result,
            reducer: 'sum',
            initialValue: 0,
            dataPath: 'result',
            valuePath: 'balance',
        },
    };
    return adapter_1.callAdapter(reduce_adapter_1.default.execute, context, next, '_onReduce');
};
exports.runReduceAdapter = runReduceAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JlZHVjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsdUZBQThDO0FBRTlDLHVDQUF1QztBQUV2QywyR0FBZ0U7QUFDaEUsbUZBQTREO0FBQzVELHdFQUFpRDtBQUNqRCxtQ0FBK0I7QUFFL0IsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFFBQWdCLEVBQUUsTUFBYyxFQUFFLEtBQWEsRUFBRSxFQUFFO0lBQzVFLE1BQU0sZUFBZSxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ2hHLE9BQU87UUFDTCxRQUFRO1FBQ1IsTUFBTSxFQUFFLGVBQWU7UUFDdkIsVUFBVSxFQUFFLEdBQUc7UUFDZixJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsZUFBZTtTQUN4QjtLQUNGLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCx1Q0FBdUM7QUFDaEMsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLEVBQ25DLE9BQWdCLEVBQ2hCLE9BQXVCLEVBQ3ZCLEtBQXNCLEVBQ0ksRUFBRTtJQUM1QiwrQ0FBK0M7SUFDL0MsaURBQWlEO0lBQ2pELFFBQVEsT0FBTyxFQUFFO1FBQ2YsS0FBSyxrQ0FBYyxDQUFDLElBQUk7WUFDdEIsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2hFLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQztRQUNoQixLQUFLLFVBQVUsQ0FBQyxJQUFJO1lBQ2xCLE9BQU8saUJBQWlCLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUNqRTtJQUVELE1BQU0sSUFBSSxHQUFHO1FBQ1gsRUFBRSxFQUFFLEtBQUssQ0FBQyxRQUFRO1FBQ2xCLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDekIsT0FBTyxFQUFFLEtBQUs7WUFDZCxZQUFZLEVBQUUsQ0FBQztZQUNmLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxTQUFTO1NBQ3JCO0tBQ0YsQ0FBQTtJQUNELE9BQU8scUJBQVcsQ0FBQyx3QkFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0FBQ2hFLENBQUMsQ0FBQTtBQTFCWSxRQUFBLGdCQUFnQixvQkEwQjVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZHVjZSBmcm9tICdAY2hhaW5saW5rL3JlZHVjZS1hZGFwdGVyJ1xuaW1wb3J0IHsgQWRhcHRlckNvbnRleHQsIEFkYXB0ZXJSZXNwb25zZSB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBjYWxsQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcidcbmltcG9ydCB7IEluZGV4ZXIgfSBmcm9tICcuL2JhbGFuY2UnXG5pbXBvcnQgYml0Y29pbkpzb25ScGMgZnJvbSAnQGNoYWlubGluay9iaXRjb2luLWpzb24tcnBjLWFkYXB0ZXInXG5pbXBvcnQgKiBhcyBhZGFCYWxhbmNlIGZyb20gJ0BjaGFpbmxpbmsvYWRhLWJhbGFuY2UtYWRhcHRlcidcbmltcG9ydCAqIGFzIGxvdHVzIGZyb20gJ0BjaGFpbmxpbmsvbG90dXMtYWRhcHRlcidcbmltcG9ydCB7IGV0aGVycyB9IGZyb20gJ2V0aGVycydcblxuY29uc3QgcmV0dXJuUGFyc2VkVW5pdHMgPSAoam9iUnVuSUQ6IHN0cmluZywgcmVzdWx0OiBzdHJpbmcsIHVuaXRzOiBudW1iZXIpID0+IHtcbiAgY29uc3QgY29udmVydGVkUmVzdWx0ID0gdW5pdHMgPT09IDAgPyByZXN1bHQgOiBldGhlcnMudXRpbHMucGFyc2VVbml0cyhyZXN1bHQsIHVuaXRzKS50b1N0cmluZygpXG4gIHJldHVybiB7XG4gICAgam9iUnVuSUQsXG4gICAgcmVzdWx0OiBjb252ZXJ0ZWRSZXN1bHQsXG4gICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlc3VsdDogY29udmVydGVkUmVzdWx0LFxuICAgIH0sXG4gIH1cbn1cblxuLy8gR2V0IHJlZHVjZSBiYWxhbmNlcyBhcyB0b3RhbCBiYWxhbmNlXG5leHBvcnQgY29uc3QgcnVuUmVkdWNlQWRhcHRlciA9IGFzeW5jIChcbiAgaW5kZXhlcjogSW5kZXhlcixcbiAgY29udGV4dDogQWRhcHRlckNvbnRleHQsXG4gIGlucHV0OiBBZGFwdGVyUmVzcG9uc2UsXG4pOiBQcm9taXNlPEFkYXB0ZXJSZXNwb25zZT4gPT4ge1xuICAvLyBTb21lIGFkYXB0ZXJzJyBiYWxhbmNlcyBjb21lIGFscmVhZHkgcmVkdWNlZFxuICAvLyBidXQgbmVlZHMgdG8gYmUgY29udmVydGVkIGZyb20gdGhlaXIgYmFzZSB1bml0XG4gIHN3aXRjaCAoaW5kZXhlcikge1xuICAgIGNhc2UgYml0Y29pbkpzb25ScGMuTkFNRTpcbiAgICAgIHJldHVybiByZXR1cm5QYXJzZWRVbml0cyhpbnB1dC5qb2JSdW5JRCwgaW5wdXQuZGF0YS5yZXN1bHQsIDgpXG4gICAgY2FzZSBsb3R1cy5OQU1FOlxuICAgIGNhc2UgYWRhQmFsYW5jZS5OQU1FOlxuICAgICAgcmV0dXJuIHJldHVyblBhcnNlZFVuaXRzKGlucHV0LmpvYlJ1bklELCBpbnB1dC5kYXRhLnJlc3VsdCwgMClcbiAgfVxuXG4gIGNvbnN0IG5leHQgPSB7XG4gICAgaWQ6IGlucHV0LmpvYlJ1bklELFxuICAgIGRhdGE6IHtcbiAgICAgIHJlc3VsdDogaW5wdXQuZGF0YS5yZXN1bHQsXG4gICAgICByZWR1Y2VyOiAnc3VtJyxcbiAgICAgIGluaXRpYWxWYWx1ZTogMCxcbiAgICAgIGRhdGFQYXRoOiAncmVzdWx0JyxcbiAgICAgIHZhbHVlUGF0aDogJ2JhbGFuY2UnLFxuICAgIH0sXG4gIH1cbiAgcmV0dXJuIGNhbGxBZGFwdGVyKHJlZHVjZS5leGVjdXRlLCBjb250ZXh0LCBuZXh0LCAnX29uUmVkdWNlJylcbn1cbiJdfQ==