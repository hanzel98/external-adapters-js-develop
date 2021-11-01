"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ta = tslib_1.__importStar(require("@chainlink/token-allocation-adapter"));
const makeConfig = (prefix = '') => {
    return {
        api: {},
        defaultNetwork: ea_bootstrap_1.util.getEnv('DEFAULT_NETWORK') || 'mainnet',
        taConfig: ta.makeConfig(prefix),
    };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQThDO0FBQzlDLGdGQUF5RDtBQVFsRCxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQVUsRUFBRTtJQUNoRCxPQUFPO1FBQ0wsR0FBRyxFQUFFLEVBQUU7UUFDUCxjQUFjLEVBQUUsbUJBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxTQUFTO1FBQzNELFFBQVEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztLQUNoQyxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBTlksUUFBQSxVQUFVLGNBTXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbCB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0ICogYXMgdGEgZnJvbSAnQGNoYWlubGluay90b2tlbi1hbGxvY2F0aW9uLWFkYXB0ZXInXG5pbXBvcnQgeyBDb25maWcgYXMgQmFzZUNvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIGV4dGVuZHMgQmFzZUNvbmZpZyB7XG4gIGRlZmF1bHROZXR3b3JrOiBzdHJpbmdcbiAgdGFDb25maWc6IHRhLnR5cGVzLkNvbmZpZ1xufVxuXG5leHBvcnQgY29uc3QgbWFrZUNvbmZpZyA9IChwcmVmaXggPSAnJyk6IENvbmZpZyA9PiB7XG4gIHJldHVybiB7XG4gICAgYXBpOiB7fSxcbiAgICBkZWZhdWx0TmV0d29yazogdXRpbC5nZXRFbnYoJ0RFRkFVTFRfTkVUV09SSycpIHx8ICdtYWlubmV0JyxcbiAgICB0YUNvbmZpZzogdGEubWFrZUNvbmZpZyhwcmVmaXgpLFxuICB9XG59XG4iXX0=