"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_ENDPOINT = exports.DEFAULT_BASE_URL = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.DEFAULT_BASE_URL = 'https://api.anyblock.tools';
exports.DEFAULT_ENDPOINT = 'vwap';
const makeConfig = (prefix = '') => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_BASE_URL;
    if (config.apiKey)
        config.api.headers.authorization = `Bearer ${config.apiKey}`;
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxnQkFBZ0IsR0FBRyw0QkFBNEIsQ0FBQTtBQUUvQyxRQUFBLGdCQUFnQixHQUFHLE1BQU0sQ0FBQTtBQUUvQixNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQVUsRUFBRTtJQUNoRCxNQUFNLE1BQU0sR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2pELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLHdCQUFnQixDQUFBO0lBQzNELElBQUksTUFBTSxDQUFDLE1BQU07UUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsVUFBVSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDL0UsTUFBTSxDQUFDLGVBQWUsR0FBRyx3QkFBZ0IsQ0FBQTtJQUN6QyxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQU5ZLFFBQUEsVUFBVSxjQU10QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQkFTRV9VUkwgPSAnaHR0cHM6Ly9hcGkuYW55YmxvY2sudG9vbHMnXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VORFBPSU5UID0gJ3Z3YXAnXG5cbmV4cG9ydCBjb25zdCBtYWtlQ29uZmlnID0gKHByZWZpeCA9ICcnKTogQ29uZmlnID0+IHtcbiAgY29uc3QgY29uZmlnID0gUmVxdWVzdGVyLmdldERlZmF1bHRDb25maWcocHJlZml4KVxuICBjb25maWcuYXBpLmJhc2VVUkwgPSBjb25maWcuYXBpLmJhc2VVUkwgfHwgREVGQVVMVF9CQVNFX1VSTFxuICBpZiAoY29uZmlnLmFwaUtleSkgY29uZmlnLmFwaS5oZWFkZXJzLmF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7Y29uZmlnLmFwaUtleX1gXG4gIGNvbmZpZy5kZWZhdWx0RW5kcG9pbnQgPSBERUZBVUxUX0VORFBPSU5UXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==