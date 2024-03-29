"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_DEBT_POOL_CACHE_ADDRESS = exports.DEFAULT_ENDPOINT = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'SYNTHETIX_DEBT_POOL';
exports.DEFAULT_ENDPOINT = 'debt';
exports.DEFAULT_DEBT_POOL_CACHE_ADDRESS = '0x9bB05EF2cA7DBAafFC3da1939D1492e6b00F39b8';
const makeConfig = (prefix) => {
    return {
        ...ea_bootstrap_1.Requester.getDefaultConfig(prefix),
        defaultEndpoint: exports.DEFAULT_ENDPOINT,
        debtPoolCacheAddress: ea_bootstrap_1.util.getEnv('DEBT_POOL_CACHE_ADDRESS') || exports.DEFAULT_DEBT_POOL_CACHE_ADDRESS,
        rpcUrl: ea_bootstrap_1.util.getRequiredEnv('RPC_URL'),
    };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBeUQ7QUFHNUMsUUFBQSxJQUFJLEdBQUcscUJBQXFCLENBQUE7QUFFNUIsUUFBQSxnQkFBZ0IsR0FBRyxNQUFNLENBQUE7QUFDekIsUUFBQSwrQkFBK0IsR0FBRyw0Q0FBNEMsQ0FBQTtBQU9wRixNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQWUsRUFBVSxFQUFFO0lBQ3BELE9BQU87UUFDTCxHQUFHLHdCQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQ3JDLGVBQWUsRUFBRSx3QkFBZ0I7UUFDakMsb0JBQW9CLEVBQUUsbUJBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsSUFBSSx1Q0FBK0I7UUFDL0YsTUFBTSxFQUFFLG1CQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztLQUN2QyxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBUFksUUFBQSxVQUFVLGNBT3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCB1dGlsIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcgYXMgRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBOQU1FID0gJ1NZTlRIRVRJWF9ERUJUX1BPT0wnXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VORFBPSU5UID0gJ2RlYnQnXG5leHBvcnQgY29uc3QgREVGQVVMVF9ERUJUX1BPT0xfQ0FDSEVfQUREUkVTUyA9ICcweDliQjA1RUYyY0E3REJBYWZGQzNkYTE5MzlEMTQ5MmU2YjAwRjM5YjgnXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIGV4dGVuZHMgRGVmYXVsdENvbmZpZyB7XG4gIGRlYnRQb29sQ2FjaGVBZGRyZXNzOiBzdHJpbmdcbiAgcnBjVXJsOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4Pzogc3RyaW5nKTogQ29uZmlnID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5SZXF1ZXN0ZXIuZ2V0RGVmYXVsdENvbmZpZyhwcmVmaXgpLFxuICAgIGRlZmF1bHRFbmRwb2ludDogREVGQVVMVF9FTkRQT0lOVCxcbiAgICBkZWJ0UG9vbENhY2hlQWRkcmVzczogdXRpbC5nZXRFbnYoJ0RFQlRfUE9PTF9DQUNIRV9BRERSRVNTJykgfHwgREVGQVVMVF9ERUJUX1BPT0xfQ0FDSEVfQUREUkVTUyxcbiAgICBycGNVcmw6IHV0aWwuZ2V0UmVxdWlyZWRFbnYoJ1JQQ19VUkwnKSxcbiAgfVxufVxuIl19