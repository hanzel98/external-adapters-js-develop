"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.makeConfig = exports.makeExecute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
Object.defineProperty(exports, "NAME", { enumerable: true, get: function () { return config_1.NAME; } });
const server = ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute()).server;
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQWdEO0FBQ2hELHVDQUF1QztBQUt4Qiw0RkFMTixxQkFBVyxPQUtNO0FBSjFCLHFDQUEyQztBQUlmLDJGQUpuQixtQkFBVSxPQUltQjtBQUE3QixxRkFKWSxhQUFJLE9BSVo7QUFGYixNQUFNLE1BQU0sR0FBRyxxQkFBTSxDQUFDLGFBQUksRUFBRSxxQkFBVyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFFVCx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cG9zZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgbWFrZUV4ZWN1dGUgfSBmcm9tICcuL2FkYXB0ZXInXG5pbXBvcnQgeyBtYWtlQ29uZmlnLCBOQU1FIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IHNlcnZlciA9IGV4cG9zZShOQU1FLCBtYWtlRXhlY3V0ZSgpKS5zZXJ2ZXJcblxuZXhwb3J0IHsgTkFNRSwgbWFrZUV4ZWN1dGUsIG1ha2VDb25maWcsIHNlcnZlciB9XG4iXX0=