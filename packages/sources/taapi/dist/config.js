"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_BASE_URL = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'TAAPI';
exports.DEFAULT_BASE_URL = 'https://api.taapi.io/';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix, true);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_BASE_URL;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsT0FBTyxDQUFBO0FBRWQsUUFBQSxnQkFBZ0IsR0FBRyx1QkFBdUIsQ0FBQTtBQUVoRCxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQWUsRUFBVSxFQUFFO0lBQ3BELE1BQU0sTUFBTSxHQUFHLHdCQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLHdCQUFnQixDQUFBO0lBQzNELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBSlksUUFBQSxVQUFVLGNBSXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuXG5leHBvcnQgY29uc3QgTkFNRSA9ICdUQUFQSSdcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQkFTRV9VUkwgPSAnaHR0cHM6Ly9hcGkudGFhcGkuaW8vJ1xuXG5leHBvcnQgY29uc3QgbWFrZUNvbmZpZyA9IChwcmVmaXg/OiBzdHJpbmcpOiBDb25maWcgPT4ge1xuICBjb25zdCBjb25maWcgPSBSZXF1ZXN0ZXIuZ2V0RGVmYXVsdENvbmZpZyhwcmVmaXgsIHRydWUpXG4gIGNvbmZpZy5hcGkuYmFzZVVSTCA9IGNvbmZpZy5hcGkuYmFzZVVSTCB8fCBERUZBVUxUX0JBU0VfVVJMXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==