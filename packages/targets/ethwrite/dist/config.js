"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_ENDPOINT = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.DEFAULT_ENDPOINT = 'txsend';
const makeConfig = () => {
    return {
        api: {},
        rpcUrl: ea_bootstrap_1.util.getRequiredEnv('RPC_URL'),
        network: ea_bootstrap_1.util.getEnv('NETWORK') || 'mainnet',
        privateKey: ea_bootstrap_1.util.getRequiredEnv('PRIVATE_KEY'),
    };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEM7QUFTakMsUUFBQSxnQkFBZ0IsR0FBRyxRQUFRLENBQUE7QUFFakMsTUFBTSxVQUFVLEdBQUcsR0FBVyxFQUFFO0lBQ3JDLE9BQU87UUFDTCxHQUFHLEVBQUUsRUFBRTtRQUNQLE1BQU0sRUFBRSxtQkFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFDdEMsT0FBTyxFQUFFLG1CQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVM7UUFDNUMsVUFBVSxFQUFFLG1CQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztLQUMvQyxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBUFksUUFBQSxVQUFVLGNBT3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbCB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuXG5leHBvcnQgdHlwZSBDb25maWcgPSB7XG4gIHJwY1VybDogc3RyaW5nXG4gIG5ldHdvcms/OiBzdHJpbmdcbiAgcHJpdmF0ZUtleTogc3RyaW5nXG4gIGFwaTogYW55XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VORFBPSU5UID0gJ3R4c2VuZCdcblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAoKTogQ29uZmlnID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhcGk6IHt9LFxuICAgIHJwY1VybDogdXRpbC5nZXRSZXF1aXJlZEVudignUlBDX1VSTCcpLFxuICAgIG5ldHdvcms6IHV0aWwuZ2V0RW52KCdORVRXT1JLJykgfHwgJ21haW5uZXQnLFxuICAgIHByaXZhdGVLZXk6IHV0aWwuZ2V0UmVxdWlyZWRFbnYoJ1BSSVZBVEVfS0VZJyksXG4gIH1cbn1cbiJdfQ==