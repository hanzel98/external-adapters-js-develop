"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.endpointSelector = exports.execute = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const endpoints = tslib_1.__importStar(require("./endpoint"));
// Export function to integrate with Chainlink node
const execute = async (request, context, config) => {
    return ea_bootstrap_1.Builder.buildSelector(request, context, config, endpoints);
};
exports.execute = execute;
const endpointSelector = (request) => ea_bootstrap_1.Builder.selectEndpoint(request, config_1.makeConfig(), endpoints);
exports.endpointSelector = endpointSelector;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBaUQ7QUFRakQscUNBQXFDO0FBQ3JDLDhEQUF1QztBQUV2QyxtREFBbUQ7QUFDNUMsTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ25GLE9BQU8sc0JBQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDbkUsQ0FBQyxDQUFBO0FBRlksUUFBQSxPQUFPLFdBRW5CO0FBRU0sTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE9BQXVCLEVBQWUsRUFBRSxDQUN2RSxzQkFBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsbUJBQVUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBRDdDLFFBQUEsZ0JBQWdCLG9CQUM2QjtBQUVuRCxNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUM1RCxPQUFPLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQVUsRUFBRSxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVpbGRlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHtcbiAgQWRhcHRlclJlcXVlc3QsXG4gIENvbmZpZyxcbiAgRXhlY3V0ZUZhY3RvcnksXG4gIEV4ZWN1dGVXaXRoQ29uZmlnLFxuICBBUElFbmRwb2ludCxcbn0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IG1ha2VDb25maWcgfSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCAqIGFzIGVuZHBvaW50cyBmcm9tICcuL2VuZHBvaW50J1xuXG4vLyBFeHBvcnQgZnVuY3Rpb24gdG8gaW50ZWdyYXRlIHdpdGggQ2hhaW5saW5rIG5vZGVcbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZykgPT4ge1xuICByZXR1cm4gQnVpbGRlci5idWlsZFNlbGVjdG9yKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZywgZW5kcG9pbnRzKVxufVxuXG5leHBvcnQgY29uc3QgZW5kcG9pbnRTZWxlY3RvciA9IChyZXF1ZXN0OiBBZGFwdGVyUmVxdWVzdCk6IEFQSUVuZHBvaW50ID0+XG4gIEJ1aWxkZXIuc2VsZWN0RW5kcG9pbnQocmVxdWVzdCwgbWFrZUNvbmZpZygpLCBlbmRwb2ludHMpXG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZTogRXhlY3V0ZUZhY3Rvcnk8Q29uZmlnPiA9IChjb25maWcpID0+IHtcbiAgcmV0dXJuIGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0KSA9PiBleGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZyB8fCBtYWtlQ29uZmlnKCkpXG59XG4iXX0=