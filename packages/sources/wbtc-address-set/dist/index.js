"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.server = exports.makeConfig = exports.makeExecute = exports.NAME = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
Object.defineProperty(exports, "NAME", { enumerable: true, get: function () { return config_1.NAME; } });
const types = tslib_1.__importStar(require("./endpoint"));
exports.types = types;
const { server } = ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute(), undefined, adapter_1.endpointSelector);
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBeUQ7QUFLMUMsNEZBTFkscUJBQVcsT0FLWjtBQUoxQixxQ0FBMkM7QUFJZiwyRkFKbkIsbUJBQVUsT0FJbUI7QUFBN0IscUZBSlksYUFBSSxPQUlaO0FBSGIsMERBQW1DO0FBR2Esc0JBQUs7QUFEckQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLHFCQUFNLENBQUMsYUFBSSxFQUFFLHFCQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsMEJBQWdCLENBQUMsQ0FBQTtBQUNuQyx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cG9zZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgZW5kcG9pbnRTZWxlY3RvciwgbWFrZUV4ZWN1dGUgfSBmcm9tICcuL2FkYXB0ZXInXG5pbXBvcnQgeyBtYWtlQ29uZmlnLCBOQU1FIH0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2VuZHBvaW50J1xuXG5jb25zdCB7IHNlcnZlciB9ID0gZXhwb3NlKE5BTUUsIG1ha2VFeGVjdXRlKCksIHVuZGVmaW5lZCwgZW5kcG9pbnRTZWxlY3RvcilcbmV4cG9ydCB7IE5BTUUsIG1ha2VFeGVjdXRlLCBtYWtlQ29uZmlnLCBzZXJ2ZXIsIHR5cGVzIH1cbiJdfQ==