"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'DEFI_PULSE';
const makeConfig = (network = 'mainnet') => {
    return {
        rpcUrl: ea_bootstrap_1.util.getRequiredEnv('RPC_URL'),
        network,
    };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEM7QUFFakMsUUFBQSxJQUFJLEdBQUcsWUFBWSxDQUFBO0FBT3pCLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBTyxHQUFHLFNBQVMsRUFBVSxFQUFFO0lBQ3hELE9BQU87UUFDTCxNQUFNLEVBQUUsbUJBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQ3RDLE9BQU87S0FDUixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBTFksUUFBQSxVQUFVLGNBS3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbCB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuXG5leHBvcnQgY29uc3QgTkFNRSA9ICdERUZJX1BVTFNFJ1xuXG5leHBvcnQgdHlwZSBDb25maWcgPSB7XG4gIHJwY1VybDogc3RyaW5nXG4gIG5ldHdvcms6IHN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgbWFrZUNvbmZpZyA9IChuZXR3b3JrID0gJ21haW5uZXQnKTogQ29uZmlnID0+IHtcbiAgcmV0dXJuIHtcbiAgICBycGNVcmw6IHV0aWwuZ2V0UmVxdWlyZWRFbnYoJ1JQQ19VUkwnKSxcbiAgICBuZXR3b3JrLFxuICB9XG59XG4iXX0=