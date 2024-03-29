"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_factories_1 = require("@chainlink/ea-factories");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['balance'];
exports.inputParameters = ea_factories_1.balance.inputParameters;
const getBalanceURI = (address) => `/v3/address/${address}`;
const getBalance = async (account, config) => {
    const reqConfig = {
        ...config.api,
        url: getBalanceURI(account.address),
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    return {
        payload: response.data,
        result: [{ ...account, balance: String(response.data.data.balance) }],
    };
};
const isSupported = (coin, chain) => config_1.isChainType(chain) && config_1.isCoinType(coin);
const makeExecute = (config) => ea_factories_1.balance.make({ ...config, getBalance, isSupported });
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9iYWxhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUFpRDtBQUNqRCwwREFBbUQ7QUFFbkQsc0NBQW1EO0FBRXRDLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVoQyxRQUFBLGVBQWUsR0FBRyxzQkFBTyxDQUFDLGVBQWUsQ0FBQTtBQUV0RCxNQUFNLGFBQWEsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQUMsZUFBZSxPQUFPLEVBQUUsQ0FBQTtBQUVuRSxNQUFNLFVBQVUsR0FBdUIsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUMvRCxNQUFNLFNBQVMsR0FBRztRQUNoQixHQUFHLE1BQU0sQ0FBQyxHQUFHO1FBQ2IsR0FBRyxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0tBQ3BDLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRW5ELE9BQU87UUFDTCxPQUFPLEVBQUUsUUFBUSxDQUFDLElBQUk7UUFDdEIsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7S0FDdEUsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sV0FBVyxHQUF3QixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLG9CQUFXLENBQUMsS0FBSyxDQUFDLElBQUksbUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUV6RixNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFlLEVBQUUsRUFBRSxDQUNyRSxzQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFBO0FBRHpDLFFBQUEsV0FBVyxlQUM4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJhbGFuY2UgfSBmcm9tICdAY2hhaW5saW5rL2VhLWZhY3RvcmllcydcbmltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnLCBFeGVjdXRlRmFjdG9yeSB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBpc0NoYWluVHlwZSwgaXNDb2luVHlwZSB9IGZyb20gJy4uL2NvbmZpZydcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnYmFsYW5jZSddXG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnMgPSBiYWxhbmNlLmlucHV0UGFyYW1ldGVyc1xuXG5jb25zdCBnZXRCYWxhbmNlVVJJID0gKGFkZHJlc3M6IHN0cmluZykgPT4gYC92My9hZGRyZXNzLyR7YWRkcmVzc31gXG5cbmNvbnN0IGdldEJhbGFuY2U6IGJhbGFuY2UuR2V0QmFsYW5jZSA9IGFzeW5jIChhY2NvdW50LCBjb25maWcpID0+IHtcbiAgY29uc3QgcmVxQ29uZmlnID0ge1xuICAgIC4uLmNvbmZpZy5hcGksXG4gICAgdXJsOiBnZXRCYWxhbmNlVVJJKGFjY291bnQuYWRkcmVzcyksXG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KHJlcUNvbmZpZylcblxuICByZXR1cm4ge1xuICAgIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEsXG4gICAgcmVzdWx0OiBbeyAuLi5hY2NvdW50LCBiYWxhbmNlOiBTdHJpbmcocmVzcG9uc2UuZGF0YS5kYXRhLmJhbGFuY2UpIH1dLFxuICB9XG59XG5cbmNvbnN0IGlzU3VwcG9ydGVkOiBiYWxhbmNlLklzU3VwcG9ydGVkID0gKGNvaW4sIGNoYWluKSA9PiBpc0NoYWluVHlwZShjaGFpbikgJiYgaXNDb2luVHlwZShjb2luKVxuXG5leHBvcnQgY29uc3QgbWFrZUV4ZWN1dGU6IEV4ZWN1dGVGYWN0b3J5PENvbmZpZz4gPSAoY29uZmlnPzogQ29uZmlnKSA9PlxuICBiYWxhbmNlLm1ha2UoeyAuLi5jb25maWcsIGdldEJhbGFuY2UsIGlzU3VwcG9ydGVkIH0pXG4iXX0=