"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.endpointSelector = exports.execute = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const endpoints = tslib_1.__importStar(require("./endpoint"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBaUQ7QUFRakQscUNBQXFDO0FBQ3JDLDhEQUF1QztBQUVoQyxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbkYsT0FBTyxzQkFBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUNuRSxDQUFDLENBQUE7QUFGWSxRQUFBLE9BQU8sV0FFbkI7QUFFTSxNQUFNLGdCQUFnQixHQUFHLENBQUMsT0FBdUIsRUFBZSxFQUFFLENBQ3ZFLHNCQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxtQkFBVSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFEN0MsUUFBQSxnQkFBZ0Isb0JBQzZCO0FBRW5ELE1BQU0sV0FBVyxHQUEyQixDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQzVELE9BQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxtQkFBVSxFQUFFLENBQUMsQ0FBQTtBQUN0RixDQUFDLENBQUE7QUFGWSxRQUFBLFdBQVcsZUFFdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdWlsZGVyIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQge1xuICBFeGVjdXRlV2l0aENvbmZpZyxcbiAgRXhlY3V0ZUZhY3RvcnksXG4gIENvbmZpZyxcbiAgQWRhcHRlclJlcXVlc3QsXG4gIEFQSUVuZHBvaW50LFxufSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0ICogYXMgZW5kcG9pbnRzIGZyb20gJy4vZW5kcG9pbnQnXG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZykgPT4ge1xuICByZXR1cm4gQnVpbGRlci5idWlsZFNlbGVjdG9yKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZywgZW5kcG9pbnRzKVxufVxuXG5leHBvcnQgY29uc3QgZW5kcG9pbnRTZWxlY3RvciA9IChyZXF1ZXN0OiBBZGFwdGVyUmVxdWVzdCk6IEFQSUVuZHBvaW50ID0+XG4gIEJ1aWxkZXIuc2VsZWN0RW5kcG9pbnQocmVxdWVzdCwgbWFrZUNvbmZpZygpLCBlbmRwb2ludHMpXG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZTogRXhlY3V0ZUZhY3Rvcnk8Q29uZmlnPiA9IChjb25maWcpID0+IHtcbiAgcmV0dXJuIGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0KSA9PiBleGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZyB8fCBtYWtlQ29uZmlnKCkpXG59XG4iXX0=