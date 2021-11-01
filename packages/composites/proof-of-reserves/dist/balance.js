"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBalanceAdapter = exports.adapters = void 0;
const tslib_1 = require("tslib");
const adapter_1 = require("./adapter");
// balance adapters
const amberdata_adapter_1 = tslib_1.__importDefault(require("@chainlink/amberdata-adapter"));
const bitcoin_json_rpc_adapter_1 = tslib_1.__importDefault(require("@chainlink/bitcoin-json-rpc-adapter"));
const blockchain_com_adapter_1 = tslib_1.__importDefault(require("@chainlink/blockchain.com-adapter"));
const blockchair_adapter_1 = tslib_1.__importDefault(require("@chainlink/blockchair-adapter"));
const blockcypher_adapter_1 = tslib_1.__importDefault(require("@chainlink/blockcypher-adapter"));
const btc_com_adapter_1 = tslib_1.__importDefault(require("@chainlink/btc.com-adapter"));
const cryptoapis_adapter_1 = tslib_1.__importDefault(require("@chainlink/cryptoapis-adapter"));
const sochain_adapter_1 = tslib_1.__importDefault(require("@chainlink/sochain-adapter"));
const lotus = tslib_1.__importStar(require("@chainlink/lotus-adapter"));
const ethBalance = tslib_1.__importStar(require("@chainlink/eth-balance-adapter"));
const adaBalance = tslib_1.__importStar(require("@chainlink/ada-balance-adapter"));
exports.adapters = [
    amberdata_adapter_1.default,
    bitcoin_json_rpc_adapter_1.default,
    blockchain_com_adapter_1.default,
    blockcypher_adapter_1.default,
    blockchair_adapter_1.default,
    btc_com_adapter_1.default,
    cryptoapis_adapter_1.default,
    sochain_adapter_1.default,
    lotus,
    ethBalance,
    adaBalance,
];
// Get balances for address set
const runBalanceAdapter = async (indexer, context, confirmations, config, input) => {
    const execute = adapter_1.makeRequestFactory(config, indexer);
    const next = indexer === bitcoin_json_rpc_adapter_1.default.NAME
        ? buildLocalBitcoinNodeRequest(input)
        : {
            id: input.jobRunID,
            data: {
                result: input.data.result,
                dataPath: 'result',
                endpoint: 'balance',
                confirmations,
            },
        };
    return adapter_1.callAdapter(execute, context, next, '_onBalance');
};
exports.runBalanceAdapter = runBalanceAdapter;
const buildLocalBitcoinNodeRequest = (input) => {
    return {
        id: input.jobRunID,
        data: {
            scanobjects: input.data.result.map((result) => result.address),
            endpoint: 'scantxoutset',
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWxhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFPQSx1Q0FBMkQ7QUFDM0QsbUJBQW1CO0FBQ25CLDZGQUFvRDtBQUNwRCwyR0FBZ0U7QUFDaEUsdUdBQTZEO0FBQzdELCtGQUFzRDtBQUN0RCxpR0FBd0Q7QUFDeEQseUZBQStDO0FBQy9DLCtGQUFzRDtBQUN0RCx5RkFBZ0Q7QUFDaEQsd0VBQWlEO0FBQ2pELG1GQUE0RDtBQUM1RCxtRkFBNEQ7QUFFL0MsUUFBQSxRQUFRLEdBQTRCO0lBQy9DLDJCQUFTO0lBQ1Qsa0NBQWM7SUFDZCxnQ0FBYTtJQUNiLDZCQUFXO0lBQ1gsNEJBQVU7SUFDVix5QkFBTTtJQUNOLDRCQUFVO0lBQ1YseUJBQU87SUFDUCxLQUFLO0lBQ0wsVUFBVTtJQUNWLFVBQVU7Q0FDWCxDQUFBO0FBSUQsK0JBQStCO0FBQ3hCLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxPQUFnQixFQUNoQixPQUF1QixFQUN2QixhQUFxQixFQUNyQixNQUFjLEVBQ2QsS0FBc0IsRUFDSSxFQUFFO0lBQzVCLE1BQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNuRCxNQUFNLElBQUksR0FDUixPQUFPLEtBQUssa0NBQWMsQ0FBQyxJQUFJO1FBQzdCLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUM7UUFDckMsQ0FBQyxDQUFDO1lBQ0UsRUFBRSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ2xCLElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUN6QixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLGFBQWE7YUFDZDtTQUNGLENBQUE7SUFDUCxPQUFPLHFCQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUE7QUFDMUQsQ0FBQyxDQUFBO0FBckJZLFFBQUEsaUJBQWlCLHFCQXFCN0I7QUFFRCxNQUFNLDRCQUE0QixHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO0lBQzlELE9BQU87UUFDTCxFQUFFLEVBQUUsS0FBSyxDQUFDLFFBQVE7UUFDbEIsSUFBSSxFQUFFO1lBQ0osV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQWUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN2RSxRQUFRLEVBQUUsY0FBYztTQUN6QjtLQUNGLENBQUE7QUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZGFwdGVySW1wbGVtZW50YXRpb24sXG4gIEFkYXB0ZXJSZXNwb25zZSxcbiAgQ29uZmlnLFxuICBBY2NvdW50LFxuICBBZGFwdGVyQ29udGV4dCxcbn0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IGNhbGxBZGFwdGVyLCBtYWtlUmVxdWVzdEZhY3RvcnkgfSBmcm9tICcuL2FkYXB0ZXInXG4vLyBiYWxhbmNlIGFkYXB0ZXJzXG5pbXBvcnQgYW1iZXJkYXRhIGZyb20gJ0BjaGFpbmxpbmsvYW1iZXJkYXRhLWFkYXB0ZXInXG5pbXBvcnQgYml0Y29pbkpzb25ScGMgZnJvbSAnQGNoYWlubGluay9iaXRjb2luLWpzb24tcnBjLWFkYXB0ZXInXG5pbXBvcnQgYmxvY2tjaGFpbkNvbSBmcm9tICdAY2hhaW5saW5rL2Jsb2NrY2hhaW4uY29tLWFkYXB0ZXInXG5pbXBvcnQgYmxvY2tjaGFpciBmcm9tICdAY2hhaW5saW5rL2Jsb2NrY2hhaXItYWRhcHRlcidcbmltcG9ydCBibG9ja2N5cGhlciBmcm9tICdAY2hhaW5saW5rL2Jsb2NrY3lwaGVyLWFkYXB0ZXInXG5pbXBvcnQgYnRjQ29tIGZyb20gJ0BjaGFpbmxpbmsvYnRjLmNvbS1hZGFwdGVyJ1xuaW1wb3J0IGNyeXB0b2FwaXMgZnJvbSAnQGNoYWlubGluay9jcnlwdG9hcGlzLWFkYXB0ZXInXG5pbXBvcnQgc29jaGFpbiBmcm9tICdAY2hhaW5saW5rL3NvY2hhaW4tYWRhcHRlcidcbmltcG9ydCAqIGFzIGxvdHVzIGZyb20gJ0BjaGFpbmxpbmsvbG90dXMtYWRhcHRlcidcbmltcG9ydCAqIGFzIGV0aEJhbGFuY2UgZnJvbSAnQGNoYWlubGluay9ldGgtYmFsYW5jZS1hZGFwdGVyJ1xuaW1wb3J0ICogYXMgYWRhQmFsYW5jZSBmcm9tICdAY2hhaW5saW5rL2FkYS1iYWxhbmNlLWFkYXB0ZXInXG5cbmV4cG9ydCBjb25zdCBhZGFwdGVyczogQWRhcHRlckltcGxlbWVudGF0aW9uW10gPSBbXG4gIGFtYmVyZGF0YSxcbiAgYml0Y29pbkpzb25ScGMsXG4gIGJsb2NrY2hhaW5Db20sXG4gIGJsb2NrY3lwaGVyLFxuICBibG9ja2NoYWlyLFxuICBidGNDb20sXG4gIGNyeXB0b2FwaXMsXG4gIHNvY2hhaW4sXG4gIGxvdHVzLFxuICBldGhCYWxhbmNlLFxuICBhZGFCYWxhbmNlLFxuXVxuXG5leHBvcnQgdHlwZSBJbmRleGVyID0gdHlwZW9mIGFkYXB0ZXJzW251bWJlcl1bJ05BTUUnXVxuXG4vLyBHZXQgYmFsYW5jZXMgZm9yIGFkZHJlc3Mgc2V0XG5leHBvcnQgY29uc3QgcnVuQmFsYW5jZUFkYXB0ZXIgPSBhc3luYyAoXG4gIGluZGV4ZXI6IEluZGV4ZXIsXG4gIGNvbnRleHQ6IEFkYXB0ZXJDb250ZXh0LFxuICBjb25maXJtYXRpb25zOiBudW1iZXIsXG4gIGNvbmZpZzogQ29uZmlnLFxuICBpbnB1dDogQWRhcHRlclJlc3BvbnNlLFxuKTogUHJvbWlzZTxBZGFwdGVyUmVzcG9uc2U+ID0+IHtcbiAgY29uc3QgZXhlY3V0ZSA9IG1ha2VSZXF1ZXN0RmFjdG9yeShjb25maWcsIGluZGV4ZXIpXG4gIGNvbnN0IG5leHQgPVxuICAgIGluZGV4ZXIgPT09IGJpdGNvaW5Kc29uUnBjLk5BTUVcbiAgICAgID8gYnVpbGRMb2NhbEJpdGNvaW5Ob2RlUmVxdWVzdChpbnB1dClcbiAgICAgIDoge1xuICAgICAgICAgIGlkOiBpbnB1dC5qb2JSdW5JRCxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICByZXN1bHQ6IGlucHV0LmRhdGEucmVzdWx0LFxuICAgICAgICAgICAgZGF0YVBhdGg6ICdyZXN1bHQnLFxuICAgICAgICAgICAgZW5kcG9pbnQ6ICdiYWxhbmNlJyxcbiAgICAgICAgICAgIGNvbmZpcm1hdGlvbnMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICByZXR1cm4gY2FsbEFkYXB0ZXIoZXhlY3V0ZSwgY29udGV4dCwgbmV4dCwgJ19vbkJhbGFuY2UnKVxufVxuXG5jb25zdCBidWlsZExvY2FsQml0Y29pbk5vZGVSZXF1ZXN0ID0gKGlucHV0OiBBZGFwdGVyUmVzcG9uc2UpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBpZDogaW5wdXQuam9iUnVuSUQsXG4gICAgZGF0YToge1xuICAgICAgc2Nhbm9iamVjdHM6IGlucHV0LmRhdGEucmVzdWx0Lm1hcCgocmVzdWx0OiBBY2NvdW50KSA9PiByZXN1bHQuYWRkcmVzcyksXG4gICAgICBlbmRwb2ludDogJ3NjYW50eG91dHNldCcsXG4gICAgfSxcbiAgfVxufVxuIl19