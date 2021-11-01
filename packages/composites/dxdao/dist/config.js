"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'DX_DAO';
const makeConfig = (prefix) => {
    return {
        ...ea_bootstrap_1.Requester.getDefaultConfig(prefix),
        rpcUrl: ea_bootstrap_1.util.getRequiredEnv('RPC_URL'),
        wethContractAddress: ea_bootstrap_1.util.getEnv('WETH_CONTRACT_ADDRESS') || '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
    };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBeUQ7QUFRNUMsUUFBQSxJQUFJLEdBQUcsUUFBUSxDQUFBO0FBRXJCLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBZSxFQUFVLEVBQUU7SUFDcEQsT0FBTztRQUNMLEdBQUcsd0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDckMsTUFBTSxFQUFFLG1CQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUN0QyxtQkFBbUIsRUFDakIsbUJBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBSSw0Q0FBNEM7S0FDdkYsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQVBZLFFBQUEsVUFBVSxjQU90QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgdXRpbCB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IHR5cGUgQ29uZmlnID0gdHlwZXMuQ29uZmlnICYge1xuICBycGNVcmw6IHN0cmluZ1xuICB3ZXRoQ29udHJhY3RBZGRyZXNzOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnRFhfREFPJ1xuXG5leHBvcnQgY29uc3QgbWFrZUNvbmZpZyA9IChwcmVmaXg/OiBzdHJpbmcpOiBDb25maWcgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLlJlcXVlc3Rlci5nZXREZWZhdWx0Q29uZmlnKHByZWZpeCksXG4gICAgcnBjVXJsOiB1dGlsLmdldFJlcXVpcmVkRW52KCdSUENfVVJMJyksXG4gICAgd2V0aENvbnRyYWN0QWRkcmVzczpcbiAgICAgIHV0aWwuZ2V0RW52KCdXRVRIX0NPTlRSQUNUX0FERFJFU1MnKSB8fCAnMHg2QTAyM0NDZDFmZjZGMjA0NUMzMzA5NzY4ZUFkOUU2OEY5NzhmNmUxJyxcbiAgfVxufVxuIl19