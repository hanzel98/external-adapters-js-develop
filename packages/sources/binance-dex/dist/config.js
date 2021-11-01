"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_DATA_ENDPOINT = exports.DEFAULT_API_ENDPOINT = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.DEFAULT_API_ENDPOINT = 'dex-asiapacific';
exports.DEFAULT_DATA_ENDPOINT = 'v1/ticker/24hr';
// TODO: this usage of the process.env.API_ENDPOINT differs from most other adapters and should be changed
const getBaseURL = (region) => `https://${region}.binance.org`;
const makeConfig = (prefix = '') => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
    config.api.baseURL = getBaseURL(config.api.baseURL || exports.DEFAULT_API_ENDPOINT);
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQTtBQUN4QyxRQUFBLHFCQUFxQixHQUFHLGdCQUFnQixDQUFBO0FBRXJELDBHQUEwRztBQUMxRyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsV0FBVyxNQUFNLGNBQWMsQ0FBQTtBQUUvRCxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQVUsRUFBRTtJQUNoRCxNQUFNLE1BQU0sR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2pELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSw0QkFBb0IsQ0FBQyxDQUFBO0lBQzNFLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBSlksUUFBQSxVQUFVLGNBSXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9BUElfRU5EUE9JTlQgPSAnZGV4LWFzaWFwYWNpZmljJ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfREFUQV9FTkRQT0lOVCA9ICd2MS90aWNrZXIvMjRocidcblxuLy8gVE9ETzogdGhpcyB1c2FnZSBvZiB0aGUgcHJvY2Vzcy5lbnYuQVBJX0VORFBPSU5UIGRpZmZlcnMgZnJvbSBtb3N0IG90aGVyIGFkYXB0ZXJzIGFuZCBzaG91bGQgYmUgY2hhbmdlZFxuY29uc3QgZ2V0QmFzZVVSTCA9IChyZWdpb246IHN0cmluZykgPT4gYGh0dHBzOi8vJHtyZWdpb259LmJpbmFuY2Uub3JnYFxuXG5leHBvcnQgY29uc3QgbWFrZUNvbmZpZyA9IChwcmVmaXggPSAnJyk6IENvbmZpZyA9PiB7XG4gIGNvbnN0IGNvbmZpZyA9IFJlcXVlc3Rlci5nZXREZWZhdWx0Q29uZmlnKHByZWZpeClcbiAgY29uZmlnLmFwaS5iYXNlVVJMID0gZ2V0QmFzZVVSTChjb25maWcuYXBpLmJhc2VVUkwgfHwgREVGQVVMVF9BUElfRU5EUE9JTlQpXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==