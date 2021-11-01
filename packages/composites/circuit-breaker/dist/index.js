"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = exports.makeExecute = exports.makeConfig = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
Object.defineProperty(exports, "makeExecute", { enumerable: true, get: function () { return adapter_1.makeExecute; } });
const config_1 = require("./config");
Object.defineProperty(exports, "makeConfig", { enumerable: true, get: function () { return config_1.makeConfig; } });
const NAME = 'CIRCUIT_BREAKER';
exports.NAME = NAME;
const handlers = ea_bootstrap_1.expose(NAME, adapter_1.makeExecute());
exports.handlers = handlers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQWdEO0FBQ2hELHVDQUF1QztBQU1aLDRGQU5sQixxQkFBVyxPQU1rQjtBQUx0QyxxQ0FBcUM7QUFLdEIsMkZBTE4sbUJBQVUsT0FLTTtBQUh6QixNQUFNLElBQUksR0FBRyxpQkFBaUIsQ0FBQTtBQUdyQixvQkFBSTtBQUZiLE1BQU0sUUFBUSxHQUFHLHFCQUFNLENBQUMsSUFBSSxFQUFFLHFCQUFXLEVBQUUsQ0FBQyxDQUFBO0FBRUosNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBvc2UgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IG1ha2VFeGVjdXRlIH0gZnJvbSAnLi9hZGFwdGVyJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBOQU1FID0gJ0NJUkNVSVRfQlJFQUtFUidcbmNvbnN0IGhhbmRsZXJzID0gZXhwb3NlKE5BTUUsIG1ha2VFeGVjdXRlKCkpXG5cbmV4cG9ydCB7IE5BTUUsIG1ha2VDb25maWcsIG1ha2VFeGVjdXRlLCBoYW5kbGVycyB9XG4iXX0=