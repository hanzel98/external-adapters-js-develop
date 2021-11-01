"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.NAME = void 0;
const tslib_1 = require("tslib");
const dns_query_adapter_1 = tslib_1.__importDefault(require("@chainlink/dns-query-adapter"));
exports.NAME = 'DNS_RECORD_CHECK';
const makeConfig = () => {
    return dns_query_adapter_1.default.makeConfig();
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNkZBQThDO0FBR2pDLFFBQUEsSUFBSSxHQUFHLGtCQUFrQixDQUFBO0FBRS9CLE1BQU0sVUFBVSxHQUFHLEdBQVcsRUFBRTtJQUNyQyxPQUFPLDJCQUFHLENBQUMsVUFBVSxFQUFFLENBQUE7QUFDekIsQ0FBQyxDQUFBO0FBRlksUUFBQSxVQUFVLGNBRXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEROUyBmcm9tICdAY2hhaW5saW5rL2Rucy1xdWVyeS1hZGFwdGVyJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnRE5TX1JFQ09SRF9DSEVDSydcblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAoKTogQ29uZmlnID0+IHtcbiAgcmV0dXJuIEROUy5tYWtlQ29uZmlnKClcbn1cbiJdfQ==