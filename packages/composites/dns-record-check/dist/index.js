"use strict";
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
const config_1 = require("./config");
module.exports = { makeExecute: adapter_1.makeExecute, ...ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute()) };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBdUM7QUFDdkMscUNBQStCO0FBRS9CLGlCQUFTLEVBQUUsV0FBVyxFQUFYLHFCQUFXLEVBQUUsR0FBRyxxQkFBTSxDQUFDLGFBQUksRUFBRSxxQkFBVyxFQUFFLENBQUMsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwb3NlIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBtYWtlRXhlY3V0ZSB9IGZyb20gJy4vYWRhcHRlcidcbmltcG9ydCB7IE5BTUUgfSBmcm9tICcuL2NvbmZpZydcblxuZXhwb3J0ID0geyBtYWtlRXhlY3V0ZSwgLi4uZXhwb3NlKE5BTUUsIG1ha2VFeGVjdXRlKCkpIH1cbiJdfQ==