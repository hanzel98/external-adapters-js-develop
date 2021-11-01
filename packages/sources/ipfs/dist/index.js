"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.server = exports.makeConfig = exports.makeExecute = exports.NAME = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
Object.defineProperty(exports, "NAME", { enumerable: true, get: function () { return config_1.NAME; } });
const adapter_2 = require("./adapter");
const types = tslib_1.__importStar(require("./endpoint"));
exports.types = types;
const { server } = ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute(), undefined, adapter_2.endpointSelector);
exports.server = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBdUM7QUFNeEIsNEZBTk4scUJBQVcsT0FNTTtBQUwxQixxQ0FBMkM7QUFLZiwyRkFMbkIsbUJBQVUsT0FLbUI7QUFBN0IscUZBTFksYUFBSSxPQUtaO0FBSmIsdUNBQTRDO0FBQzVDLDBEQUFtQztBQUdhLHNCQUFLO0FBRHJELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxxQkFBTSxDQUFDLGFBQUksRUFBRSxxQkFBVyxFQUFFLEVBQUUsU0FBUyxFQUFFLDBCQUFnQixDQUFDLENBQUE7QUFDbkMsd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBvc2UgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IG1ha2VFeGVjdXRlIH0gZnJvbSAnLi9hZGFwdGVyJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZywgTkFNRSB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgZW5kcG9pbnRTZWxlY3RvciB9IGZyb20gJy4vYWRhcHRlcidcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vZW5kcG9pbnQnXG5cbmNvbnN0IHsgc2VydmVyIH0gPSBleHBvc2UoTkFNRSwgbWFrZUV4ZWN1dGUoKSwgdW5kZWZpbmVkLCBlbmRwb2ludFNlbGVjdG9yKVxuZXhwb3J0IHsgTkFNRSwgbWFrZUV4ZWN1dGUsIG1ha2VDb25maWcsIHNlcnZlciwgdHlwZXMgfVxuIl19