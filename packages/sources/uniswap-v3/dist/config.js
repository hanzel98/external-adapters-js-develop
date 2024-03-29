"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_QUOTER_CONTRACT = exports.DEFAULT_FEE_TIERS = exports.DEFAULT_BLOCKCHAIN_NETWORK = exports.DEFAULT_ENDPOINT = exports.ENV_FEE_TIERS = exports.ENV_QUOTER_CONTRACT = exports.ENV_BLOCKCHAIN_NETWORK = exports.ENV_RPC_URL = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ethers_1 = require("ethers");
exports.NAME = 'UNISWAP_V3';
exports.ENV_RPC_URL = 'RPC_URL';
exports.ENV_BLOCKCHAIN_NETWORK = 'BLOCKCHAIN_NETWORK';
exports.ENV_QUOTER_CONTRACT = 'QUOTER_CONTRACT';
exports.ENV_FEE_TIERS = 'DEFAULT_FEE_TIERS';
exports.DEFAULT_ENDPOINT = 'crypto';
exports.DEFAULT_BLOCKCHAIN_NETWORK = 'ethereum';
// https://docs.uniswap.org/protocol/concepts/V3-overview/fees#pool-fees-tiers
// LOW    MID    HIGH
// 0.05%  0.30%  1.00%
// 500    3000   10000
exports.DEFAULT_FEE_TIERS = '500,3000,10000'; //[500, 3_000, 10_000]
exports.DEFAULT_QUOTER_CONTRACT = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
const makeConfig = (prefix) => {
    let parsedFeeTiers = exports.DEFAULT_FEE_TIERS.split(',').map((f) => parseInt(f));
    if (ea_bootstrap_1.util.getEnv(exports.ENV_FEE_TIERS, prefix)) {
        parsedFeeTiers = ea_bootstrap_1.util
            .getEnv(exports.ENV_FEE_TIERS, prefix)
            .split(',')
            .map((f) => parseInt(f));
    }
    return {
        ...ea_bootstrap_1.Requester.getDefaultConfig(prefix),
        defaultEndpoint: exports.DEFAULT_ENDPOINT,
        provider: new ethers_1.ethers.providers.JsonRpcProvider(ea_bootstrap_1.util.getRequiredEnv(exports.ENV_RPC_URL, prefix)),
        network: ea_bootstrap_1.util.getEnv(exports.ENV_BLOCKCHAIN_NETWORK, prefix) || exports.DEFAULT_BLOCKCHAIN_NETWORK,
        uniswapQuoter: ea_bootstrap_1.util.getEnv(exports.ENV_QUOTER_CONTRACT, prefix) || exports.DEFAULT_QUOTER_CONTRACT,
        feeTiers: parsedFeeTiers,
    };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBeUQ7QUFFekQsbUNBQStCO0FBRWxCLFFBQUEsSUFBSSxHQUFHLFlBQVksQ0FBQTtBQUVuQixRQUFBLFdBQVcsR0FBRyxTQUFTLENBQUE7QUFDdkIsUUFBQSxzQkFBc0IsR0FBRyxvQkFBb0IsQ0FBQTtBQUM3QyxRQUFBLG1CQUFtQixHQUFHLGlCQUFpQixDQUFBO0FBQ3ZDLFFBQUEsYUFBYSxHQUFHLG1CQUFtQixDQUFBO0FBRW5DLFFBQUEsZ0JBQWdCLEdBQUcsUUFBUSxDQUFBO0FBQzNCLFFBQUEsMEJBQTBCLEdBQUcsVUFBVSxDQUFBO0FBRXBELDhFQUE4RTtBQUM5RSxxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLHNCQUFzQjtBQUNULFFBQUEsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUEsQ0FBQyxzQkFBc0I7QUFDM0QsUUFBQSx1QkFBdUIsR0FBRyw0Q0FBNEMsQ0FBQTtBQVM1RSxNQUFNLFVBQVUsR0FBMEIsQ0FBQyxNQUEwQixFQUFFLEVBQUU7SUFDOUUsSUFBSSxjQUFjLEdBQUcseUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDekUsSUFBSSxtQkFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBYSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ3RDLGNBQWMsR0FBRyxtQkFBSTthQUNsQixNQUFNLENBQUMscUJBQWEsRUFBRSxNQUFNLENBQUU7YUFDOUIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDM0I7SUFFRCxPQUFPO1FBQ0wsR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUNyQyxlQUFlLEVBQUUsd0JBQWdCO1FBQ2pDLFFBQVEsRUFBRSxJQUFJLGVBQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLG1CQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEYsT0FBTyxFQUFFLG1CQUFJLENBQUMsTUFBTSxDQUFDLDhCQUFzQixFQUFFLE1BQU0sQ0FBQyxJQUFJLGtDQUEwQjtRQUNsRixhQUFhLEVBQUUsbUJBQUksQ0FBQyxNQUFNLENBQUMsMkJBQW1CLEVBQUUsTUFBTSxDQUFDLElBQUksK0JBQXVCO1FBQ2xGLFFBQVEsRUFBRSxjQUFjO0tBQ3pCLENBQUE7QUFDSCxDQUFDLENBQUE7QUFqQlksUUFBQSxVQUFVLGNBaUJ0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgdXRpbCB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIGFzIEJhc2VDb25maWcsIENvbmZpZ0ZhY3RvcnkgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgZXRoZXJzIH0gZnJvbSAnZXRoZXJzJ1xuXG5leHBvcnQgY29uc3QgTkFNRSA9ICdVTklTV0FQX1YzJ1xuXG5leHBvcnQgY29uc3QgRU5WX1JQQ19VUkwgPSAnUlBDX1VSTCdcbmV4cG9ydCBjb25zdCBFTlZfQkxPQ0tDSEFJTl9ORVRXT1JLID0gJ0JMT0NLQ0hBSU5fTkVUV09SSydcbmV4cG9ydCBjb25zdCBFTlZfUVVPVEVSX0NPTlRSQUNUID0gJ1FVT1RFUl9DT05UUkFDVCdcbmV4cG9ydCBjb25zdCBFTlZfRkVFX1RJRVJTID0gJ0RFRkFVTFRfRkVFX1RJRVJTJ1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FTkRQT0lOVCA9ICdjcnlwdG8nXG5leHBvcnQgY29uc3QgREVGQVVMVF9CTE9DS0NIQUlOX05FVFdPUksgPSAnZXRoZXJldW0nXG5cbi8vIGh0dHBzOi8vZG9jcy51bmlzd2FwLm9yZy9wcm90b2NvbC9jb25jZXB0cy9WMy1vdmVydmlldy9mZWVzI3Bvb2wtZmVlcy10aWVyc1xuLy8gTE9XICAgIE1JRCAgICBISUdIXG4vLyAwLjA1JSAgMC4zMCUgIDEuMDAlXG4vLyA1MDAgICAgMzAwMCAgIDEwMDAwXG5leHBvcnQgY29uc3QgREVGQVVMVF9GRUVfVElFUlMgPSAnNTAwLDMwMDAsMTAwMDAnIC8vWzUwMCwgM18wMDAsIDEwXzAwMF1cbmV4cG9ydCBjb25zdCBERUZBVUxUX1FVT1RFUl9DT05UUkFDVCA9ICcweGIyNzMwOGY5RjkwRDYwNzQ2M2JiMzNlQTFCZUJiNDFDMjdDRTVBQjYnXG5cbmV4cG9ydCB0eXBlIENvbmZpZyA9IEJhc2VDb25maWcgJiB7XG4gIHByb3ZpZGVyOiBldGhlcnMucHJvdmlkZXJzLlByb3ZpZGVyXG4gIG5ldHdvcms6IHN0cmluZ1xuICB1bmlzd2FwUXVvdGVyOiBzdHJpbmdcbiAgZmVlVGllcnM6IG51bWJlcltdXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlQ29uZmlnOiBDb25maWdGYWN0b3J5PENvbmZpZz4gPSAocHJlZml4OiBzdHJpbmcgfCB1bmRlZmluZWQpID0+IHtcbiAgbGV0IHBhcnNlZEZlZVRpZXJzID0gREVGQVVMVF9GRUVfVElFUlMuc3BsaXQoJywnKS5tYXAoKGYpID0+IHBhcnNlSW50KGYpKVxuICBpZiAodXRpbC5nZXRFbnYoRU5WX0ZFRV9USUVSUywgcHJlZml4KSkge1xuICAgIHBhcnNlZEZlZVRpZXJzID0gdXRpbFxuICAgICAgLmdldEVudihFTlZfRkVFX1RJRVJTLCBwcmVmaXgpIVxuICAgICAgLnNwbGl0KCcsJylcbiAgICAgIC5tYXAoKGYpID0+IHBhcnNlSW50KGYpKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5SZXF1ZXN0ZXIuZ2V0RGVmYXVsdENvbmZpZyhwcmVmaXgpLFxuICAgIGRlZmF1bHRFbmRwb2ludDogREVGQVVMVF9FTkRQT0lOVCxcbiAgICBwcm92aWRlcjogbmV3IGV0aGVycy5wcm92aWRlcnMuSnNvblJwY1Byb3ZpZGVyKHV0aWwuZ2V0UmVxdWlyZWRFbnYoRU5WX1JQQ19VUkwsIHByZWZpeCkpLFxuICAgIG5ldHdvcms6IHV0aWwuZ2V0RW52KEVOVl9CTE9DS0NIQUlOX05FVFdPUkssIHByZWZpeCkgfHwgREVGQVVMVF9CTE9DS0NIQUlOX05FVFdPUkssXG4gICAgdW5pc3dhcFF1b3RlcjogdXRpbC5nZXRFbnYoRU5WX1FVT1RFUl9DT05UUkFDVCwgcHJlZml4KSB8fCBERUZBVUxUX1FVT1RFUl9DT05UUkFDVCxcbiAgICBmZWVUaWVyczogcGFyc2VkRmVlVGllcnMsXG4gIH1cbn1cbiJdfQ==