"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_BASE_URL = exports.DEFAULT_ENDPOINT = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'FLIGHTAWARE';
exports.DEFAULT_ENDPOINT = 'estimatedarrivaltime';
exports.DEFAULT_BASE_URL = 'https://flightxml.flightaware.com/json/FlightXML2';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix, true);
    config.api.username = ea_bootstrap_1.util.getRequiredEnv('API_USERNAME');
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_BASE_URL;
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBeUQ7QUFHNUMsUUFBQSxJQUFJLEdBQUcsYUFBYSxDQUFBO0FBRXBCLFFBQUEsZ0JBQWdCLEdBQUcsc0JBQXNCLENBQUE7QUFDekMsUUFBQSxnQkFBZ0IsR0FBRyxtREFBbUQsQ0FBQTtBQUU1RSxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQWUsRUFBVSxFQUFFO0lBQ3BELE1BQU0sTUFBTSxHQUFHLHdCQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZELE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLG1CQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ3pELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLHdCQUFnQixDQUFBO0lBQzNELE1BQU0sQ0FBQyxlQUFlLEdBQUcsd0JBQWdCLENBQUE7SUFDekMsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUFOWSxRQUFBLFVBQVUsY0FNdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIHV0aWwgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBOQU1FID0gJ0ZMSUdIVEFXQVJFJ1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FTkRQT0lOVCA9ICdlc3RpbWF0ZWRhcnJpdmFsdGltZSdcbmV4cG9ydCBjb25zdCBERUZBVUxUX0JBU0VfVVJMID0gJ2h0dHBzOi8vZmxpZ2h0eG1sLmZsaWdodGF3YXJlLmNvbS9qc29uL0ZsaWdodFhNTDInXG5cbmV4cG9ydCBjb25zdCBtYWtlQ29uZmlnID0gKHByZWZpeD86IHN0cmluZyk6IENvbmZpZyA9PiB7XG4gIGNvbnN0IGNvbmZpZyA9IFJlcXVlc3Rlci5nZXREZWZhdWx0Q29uZmlnKHByZWZpeCwgdHJ1ZSlcbiAgY29uZmlnLmFwaS51c2VybmFtZSA9IHV0aWwuZ2V0UmVxdWlyZWRFbnYoJ0FQSV9VU0VSTkFNRScpXG4gIGNvbmZpZy5hcGkuYmFzZVVSTCA9IGNvbmZpZy5hcGkuYmFzZVVSTCB8fCBERUZBVUxUX0JBU0VfVVJMXG4gIGNvbmZpZy5kZWZhdWx0RW5kcG9pbnQgPSBERUZBVUxUX0VORFBPSU5UXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==