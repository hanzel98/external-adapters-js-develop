"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_NETWORK = void 0;
const tslib_1 = require("tslib");
const ea_1 = tslib_1.__importDefault(require("@chainlink/ea"));
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.DEFAULT_NETWORK = 'ETHEREUM';
const makeConfig = (prefix = '') => {
    const sources = {};
    for (const a of ea_1.default.sources) {
        const url = ea_bootstrap_1.util.getURL(a.toUpperCase());
        if (url) {
            const defaultConfig = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
            defaultConfig.api.baseURL = url;
            defaultConfig.api.method = 'post';
            sources[a.toLowerCase()] = defaultConfig;
        }
    }
    return {
        sources,
    };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0RBQWlDO0FBQ2pDLDBEQUF5RDtBQUc1QyxRQUFBLGVBQWUsR0FBRyxVQUFVLENBQUE7QUFNbEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFVLEVBQUU7SUFDaEQsTUFBTSxPQUFPLEdBQXNDLEVBQUUsQ0FBQTtJQUNyRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLFlBQUssQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxHQUFHLEdBQUcsbUJBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFDeEMsSUFBSSxHQUFHLEVBQUU7WUFDUCxNQUFNLGFBQWEsR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3hELGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtZQUMvQixhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7WUFDakMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQTtTQUN6QztLQUNGO0lBRUQsT0FBTztRQUNMLE9BQU87S0FDUixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBZlksUUFBQSxVQUFVLGNBZXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxlZ29zIGZyb20gJ0BjaGFpbmxpbmsvZWEnXG5pbXBvcnQgeyBSZXF1ZXN0ZXIsIHV0aWwgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IENvbmZpZyBhcyBEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTkVUV09SSyA9ICdFVEhFUkVVTSdcblxuZXhwb3J0IHR5cGUgQ29uZmlnID0ge1xuICBzb3VyY2VzOiB7IFtuYW1lOiBzdHJpbmddOiBEZWZhdWx0Q29uZmlnIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4ID0gJycpOiBDb25maWcgPT4ge1xuICBjb25zdCBzb3VyY2VzOiB7IFtuYW1lOiBzdHJpbmddOiBEZWZhdWx0Q29uZmlnIH0gPSB7fVxuICBmb3IgKGNvbnN0IGEgb2YgbGVnb3Muc291cmNlcykge1xuICAgIGNvbnN0IHVybCA9IHV0aWwuZ2V0VVJMKGEudG9VcHBlckNhc2UoKSlcbiAgICBpZiAodXJsKSB7XG4gICAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gUmVxdWVzdGVyLmdldERlZmF1bHRDb25maWcocHJlZml4KVxuICAgICAgZGVmYXVsdENvbmZpZy5hcGkuYmFzZVVSTCA9IHVybFxuICAgICAgZGVmYXVsdENvbmZpZy5hcGkubWV0aG9kID0gJ3Bvc3QnXG4gICAgICBzb3VyY2VzW2EudG9Mb3dlckNhc2UoKV0gPSBkZWZhdWx0Q29uZmlnXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzb3VyY2VzLFxuICB9XG59XG4iXX0=