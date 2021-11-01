"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_ENDPOINT = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'COINMARKETCAP';
exports.DEFAULT_ENDPOINT = 'crypto';
const DEFAULT_API_ENDPOINT = 'https://pro-api.coinmarketcap.com/v1/';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix, true);
    config.api.baseURL = config.api.baseURL || DEFAULT_API_ENDPOINT;
    config.api.headers = {
        'X-CMC_PRO_API_KEY': config.apiKey,
    };
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsZUFBZSxDQUFBO0FBRXRCLFFBQUEsZ0JBQWdCLEdBQUcsUUFBUSxDQUFBO0FBQ3hDLE1BQU0sb0JBQW9CLEdBQUcsdUNBQXVDLENBQUE7QUFFN0QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFlLEVBQVUsRUFBRTtJQUNwRCxNQUFNLE1BQU0sR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN2RCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQTtJQUMvRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRztRQUNuQixtQkFBbUIsRUFBRSxNQUFNLENBQUMsTUFBTTtLQUNuQyxDQUFBO0lBQ0QsTUFBTSxDQUFDLGVBQWUsR0FBRyx3QkFBZ0IsQ0FBQTtJQUN6QyxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQVJZLFFBQUEsVUFBVSxjQVF0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnQ09JTk1BUktFVENBUCdcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRU5EUE9JTlQgPSAnY3J5cHRvJ1xuY29uc3QgREVGQVVMVF9BUElfRU5EUE9JTlQgPSAnaHR0cHM6Ly9wcm8tYXBpLmNvaW5tYXJrZXRjYXAuY29tL3YxLydcblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4Pzogc3RyaW5nKTogQ29uZmlnID0+IHtcbiAgY29uc3QgY29uZmlnID0gUmVxdWVzdGVyLmdldERlZmF1bHRDb25maWcocHJlZml4LCB0cnVlKVxuICBjb25maWcuYXBpLmJhc2VVUkwgPSBjb25maWcuYXBpLmJhc2VVUkwgfHwgREVGQVVMVF9BUElfRU5EUE9JTlRcbiAgY29uZmlnLmFwaS5oZWFkZXJzID0ge1xuICAgICdYLUNNQ19QUk9fQVBJX0tFWSc6IGNvbmZpZy5hcGlLZXksXG4gIH1cbiAgY29uZmlnLmRlZmF1bHRFbmRwb2ludCA9IERFRkFVTFRfRU5EUE9JTlRcbiAgcmV0dXJuIGNvbmZpZ1xufVxuIl19