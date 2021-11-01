"use strict";
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
const config_1 = require("./config");
const NAME = 'JSON_RPC';
module.exports = { NAME, execute: adapter_1.execute, makeConfig: config_1.makeConfig, ...ea_bootstrap_1.expose(NAME, adapter_1.makeExecute()) };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBZ0Q7QUFDaEQscUNBQXFDO0FBRXJDLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQTtBQUV2QixpQkFBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQVAsaUJBQU8sRUFBRSxVQUFVLEVBQVYsbUJBQVUsRUFBRSxHQUFHLHFCQUFNLENBQUMsSUFBSSxFQUFFLHFCQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBvc2UgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IGV4ZWN1dGUsIG1ha2VFeGVjdXRlIH0gZnJvbSAnLi9hZGFwdGVyJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBOQU1FID0gJ0pTT05fUlBDJ1xuXG5leHBvcnQgPSB7IE5BTUUsIGV4ZWN1dGUsIG1ha2VDb25maWcsIC4uLmV4cG9zZShOQU1FLCBtYWtlRXhlY3V0ZSgpKSB9XG4iXX0=