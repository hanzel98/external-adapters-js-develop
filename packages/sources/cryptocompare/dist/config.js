"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_WS_API_ENDPOINT = exports.DEFAULT_API_ENDPOINT = exports.DEFAULT_ENDPOINT = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'CRYPTOCOMPARE';
exports.DEFAULT_ENDPOINT = 'crypto';
exports.DEFAULT_API_ENDPOINT = 'https://min-api.cryptocompare.com';
exports.DEFAULT_WS_API_ENDPOINT = 'wss://streamer.cryptocompare.com/v2';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix, true);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_API_ENDPOINT;
    if (config.apiKey)
        config.api.headers = {
            ...config.api.headers,
            authorization: `Apikey ${config.apiKey}`,
        };
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsZUFBZSxDQUFBO0FBRXRCLFFBQUEsZ0JBQWdCLEdBQUcsUUFBUSxDQUFBO0FBQzNCLFFBQUEsb0JBQW9CLEdBQUcsbUNBQW1DLENBQUE7QUFDMUQsUUFBQSx1QkFBdUIsR0FBRyxxQ0FBcUMsQ0FBQTtBQUVyRSxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQWUsRUFBVSxFQUFFO0lBQ3BELE1BQU0sTUFBTSxHQUFHLHdCQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLDRCQUFvQixDQUFBO0lBQy9ELElBQUksTUFBTSxDQUFDLE1BQU07UUFDZixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRztZQUNuQixHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTztZQUNyQixhQUFhLEVBQUUsVUFBVSxNQUFNLENBQUMsTUFBTSxFQUFFO1NBQ3pDLENBQUE7SUFDSCxNQUFNLENBQUMsZUFBZSxHQUFHLHdCQUFnQixDQUFBO0lBQ3pDLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBVlksUUFBQSxVQUFVLGNBVXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuXG5leHBvcnQgY29uc3QgTkFNRSA9ICdDUllQVE9DT01QQVJFJ1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FTkRQT0lOVCA9ICdjcnlwdG8nXG5leHBvcnQgY29uc3QgREVGQVVMVF9BUElfRU5EUE9JTlQgPSAnaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tJ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfV1NfQVBJX0VORFBPSU5UID0gJ3dzczovL3N0cmVhbWVyLmNyeXB0b2NvbXBhcmUuY29tL3YyJ1xuXG5leHBvcnQgY29uc3QgbWFrZUNvbmZpZyA9IChwcmVmaXg/OiBzdHJpbmcpOiBDb25maWcgPT4ge1xuICBjb25zdCBjb25maWcgPSBSZXF1ZXN0ZXIuZ2V0RGVmYXVsdENvbmZpZyhwcmVmaXgsIHRydWUpXG4gIGNvbmZpZy5hcGkuYmFzZVVSTCA9IGNvbmZpZy5hcGkuYmFzZVVSTCB8fCBERUZBVUxUX0FQSV9FTkRQT0lOVFxuICBpZiAoY29uZmlnLmFwaUtleSlcbiAgICBjb25maWcuYXBpLmhlYWRlcnMgPSB7XG4gICAgICAuLi5jb25maWcuYXBpLmhlYWRlcnMsXG4gICAgICBhdXRob3JpemF0aW9uOiBgQXBpa2V5ICR7Y29uZmlnLmFwaUtleX1gLFxuICAgIH1cbiAgY29uZmlnLmRlZmF1bHRFbmRwb2ludCA9IERFRkFVTFRfRU5EUE9JTlRcbiAgcmV0dXJuIGNvbmZpZ1xufVxuIl19