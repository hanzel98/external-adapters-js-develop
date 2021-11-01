"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_WS_API_ENDPOINT = exports.DEFAULT_API_ENDPOINT = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'TRADINGECONOMICS';
exports.DEFAULT_API_ENDPOINT = 'https://api.tradingeconomics.com/markets';
exports.DEFAULT_WS_API_ENDPOINT = 'wss://stream.tradingeconomics.com/';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_API_ENDPOINT;
    return {
        ...config,
        client: {
            key: ea_bootstrap_1.util.getRequiredEnv('API_CLIENT_KEY', prefix),
            secret: ea_bootstrap_1.util.getRequiredEnv('API_CLIENT_SECRET', prefix),
        },
    };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBeUQ7QUFVNUMsUUFBQSxJQUFJLEdBQUcsa0JBQWtCLENBQUE7QUFFekIsUUFBQSxvQkFBb0IsR0FBRywwQ0FBMEMsQ0FBQTtBQUNqRSxRQUFBLHVCQUF1QixHQUFHLG9DQUFvQyxDQUFBO0FBRXBFLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBZSxFQUFVLEVBQUU7SUFDcEQsTUFBTSxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSw0QkFBb0IsQ0FBQTtJQUUvRCxPQUFPO1FBQ0wsR0FBRyxNQUFNO1FBQ1QsTUFBTSxFQUFFO1lBQ04sR0FBRyxFQUFFLG1CQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQztZQUNsRCxNQUFNLEVBQUUsbUJBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDO1NBQ3pEO0tBQ0YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQVhZLFFBQUEsVUFBVSxjQVd0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgdXRpbCB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIGFzIGNvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCB0eXBlIENvbmZpZyA9IGNvbmZpZyAmIHtcbiAgY2xpZW50OiB7XG4gICAga2V5OiBzdHJpbmdcbiAgICBzZWNyZXQ6IHN0cmluZ1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBOQU1FID0gJ1RSQURJTkdFQ09OT01JQ1MnXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0FQSV9FTkRQT0lOVCA9ICdodHRwczovL2FwaS50cmFkaW5nZWNvbm9taWNzLmNvbS9tYXJrZXRzJ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfV1NfQVBJX0VORFBPSU5UID0gJ3dzczovL3N0cmVhbS50cmFkaW5nZWNvbm9taWNzLmNvbS8nXG5cbmV4cG9ydCBjb25zdCBtYWtlQ29uZmlnID0gKHByZWZpeD86IHN0cmluZyk6IENvbmZpZyA9PiB7XG4gIGNvbnN0IGNvbmZpZyA9IFJlcXVlc3Rlci5nZXREZWZhdWx0Q29uZmlnKHByZWZpeClcbiAgY29uZmlnLmFwaS5iYXNlVVJMID0gY29uZmlnLmFwaS5iYXNlVVJMIHx8IERFRkFVTFRfQVBJX0VORFBPSU5UXG5cbiAgcmV0dXJuIHtcbiAgICAuLi5jb25maWcsXG4gICAgY2xpZW50OiB7XG4gICAgICBrZXk6IHV0aWwuZ2V0UmVxdWlyZWRFbnYoJ0FQSV9DTElFTlRfS0VZJywgcHJlZml4KSxcbiAgICAgIHNlY3JldDogdXRpbC5nZXRSZXF1aXJlZEVudignQVBJX0NMSUVOVF9TRUNSRVQnLCBwcmVmaXgpLFxuICAgIH0sXG4gIH1cbn1cbiJdfQ==