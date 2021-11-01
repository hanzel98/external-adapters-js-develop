"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.makeConfig = exports.makeExecute = exports.NAME = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const dxfeed = tslib_1.__importStar(require("@chainlink/dxfeed-adapter"));
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
Object.defineProperty(exports, "NAME", { enumerable: true, get: function () { return config_1.NAME; } });
const makeExecute = dxfeed.makeExecute;
exports.makeExecute = makeExecute;
const { server } = ea_bootstrap_1.expose(config_1.NAME, makeExecute(), dxfeed.makeWSHandler(), dxfeed.endpointSelector);
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUFnRDtBQUNoRCwwRUFBbUQ7QUFDbkQscUNBQTJDO0FBS2YsMkZBTG5CLG1CQUFVLE9BS21CO0FBQTdCLHFGQUxZLGFBQUksT0FLWjtBQUhiLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUE7QUFHdkIsa0NBQVc7QUFGMUIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLHFCQUFNLENBQUMsYUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUV2RCx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cG9zZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0ICogYXMgZHhmZWVkIGZyb20gJ0BjaGFpbmxpbmsvZHhmZWVkLWFkYXB0ZXInXG5pbXBvcnQgeyBtYWtlQ29uZmlnLCBOQU1FIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IG1ha2VFeGVjdXRlID0gZHhmZWVkLm1ha2VFeGVjdXRlXG5jb25zdCB7IHNlcnZlciB9ID0gZXhwb3NlKE5BTUUsIG1ha2VFeGVjdXRlKCksIGR4ZmVlZC5tYWtlV1NIYW5kbGVyKCksIGR4ZmVlZC5lbmRwb2ludFNlbGVjdG9yKVxuXG5leHBvcnQgeyBOQU1FLCBtYWtlRXhlY3V0ZSwgbWFrZUNvbmZpZywgc2VydmVyIH1cbiJdfQ==