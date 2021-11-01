"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_BASE_URL = exports.DEFAULT_ENDPOINT = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'COVID_TRACKER';
exports.DEFAULT_ENDPOINT = 'us';
exports.DEFAULT_BASE_URL = 'https://api.covidtracking.com/v1';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_BASE_URL;
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsZUFBZSxDQUFBO0FBRXRCLFFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFBO0FBQ3ZCLFFBQUEsZ0JBQWdCLEdBQUcsa0NBQWtDLENBQUE7QUFFM0QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFlLEVBQVUsRUFBRTtJQUNwRCxNQUFNLE1BQU0sR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2pELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLHdCQUFnQixDQUFBO0lBQzNELE1BQU0sQ0FBQyxlQUFlLEdBQUcsd0JBQWdCLENBQUE7SUFDekMsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUFMWSxRQUFBLFVBQVUsY0FLdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBOQU1FID0gJ0NPVklEX1RSQUNLRVInXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VORFBPSU5UID0gJ3VzJ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQkFTRV9VUkwgPSAnaHR0cHM6Ly9hcGkuY292aWR0cmFja2luZy5jb20vdjEnXG5cbmV4cG9ydCBjb25zdCBtYWtlQ29uZmlnID0gKHByZWZpeD86IHN0cmluZyk6IENvbmZpZyA9PiB7XG4gIGNvbnN0IGNvbmZpZyA9IFJlcXVlc3Rlci5nZXREZWZhdWx0Q29uZmlnKHByZWZpeClcbiAgY29uZmlnLmFwaS5iYXNlVVJMID0gY29uZmlnLmFwaS5iYXNlVVJMIHx8IERFRkFVTFRfQkFTRV9VUkxcbiAgY29uZmlnLmRlZmF1bHRFbmRwb2ludCA9IERFRkFVTFRfRU5EUE9JTlRcbiAgcmV0dXJuIGNvbmZpZ1xufVxuIl19