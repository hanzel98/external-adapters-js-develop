"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.server = exports.makeConfig = exports.makeExecute = exports.NAME = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
const config_1 = require("./config");
Object.defineProperty(exports, "NAME", { enumerable: true, get: function () { return config_1.NAME; } });
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
const types = tslib_1.__importStar(require("./endpoint"));
exports.types = types;
const { server } = ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute(), adapter_1.makeWSHandler(), adapter_1.endpointSelector);
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBd0U7QUFLekQsNEZBTE4scUJBQVcsT0FLTTtBQUoxQixxQ0FBMkM7QUFJbEMscUZBSkEsYUFBSSxPQUlBO0FBQWUsMkZBSmIsbUJBQVUsT0FJYTtBQUh0QywwREFBbUM7QUFHYSxzQkFBSztBQURyRCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcscUJBQU0sQ0FBQyxhQUFJLEVBQUUscUJBQVcsRUFBRSxFQUFFLHVCQUFhLEVBQUUsRUFBRSwwQkFBZ0IsQ0FBQyxDQUFBO0FBQ3pDLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwb3NlIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBtYWtlRXhlY3V0ZSwgbWFrZVdTSGFuZGxlciwgZW5kcG9pbnRTZWxlY3RvciB9IGZyb20gJy4vYWRhcHRlcidcbmltcG9ydCB7IE5BTUUsIG1ha2VDb25maWcgfSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vZW5kcG9pbnQnXG5cbmNvbnN0IHsgc2VydmVyIH0gPSBleHBvc2UoTkFNRSwgbWFrZUV4ZWN1dGUoKSwgbWFrZVdTSGFuZGxlcigpLCBlbmRwb2ludFNlbGVjdG9yKVxuZXhwb3J0IHsgTkFNRSwgbWFrZUV4ZWN1dGUsIG1ha2VDb25maWcsIHNlcnZlciwgdHlwZXMgfVxuIl19