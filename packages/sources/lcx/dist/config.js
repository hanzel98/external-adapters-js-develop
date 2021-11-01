"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_BASE_URL = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ea_bootstrap_2 = require("@chainlink/ea-bootstrap");
exports.NAME = 'LCX';
exports.DEFAULT_BASE_URL = 'https://rp.lcx.com/v1/rates/current';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix, true);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_BASE_URL;
    config.api.headers['api-key'] = ea_bootstrap_2.util.getRandomRequiredEnv('API_KEY');
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFFbkQsMERBQThDO0FBRWpDLFFBQUEsSUFBSSxHQUFHLEtBQUssQ0FBQTtBQUVaLFFBQUEsZ0JBQWdCLEdBQUcscUNBQXFDLENBQUE7QUFFOUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFlLEVBQVUsRUFBRTtJQUNwRCxNQUFNLE1BQU0sR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN2RCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSx3QkFBZ0IsQ0FBQTtJQUMzRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxtQkFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3BFLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBTFksUUFBQSxVQUFVLGNBS3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuXG5leHBvcnQgY29uc3QgTkFNRSA9ICdMQ1gnXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0JBU0VfVVJMID0gJ2h0dHBzOi8vcnAubGN4LmNvbS92MS9yYXRlcy9jdXJyZW50J1xuXG5leHBvcnQgY29uc3QgbWFrZUNvbmZpZyA9IChwcmVmaXg/OiBzdHJpbmcpOiBDb25maWcgPT4ge1xuICBjb25zdCBjb25maWcgPSBSZXF1ZXN0ZXIuZ2V0RGVmYXVsdENvbmZpZyhwcmVmaXgsIHRydWUpXG4gIGNvbmZpZy5hcGkuYmFzZVVSTCA9IGNvbmZpZy5hcGkuYmFzZVVSTCB8fCBERUZBVUxUX0JBU0VfVVJMXG4gIGNvbmZpZy5hcGkuaGVhZGVyc1snYXBpLWtleSddID0gdXRpbC5nZXRSYW5kb21SZXF1aXJlZEVudignQVBJX0tFWScpXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==