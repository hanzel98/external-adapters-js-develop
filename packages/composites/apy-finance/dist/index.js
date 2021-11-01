"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.makeExecute = exports.makeConfig = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
const NAME = 'APY-Finance';
exports.NAME = NAME;
const { server } = ea_bootstrap_1.expose(NAME, adapter_1.makeExecute(), undefined, adapter_1.endpointSelector);
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQWdEO0FBQ2hELHVDQUF5RDtBQUs5Qiw0RkFMQSxxQkFBVyxPQUtBO0FBSnRDLHFDQUFxQztBQUl0QiwyRkFKTixtQkFBVSxPQUlNO0FBRnpCLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQTtBQUVqQixvQkFBSTtBQURiLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxxQkFBTSxDQUFDLElBQUksRUFBRSxxQkFBVyxFQUFFLEVBQUUsU0FBUyxFQUFFLDBCQUFnQixDQUFDLENBQUE7QUFDbkMsd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBvc2UgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IGVuZHBvaW50U2VsZWN0b3IsIG1ha2VFeGVjdXRlIH0gZnJvbSAnLi9hZGFwdGVyJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBOQU1FID0gJ0FQWS1GaW5hbmNlJ1xuY29uc3QgeyBzZXJ2ZXIgfSA9IGV4cG9zZShOQU1FLCBtYWtlRXhlY3V0ZSgpLCB1bmRlZmluZWQsIGVuZHBvaW50U2VsZWN0b3IpXG5leHBvcnQgeyBOQU1FLCBtYWtlQ29uZmlnLCBtYWtlRXhlY3V0ZSwgc2VydmVyIH1cbiJdfQ==