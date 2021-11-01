"use strict";
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
const config_1 = require("./config");
const NAME = 'PROOF_OF_RESERVES';
const handlers = ea_bootstrap_1.expose(NAME, adapter_1.makeExecute());
module.exports = { NAME, makeConfig: config_1.makeConfig, makeExecute: adapter_1.makeExecute, handlers };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBdUM7QUFDdkMscUNBQXFDO0FBRXJDLE1BQU0sSUFBSSxHQUFHLG1CQUFtQixDQUFBO0FBRWhDLE1BQU0sUUFBUSxHQUFHLHFCQUFNLENBQUMsSUFBSSxFQUFFLHFCQUFXLEVBQUUsQ0FBQyxDQUFBO0FBRTVDLGlCQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBVixtQkFBVSxFQUFFLFdBQVcsRUFBWCxxQkFBVyxFQUFFLFFBQVEsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwb3NlIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBtYWtlRXhlY3V0ZSB9IGZyb20gJy4vYWRhcHRlcidcbmltcG9ydCB7IG1ha2VDb25maWcgfSBmcm9tICcuL2NvbmZpZydcblxuY29uc3QgTkFNRSA9ICdQUk9PRl9PRl9SRVNFUlZFUydcblxuY29uc3QgaGFuZGxlcnMgPSBleHBvc2UoTkFNRSwgbWFrZUV4ZWN1dGUoKSlcblxuZXhwb3J0ID0geyBOQU1FLCBtYWtlQ29uZmlnLCBtYWtlRXhlY3V0ZSwgaGFuZGxlcnMgfVxuIl19