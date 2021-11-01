"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.execute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "execute", { enumerable: true, get: function () { return adapter_1.execute; } });
const NAME = 'CRYPTO_VOLATILITY_INDEX';
exports.NAME = NAME;
const { server } = ea_bootstrap_1.expose(NAME, adapter_1.execute);
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQWdEO0FBQ2hELHVDQUFtQztBQUlwQix3RkFKTixpQkFBTyxPQUlNO0FBRnRCLE1BQU0sSUFBSSxHQUFHLHlCQUF5QixDQUFBO0FBRTdCLG9CQUFJO0FBRGIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLHFCQUFNLENBQUMsSUFBSSxFQUFFLGlCQUFPLENBQUMsQ0FBQTtBQUNoQix3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cG9zZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgZXhlY3V0ZSB9IGZyb20gJy4vYWRhcHRlcidcblxuY29uc3QgTkFNRSA9ICdDUllQVE9fVk9MQVRJTElUWV9JTkRFWCdcbmNvbnN0IHsgc2VydmVyIH0gPSBleHBvc2UoTkFNRSwgZXhlY3V0ZSlcbmV4cG9ydCB7IE5BTUUsIGV4ZWN1dGUsIHNlcnZlciB9XG4iXX0=