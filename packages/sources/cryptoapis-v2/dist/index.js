"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.makeConfig = exports.makeExecute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
Object.defineProperty(exports, "NAME", { enumerable: true, get: function () { return config_1.NAME; } });
const { server } = ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute(), undefined, adapter_1.endpointSelector);
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQWdEO0FBQ2hELHVDQUF5RDtBQUsxQyw0RkFMWSxxQkFBVyxPQUtaO0FBSjFCLHFDQUEyQztBQUlmLDJGQUpuQixtQkFBVSxPQUltQjtBQUE3QixxRkFKWSxhQUFJLE9BSVo7QUFGYixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcscUJBQU0sQ0FBQyxhQUFJLEVBQUUscUJBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSwwQkFBZ0IsQ0FBQyxDQUFBO0FBRW5DLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwb3NlIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBlbmRwb2ludFNlbGVjdG9yLCBtYWtlRXhlY3V0ZSB9IGZyb20gJy4vYWRhcHRlcidcbmltcG9ydCB7IG1ha2VDb25maWcsIE5BTUUgfSBmcm9tICcuL2NvbmZpZydcblxuY29uc3QgeyBzZXJ2ZXIgfSA9IGV4cG9zZShOQU1FLCBtYWtlRXhlY3V0ZSgpLCB1bmRlZmluZWQsIGVuZHBvaW50U2VsZWN0b3IpXG5cbmV4cG9ydCB7IE5BTUUsIG1ha2VFeGVjdXRlLCBtYWtlQ29uZmlnLCBzZXJ2ZXIgfVxuIl19