"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.NAME = void 0;
const tslib_1 = require("tslib");
const json_rpc_adapter_1 = tslib_1.__importDefault(require("@chainlink/json-rpc-adapter"));
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'scantxoutset';
const inputParams = {
    scanobjects: ['addresses', 'scanobjects'],
    confirmations: false,
};
const execute = async (request, context, config) => {
    const validator = new ea_bootstrap_1.Validator(request, inputParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const scanobjects = validator.validated.data.scanobjects.map((address) => {
        // Addresses must be formatted as addr(39e7mxbeNmRRnjfy1qkphv1TiMcztZ8VuE)
        if (address.substr(0, 4) == 'addr')
            return address;
        return `addr(${address})`;
    });
    const params = {
        action: 'start',
        scanobjects,
    };
    const response = await scanWithRetries(params, request, context, config);
    response.data.result = String(ea_bootstrap_1.Requester.validateResultNumber(response.data, ['result', 'total_amount']));
    return ea_bootstrap_1.Requester.success(jobRunID, response);
};
exports.execute = execute;
const scanWithRetries = async (params, request, context, config) => {
    const requestData = {
        ...request,
        data: { ...request.data, method: exports.NAME, params },
    };
    const deadline = Date.now() + config.api.timeout;
    while (Date.now() + 1000 <= deadline) {
        try {
            return await json_rpc_adapter_1.default.execute(requestData, context, config);
        }
        catch (e) {
            if (e.cause?.response?.data?.error?.code === -8) {
                ea_bootstrap_1.Logger.debug('scan is already in progress, waiting 1s...');
                ea_bootstrap_1.Logger.debug(`time left to wait: ${deadline - Date.now()}ms`);
                await sleep(1000);
                continue;
            }
            else if (e.message === `timeout of ${config.api.timeout}ms exceeded`) {
                // Highly experimental:
                // If a timeout error was hit, we try to abort the scan that we initiated
                // However there is a race condition where:
                // 1. this request times out
                // 2. the scan finishes
                // 3. a new scan is initiated by a different request
                // 4. this action aborts the scan
                // However the time between 1. and 4. is minimal, and the likelihood of this happening is low
                requestData.data.params.action = 'abort';
                config.api.timeout = 1000; // We expect this action to be quick, and we do not want to hold up the request on this
                ea_bootstrap_1.Logger.debug('timeout reached, aborting scan in progress');
                try {
                    await json_rpc_adapter_1.default.execute(requestData, context, config);
                }
                catch (e) {
                    ea_bootstrap_1.Logger.error(`failed to abort scan in progress: ${e.message}`);
                }
            }
            throw e;
        }
    }
    throw new Error('unable to start query within timeout');
};
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbnR4b3V0c2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L3NjYW50eG91dHNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMkZBQWlEO0FBRWpELDBEQUFzRTtBQUV6RCxRQUFBLElBQUksR0FBRyxjQUFjLENBQUE7QUFFbEMsTUFBTSxXQUFXLEdBQUc7SUFDbEIsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQztJQUN6QyxhQUFhLEVBQUUsS0FBSztDQUNyQixDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ25GLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDckQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBZSxFQUFFLEVBQUU7UUFDL0UsMEVBQTBFO1FBQzFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksTUFBTTtZQUFFLE9BQU8sT0FBTyxDQUFBO1FBQ2xELE9BQU8sUUFBUSxPQUFPLEdBQUcsQ0FBQTtJQUMzQixDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sTUFBTSxHQUFHO1FBQ2IsTUFBTSxFQUFFLE9BQU87UUFDZixXQUFXO0tBQ1osQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRXhFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FDM0Isd0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQzFFLENBQUE7SUFDRCxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUM5QyxDQUFDLENBQUE7QUF0QlksUUFBQSxPQUFPLFdBc0JuQjtBQUVELE1BQU0sZUFBZSxHQUFHLEtBQUssRUFDM0IsTUFBK0IsRUFDL0IsT0FBdUIsRUFDdkIsT0FBdUIsRUFDdkIsTUFBYyxFQUNkLEVBQUU7SUFDRixNQUFNLFdBQVcsR0FBRztRQUNsQixHQUFHLE9BQU87UUFDVixJQUFJLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQUksRUFBRSxNQUFNLEVBQUU7S0FDaEQsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQTtJQUNoRCxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLElBQUksUUFBUSxFQUFFO1FBQ3BDLElBQUk7WUFDRixPQUFPLE1BQU0sMEJBQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUMzRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDL0MscUJBQU0sQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQTtnQkFDMUQscUJBQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUM3RCxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDakIsU0FBUTthQUNUO2lCQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxjQUFjLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxhQUFhLEVBQUU7Z0JBQ3RFLHVCQUF1QjtnQkFDdkIseUVBQXlFO2dCQUN6RSwyQ0FBMkM7Z0JBQzNDLDRCQUE0QjtnQkFDNUIsdUJBQXVCO2dCQUN2QixvREFBb0Q7Z0JBQ3BELGlDQUFpQztnQkFDakMsNkZBQTZGO2dCQUM3RixXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFBO2dCQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUEsQ0FBQyx1RkFBdUY7Z0JBQ2pILHFCQUFNLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUE7Z0JBQzFELElBQUk7b0JBQ0YsTUFBTSwwQkFBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2lCQUNwRDtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDVixxQkFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7aUJBQy9EO2FBQ0Y7WUFFRCxNQUFNLENBQUMsQ0FBQTtTQUNSO0tBQ0Y7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUE7QUFDekQsQ0FBQyxDQUFBO0FBRUQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRTtJQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDMUQsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTT05SUEMgZnJvbSAnQGNoYWlubGluay9qc29uLXJwYy1hZGFwdGVyJ1xuaW1wb3J0IHsgQ29uZmlnLCBFeGVjdXRlV2l0aENvbmZpZywgQWRhcHRlclJlcXVlc3QsIEFkYXB0ZXJDb250ZXh0IH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IFZhbGlkYXRvciwgUmVxdWVzdGVyLCBMb2dnZXIgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnc2NhbnR4b3V0c2V0J1xuXG5jb25zdCBpbnB1dFBhcmFtcyA9IHtcbiAgc2Nhbm9iamVjdHM6IFsnYWRkcmVzc2VzJywgJ3NjYW5vYmplY3RzJ10sXG4gIGNvbmZpcm1hdGlvbnM6IGZhbHNlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtcylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IHNjYW5vYmplY3RzID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLnNjYW5vYmplY3RzLm1hcCgoYWRkcmVzczogc3RyaW5nKSA9PiB7XG4gICAgLy8gQWRkcmVzc2VzIG11c3QgYmUgZm9ybWF0dGVkIGFzIGFkZHIoMzllN214YmVObVJSbmpmeTFxa3BodjFUaU1jenRaOFZ1RSlcbiAgICBpZiAoYWRkcmVzcy5zdWJzdHIoMCwgNCkgPT0gJ2FkZHInKSByZXR1cm4gYWRkcmVzc1xuICAgIHJldHVybiBgYWRkcigke2FkZHJlc3N9KWBcbiAgfSlcblxuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgYWN0aW9uOiAnc3RhcnQnLFxuICAgIHNjYW5vYmplY3RzLFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzY2FuV2l0aFJldHJpZXMocGFyYW1zLCByZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpXG5cbiAgcmVzcG9uc2UuZGF0YS5yZXN1bHQgPSBTdHJpbmcoXG4gICAgUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFsncmVzdWx0JywgJ3RvdGFsX2Ftb3VudCddKSxcbiAgKVxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3BvbnNlKVxufVxuXG5jb25zdCBzY2FuV2l0aFJldHJpZXMgPSBhc3luYyAoXG4gIHBhcmFtczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gIHJlcXVlc3Q6IEFkYXB0ZXJSZXF1ZXN0LFxuICBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCxcbiAgY29uZmlnOiBDb25maWcsXG4pID0+IHtcbiAgY29uc3QgcmVxdWVzdERhdGEgPSB7XG4gICAgLi4ucmVxdWVzdCxcbiAgICBkYXRhOiB7IC4uLnJlcXVlc3QuZGF0YSwgbWV0aG9kOiBOQU1FLCBwYXJhbXMgfSxcbiAgfVxuXG4gIGNvbnN0IGRlYWRsaW5lID0gRGF0ZS5ub3coKSArIGNvbmZpZy5hcGkudGltZW91dFxuICB3aGlsZSAoRGF0ZS5ub3coKSArIDEwMDAgPD0gZGVhZGxpbmUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IEpTT05SUEMuZXhlY3V0ZShyZXF1ZXN0RGF0YSwgY29udGV4dCwgY29uZmlnKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLmNhdXNlPy5yZXNwb25zZT8uZGF0YT8uZXJyb3I/LmNvZGUgPT09IC04KSB7XG4gICAgICAgIExvZ2dlci5kZWJ1Zygnc2NhbiBpcyBhbHJlYWR5IGluIHByb2dyZXNzLCB3YWl0aW5nIDFzLi4uJylcbiAgICAgICAgTG9nZ2VyLmRlYnVnKGB0aW1lIGxlZnQgdG8gd2FpdDogJHtkZWFkbGluZSAtIERhdGUubm93KCl9bXNgKVxuICAgICAgICBhd2FpdCBzbGVlcCgxMDAwKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IGB0aW1lb3V0IG9mICR7Y29uZmlnLmFwaS50aW1lb3V0fW1zIGV4Y2VlZGVkYCkge1xuICAgICAgICAvLyBIaWdobHkgZXhwZXJpbWVudGFsOlxuICAgICAgICAvLyBJZiBhIHRpbWVvdXQgZXJyb3Igd2FzIGhpdCwgd2UgdHJ5IHRvIGFib3J0IHRoZSBzY2FuIHRoYXQgd2UgaW5pdGlhdGVkXG4gICAgICAgIC8vIEhvd2V2ZXIgdGhlcmUgaXMgYSByYWNlIGNvbmRpdGlvbiB3aGVyZTpcbiAgICAgICAgLy8gMS4gdGhpcyByZXF1ZXN0IHRpbWVzIG91dFxuICAgICAgICAvLyAyLiB0aGUgc2NhbiBmaW5pc2hlc1xuICAgICAgICAvLyAzLiBhIG5ldyBzY2FuIGlzIGluaXRpYXRlZCBieSBhIGRpZmZlcmVudCByZXF1ZXN0XG4gICAgICAgIC8vIDQuIHRoaXMgYWN0aW9uIGFib3J0cyB0aGUgc2NhblxuICAgICAgICAvLyBIb3dldmVyIHRoZSB0aW1lIGJldHdlZW4gMS4gYW5kIDQuIGlzIG1pbmltYWwsIGFuZCB0aGUgbGlrZWxpaG9vZCBvZiB0aGlzIGhhcHBlbmluZyBpcyBsb3dcbiAgICAgICAgcmVxdWVzdERhdGEuZGF0YS5wYXJhbXMuYWN0aW9uID0gJ2Fib3J0J1xuICAgICAgICBjb25maWcuYXBpLnRpbWVvdXQgPSAxMDAwIC8vIFdlIGV4cGVjdCB0aGlzIGFjdGlvbiB0byBiZSBxdWljaywgYW5kIHdlIGRvIG5vdCB3YW50IHRvIGhvbGQgdXAgdGhlIHJlcXVlc3Qgb24gdGhpc1xuICAgICAgICBMb2dnZXIuZGVidWcoJ3RpbWVvdXQgcmVhY2hlZCwgYWJvcnRpbmcgc2NhbiBpbiBwcm9ncmVzcycpXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgSlNPTlJQQy5leGVjdXRlKHJlcXVlc3REYXRhLCBjb250ZXh0LCBjb25maWcpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBMb2dnZXIuZXJyb3IoYGZhaWxlZCB0byBhYm9ydCBzY2FuIGluIHByb2dyZXNzOiAke2UubWVzc2FnZX1gKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ3VuYWJsZSB0byBzdGFydCBxdWVyeSB3aXRoaW4gdGltZW91dCcpXG59XG5cbmNvbnN0IHNsZWVwID0gKG1zOiBudW1iZXIpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSlcbn1cbiJdfQ==