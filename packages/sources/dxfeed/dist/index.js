"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.endpointSelector = exports.makeConfig = exports.makeWSHandler = exports.makeExecute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "endpointSelector", { enumerable: true, get: function () { return adapter_1.endpointSelector; } });
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
Object.defineProperty(exports, "makeWSHandler", { enumerable: true, get: function () { return adapter_1.makeWSHandler; } });
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
Object.defineProperty(exports, "NAME", { enumerable: true, get: function () { return config_1.NAME; } });
const { server } = ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute(), adapter_1.makeWSHandler(), adapter_1.endpointSelector);
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQWdEO0FBQ2hELHVDQUF3RTtBQUtqQixpR0FMOUMsMEJBQWdCLE9BSzhDO0FBQXhELDRGQUxZLHFCQUFXLE9BS1o7QUFBRSw4RkFMWSx1QkFBYSxPQUtaO0FBSnpDLHFDQUEyQztBQUlBLDJGQUpsQyxtQkFBVSxPQUlrQztBQUE1QyxxRkFKWSxhQUFJLE9BSVo7QUFGYixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcscUJBQU0sQ0FBQyxhQUFJLEVBQUUscUJBQVcsRUFBRSxFQUFFLHVCQUFhLEVBQUUsRUFBRSwwQkFBZ0IsQ0FBQyxDQUFBO0FBRVIsd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBvc2UgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IGVuZHBvaW50U2VsZWN0b3IsIG1ha2VFeGVjdXRlLCBtYWtlV1NIYW5kbGVyIH0gZnJvbSAnLi9hZGFwdGVyJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZywgTkFNRSB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCB7IHNlcnZlciB9ID0gZXhwb3NlKE5BTUUsIG1ha2VFeGVjdXRlKCksIG1ha2VXU0hhbmRsZXIoKSwgZW5kcG9pbnRTZWxlY3RvcilcblxuZXhwb3J0IHsgTkFNRSwgbWFrZUV4ZWN1dGUsIG1ha2VXU0hhbmRsZXIsIG1ha2VDb25maWcsIGVuZHBvaW50U2VsZWN0b3IsIHNlcnZlciB9XG4iXX0=