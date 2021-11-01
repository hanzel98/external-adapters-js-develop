"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../../config");
const types_1 = require("../../types");
const ea_reference_data_reader_1 = require("@chainlink/ea-reference-data-reader");
exports.NAME = 'price';
const customParams = {
    baseCoinTicker: ['baseCoinTicker', 'base', 'from', 'coin'],
    quoteCoinTicker: ['quoteCoinTicker', 'quote', 'to', 'market'],
    dex: true,
    intermediaryToken: false,
    referenceContract: false,
    referenceContractDivisor: false,
    theGraphQuote: false,
    network: false,
};
const execute = async (input, _, config) => {
    const validator = new ea_bootstrap_1.Validator(input, customParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const { baseCoinTicker, quoteCoinTicker, dex, referenceContract, referenceContractDivisor, referenceModifierAction = types_1.ReferenceModifierAction.MULTIPLY, intermediaryToken = config_1.WETH, theGraphQuote, network, } = validator.validated.data;
    if (!theGraphQuote && !quoteCoinTicker) {
        throw new Error('quoteCoinTicker cannot be empty if theGraphQuote not supplied');
    }
    const dexToUpperCase = dex.toUpperCase();
    const dexSubgraph = config.dexSubgraphs[dexToUpperCase];
    if (!dexSubgraph) {
        throw new Error(`${dex} is currently not supported`);
    }
    const inputParams = {
        jobRunID,
        baseCoinTicker: baseCoinTicker.toUpperCase(),
        quoteCoinTicker: theGraphQuote ? theGraphQuote.toUpperCase() : quoteCoinTicker.toUpperCase(),
        dex: dexToUpperCase,
        referenceContract,
        referenceContractDivisor,
        referenceModifierAction: referenceModifierAction.toUpperCase(),
        intermediaryToken: intermediaryToken.toUpperCase(),
        network: network || config_1.DEFAULT_NETWORK,
    };
    if (baseCoinTicker === quoteCoinTicker) {
        throw new Error('Base and Quote coins must be different');
    }
    ea_bootstrap_1.Logger.info(`Fetching quote for ${quoteCoinTicker}/${baseCoinTicker} pair from ${dex}`);
    let price;
    try {
        price = await getQuotePrice(inputParams, dexSubgraph);
    }
    catch (e) {
        throw new Error(`Failed to get price.  Reason "${e}"`);
    }
    return ea_bootstrap_1.Requester.success(jobRunID, {
        status: 200,
        data: {
            result: price,
        },
    }, true);
};
exports.execute = execute;
const getQuotePrice = async (inputParams, dexSubgraph) => {
    const { jobRunID, baseCoinTicker, quoteCoinTicker, referenceContract } = inputParams;
    const token0 = await dexSubgraph.getToken(jobRunID, baseCoinTicker);
    const token1 = await dexSubgraph.getToken(jobRunID, quoteCoinTicker);
    let token1PerToken0 = await dexSubgraph.getTokenPairPrice(jobRunID, token0.id, token1.id);
    if (!token1PerToken0) {
        token1PerToken0 = await getPriceThroughCommonPair(inputParams, dexSubgraph, token0.id, token1.id);
    }
    ea_bootstrap_1.Logger.info(`Price of ${quoteCoinTicker}/${baseCoinTicker} is ${token1PerToken0}`);
    if (referenceContract) {
        token1PerToken0 = await modifyResultByFeedResult(inputParams, token1PerToken0);
    }
    return token1PerToken0;
};
const getPriceThroughCommonPair = async (inputParams, dexSubgraph, token0ID, token1ID) => {
    const { jobRunID, baseCoinTicker, quoteCoinTicker, intermediaryToken: intermediaryTokenTicker, } = inputParams;
    ea_bootstrap_1.Logger.info(`${quoteCoinTicker}/${baseCoinTicker} pair does not exist.  Determining price using intermediary token ${intermediaryTokenTicker}`);
    const intermediaryToken = await dexSubgraph.getToken(jobRunID, intermediaryTokenTicker);
    const refTokenPerToken0 = await dexSubgraph.getTokenPairPrice(jobRunID, token0ID, intermediaryToken.id);
    const refTokenPerToken1 = await dexSubgraph.getTokenPairPrice(jobRunID, token1ID, intermediaryToken.id);
    validateTokenPrices(refTokenPerToken0, refTokenPerToken1, baseCoinTicker, quoteCoinTicker);
    return refTokenPerToken0 / refTokenPerToken1;
};
const validateTokenPrices = (priceOne, priceTwo, priceOneTicker, priceTwoTicker) => {
    if (!priceOne || !priceTwo) {
        if (!priceOne) {
            throw new Error(`Failed to get price because we could not determine the price of ${priceOneTicker}`);
        }
        if (!priceTwo) {
            throw new Error(`Failed to get price because we could not determine the price of ${priceTwoTicker}`);
        }
    }
};
const modifyResultByFeedResult = async (inputParams, currentPrice) => {
    const { baseCoinTicker, quoteCoinTicker, referenceContract, referenceContractDivisor, referenceModifierAction, network, } = inputParams;
    ea_bootstrap_1.Logger.info(`Price of ${quoteCoinTicker}/${baseCoinTicker} is going to be modified by the result returned from ${referenceContract} by ${referenceContractDivisor}`);
    const modifierTokenPrice = await ea_reference_data_reader_1.getLatestAnswer(network, referenceContract, referenceContractDivisor);
    ea_bootstrap_1.Logger.info(`Feed ${referenceContract} returned a value of ${modifierTokenPrice}`);
    if (referenceModifierAction === types_1.ReferenceModifierAction.DIVIDE) {
        return currentPrice / modifierTokenPrice;
    }
    return currentPrice * modifierTokenPrice;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21ldGhvZHMvcHJpY2VzL3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBc0U7QUFDdEUseUNBQTREO0FBRTVELHVDQUF1RjtBQUN2RixrRkFBcUU7QUFFeEQsUUFBQSxJQUFJLEdBQUcsT0FBTyxDQUFBO0FBRTNCLE1BQU0sWUFBWSxHQUFHO0lBQ25CLGNBQWMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQzFELGVBQWUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDO0lBQzdELEdBQUcsRUFBRSxJQUFJO0lBQ1QsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLHdCQUF3QixFQUFFLEtBQUs7SUFDL0IsYUFBYSxFQUFFLEtBQUs7SUFDcEIsT0FBTyxFQUFFLEtBQUs7Q0FDZixDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzNFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDcEQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUMxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLEVBQ0osY0FBYyxFQUNkLGVBQWUsRUFDZixHQUFHLEVBQ0gsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4Qix1QkFBdUIsR0FBRywrQkFBdUIsQ0FBQyxRQUFRLEVBQzFELGlCQUFpQixHQUFHLGFBQUksRUFDeEIsYUFBYSxFQUNiLE9BQU8sR0FDUixHQUFHLFNBQVMsQ0FBQyxTQUFT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RUFBbUUsY0FBYyxFQUFFLENBQ3BGLENBQUE7U0FDRjtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSx3QkFBd0IsR0FBRyxLQUFLLEVBQ3BDLFdBQWdDLEVBQ2hDLFlBQW9CLEVBQ0gsRUFBRTtJQUNuQixNQUFNLEVBQ0osY0FBYyxFQUNkLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUN2QixPQUFPLEdBQ1IsR0FBRyxXQUFXLENBQUE7SUFDZixxQkFBTSxDQUFDLElBQUksQ0FDVCxZQUFZLGVBQWUsSUFBSSxjQUFjLHdEQUF3RCxpQkFBaUIsT0FBTyx3QkFBd0IsRUFBRSxDQUN4SixDQUFBO0lBQ0QsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLDBDQUFlLENBQzlDLE9BQU8sRUFDUCxpQkFBaUIsRUFDakIsd0JBQXdCLENBQ3pCLENBQUE7SUFDRCxxQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLGlCQUFpQix3QkFBd0Isa0JBQWtCLEVBQUUsQ0FBQyxDQUFBO0lBQ2xGLElBQUksdUJBQXVCLEtBQUssK0JBQXVCLENBQUMsTUFBTSxFQUFFO1FBQzlELE9BQU8sWUFBWSxHQUFHLGtCQUFrQixDQUFBO0tBQ3pDO0lBQ0QsT0FBTyxZQUFZLEdBQUcsa0JBQWtCLENBQUE7QUFDMUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFsaWRhdG9yLCBSZXF1ZXN0ZXIsIExvZ2dlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnLCBXRVRILCBERUZBVUxUX05FVFdPUksgfSBmcm9tICcuLi8uLi9jb25maWcnXG5pbXBvcnQgeyBFeGVjdXRlV2l0aENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBEZXhTdWJncmFwaCwgRGV4UXVlcnlJbnB1dFBhcmFtcywgUmVmZXJlbmNlTW9kaWZpZXJBY3Rpb24gfSBmcm9tICcuLi8uLi90eXBlcydcbmltcG9ydCB7IGdldExhdGVzdEFuc3dlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtcmVmZXJlbmNlLWRhdGEtcmVhZGVyJ1xuXG5leHBvcnQgY29uc3QgTkFNRSA9ICdwcmljZSdcblxuY29uc3QgY3VzdG9tUGFyYW1zID0ge1xuICBiYXNlQ29pblRpY2tlcjogWydiYXNlQ29pblRpY2tlcicsICdiYXNlJywgJ2Zyb20nLCAnY29pbiddLFxuICBxdW90ZUNvaW5UaWNrZXI6IFsncXVvdGVDb2luVGlja2VyJywgJ3F1b3RlJywgJ3RvJywgJ21hcmtldCddLFxuICBkZXg6IHRydWUsXG4gIGludGVybWVkaWFyeVRva2VuOiBmYWxzZSxcbiAgcmVmZXJlbmNlQ29udHJhY3Q6IGZhbHNlLFxuICByZWZlcmVuY2VDb250cmFjdERpdmlzb3I6IGZhbHNlLFxuICB0aGVHcmFwaFF1b3RlOiBmYWxzZSxcbiAgbmV0d29yazogZmFsc2UsXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKGlucHV0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihpbnB1dCwgY3VzdG9tUGFyYW1zKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG4gIGNvbnN0IHtcbiAgICBiYXNlQ29pblRpY2tlcixcbiAgICBxdW90ZUNvaW5UaWNrZXIsXG4gICAgZGV4LFxuICAgIHJlZmVyZW5jZUNvbnRyYWN0LFxuICAgIHJlZmVyZW5jZUNvbnRyYWN0RGl2aXNvcixcbiAgICByZWZlcmVuY2VNb2RpZmllckFjdGlvbiA9IFJlZmVyZW5jZU1vZGlmaWVyQWN0aW9uLk1VTFRJUExZLFxuICAgIGludGVybWVkaWFyeVRva2VuID0gV0VUSCxcbiAgICB0aGVHcmFwaFF1b3RlLFxuICAgIG5ldHdvcmssXG4gIH0gPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGFcbiAgaWYgKCF0aGVHcmFwaFF1b3RlICYmICFxdW90ZUNvaW5UaWNrZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3F1b3RlQ29pblRpY2tlciBjYW5ub3QgYmUgZW1wdHkgaWYgdGhlR3JhcGhRdW90ZSBub3Qgc3VwcGxpZWQnKVxuICB9XG4gIGNvbnN0IGRleFRvVXBwZXJDYXNlID0gZGV4LnRvVXBwZXJDYXNlKClcbiAgY29uc3QgZGV4U3ViZ3JhcGggPSBjb25maWcuZGV4U3ViZ3JhcGhzW2RleFRvVXBwZXJDYXNlXVxuICBpZiAoIWRleFN1YmdyYXBoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke2RleH0gaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRgKVxuICB9XG4gIGNvbnN0IGlucHV0UGFyYW1zOiBEZXhRdWVyeUlucHV0UGFyYW1zID0ge1xuICAgIGpvYlJ1bklELFxuICAgIGJhc2VDb2luVGlja2VyOiBiYXNlQ29pblRpY2tlci50b1VwcGVyQ2FzZSgpLFxuICAgIHF1b3RlQ29pblRpY2tlcjogdGhlR3JhcGhRdW90ZSA/IHRoZUdyYXBoUXVvdGUudG9VcHBlckNhc2UoKSA6IHF1b3RlQ29pblRpY2tlci50b1VwcGVyQ2FzZSgpLFxuICAgIGRleDogZGV4VG9VcHBlckNhc2UsXG4gICAgcmVmZXJlbmNlQ29udHJhY3QsXG4gICAgcmVmZXJlbmNlQ29udHJhY3REaXZpc29yLFxuICAgIHJlZmVyZW5jZU1vZGlmaWVyQWN0aW9uOiByZWZlcmVuY2VNb2RpZmllckFjdGlvbi50b1VwcGVyQ2FzZSgpIGFzIFJlZmVyZW5jZU1vZGlmaWVyQWN0aW9uLFxuICAgIGludGVybWVkaWFyeVRva2VuOiBpbnRlcm1lZGlhcnlUb2tlbi50b1VwcGVyQ2FzZSgpLFxuICAgIG5ldHdvcms6IG5ldHdvcmsgfHwgREVGQVVMVF9ORVRXT1JLLFxuICB9XG4gIGlmIChiYXNlQ29pblRpY2tlciA9PT0gcXVvdGVDb2luVGlja2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCYXNlIGFuZCBRdW90ZSBjb2lucyBtdXN0IGJlIGRpZmZlcmVudCcpXG4gIH1cbiAgTG9nZ2VyLmluZm8oYEZldGNoaW5nIHF1b3RlIGZvciAke3F1b3RlQ29pblRpY2tlcn0vJHtiYXNlQ29pblRpY2tlcn0gcGFpciBmcm9tICR7ZGV4fWApXG4gIGxldCBwcmljZVxuICB0cnkge1xuICAgIHByaWNlID0gYXdhaXQgZ2V0UXVvdGVQcmljZShpbnB1dFBhcmFtcywgZGV4U3ViZ3JhcGgpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBnZXQgcHJpY2UuICBSZWFzb24gXCIke2V9XCJgKVxuICB9XG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2VzcyhcbiAgICBqb2JSdW5JRCxcbiAgICB7XG4gICAgICBzdGF0dXM6IDIwMCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcmVzdWx0OiBwcmljZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB0cnVlLFxuICApXG59XG5cbmNvbnN0IGdldFF1b3RlUHJpY2UgPSBhc3luYyAoXG4gIGlucHV0UGFyYW1zOiBEZXhRdWVyeUlucHV0UGFyYW1zLFxuICBkZXhTdWJncmFwaDogRGV4U3ViZ3JhcGgsXG4pOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICBjb25zdCB7IGpvYlJ1bklELCBiYXNlQ29pblRpY2tlciwgcXVvdGVDb2luVGlja2VyLCByZWZlcmVuY2VDb250cmFjdCB9ID0gaW5wdXRQYXJhbXNcbiAgY29uc3QgdG9rZW4wID0gYXdhaXQgZGV4U3ViZ3JhcGguZ2V0VG9rZW4oam9iUnVuSUQsIGJhc2VDb2luVGlja2VyKVxuICBjb25zdCB0b2tlbjEgPSBhd2FpdCBkZXhTdWJncmFwaC5nZXRUb2tlbihqb2JSdW5JRCwgcXVvdGVDb2luVGlja2VyKVxuICBsZXQgdG9rZW4xUGVyVG9rZW4wID0gYXdhaXQgZGV4U3ViZ3JhcGguZ2V0VG9rZW5QYWlyUHJpY2Uoam9iUnVuSUQsIHRva2VuMC5pZCwgdG9rZW4xLmlkKVxuICBpZiAoIXRva2VuMVBlclRva2VuMCkge1xuICAgIHRva2VuMVBlclRva2VuMCA9IGF3YWl0IGdldFByaWNlVGhyb3VnaENvbW1vblBhaXIoXG4gICAgICBpbnB1dFBhcmFtcyxcbiAgICAgIGRleFN1YmdyYXBoLFxuICAgICAgdG9rZW4wLmlkLFxuICAgICAgdG9rZW4xLmlkLFxuICAgIClcbiAgfVxuICBMb2dnZXIuaW5mbyhgUHJpY2Ugb2YgJHtxdW90ZUNvaW5UaWNrZXJ9LyR7YmFzZUNvaW5UaWNrZXJ9IGlzICR7dG9rZW4xUGVyVG9rZW4wfWApXG4gIGlmIChyZWZlcmVuY2VDb250cmFjdCkge1xuICAgIHRva2VuMVBlclRva2VuMCA9IGF3YWl0IG1vZGlmeVJlc3VsdEJ5RmVlZFJlc3VsdChpbnB1dFBhcmFtcywgdG9rZW4xUGVyVG9rZW4wKVxuICB9XG4gIHJldHVybiB0b2tlbjFQZXJUb2tlbjBcbn1cblxuY29uc3QgZ2V0UHJpY2VUaHJvdWdoQ29tbW9uUGFpciA9IGFzeW5jIChcbiAgaW5wdXRQYXJhbXM6IERleFF1ZXJ5SW5wdXRQYXJhbXMsXG4gIGRleFN1YmdyYXBoOiBEZXhTdWJncmFwaCxcbiAgdG9rZW4wSUQ6IHN0cmluZyxcbiAgdG9rZW4xSUQ6IHN0cmluZyxcbik6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gIGNvbnN0IHtcbiAgICBqb2JSdW5JRCxcbiAgICBiYXNlQ29pblRpY2tlcixcbiAgICBxdW90ZUNvaW5UaWNrZXIsXG4gICAgaW50ZXJtZWRpYXJ5VG9rZW46IGludGVybWVkaWFyeVRva2VuVGlja2VyLFxuICB9ID0gaW5wdXRQYXJhbXNcbiAgTG9nZ2VyLmluZm8oXG4gICAgYCR7cXVvdGVDb2luVGlja2VyfS8ke2Jhc2VDb2luVGlja2VyfSBwYWlyIGRvZXMgbm90IGV4aXN0LiAgRGV0ZXJtaW5pbmcgcHJpY2UgdXNpbmcgaW50ZXJtZWRpYXJ5IHRva2VuICR7aW50ZXJtZWRpYXJ5VG9rZW5UaWNrZXJ9YCxcbiAgKVxuICBjb25zdCBpbnRlcm1lZGlhcnlUb2tlbiA9IGF3YWl0IGRleFN1YmdyYXBoLmdldFRva2VuKGpvYlJ1bklELCBpbnRlcm1lZGlhcnlUb2tlblRpY2tlcilcbiAgY29uc3QgcmVmVG9rZW5QZXJUb2tlbjAgPSBhd2FpdCBkZXhTdWJncmFwaC5nZXRUb2tlblBhaXJQcmljZShcbiAgICBqb2JSdW5JRCxcbiAgICB0b2tlbjBJRCxcbiAgICBpbnRlcm1lZGlhcnlUb2tlbi5pZCxcbiAgKVxuICBjb25zdCByZWZUb2tlblBlclRva2VuMSA9IGF3YWl0IGRleFN1YmdyYXBoLmdldFRva2VuUGFpclByaWNlKFxuICAgIGpvYlJ1bklELFxuICAgIHRva2VuMUlELFxuICAgIGludGVybWVkaWFyeVRva2VuLmlkLFxuICApXG4gIHZhbGlkYXRlVG9rZW5QcmljZXMocmVmVG9rZW5QZXJUb2tlbjAsIHJlZlRva2VuUGVyVG9rZW4xLCBiYXNlQ29pblRpY2tlciwgcXVvdGVDb2luVGlja2VyKVxuICByZXR1cm4gKHJlZlRva2VuUGVyVG9rZW4wIGFzIG51bWJlcikgLyAocmVmVG9rZW5QZXJUb2tlbjEgYXMgbnVtYmVyKVxufVxuXG5jb25zdCB2YWxpZGF0ZVRva2VuUHJpY2VzID0gKFxuICBwcmljZU9uZTogbnVtYmVyIHwgbnVsbCxcbiAgcHJpY2VUd286IG51bWJlciB8IG51bGwsXG4gIHByaWNlT25lVGlja2VyOiBzdHJpbmcsXG4gIHByaWNlVHdvVGlja2VyOiBzdHJpbmcsXG4pID0+IHtcbiAgaWYgKCFwcmljZU9uZSB8fCAhcHJpY2VUd28pIHtcbiAgICBpZiAoIXByaWNlT25lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBGYWlsZWQgdG8gZ2V0IHByaWNlIGJlY2F1c2Ugd2UgY291bGQgbm90IGRldGVybWluZSB0aGUgcHJpY2Ugb2YgJHtwcmljZU9uZVRpY2tlcn1gLFxuICAgICAgKVxuICAgIH1cbiAgICBpZiAoIXByaWNlVHdvKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBGYWlsZWQgdG8gZ2V0IHByaWNlIGJlY2F1c2Ugd2UgY291bGQgbm90IGRldGVybWluZSB0aGUgcHJpY2Ugb2YgJHtwcmljZVR3b1RpY2tlcn1gLFxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBtb2RpZnlSZXN1bHRCeUZlZWRSZXN1bHQgPSBhc3luYyAoXG4gIGlucHV0UGFyYW1zOiBEZXhRdWVyeUlucHV0UGFyYW1zLFxuICBjdXJyZW50UHJpY2U6IG51bWJlcixcbik6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gIGNvbnN0IHtcbiAgICBiYXNlQ29pblRpY2tlcixcbiAgICBxdW90ZUNvaW5UaWNrZXIsXG4gICAgcmVmZXJlbmNlQ29udHJhY3QsXG4gICAgcmVmZXJlbmNlQ29udHJhY3REaXZpc29yLFxuICAgIHJlZmVyZW5jZU1vZGlmaWVyQWN0aW9uLFxuICAgIG5ldHdvcmssXG4gIH0gPSBpbnB1dFBhcmFtc1xuICBMb2dnZXIuaW5mbyhcbiAgICBgUHJpY2Ugb2YgJHtxdW90ZUNvaW5UaWNrZXJ9LyR7YmFzZUNvaW5UaWNrZXJ9IGlzIGdvaW5nIHRvIGJlIG1vZGlmaWVkIGJ5IHRoZSByZXN1bHQgcmV0dXJuZWQgZnJvbSAke3JlZmVyZW5jZUNvbnRyYWN0fSBieSAke3JlZmVyZW5jZUNvbnRyYWN0RGl2aXNvcn1gLFxuICApXG4gIGNvbnN0IG1vZGlmaWVyVG9rZW5QcmljZSA9IGF3YWl0IGdldExhdGVzdEFuc3dlcihcbiAgICBuZXR3b3JrLFxuICAgIHJlZmVyZW5jZUNvbnRyYWN0LFxuICAgIHJlZmVyZW5jZUNvbnRyYWN0RGl2aXNvcixcbiAgKVxuICBMb2dnZXIuaW5mbyhgRmVlZCAke3JlZmVyZW5jZUNvbnRyYWN0fSByZXR1cm5lZCBhIHZhbHVlIG9mICR7bW9kaWZpZXJUb2tlblByaWNlfWApXG4gIGlmIChyZWZlcmVuY2VNb2RpZmllckFjdGlvbiA9PT0gUmVmZXJlbmNlTW9kaWZpZXJBY3Rpb24uRElWSURFKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRQcmljZSAvIG1vZGlmaWVyVG9rZW5QcmljZVxuICB9XG4gIHJldHVybiBjdXJyZW50UHJpY2UgKiBtb2RpZmllclRva2VuUHJpY2Vcbn1cbiJdfQ==