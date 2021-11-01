"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.isChainType = exports.CHAIN_KEYS = exports.isCoinType = exports.COIN_KEYS = exports.DEFAULT_ENDPOINT = exports.DEFAULT_BASE_URL = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'BTC_COM';
exports.DEFAULT_BASE_URL = 'https://chain.api.btc.com';
exports.DEFAULT_ENDPOINT = 'balance';
exports.COIN_KEYS = ['btc'];
function isCoinType(key) {
    return exports.COIN_KEYS.includes(key);
}
exports.isCoinType = isCoinType;
exports.CHAIN_KEYS = ['mainnet'];
function isChainType(key) {
    return exports.CHAIN_KEYS.includes(key);
}
exports.isChainType = isChainType;
const makeConfig = (prefix = '') => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_BASE_URL;
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsU0FBUyxDQUFBO0FBRWhCLFFBQUEsZ0JBQWdCLEdBQUcsMkJBQTJCLENBQUE7QUFFOUMsUUFBQSxnQkFBZ0IsR0FBRyxTQUFTLENBQUE7QUFFNUIsUUFBQSxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQVUsQ0FBQTtBQUV6QyxTQUFnQixVQUFVLENBQUMsR0FBVztJQUNwQyxPQUFPLGlCQUFTLENBQUMsUUFBUSxDQUFDLEdBQWUsQ0FBQyxDQUFBO0FBQzVDLENBQUM7QUFGRCxnQ0FFQztBQUNZLFFBQUEsVUFBVSxHQUFHLENBQUMsU0FBUyxDQUFVLENBQUE7QUFFOUMsU0FBZ0IsV0FBVyxDQUFDLEdBQVc7SUFDckMsT0FBTyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFnQixDQUFDLENBQUE7QUFDOUMsQ0FBQztBQUZELGtDQUVDO0FBRU0sTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFVLEVBQUU7SUFDaEQsTUFBTSxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSx3QkFBZ0IsQ0FBQTtJQUMzRCxNQUFNLENBQUMsZUFBZSxHQUFHLHdCQUFnQixDQUFBO0lBQ3pDLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBTFksUUFBQSxVQUFVLGNBS3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuXG5leHBvcnQgY29uc3QgTkFNRSA9ICdCVENfQ09NJ1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9CQVNFX1VSTCA9ICdodHRwczovL2NoYWluLmFwaS5idGMuY29tJ1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FTkRQT0lOVCA9ICdiYWxhbmNlJ1xuXG5leHBvcnQgY29uc3QgQ09JTl9LRVlTID0gWydidGMnXSBhcyBjb25zdFxuZXhwb3J0IHR5cGUgQ29pblR5cGUgPSB0eXBlb2YgQ09JTl9LRVlTW251bWJlcl1cbmV4cG9ydCBmdW5jdGlvbiBpc0NvaW5UeXBlKGtleTogc3RyaW5nKToga2V5IGlzIENvaW5UeXBlIHtcbiAgcmV0dXJuIENPSU5fS0VZUy5pbmNsdWRlcyhrZXkgYXMgQ29pblR5cGUpXG59XG5leHBvcnQgY29uc3QgQ0hBSU5fS0VZUyA9IFsnbWFpbm5ldCddIGFzIGNvbnN0XG5leHBvcnQgdHlwZSBDaGFpblR5cGUgPSB0eXBlb2YgQ0hBSU5fS0VZU1tudW1iZXJdXG5leHBvcnQgZnVuY3Rpb24gaXNDaGFpblR5cGUoa2V5OiBzdHJpbmcpOiBrZXkgaXMgQ2hhaW5UeXBlIHtcbiAgcmV0dXJuIENIQUlOX0tFWVMuaW5jbHVkZXMoa2V5IGFzIENoYWluVHlwZSlcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4ID0gJycpOiBDb25maWcgPT4ge1xuICBjb25zdCBjb25maWcgPSBSZXF1ZXN0ZXIuZ2V0RGVmYXVsdENvbmZpZyhwcmVmaXgpXG4gIGNvbmZpZy5hcGkuYmFzZVVSTCA9IGNvbmZpZy5hcGkuYmFzZVVSTCB8fCBERUZBVUxUX0JBU0VfVVJMXG4gIGNvbmZpZy5kZWZhdWx0RW5kcG9pbnQgPSBERUZBVUxUX0VORFBPSU5UXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==