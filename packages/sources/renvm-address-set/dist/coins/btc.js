"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p2pkh = exports.getNetwork = void 0;
const tslib_1 = require("tslib");
const bitcoin = tslib_1.__importStar(require("bitcoinjs-lib"));
const getNetwork = (network) => {
    switch (network) {
        case 'mainnet':
            return bitcoin.networks.bitcoin;
        case 'testnet':
            return bitcoin.networks.testnet;
        default:
            return;
    }
};
exports.getNetwork = getNetwork;
const p2pkh = (pubkey, network) => bitcoin.payments.p2pkh({ pubkey, network });
exports.p2pkh = p2pkh;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnRjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvaW5zL2J0Yy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0RBQXdDO0FBRWpDLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBZSxFQUF3QyxFQUFFO0lBQ2xGLFFBQVEsT0FBTyxFQUFFO1FBQ2YsS0FBSyxTQUFTO1lBQ1osT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQTtRQUNqQyxLQUFLLFNBQVM7WUFDWixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFBO1FBQ2pDO1lBQ0UsT0FBTTtLQUNUO0FBQ0gsQ0FBQyxDQUFBO0FBVFksUUFBQSxVQUFVLGNBU3RCO0FBRU0sTUFBTSxLQUFLLEdBQUcsQ0FDbkIsTUFBYyxFQUNkLE9BQWlDLEVBQ1AsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7QUFIN0QsUUFBQSxLQUFLLFNBR3dEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYml0Y29pbiBmcm9tICdiaXRjb2luanMtbGliJ1xuXG5leHBvcnQgY29uc3QgZ2V0TmV0d29yayA9IChuZXR3b3JrOiBzdHJpbmcpOiBiaXRjb2luLm5ldHdvcmtzLk5ldHdvcmsgfCB1bmRlZmluZWQgPT4ge1xuICBzd2l0Y2ggKG5ldHdvcmspIHtcbiAgICBjYXNlICdtYWlubmV0JzpcbiAgICAgIHJldHVybiBiaXRjb2luLm5ldHdvcmtzLmJpdGNvaW5cbiAgICBjYXNlICd0ZXN0bmV0JzpcbiAgICAgIHJldHVybiBiaXRjb2luLm5ldHdvcmtzLnRlc3RuZXRcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHAycGtoID0gKFxuICBwdWJrZXk6IEJ1ZmZlcixcbiAgbmV0d29yazogYml0Y29pbi5uZXR3b3Jrcy5OZXR3b3JrLFxuKTogYml0Y29pbi5wYXltZW50cy5QYXltZW50ID0+IGJpdGNvaW4ucGF5bWVudHMucDJwa2goeyBwdWJrZXksIG5ldHdvcmsgfSlcbiJdfQ==