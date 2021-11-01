"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.makeExecute = exports.makeConfig = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
Object.defineProperty(exports, "NAME", { enumerable: true, get: function () { return config_1.NAME; } });
const server = ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute(), undefined, adapter_1.endpointSelector).server;
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQWdEO0FBQ2hELHVDQUF5RDtBQUs5Qiw0RkFMbEIscUJBQVcsT0FLa0I7QUFKdEMscUNBQTJDO0FBSTVCLDJGQUpOLG1CQUFVLE9BSU07QUFBaEIscUZBSlksYUFBSSxPQUlaO0FBRmIsTUFBTSxNQUFNLEdBQUcscUJBQU0sQ0FBQyxhQUFJLEVBQUUscUJBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSwwQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtBQUV0Qyx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cG9zZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgbWFrZUV4ZWN1dGUsIGVuZHBvaW50U2VsZWN0b3IgfSBmcm9tICcuL2FkYXB0ZXInXG5pbXBvcnQgeyBtYWtlQ29uZmlnLCBOQU1FIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IHNlcnZlciA9IGV4cG9zZShOQU1FLCBtYWtlRXhlY3V0ZSgpLCB1bmRlZmluZWQsIGVuZHBvaW50U2VsZWN0b3IpLnNlcnZlclxuXG5leHBvcnQgeyBOQU1FLCBtYWtlQ29uZmlnLCBtYWtlRXhlY3V0ZSwgc2VydmVyIH1cbiJdfQ==