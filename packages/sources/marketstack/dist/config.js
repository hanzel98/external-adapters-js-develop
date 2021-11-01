"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_BASE_URL = exports.DEFAULT_ENDPOINT = exports.DEFAULT_LIMIT = exports.DEFAULT_INTERVAL = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'MARKETSTACK';
exports.DEFAULT_INTERVAL = '1min';
exports.DEFAULT_LIMIT = 1;
exports.DEFAULT_ENDPOINT = 'stock';
exports.DEFAULT_BASE_URL = 'http://api.marketstack.com/v1/';
const makeConfig = (prefix = '') => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix, true);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_BASE_URL;
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsYUFBYSxDQUFBO0FBRXBCLFFBQUEsZ0JBQWdCLEdBQUcsTUFBTSxDQUFBO0FBQ3pCLFFBQUEsYUFBYSxHQUFHLENBQUMsQ0FBQTtBQUNqQixRQUFBLGdCQUFnQixHQUFHLE9BQU8sQ0FBQTtBQUMxQixRQUFBLGdCQUFnQixHQUFHLGdDQUFnQyxDQUFBO0FBRXpELE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBVSxFQUFFO0lBQ2hELE1BQU0sTUFBTSxHQUFHLHdCQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLHdCQUFnQixDQUFBO0lBQzNELE1BQU0sQ0FBQyxlQUFlLEdBQUcsd0JBQWdCLENBQUE7SUFDekMsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUFMWSxRQUFBLFVBQVUsY0FLdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBOQU1FID0gJ01BUktFVFNUQUNLJ1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9JTlRFUlZBTCA9ICcxbWluJ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElNSVQgPSAxXG5leHBvcnQgY29uc3QgREVGQVVMVF9FTkRQT0lOVCA9ICdzdG9jaydcbmV4cG9ydCBjb25zdCBERUZBVUxUX0JBU0VfVVJMID0gJ2h0dHA6Ly9hcGkubWFya2V0c3RhY2suY29tL3YxLydcblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4ID0gJycpOiBDb25maWcgPT4ge1xuICBjb25zdCBjb25maWcgPSBSZXF1ZXN0ZXIuZ2V0RGVmYXVsdENvbmZpZyhwcmVmaXgsIHRydWUpXG4gIGNvbmZpZy5hcGkuYmFzZVVSTCA9IGNvbmZpZy5hcGkuYmFzZVVSTCB8fCBERUZBVUxUX0JBU0VfVVJMXG4gIGNvbmZpZy5kZWZhdWx0RW5kcG9pbnQgPSBERUZBVUxUX0VORFBPSU5UXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==