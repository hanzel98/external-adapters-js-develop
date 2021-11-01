"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_WS_API_ENDPOINT = exports.DEFAULT_API_ENDPOINT = exports.DEFAULT_ENDPOINT = exports.ENV_API_PASSWORD = exports.ENV_API_USERNAME = exports.AUTHORIZATION_HEADER = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'CFBENCHMARKS';
exports.AUTHORIZATION_HEADER = 'Authorization';
exports.ENV_API_USERNAME = 'API_USERNAME';
exports.ENV_API_PASSWORD = 'API_PASSWORD';
exports.DEFAULT_ENDPOINT = 'values';
exports.DEFAULT_API_ENDPOINT = 'https://oracleprod1.cfbenchmarks.com/api';
exports.DEFAULT_WS_API_ENDPOINT = 'wss://www.cfbenchmarks.com/ws/v4';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_API_ENDPOINT;
    config.api.baseWsURL = config.api.baseWsURL || exports.DEFAULT_WS_API_ENDPOINT;
    const username = ea_bootstrap_1.util.getRequiredEnv(exports.ENV_API_USERNAME, prefix);
    const password = ea_bootstrap_1.util.getRequiredEnv(exports.ENV_API_PASSWORD, prefix);
    const encodedCreds = Buffer.from(`${username}:${password}`).toString('base64');
    config.api.headers[exports.AUTHORIZATION_HEADER] = `Basic ${encodedCreds}`;
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBeUQ7QUFHNUMsUUFBQSxJQUFJLEdBQUcsY0FBYyxDQUFBO0FBRXJCLFFBQUEsb0JBQW9CLEdBQUcsZUFBZSxDQUFBO0FBRXRDLFFBQUEsZ0JBQWdCLEdBQUcsY0FBYyxDQUFBO0FBQ2pDLFFBQUEsZ0JBQWdCLEdBQUcsY0FBYyxDQUFBO0FBRWpDLFFBQUEsZ0JBQWdCLEdBQUcsUUFBUSxDQUFBO0FBQzNCLFFBQUEsb0JBQW9CLEdBQUcsMENBQTBDLENBQUE7QUFDakUsUUFBQSx1QkFBdUIsR0FBRyxrQ0FBa0MsQ0FBQTtBQUVsRSxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQWUsRUFBVSxFQUFFO0lBQ3BELE1BQU0sTUFBTSxHQUFHLHdCQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDakQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksNEJBQW9CLENBQUE7SUFDL0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksK0JBQXVCLENBQUE7SUFFdEUsTUFBTSxRQUFRLEdBQUcsbUJBQUksQ0FBQyxjQUFjLENBQUMsd0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDOUQsTUFBTSxRQUFRLEdBQUcsbUJBQUksQ0FBQyxjQUFjLENBQUMsd0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDOUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM5RSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyw0QkFBb0IsQ0FBQyxHQUFHLFNBQVMsWUFBWSxFQUFFLENBQUE7SUFFbEUsTUFBTSxDQUFDLGVBQWUsR0FBRyx3QkFBZ0IsQ0FBQTtJQUN6QyxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQVpZLFFBQUEsVUFBVSxjQVl0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgdXRpbCB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnQ0ZCRU5DSE1BUktTJ1xuXG5leHBvcnQgY29uc3QgQVVUSE9SSVpBVElPTl9IRUFERVIgPSAnQXV0aG9yaXphdGlvbidcblxuZXhwb3J0IGNvbnN0IEVOVl9BUElfVVNFUk5BTUUgPSAnQVBJX1VTRVJOQU1FJ1xuZXhwb3J0IGNvbnN0IEVOVl9BUElfUEFTU1dPUkQgPSAnQVBJX1BBU1NXT1JEJ1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FTkRQT0lOVCA9ICd2YWx1ZXMnXG5leHBvcnQgY29uc3QgREVGQVVMVF9BUElfRU5EUE9JTlQgPSAnaHR0cHM6Ly9vcmFjbGVwcm9kMS5jZmJlbmNobWFya3MuY29tL2FwaSdcbmV4cG9ydCBjb25zdCBERUZBVUxUX1dTX0FQSV9FTkRQT0lOVCA9ICd3c3M6Ly93d3cuY2ZiZW5jaG1hcmtzLmNvbS93cy92NCdcblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4Pzogc3RyaW5nKTogQ29uZmlnID0+IHtcbiAgY29uc3QgY29uZmlnID0gUmVxdWVzdGVyLmdldERlZmF1bHRDb25maWcocHJlZml4KVxuICBjb25maWcuYXBpLmJhc2VVUkwgPSBjb25maWcuYXBpLmJhc2VVUkwgfHwgREVGQVVMVF9BUElfRU5EUE9JTlRcbiAgY29uZmlnLmFwaS5iYXNlV3NVUkwgPSBjb25maWcuYXBpLmJhc2VXc1VSTCB8fCBERUZBVUxUX1dTX0FQSV9FTkRQT0lOVFxuXG4gIGNvbnN0IHVzZXJuYW1lID0gdXRpbC5nZXRSZXF1aXJlZEVudihFTlZfQVBJX1VTRVJOQU1FLCBwcmVmaXgpXG4gIGNvbnN0IHBhc3N3b3JkID0gdXRpbC5nZXRSZXF1aXJlZEVudihFTlZfQVBJX1BBU1NXT1JELCBwcmVmaXgpXG4gIGNvbnN0IGVuY29kZWRDcmVkcyA9IEJ1ZmZlci5mcm9tKGAke3VzZXJuYW1lfToke3Bhc3N3b3JkfWApLnRvU3RyaW5nKCdiYXNlNjQnKVxuICBjb25maWcuYXBpLmhlYWRlcnNbQVVUSE9SSVpBVElPTl9IRUFERVJdID0gYEJhc2ljICR7ZW5jb2RlZENyZWRzfWBcblxuICBjb25maWcuZGVmYXVsdEVuZHBvaW50ID0gREVGQVVMVF9FTkRQT0lOVFxuICByZXR1cm4gY29uZmlnXG59XG4iXX0=