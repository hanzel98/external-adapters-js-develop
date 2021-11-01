"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.ENV_MARKET_MAKER_REWARDS_AMOUNT = exports.ENV_TRADER_REWARDS_AMOUNT = exports.ENV_TREASURY_CLAIM_ADDRESS = exports.ENV_RPC_URL = exports.ENV_PRIVATE_KEY = exports.DEFAULT_MARKET_MAKER_REWARDS_AMOUNT = exports.DEFAULT_TRADER_REWARDS_AMOUNT = exports.DEFAULT_TREASURY_CLAIM_ADDRESS = exports.DEFAULT_METHOD = void 0;
const ethers_1 = require("ethers");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.DEFAULT_METHOD = 'poke';
exports.DEFAULT_TREASURY_CLAIM_ADDRESS = '0x95EaBB0248D013b9F59c5D5256CE11b0a8140B54';
exports.DEFAULT_TRADER_REWARDS_AMOUNT = '3835616e18';
exports.DEFAULT_MARKET_MAKER_REWARDS_AMOUNT = '1150685e18';
exports.ENV_PRIVATE_KEY = 'PRIVATE_KEY';
exports.ENV_RPC_URL = 'RPC_URL';
exports.ENV_TREASURY_CLAIM_ADDRESS = 'TREASURY_CLAIM_ADDRESS';
exports.ENV_TRADER_REWARDS_AMOUNT = 'TRADER_REWARDS_AMOUNT';
exports.ENV_MARKET_MAKER_REWARDS_AMOUNT = 'MARKET_MAKER_REWARDS_AMOUNT';
const makeConfig = (prefix) => {
    const privateKey = ea_bootstrap_1.util.getRequiredEnv(exports.ENV_PRIVATE_KEY, prefix);
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(ea_bootstrap_1.util.getRequiredEnv(exports.ENV_RPC_URL, prefix));
    const wallet = new ethers_1.ethers.Wallet(privateKey, provider);
    return {
        api: {},
        wallet,
        treasuryClaimAddress: ea_bootstrap_1.util.getEnv(exports.ENV_TREASURY_CLAIM_ADDRESS, prefix) || exports.DEFAULT_TREASURY_CLAIM_ADDRESS,
        traderRewardsAmount: ea_bootstrap_1.util.getEnv(exports.ENV_TRADER_REWARDS_AMOUNT, prefix) || exports.DEFAULT_TRADER_REWARDS_AMOUNT,
        marketMakerRewardsAmount: ea_bootstrap_1.util.getEnv(exports.ENV_MARKET_MAKER_REWARDS_AMOUNT, prefix) || exports.DEFAULT_MARKET_MAKER_REWARDS_AMOUNT,
    };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBK0I7QUFDL0IsMERBQThDO0FBRWpDLFFBQUEsY0FBYyxHQUFHLE1BQU0sQ0FBQTtBQUN2QixRQUFBLDhCQUE4QixHQUFHLDRDQUE0QyxDQUFBO0FBQzdFLFFBQUEsNkJBQTZCLEdBQUcsWUFBWSxDQUFBO0FBQzVDLFFBQUEsbUNBQW1DLEdBQUcsWUFBWSxDQUFBO0FBRWxELFFBQUEsZUFBZSxHQUFHLGFBQWEsQ0FBQTtBQUMvQixRQUFBLFdBQVcsR0FBRyxTQUFTLENBQUE7QUFDdkIsUUFBQSwwQkFBMEIsR0FBRyx3QkFBd0IsQ0FBQTtBQUNyRCxRQUFBLHlCQUF5QixHQUFHLHVCQUF1QixDQUFBO0FBQ25ELFFBQUEsK0JBQStCLEdBQUcsNkJBQTZCLENBQUE7QUFXckUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFlLEVBQVUsRUFBRTtJQUNwRCxNQUFNLFVBQVUsR0FBRyxtQkFBSSxDQUFDLGNBQWMsQ0FBQyx1QkFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQy9ELE1BQU0sUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsbUJBQUksQ0FBQyxjQUFjLENBQUMsbUJBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQy9GLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFdEQsT0FBTztRQUNMLEdBQUcsRUFBRSxFQUFFO1FBQ1AsTUFBTTtRQUNOLG9CQUFvQixFQUNsQixtQkFBSSxDQUFDLE1BQU0sQ0FBQyxrQ0FBMEIsRUFBRSxNQUFNLENBQUMsSUFBSSxzQ0FBOEI7UUFDbkYsbUJBQW1CLEVBQ2pCLG1CQUFJLENBQUMsTUFBTSxDQUFDLGlDQUF5QixFQUFFLE1BQU0sQ0FBQyxJQUFJLHFDQUE2QjtRQUNqRix3QkFBd0IsRUFDdEIsbUJBQUksQ0FBQyxNQUFNLENBQUMsdUNBQStCLEVBQUUsTUFBTSxDQUFDLElBQUksMkNBQW1DO0tBQzlGLENBQUE7QUFDSCxDQUFDLENBQUE7QUFmWSxRQUFBLFVBQVUsY0FldEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IGV0aGVycyB9IGZyb20gJ2V0aGVycydcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUVUSE9EID0gJ3Bva2UnXG5leHBvcnQgY29uc3QgREVGQVVMVF9UUkVBU1VSWV9DTEFJTV9BRERSRVNTID0gJzB4OTVFYUJCMDI0OEQwMTNiOUY1OWM1RDUyNTZDRTExYjBhODE0MEI1NCdcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RSQURFUl9SRVdBUkRTX0FNT1VOVCA9ICczODM1NjE2ZTE4J1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFSS0VUX01BS0VSX1JFV0FSRFNfQU1PVU5UID0gJzExNTA2ODVlMTgnXG5cbmV4cG9ydCBjb25zdCBFTlZfUFJJVkFURV9LRVkgPSAnUFJJVkFURV9LRVknXG5leHBvcnQgY29uc3QgRU5WX1JQQ19VUkwgPSAnUlBDX1VSTCdcbmV4cG9ydCBjb25zdCBFTlZfVFJFQVNVUllfQ0xBSU1fQUREUkVTUyA9ICdUUkVBU1VSWV9DTEFJTV9BRERSRVNTJ1xuZXhwb3J0IGNvbnN0IEVOVl9UUkFERVJfUkVXQVJEU19BTU9VTlQgPSAnVFJBREVSX1JFV0FSRFNfQU1PVU5UJ1xuZXhwb3J0IGNvbnN0IEVOVl9NQVJLRVRfTUFLRVJfUkVXQVJEU19BTU9VTlQgPSAnTUFSS0VUX01BS0VSX1JFV0FSRFNfQU1PVU5UJ1xuXG5leHBvcnQgdHlwZSBDb25maWcgPSB7XG4gIHdhbGxldDogZXRoZXJzLldhbGxldFxuICBhcGk6IFJlcXVlc3RDb25maWdcblxuICB0cmVhc3VyeUNsYWltQWRkcmVzczogc3RyaW5nXG4gIHRyYWRlclJld2FyZHNBbW91bnQ6IHN0cmluZ1xuICBtYXJrZXRNYWtlclJld2FyZHNBbW91bnQ6IHN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgbWFrZUNvbmZpZyA9IChwcmVmaXg/OiBzdHJpbmcpOiBDb25maWcgPT4ge1xuICBjb25zdCBwcml2YXRlS2V5ID0gdXRpbC5nZXRSZXF1aXJlZEVudihFTlZfUFJJVkFURV9LRVksIHByZWZpeClcbiAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZXRoZXJzLnByb3ZpZGVycy5Kc29uUnBjUHJvdmlkZXIodXRpbC5nZXRSZXF1aXJlZEVudihFTlZfUlBDX1VSTCwgcHJlZml4KSlcbiAgY29uc3Qgd2FsbGV0ID0gbmV3IGV0aGVycy5XYWxsZXQocHJpdmF0ZUtleSwgcHJvdmlkZXIpXG5cbiAgcmV0dXJuIHtcbiAgICBhcGk6IHt9LFxuICAgIHdhbGxldCxcbiAgICB0cmVhc3VyeUNsYWltQWRkcmVzczpcbiAgICAgIHV0aWwuZ2V0RW52KEVOVl9UUkVBU1VSWV9DTEFJTV9BRERSRVNTLCBwcmVmaXgpIHx8IERFRkFVTFRfVFJFQVNVUllfQ0xBSU1fQUREUkVTUyxcbiAgICB0cmFkZXJSZXdhcmRzQW1vdW50OlxuICAgICAgdXRpbC5nZXRFbnYoRU5WX1RSQURFUl9SRVdBUkRTX0FNT1VOVCwgcHJlZml4KSB8fCBERUZBVUxUX1RSQURFUl9SRVdBUkRTX0FNT1VOVCxcbiAgICBtYXJrZXRNYWtlclJld2FyZHNBbW91bnQ6XG4gICAgICB1dGlsLmdldEVudihFTlZfTUFSS0VUX01BS0VSX1JFV0FSRFNfQU1PVU5ULCBwcmVmaXgpIHx8IERFRkFVTFRfTUFSS0VUX01BS0VSX1JFV0FSRFNfQU1PVU5ULFxuICB9XG59XG4iXX0=