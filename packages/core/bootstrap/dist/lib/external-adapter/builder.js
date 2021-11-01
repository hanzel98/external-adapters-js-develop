"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = exports.inputParameters = void 0;
const _1 = require(".");
const external_adapter_1 = require("../external-adapter");
exports.inputParameters = {
    endpoint: false,
};
const findSupportedEndpoint = (apiEndpoints, endpoint) => {
    for (const apiEndpoint of Object.values(apiEndpoints)) {
        // Iterate through supported endpoints of a given Chainlink endpoint
        for (const supportedChainlinkEndpoint of apiEndpoint.supportedEndpoints) {
            if (supportedChainlinkEndpoint.toLowerCase() === endpoint.toLowerCase()) {
                return apiEndpoint;
            }
        }
    }
    return null;
};
const selectEndpoint = (request, config, apiEndpoints, customParams) => {
    const params = customParams || exports.inputParameters;
    const validator = new _1.Validator(request, params);
    const jobRunID = validator.validated.id;
    const endpoint = validator.validated.data.endpoint || config.defaultEndpoint;
    if (!endpoint)
        throw new _1.AdapterError({
            jobRunID,
            message: `Endpoint not supplied and no default found`,
            statusCode: 400,
        });
    let apiEndpoint = findSupportedEndpoint(apiEndpoints, endpoint);
    if (!apiEndpoint && config.defaultEndpoint && endpoint !== config.defaultEndpoint) {
        external_adapter_1.logger.debug(`Endpoint ${endpoint} not found, trying default ${config.defaultEndpoint}`);
        apiEndpoint = findSupportedEndpoint(apiEndpoints, config.defaultEndpoint);
    }
    if (!apiEndpoint)
        throw new _1.AdapterError({
            jobRunID,
            message: `Endpoint ${endpoint} not supported.`,
            statusCode: 400,
        });
    if (apiEndpoint.endpointOverride) {
        const overridenEndpoint = apiEndpoint.endpointOverride(request);
        if (overridenEndpoint)
            apiEndpoint = findSupportedEndpoint(apiEndpoints, overridenEndpoint);
        if (request?.data?.endpoint)
            request.data.endpoint = overridenEndpoint;
        if (!apiEndpoint)
            throw new _1.AdapterError({
                jobRunID,
                message: `Overriden Endpoint ${overridenEndpoint} not supported.`,
                statusCode: 500,
            });
    }
    // Allow adapter endpoints to dynamically query different endpoint resultPaths
    if (apiEndpoint.endpointResultPaths && request.data && !request.data.resultPath) {
        const resultPath = apiEndpoint.endpointResultPaths[endpoint];
        if (typeof resultPath === 'function')
            request.data.resultPath = resultPath(request);
        else
            request.data.resultPath = resultPath;
    }
    return apiEndpoint;
};
const buildSelector = (request, context, config, apiEndpoints, customParams) => {
    _1.Requester.logConfig(config);
    const apiEndpoint = selectEndpoint(request, config, apiEndpoints, customParams);
    if (typeof apiEndpoint.execute === 'function') {
        return apiEndpoint.execute(request, context, config);
    }
    if (typeof apiEndpoint.makeExecute === 'function') {
        return apiEndpoint.makeExecute(config)(request, context);
    }
    throw new _1.AdapterError({
        message: `Internal error: no execute handler found.`,
        statusCode: 500,
    });
};
exports.Builder = { selectEndpoint, buildSelector };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZXh0ZXJuYWwtYWRhcHRlci9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdCQUFzRDtBQVV0RCwwREFBNEM7QUFFL0IsUUFBQSxlQUFlLEdBQW9CO0lBQzlDLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUE7QUFFRCxNQUFNLHFCQUFxQixHQUFHLENBQzVCLFlBQTRDLEVBQzVDLFFBQWdCLEVBQ08sRUFBRTtJQUN6QixLQUFLLE1BQU0sV0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDckQsb0VBQW9FO1FBQ3BFLEtBQUssTUFBTSwwQkFBMEIsSUFBSSxXQUFXLENBQUMsa0JBQWtCLEVBQUU7WUFDdkUsSUFBSSwwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3ZFLE9BQU8sV0FBVyxDQUFBO2FBQ25CO1NBQ0Y7S0FDRjtJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBO0FBRUQsTUFBTSxjQUFjLEdBQUcsQ0FDckIsT0FBdUIsRUFDdkIsTUFBUyxFQUNULFlBQTRDLEVBQzVDLFlBQThCLEVBQ2QsRUFBRTtJQUNsQixNQUFNLE1BQU0sR0FBRyxZQUFZLElBQUksdUJBQWUsQ0FBQTtJQUM5QyxNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFFaEQsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUE7SUFFNUUsSUFBSSxDQUFDLFFBQVE7UUFDWCxNQUFNLElBQUksZUFBWSxDQUFDO1lBQ3JCLFFBQVE7WUFD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b3J0IHsgQWRhcHRlckVycm9yLCBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJy4nXG5pbXBvcnQge1xuICBBZGFwdGVyUmVxdWVzdCxcbiAgQ29uZmlnLFxuICBBUElFbmRwb2ludCxcbiAgQWRhcHRlclJlc3BvbnNlLFxuICBJbnB1dFBhcmFtZXRlcnMsXG4gIEFkYXB0ZXJDb250ZXh0LFxuICBNYWtlUmVzdWx0UGF0aCxcbn0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uL2V4dGVybmFsLWFkYXB0ZXInXG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgZW5kcG9pbnQ6IGZhbHNlLFxufVxuXG5jb25zdCBmaW5kU3VwcG9ydGVkRW5kcG9pbnQgPSA8QyBleHRlbmRzIENvbmZpZz4oXG4gIGFwaUVuZHBvaW50czogUmVjb3JkPHN0cmluZywgQVBJRW5kcG9pbnQ8Qz4+LFxuICBlbmRwb2ludDogc3RyaW5nLFxuKTogQVBJRW5kcG9pbnQ8Qz4gfCBudWxsID0+IHtcbiAgZm9yIChjb25zdCBhcGlFbmRwb2ludCBvZiBPYmplY3QudmFsdWVzKGFwaUVuZHBvaW50cykpIHtcbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggc3VwcG9ydGVkIGVuZHBvaW50cyBvZiBhIGdpdmVuIENoYWlubGluayBlbmRwb2ludFxuICAgIGZvciAoY29uc3Qgc3VwcG9ydGVkQ2hhaW5saW5rRW5kcG9pbnQgb2YgYXBpRW5kcG9pbnQuc3VwcG9ydGVkRW5kcG9pbnRzKSB7XG4gICAgICBpZiAoc3VwcG9ydGVkQ2hhaW5saW5rRW5kcG9pbnQudG9Mb3dlckNhc2UoKSA9PT0gZW5kcG9pbnQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICByZXR1cm4gYXBpRW5kcG9pbnRcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuY29uc3Qgc2VsZWN0RW5kcG9pbnQgPSA8QyBleHRlbmRzIENvbmZpZz4oXG4gIHJlcXVlc3Q6IEFkYXB0ZXJSZXF1ZXN0LFxuICBjb25maWc6IEMsXG4gIGFwaUVuZHBvaW50czogUmVjb3JkPHN0cmluZywgQVBJRW5kcG9pbnQ8Qz4+LFxuICBjdXN0b21QYXJhbXM/OiBJbnB1dFBhcmFtZXRlcnMsXG4pOiBBUElFbmRwb2ludDxDPiA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IGN1c3RvbVBhcmFtcyB8fCBpbnB1dFBhcmFtZXRlcnNcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBwYXJhbXMpXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IGVuZHBvaW50ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmVuZHBvaW50IHx8IGNvbmZpZy5kZWZhdWx0RW5kcG9pbnRcblxuICBpZiAoIWVuZHBvaW50KVxuICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3Ioe1xuICAgICAgam9iUnVuSUQsXG4gICAgICBtZXNzYWdlOiBgRW5kcG9pbnQgbm90IHN1cHBsaWVkIGFuZCBubyBkZWZhdWx0IGZvdW5kYCxcbiAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICB9KVxuXG4gIGxldCBhcGlFbmRwb2ludCA9IGZpbmRTdXBwb3J0ZWRFbmRwb2ludChhcGlFbmRwb2ludHMsIGVuZHBvaW50KVxuXG4gIGlmICghYXBpRW5kcG9pbnQgJiYgY29uZmlnLmRlZmF1bHRFbmRwb2ludCAmJiBlbmRwb2ludCAhPT0gY29uZmlnLmRlZmF1bHRFbmRwb2ludCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgRW5kcG9pbnQgJHtlbmRwb2ludH0gbm90IGZvdW5kLCB0cnlpbmcgZGVmYXVsdCAke2NvbmZpZy5kZWZhdWx0RW5kcG9pbnR9YClcbiAgICBhcGlFbmRwb2ludCA9IGZpbmRTdXBwb3J0ZWRFbmRwb2ludChhcGlFbmRwb2ludHMsIGNvbmZpZy5kZWZhdWx0RW5kcG9pbnQpXG4gIH1cblxuICBpZiAoIWFwaUVuZHBvaW50KVxuICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3Ioe1xuICAgICAgam9iUnVuSUQsXG4gICAgICBtZXNzYWdlOiBgRW5kcG9pbnQgJHtlbmRwb2ludH0gbm90IHN1cHBvcnRlZC5gLFxuICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgIH0pXG5cbiAgaWYgKGFwaUVuZHBvaW50LmVuZHBvaW50T3ZlcnJpZGUpIHtcbiAgICBjb25zdCBvdmVycmlkZW5FbmRwb2ludCA9IGFwaUVuZHBvaW50LmVuZHBvaW50T3ZlcnJpZGUocmVxdWVzdClcbiAgICBpZiAob3ZlcnJpZGVuRW5kcG9pbnQpIGFwaUVuZHBvaW50ID0gZmluZFN1cHBvcnRlZEVuZHBvaW50KGFwaUVuZHBvaW50cywgb3ZlcnJpZGVuRW5kcG9pbnQpXG4gICAgaWYgKHJlcXVlc3Q/LmRhdGE/LmVuZHBvaW50KSByZXF1ZXN0LmRhdGEuZW5kcG9pbnQgPSBvdmVycmlkZW5FbmRwb2ludFxuXG4gICAgaWYgKCFhcGlFbmRwb2ludClcbiAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3Ioe1xuICAgICAgICBqb2JSdW5JRCxcbiAgICAgICAgbWVzc2FnZTogYE92ZXJyaWRlbiBFbmRwb2ludCAke292ZXJyaWRlbkVuZHBvaW50fSBub3Qgc3VwcG9ydGVkLmAsXG4gICAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIH0pXG4gIH1cblxuICAvLyBBbGxvdyBhZGFwdGVyIGVuZHBvaW50cyB0byBkeW5hbWljYWxseSBxdWVyeSBkaWZmZXJlbnQgZW5kcG9pbnQgcmVzdWx0UGF0aHNcbiAgaWYgKGFwaUVuZHBvaW50LmVuZHBvaW50UmVzdWx0UGF0aHMgJiYgcmVxdWVzdC5kYXRhICYmICFyZXF1ZXN0LmRhdGEucmVzdWx0UGF0aCkge1xuICAgIGNvbnN0IHJlc3VsdFBhdGggPSBhcGlFbmRwb2ludC5lbmRwb2ludFJlc3VsdFBhdGhzW2VuZHBvaW50XVxuICAgIGlmICh0eXBlb2YgcmVzdWx0UGF0aCA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIHJlcXVlc3QuZGF0YS5yZXN1bHRQYXRoID0gKHJlc3VsdFBhdGggYXMgTWFrZVJlc3VsdFBhdGgpKHJlcXVlc3QpXG4gICAgZWxzZSByZXF1ZXN0LmRhdGEucmVzdWx0UGF0aCA9IHJlc3VsdFBhdGhcbiAgfVxuXG4gIHJldHVybiBhcGlFbmRwb2ludFxufVxuXG5jb25zdCBidWlsZFNlbGVjdG9yID0gPEMgZXh0ZW5kcyBDb25maWc+KFxuICByZXF1ZXN0OiBBZGFwdGVyUmVxdWVzdCxcbiAgY29udGV4dDogQWRhcHRlckNvbnRleHQsXG4gIGNvbmZpZzogQyxcbiAgYXBpRW5kcG9pbnRzOiBSZWNvcmQ8c3RyaW5nLCBBUElFbmRwb2ludDxDPj4sXG4gIGN1c3RvbVBhcmFtcz86IElucHV0UGFyYW1ldGVycyxcbik6IFByb21pc2U8QWRhcHRlclJlc3BvbnNlPiA9PiB7XG4gIFJlcXVlc3Rlci5sb2dDb25maWcoY29uZmlnKVxuICBjb25zdCBhcGlFbmRwb2ludCA9IHNlbGVjdEVuZHBvaW50PEM+KHJlcXVlc3QsIGNvbmZpZywgYXBpRW5kcG9pbnRzLCBjdXN0b21QYXJhbXMpXG5cbiAgaWYgKHR5cGVvZiBhcGlFbmRwb2ludC5leGVjdXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGFwaUVuZHBvaW50LmV4ZWN1dGUocmVxdWVzdCwgY29udGV4dCwgY29uZmlnKVxuICB9XG4gIGlmICh0eXBlb2YgYXBpRW5kcG9pbnQubWFrZUV4ZWN1dGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYXBpRW5kcG9pbnQubWFrZUV4ZWN1dGUoY29uZmlnKShyZXF1ZXN0LCBjb250ZXh0KVxuICB9XG4gIHRocm93IG5ldyBBZGFwdGVyRXJyb3Ioe1xuICAgIG1lc3NhZ2U6IGBJbnRlcm5hbCBlcnJvcjogbm8gZXhlY3V0ZSBoYW5kbGVyIGZvdW5kLmAsXG4gICAgc3RhdHVzQ29kZTogNTAwLFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgQnVpbGRlciA9IHsgc2VsZWN0RW5kcG9pbnQsIGJ1aWxkU2VsZWN0b3IgfVxuIl19