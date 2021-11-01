"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_BASE_URL = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'ONCHAIN';
exports.DEFAULT_BASE_URL = 'https://api.onchain.com.au/api/';
const makeConfig = (prefix) => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix, true);
    config.api.baseURL = config.api.baseURL || exports.DEFAULT_BASE_URL;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsU0FBUyxDQUFBO0FBRWhCLFFBQUEsZ0JBQWdCLEdBQUcsaUNBQWlDLENBQUE7QUFFMUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFlLEVBQVUsRUFBRTtJQUNwRCxNQUFNLE1BQU0sR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN2RCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSx3QkFBZ0IsQ0FBQTtJQUMzRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQUpZLFFBQUEsVUFBVSxjQUl0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnT05DSEFJTidcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQkFTRV9VUkwgPSAnaHR0cHM6Ly9hcGkub25jaGFpbi5jb20uYXUvYXBpLydcblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4Pzogc3RyaW5nKTogQ29uZmlnID0+IHtcbiAgY29uc3QgY29uZmlnID0gUmVxdWVzdGVyLmdldERlZmF1bHRDb25maWcocHJlZml4LCB0cnVlKVxuICBjb25maWcuYXBpLmJhc2VVUkwgPSBjb25maWcuYXBpLmJhc2VVUkwgfHwgREVGQVVMVF9CQVNFX1VSTFxuICByZXR1cm4gY29uZmlnXG59XG4iXX0=