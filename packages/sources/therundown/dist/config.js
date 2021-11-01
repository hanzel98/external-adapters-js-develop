"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_BASE_URL = exports.DEFAULT_ENDPOINT = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'THERUNDOWN';
exports.DEFAULT_ENDPOINT = 'total-score';
exports.DEFAULT_BASE_URL = 'https://therundown-therundown-v1.p.rapidapi.com/';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix, true);
    config.api = {
        ...config.api,
        baseURL: config.api.baseURL || exports.DEFAULT_BASE_URL,
        headers: {
            ...config.api.headers,
            'x-rapidapi-host': 'therundown-therundown-v1.p.rapidapi.com',
        },
    };
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsWUFBWSxDQUFBO0FBRW5CLFFBQUEsZ0JBQWdCLEdBQUcsYUFBYSxDQUFBO0FBQ2hDLFFBQUEsZ0JBQWdCLEdBQUcsa0RBQWtELENBQUE7QUFFM0UsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFlLEVBQVUsRUFBRTtJQUNwRCxNQUFNLE1BQU0sR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN2RCxNQUFNLENBQUMsR0FBRyxHQUFHO1FBQ1gsR0FBRyxNQUFNLENBQUMsR0FBRztRQUNiLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSx3QkFBZ0I7UUFDL0MsT0FBTyxFQUFFO1lBQ1AsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU87WUFDckIsaUJBQWlCLEVBQUUseUNBQXlDO1NBQzdEO0tBQ0YsQ0FBQTtJQUNELE1BQU0sQ0FBQyxlQUFlLEdBQUcsd0JBQWdCLENBQUE7SUFDekMsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUFaWSxRQUFBLFVBQVUsY0FZdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBOQU1FID0gJ1RIRVJVTkRPV04nXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VORFBPSU5UID0gJ3RvdGFsLXNjb3JlJ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQkFTRV9VUkwgPSAnaHR0cHM6Ly90aGVydW5kb3duLXRoZXJ1bmRvd24tdjEucC5yYXBpZGFwaS5jb20vJ1xuXG5leHBvcnQgY29uc3QgbWFrZUNvbmZpZyA9IChwcmVmaXg/OiBzdHJpbmcpOiBDb25maWcgPT4ge1xuICBjb25zdCBjb25maWcgPSBSZXF1ZXN0ZXIuZ2V0RGVmYXVsdENvbmZpZyhwcmVmaXgsIHRydWUpXG4gIGNvbmZpZy5hcGkgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICBiYXNlVVJMOiBjb25maWcuYXBpLmJhc2VVUkwgfHwgREVGQVVMVF9CQVNFX1VSTCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAuLi5jb25maWcuYXBpLmhlYWRlcnMsXG4gICAgICAneC1yYXBpZGFwaS1ob3N0JzogJ3RoZXJ1bmRvd24tdGhlcnVuZG93bi12MS5wLnJhcGlkYXBpLmNvbScsXG4gICAgfSxcbiAgfVxuICBjb25maWcuZGVmYXVsdEVuZHBvaW50ID0gREVGQVVMVF9FTkRQT0lOVFxuICByZXR1cm4gY29uZmlnXG59XG4iXX0=