"use strict";
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
const config_1 = require("./config");
const NAME = 'MEDIANIZER';
module.exports = { NAME, makeConfig: config_1.makeConfig, makeExecute: adapter_1.makeExecute, ...ea_bootstrap_1.expose(NAME, adapter_1.makeExecute()) };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBdUM7QUFDdkMscUNBQXFDO0FBRXJDLE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQTtBQUV6QixpQkFBUyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQVYsbUJBQVUsRUFBRSxXQUFXLEVBQVgscUJBQVcsRUFBRSxHQUFHLHFCQUFNLENBQUMsSUFBSSxFQUFFLHFCQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBvc2UgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IG1ha2VFeGVjdXRlIH0gZnJvbSAnLi9hZGFwdGVyJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBOQU1FID0gJ01FRElBTklaRVInXG5cbmV4cG9ydCA9IHsgTkFNRSwgbWFrZUNvbmZpZywgbWFrZUV4ZWN1dGUsIC4uLmV4cG9zZShOQU1FLCBtYWtlRXhlY3V0ZSgpKSB9XG4iXX0=