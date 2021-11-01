"use strict";
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
const config_1 = require("./config");
const NAME = 'GOOGLE_WEATHER';
module.exports = { NAME, makeExecute: adapter_1.makeExecute, makeConfig: config_1.makeConfig, ...ea_bootstrap_1.expose(NAME, adapter_1.makeExecute()) };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBdUM7QUFDdkMscUNBQXFDO0FBRXJDLE1BQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFBO0FBRTdCLGlCQUFTLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBWCxxQkFBVyxFQUFFLFVBQVUsRUFBVixtQkFBVSxFQUFFLEdBQUcscUJBQU0sQ0FBQyxJQUFJLEVBQUUscUJBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cG9zZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgbWFrZUV4ZWN1dGUgfSBmcm9tICcuL2FkYXB0ZXInXG5pbXBvcnQgeyBtYWtlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IE5BTUUgPSAnR09PR0xFX1dFQVRIRVInXG5cbmV4cG9ydCA9IHsgTkFNRSwgbWFrZUV4ZWN1dGUsIG1ha2VDb25maWcsIC4uLmV4cG9zZShOQU1FLCBtYWtlRXhlY3V0ZSgpKSB9XG4iXX0=