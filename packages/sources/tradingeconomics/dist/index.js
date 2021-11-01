"use strict";
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
const config_1 = require("./config");
module.exports = { NAME: config_1.NAME, makeExecute: adapter_1.makeExecute, makeConfig: config_1.makeConfig, ...ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute(), adapter_1.makeWSHandler()) };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBc0Q7QUFDdEQscUNBQTJDO0FBRTNDLGlCQUFTLEVBQUUsSUFBSSxFQUFKLGFBQUksRUFBRSxXQUFXLEVBQVgscUJBQVcsRUFBRSxVQUFVLEVBQVYsbUJBQVUsRUFBRSxHQUFHLHFCQUFNLENBQUMsYUFBSSxFQUFFLHFCQUFXLEVBQUUsRUFBRSx1QkFBYSxFQUFFLENBQUMsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwb3NlIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBtYWtlRXhlY3V0ZSwgbWFrZVdTSGFuZGxlciB9IGZyb20gJy4vYWRhcHRlcidcbmltcG9ydCB7IG1ha2VDb25maWcsIE5BTUUgfSBmcm9tICcuL2NvbmZpZydcblxuZXhwb3J0ID0geyBOQU1FLCBtYWtlRXhlY3V0ZSwgbWFrZUNvbmZpZywgLi4uZXhwb3NlKE5BTUUsIG1ha2VFeGVjdXRlKCksIG1ha2VXU0hhbmRsZXIoKSkgfVxuIl19