"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_factories_1 = require("@chainlink/ea-factories");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['balance'];
exports.inputParameters = ea_factories_1.balance.inputParameters;
const getBalanceURI = (address, confirmations) => `/q/addressbalance/${address}?confirmations=${confirmations}`;
const getBalance = async (account, config) => {
    const reqConfig = {
        ...config.api,
        baseURL: config.api.baseURL || config_1.getBaseURL(account.chain),
        url: getBalanceURI(account.address, config.confirmations),
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    return {
        payload: response.data,
        result: [{ ...account, balance: String(response.data) }],
    };
};
const isSupported = (coin, chain) => config_1.isChainType(chain) && config_1.isCoinType(coin);
const makeExecute = (config) => ea_factories_1.balance.make({ ...config, getBalance, isSupported });
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9iYWxhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUFpRDtBQUNqRCwwREFBbUQ7QUFFbkQsc0NBQTBFO0FBRTdELFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVoQyxRQUFBLGVBQWUsR0FBRyxzQkFBTyxDQUFDLGVBQWUsQ0FBQTtBQUV0RCxNQUFNLGFBQWEsR0FBRyxDQUFDLE9BQWUsRUFBRSxhQUFxQixFQUFFLEVBQUUsQ0FDL0QscUJBQXFCLE9BQU8sa0JBQWtCLGFBQWEsRUFBRSxDQUFBO0FBRS9ELE1BQU0sVUFBVSxHQUF1QixLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQy9ELE1BQU0sU0FBUyxHQUFHO1FBQ2hCLEdBQUcsTUFBTSxDQUFDLEdBQUc7UUFDYixPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksbUJBQVUsQ0FBQyxPQUFPLENBQUMsS0FBa0IsQ0FBQztRQUNyRSxHQUFHLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLGFBQXVCLENBQUM7S0FDcEUsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7SUFFbkQsT0FBTztRQUNMLE9BQU8sRUFBRSxRQUFRLENBQUMsSUFBSTtRQUN0QixNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDekQsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sV0FBVyxHQUF3QixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLG9CQUFXLENBQUMsS0FBSyxDQUFDLElBQUksbUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUV6RixNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFlLEVBQUUsRUFBRSxDQUNyRSxzQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFBO0FBRHpDLFFBQUEsV0FBVyxlQUM4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJhbGFuY2UgfSBmcm9tICdAY2hhaW5saW5rL2VhLWZhY3RvcmllcydcbmltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnLCBFeGVjdXRlRmFjdG9yeSB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBnZXRCYXNlVVJMLCBDaGFpblR5cGUsIGlzQ29pblR5cGUsIGlzQ2hhaW5UeXBlIH0gZnJvbSAnLi4vY29uZmlnJ1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWydiYWxhbmNlJ11cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVycyA9IGJhbGFuY2UuaW5wdXRQYXJhbWV0ZXJzXG5cbmNvbnN0IGdldEJhbGFuY2VVUkkgPSAoYWRkcmVzczogc3RyaW5nLCBjb25maXJtYXRpb25zOiBudW1iZXIpID0+XG4gIGAvcS9hZGRyZXNzYmFsYW5jZS8ke2FkZHJlc3N9P2NvbmZpcm1hdGlvbnM9JHtjb25maXJtYXRpb25zfWBcblxuY29uc3QgZ2V0QmFsYW5jZTogYmFsYW5jZS5HZXRCYWxhbmNlID0gYXN5bmMgKGFjY291bnQsIGNvbmZpZykgPT4ge1xuICBjb25zdCByZXFDb25maWcgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICBiYXNlVVJMOiBjb25maWcuYXBpLmJhc2VVUkwgfHwgZ2V0QmFzZVVSTChhY2NvdW50LmNoYWluIGFzIENoYWluVHlwZSksXG4gICAgdXJsOiBnZXRCYWxhbmNlVVJJKGFjY291bnQuYWRkcmVzcywgY29uZmlnLmNvbmZpcm1hdGlvbnMgYXMgbnVtYmVyKSxcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3QocmVxQ29uZmlnKVxuXG4gIHJldHVybiB7XG4gICAgcGF5bG9hZDogcmVzcG9uc2UuZGF0YSxcbiAgICByZXN1bHQ6IFt7IC4uLmFjY291bnQsIGJhbGFuY2U6IFN0cmluZyhyZXNwb25zZS5kYXRhKSB9XSxcbiAgfVxufVxuXG5jb25zdCBpc1N1cHBvcnRlZDogYmFsYW5jZS5Jc1N1cHBvcnRlZCA9IChjb2luLCBjaGFpbikgPT4gaXNDaGFpblR5cGUoY2hhaW4pICYmIGlzQ29pblR5cGUoY29pbilcblxuZXhwb3J0IGNvbnN0IG1ha2VFeGVjdXRlOiBFeGVjdXRlRmFjdG9yeTxDb25maWc+ID0gKGNvbmZpZz86IENvbmZpZykgPT5cbiAgYmFsYW5jZS5tYWtlKHsgLi4uY29uZmlnLCBnZXRCYWxhbmNlLCBpc1N1cHBvcnRlZCB9KVxuIl19