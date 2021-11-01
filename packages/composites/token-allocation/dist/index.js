"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = exports.makeConfig = exports.makeExecute = exports.types = exports.NAME = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
const types = tslib_1.__importStar(require("./types"));
exports.types = types;
const NAME = 'Token-Allocation';
exports.NAME = NAME;
const handlers = ea_bootstrap_1.expose(NAME, adapter_1.makeExecute());
exports.handlers = handlers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBdUM7QUFPakIsNEZBUGIscUJBQVcsT0FPYTtBQU5qQyxxQ0FBcUM7QUFNRiwyRkFOMUIsbUJBQVUsT0FNMEI7QUFMN0MsdURBQWdDO0FBS2pCLHNCQUFLO0FBSHBCLE1BQU0sSUFBSSxHQUFHLGtCQUFrQixDQUFBO0FBR3RCLG9CQUFJO0FBRmIsTUFBTSxRQUFRLEdBQUcscUJBQU0sQ0FBQyxJQUFJLEVBQUUscUJBQVcsRUFBRSxDQUFDLENBQUE7QUFFRyw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cG9zZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgbWFrZUV4ZWN1dGUgfSBmcm9tICcuL2FkYXB0ZXInXG5pbXBvcnQgeyBtYWtlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL3R5cGVzJ1xuXG5jb25zdCBOQU1FID0gJ1Rva2VuLUFsbG9jYXRpb24nXG5jb25zdCBoYW5kbGVycyA9IGV4cG9zZShOQU1FLCBtYWtlRXhlY3V0ZSgpKVxuXG5leHBvcnQgeyBOQU1FLCB0eXBlcywgbWFrZUV4ZWN1dGUsIG1ha2VDb25maWcsIGhhbmRsZXJzIH1cbiJdfQ==