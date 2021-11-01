"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.makeConfig = exports.makeExecute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
const NAME = 'DYDX_REWARDS';
exports.NAME = NAME;
const { server } = ea_bootstrap_1.expose(NAME, adapter_1.makeExecute());
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQWdEO0FBQ2hELHVDQUF1QztBQU14Qiw0RkFOTixxQkFBVyxPQU1NO0FBTDFCLHFDQUFxQztBQUtULDJGQUxuQixtQkFBVSxPQUttQjtBQUh0QyxNQUFNLElBQUksR0FBRyxjQUFjLENBQUE7QUFHbEIsb0JBQUk7QUFEYixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcscUJBQU0sQ0FBQyxJQUFJLEVBQUUscUJBQVcsRUFBRSxDQUFDLENBQUE7QUFDTix3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cG9zZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgbWFrZUV4ZWN1dGUgfSBmcm9tICcuL2FkYXB0ZXInXG5pbXBvcnQgeyBtYWtlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IE5BTUUgPSAnRFlEWF9SRVdBUkRTJ1xuXG5jb25zdCB7IHNlcnZlciB9ID0gZXhwb3NlKE5BTUUsIG1ha2VFeGVjdXRlKCkpXG5leHBvcnQgeyBOQU1FLCBtYWtlRXhlY3V0ZSwgbWFrZUNvbmZpZywgc2VydmVyIH1cbiJdfQ==