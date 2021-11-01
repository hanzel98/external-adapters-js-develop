"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_API_ENDPOINT = exports.DEFAULT_MILLISECONDS = exports.DEFAULT_SORT = exports.DEFAULT_INTERVAL = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'KAIKO';
exports.DEFAULT_INTERVAL = '1m';
exports.DEFAULT_SORT = 'desc';
exports.DEFAULT_MILLISECONDS = 1800000;
exports.DEFAULT_API_ENDPOINT = 'https://us.market-api.kaiko.io/v2/data/trades.v1';
const makeConfig = (prefix = '') => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix, true);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_API_ENDPOINT;
    config.api.headers['X-Api-Key'] = config.apiKey;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsT0FBTyxDQUFBO0FBRWQsUUFBQSxnQkFBZ0IsR0FBRyxJQUFJLENBQUE7QUFDdkIsUUFBQSxZQUFZLEdBQUcsTUFBTSxDQUFBO0FBQ3JCLFFBQUEsb0JBQW9CLEdBQUcsT0FBTyxDQUFBO0FBQzlCLFFBQUEsb0JBQW9CLEdBQUcsa0RBQWtELENBQUE7QUFFL0UsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFVLEVBQUU7SUFDaEQsTUFBTSxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDdkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksNEJBQW9CLENBQUE7SUFDL0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTtJQUMvQyxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQUxZLFFBQUEsVUFBVSxjQUt0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnS0FJS08nXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0lOVEVSVkFMID0gJzFtJ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfU09SVCA9ICdkZXNjJ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUlMTElTRUNPTkRTID0gMTgwMDAwMFxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQVBJX0VORFBPSU5UID0gJ2h0dHBzOi8vdXMubWFya2V0LWFwaS5rYWlrby5pby92Mi9kYXRhL3RyYWRlcy52MSdcblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4ID0gJycpOiBDb25maWcgPT4ge1xuICBjb25zdCBjb25maWcgPSBSZXF1ZXN0ZXIuZ2V0RGVmYXVsdENvbmZpZyhwcmVmaXgsIHRydWUpXG4gIGNvbmZpZy5hcGkuYmFzZVVSTCA9IGNvbmZpZy5hcGkuYmFzZVVSTCB8fCBERUZBVUxUX0FQSV9FTkRQT0lOVFxuICBjb25maWcuYXBpLmhlYWRlcnNbJ1gtQXBpLUtleSddID0gY29uZmlnLmFwaUtleVxuICByZXR1cm4gY29uZmlnXG59XG4iXX0=