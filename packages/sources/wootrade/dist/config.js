"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_WS_API_ENDPOINT = exports.DEFAULT_BASE_URL = exports.DEFAULT_ENDPOINT = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'WOOTRADE';
exports.DEFAULT_ENDPOINT = 'crypto';
exports.DEFAULT_BASE_URL = 'https://api.woo.network';
exports.DEFAULT_WS_API_ENDPOINT = 'wss://wss.woo.network/ws/stream';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_BASE_URL;
    config.api.baseWsURL = config.api.baseWsURL || `${exports.DEFAULT_WS_API_ENDPOINT}/${config.apiKey}`;
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsVUFBVSxDQUFBO0FBRWpCLFFBQUEsZ0JBQWdCLEdBQUcsUUFBUSxDQUFBO0FBQzNCLFFBQUEsZ0JBQWdCLEdBQUcseUJBQXlCLENBQUE7QUFDNUMsUUFBQSx1QkFBdUIsR0FBRyxpQ0FBaUMsQ0FBQTtBQUVqRSxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQWUsRUFBVSxFQUFFO0lBQ3BELE1BQU0sTUFBTSxHQUFHLHdCQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDakQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksd0JBQWdCLENBQUE7SUFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRywrQkFBdUIsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDNUYsTUFBTSxDQUFDLGVBQWUsR0FBRyx3QkFBZ0IsQ0FBQTtJQUN6QyxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQU5ZLFFBQUEsVUFBVSxjQU10QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnV09PVFJBREUnXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VORFBPSU5UID0gJ2NyeXB0bydcbmV4cG9ydCBjb25zdCBERUZBVUxUX0JBU0VfVVJMID0gJ2h0dHBzOi8vYXBpLndvby5uZXR3b3JrJ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfV1NfQVBJX0VORFBPSU5UID0gJ3dzczovL3dzcy53b28ubmV0d29yay93cy9zdHJlYW0nXG5cbmV4cG9ydCBjb25zdCBtYWtlQ29uZmlnID0gKHByZWZpeD86IHN0cmluZyk6IENvbmZpZyA9PiB7XG4gIGNvbnN0IGNvbmZpZyA9IFJlcXVlc3Rlci5nZXREZWZhdWx0Q29uZmlnKHByZWZpeClcbiAgY29uZmlnLmFwaS5iYXNlVVJMID0gY29uZmlnLmFwaS5iYXNlVVJMIHx8IERFRkFVTFRfQkFTRV9VUkxcbiAgY29uZmlnLmFwaS5iYXNlV3NVUkwgPSBjb25maWcuYXBpLmJhc2VXc1VSTCB8fCBgJHtERUZBVUxUX1dTX0FQSV9FTkRQT0lOVH0vJHtjb25maWcuYXBpS2V5fWBcbiAgY29uZmlnLmRlZmF1bHRFbmRwb2ludCA9IERFRkFVTFRfRU5EUE9JTlRcbiAgcmV0dXJuIGNvbmZpZ1xufVxuIl19