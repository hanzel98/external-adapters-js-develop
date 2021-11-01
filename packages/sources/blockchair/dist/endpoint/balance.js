"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_factories_1 = require("@chainlink/ea-factories");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['balance'];
exports.inputParameters = ea_factories_1.balance.inputParameters;
const getBalanceURI = (addresses, coin, chain) => {
    coin = ea_bootstrap_1.Requester.toVendorName(coin, config_1.COINS);
    if (chain === 'testnet')
        coin = `${coin}-${chain}`;
    return `/${coin}/addresses/balances?addresses=${addresses.join(',')}`;
};
const getBalances = async (accounts, config) => {
    const { coin, chain } = accounts[0];
    const addresses = accounts.map((a) => a.address);
    const reqConfig = {
        ...config.api,
        url: getBalanceURI(addresses, coin, chain),
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    const toResultWithBalance = (acc) => {
        // NOTE: Blockchair does not return 0 balances
        const balance = String(response.data.data[acc.address] ?? 0);
        return { ...acc, balance };
    };
    const resultWithBalance = accounts.map(toResultWithBalance);
    return {
        payload: response.data,
        result: resultWithBalance,
    };
};
const isSupported = (coin, chain) => config_1.isChainType(chain) && config_1.isCoinType(coin);
const makeExecute = (config) => ea_factories_1.balance.make({ ...config, getBalances, isSupported });
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9iYWxhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUFpRDtBQUNqRCwwREFBbUQ7QUFFbkQsc0NBQTBEO0FBRTdDLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVoQyxRQUFBLGVBQWUsR0FBRyxzQkFBTyxDQUFDLGVBQWUsQ0FBQTtBQUV0RCxNQUFNLGFBQWEsR0FBRyxDQUFDLFNBQW1CLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxFQUFFO0lBQ3pFLElBQUksR0FBRyx3QkFBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsY0FBSyxDQUFDLENBQUE7SUFDMUMsSUFBSSxLQUFLLEtBQUssU0FBUztRQUFFLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQTtJQUNsRCxPQUFPLElBQUksSUFBSSxpQ0FBaUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFBO0FBQ3ZFLENBQUMsQ0FBQTtBQUVELE1BQU0sV0FBVyxHQUF3QixLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ2xFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25DLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVoRCxNQUFNLFNBQVMsR0FBUTtRQUNyQixHQUFHLE1BQU0sQ0FBQyxHQUFHO1FBQ2IsR0FBRyxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBYyxFQUFFLEtBQWUsQ0FBQztLQUMvRCxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUVuRCxNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBWSxFQUFFLEVBQUU7UUFDM0MsOENBQThDO1FBQzlDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDNUQsT0FBTyxFQUFFLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUMsQ0FBQTtJQUNELE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBRTNELE9BQU87UUFDTCxPQUFPLEVBQUUsUUFBUSxDQUFDLElBQUk7UUFDdEIsTUFBTSxFQUFFLGlCQUFpQjtLQUMxQixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxXQUFXLEdBQXdCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsb0JBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxtQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBRXpGLE1BQU0sV0FBVyxHQUEyQixDQUFDLE1BQWUsRUFBRSxFQUFFLENBQ3JFLHNCQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7QUFEMUMsUUFBQSxXQUFXLGVBQytCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmFsYW5jZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtZmFjdG9yaWVzJ1xuaW1wb3J0IHsgUmVxdWVzdGVyIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcsIEFjY291bnQsIEV4ZWN1dGVGYWN0b3J5IH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IENPSU5TLCBpc0NvaW5UeXBlLCBpc0NoYWluVHlwZSB9IGZyb20gJy4uL2NvbmZpZydcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnYmFsYW5jZSddXG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnMgPSBiYWxhbmNlLmlucHV0UGFyYW1ldGVyc1xuXG5jb25zdCBnZXRCYWxhbmNlVVJJID0gKGFkZHJlc3Nlczogc3RyaW5nW10sIGNvaW46IHN0cmluZywgY2hhaW46IHN0cmluZykgPT4ge1xuICBjb2luID0gUmVxdWVzdGVyLnRvVmVuZG9yTmFtZShjb2luLCBDT0lOUylcbiAgaWYgKGNoYWluID09PSAndGVzdG5ldCcpIGNvaW4gPSBgJHtjb2lufS0ke2NoYWlufWBcbiAgcmV0dXJuIGAvJHtjb2lufS9hZGRyZXNzZXMvYmFsYW5jZXM/YWRkcmVzc2VzPSR7YWRkcmVzc2VzLmpvaW4oJywnKX1gXG59XG5cbmNvbnN0IGdldEJhbGFuY2VzOiBiYWxhbmNlLkdldEJhbGFuY2VzID0gYXN5bmMgKGFjY291bnRzLCBjb25maWcpID0+IHtcbiAgY29uc3QgeyBjb2luLCBjaGFpbiB9ID0gYWNjb3VudHNbMF1cbiAgY29uc3QgYWRkcmVzc2VzID0gYWNjb3VudHMubWFwKChhKSA9PiBhLmFkZHJlc3MpXG5cbiAgY29uc3QgcmVxQ29uZmlnOiBhbnkgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICB1cmw6IGdldEJhbGFuY2VVUkkoYWRkcmVzc2VzLCBjb2luIGFzIHN0cmluZywgY2hhaW4gYXMgc3RyaW5nKSxcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3QocmVxQ29uZmlnKVxuXG4gIGNvbnN0IHRvUmVzdWx0V2l0aEJhbGFuY2UgPSAoYWNjOiBBY2NvdW50KSA9PiB7XG4gICAgLy8gTk9URTogQmxvY2tjaGFpciBkb2VzIG5vdCByZXR1cm4gMCBiYWxhbmNlc1xuICAgIGNvbnN0IGJhbGFuY2UgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5kYXRhW2FjYy5hZGRyZXNzXSA/PyAwKVxuICAgIHJldHVybiB7IC4uLmFjYywgYmFsYW5jZSB9XG4gIH1cbiAgY29uc3QgcmVzdWx0V2l0aEJhbGFuY2UgPSBhY2NvdW50cy5tYXAodG9SZXN1bHRXaXRoQmFsYW5jZSlcblxuICByZXR1cm4ge1xuICAgIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEsXG4gICAgcmVzdWx0OiByZXN1bHRXaXRoQmFsYW5jZSxcbiAgfVxufVxuXG5jb25zdCBpc1N1cHBvcnRlZDogYmFsYW5jZS5Jc1N1cHBvcnRlZCA9IChjb2luLCBjaGFpbikgPT4gaXNDaGFpblR5cGUoY2hhaW4pICYmIGlzQ29pblR5cGUoY29pbilcblxuZXhwb3J0IGNvbnN0IG1ha2VFeGVjdXRlOiBFeGVjdXRlRmFjdG9yeTxDb25maWc+ID0gKGNvbmZpZz86IENvbmZpZykgPT5cbiAgYmFsYW5jZS5tYWtlKHsgLi4uY29uZmlnLCBnZXRCYWxhbmNlcywgaXNTdXBwb3J0ZWQgfSlcbiJdfQ==