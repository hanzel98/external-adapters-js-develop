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
const endpointSelector = (request) => {
    return ea_bootstrap_1.Builder.selectEndpoint(request, config_1.makeConfig(), endpoints);
};
exports.endpointSelector = endpointSelector;
const makeExecute = (config) => {
    return async (request, context) => exports.execute(request, context, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBaUQ7QUFRakQscUNBQXFDO0FBQ3JDLDhEQUF1QztBQUVoQyxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbkYsT0FBTyxzQkFBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUNuRSxDQUFDLENBQUE7QUFGWSxRQUFBLE9BQU8sV0FFbkI7QUFFTSxNQUFNLGdCQUFnQixHQUFHLENBQUMsT0FBdUIsRUFBZSxFQUFFO0lBQ3ZFLE9BQU8sc0JBQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLG1CQUFVLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUNqRSxDQUFDLENBQUE7QUFGWSxRQUFBLGdCQUFnQixvQkFFNUI7QUFFTSxNQUFNLFdBQVcsR0FBMkIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUM1RCxPQUFPLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQVUsRUFBRSxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVpbGRlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHtcbiAgQ29uZmlnLFxuICBFeGVjdXRlV2l0aENvbmZpZyxcbiAgRXhlY3V0ZUZhY3RvcnksXG4gIEFkYXB0ZXJSZXF1ZXN0LFxuICBBUElFbmRwb2ludCxcbn0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IG1ha2VDb25maWcgfSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCAqIGFzIGVuZHBvaW50cyBmcm9tICcuL2VuZHBvaW50J1xuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcpID0+IHtcbiAgcmV0dXJuIEJ1aWxkZXIuYnVpbGRTZWxlY3RvcihyZXF1ZXN0LCBjb250ZXh0LCBjb25maWcsIGVuZHBvaW50cylcbn1cblxuZXhwb3J0IGNvbnN0IGVuZHBvaW50U2VsZWN0b3IgPSAocmVxdWVzdDogQWRhcHRlclJlcXVlc3QpOiBBUElFbmRwb2ludCA9PntcbiAgcmV0dXJuIEJ1aWxkZXIuc2VsZWN0RW5kcG9pbnQocmVxdWVzdCwgbWFrZUNvbmZpZygpLCBlbmRwb2ludHMpXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZTogRXhlY3V0ZUZhY3Rvcnk8Q29uZmlnPiA9IChjb25maWcpID0+IHtcbiAgcmV0dXJuIGFzeW5jIChyZXF1ZXN0LCBjb250ZXh0KSA9PiBleGVjdXRlKHJlcXVlc3QsIGNvbnRleHQsIGNvbmZpZyB8fCBtYWtlQ29uZmlnKCkpXG59XG4iXX0=