"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.endpointResultPaths = exports.supportedEndpoints = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
const ethers_1 = require("ethers");
const address_provider_json_1 = tslib_1.__importDefault(require("../abis/address_provider.json"));
const registry_exchanges_json_1 = tslib_1.__importDefault(require("../abis/registry_exchanges.json"));
const ERC20_json_1 = tslib_1.__importDefault(require("../abis/ERC20.json"));
const decimal_js_1 = require("decimal.js");
exports.supportedEndpoints = ['crypto'];
exports.endpointResultPaths = {
    crypto: 'rate',
};
exports.inputParameters = {
    from: ['base', 'from', 'coin'],
    fromAddress: false,
    fromDecimals: false,
    to: ['quote', 'to', 'market'],
    toAddress: false,
    toDecimals: false,
    amount: false,
    resultPath: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const { address: from, decimals: fromDecimals } = await getTokenDetails(validator, 'from', config);
    const { address: to, decimals: toDecimals } = await getTokenDetails(validator, 'to', config);
    const inputAmount = validator.validated.data.amount || 1;
    const amount = ethers_1.BigNumber.from(inputAmount).mul(ethers_1.BigNumber.from(10).pow(fromDecimals));
    const resultPath = validator.validated.data.resultPath;
    const [pool, output] = await getBestRate(from, to, amount, config);
    const outputAmount = new decimal_js_1.Decimal(output.toString()).div(new decimal_js_1.Decimal(10).pow(toDecimals));
    const rate = outputAmount.div(inputAmount);
    const data = {
        pool,
        input: amount.toString(),
        inputToken: from,
        inputDecimals: fromDecimals,
        output: output.toString(),
        outputToken: to,
        outputDecimals: toDecimals,
        rate: rate.toNumber(),
    };
    const response = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: data,
    };
    const result = ea_bootstrap_1.Requester.validateResultNumber(response.data, [resultPath]);
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, result), config.verbose);
};
exports.execute = execute;
/**
 * getTokenDetails will find the address and number of decimal for a token.
 *
 * The order of operations is as follows:
 *  - address:
 *     1. Check if the address was provided in the request.
 *     2. If not, check the symbol in the request to see if we have pre-set the address for this symbol/network.
 *     3. If not, we assume the symbol param was actually the address.
 *  - decimals:
 *     1. Check if the number of decimals was provided in the request.
 *     2. Query the contract at the address found above to see how many decimals it's set to.
 * @param validator The validation class to use
 * @param direction Used to get the params in the request
 * - `{direction}` is the symbol of the token (to find pre-set token details)
 * - `{direction}Address` is the token address as set in the request
 * - `{direction}Decimals` is the number of decimals for the token as set in the request
 * @param config Configuration to extract token decimals from
 */
const getTokenDetails = async (validator, direction, config) => {
    const symbol = validator.overrideSymbol(config_1.NAME, validator.validated.data[direction]);
    const address = validator.validated.data[`${direction}Address`] ||
        validator.overrideToken(symbol, config.network) ||
        symbol;
    const decimals = validator.validated.data[`${direction}Decimals`] || (await getDecimals(address, config));
    return { address, decimals };
};
const getDecimals = async (address, config) => new ethers_1.ethers.Contract(address, ERC20_json_1.default, config.provider).decimals();
const getBestRate = async (from, to, amount, config) => {
    const provider = new ethers_1.ethers.Contract(config.addressProviderAddress, address_provider_json_1.default, config.provider);
    const exchange = await provider.get_address(config.exchangeProviderId);
    const swaps = new ethers_1.ethers.Contract(exchange, registry_exchanges_json_1.default, config.provider);
    return swaps.get_best_rate(from, to, amount);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2NyeXB0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQThEO0FBRTlELHNDQUF1RDtBQUN2RCxtQ0FBMEM7QUFDMUMsa0dBQThEO0FBQzlELHNHQUFrRTtBQUNsRSw0RUFBeUM7QUFDekMsMkNBQW9DO0FBRXZCLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUUvQixRQUFBLG1CQUFtQixHQUFHO0lBQ2pDLE1BQU0sRUFBRSxNQUFNO0NBQ2YsQ0FBQTtBQWFZLFFBQUEsZUFBZSxHQUFvQjtJQUM5QyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUM5QixXQUFXLEVBQUUsS0FBSztJQUNsQixZQUFZLEVBQUUsS0FBSztJQUNuQixFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQztJQUM3QixTQUFTLEVBQUUsS0FBSztJQUNoQixVQUFVLEVBQUUsS0FBSztJQUNqQixNQUFNLEVBQUUsS0FBSztJQUNiLFVBQVUsRUFBRSxLQUFLO0NBQ2xCLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDN0UsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSx1QkFBZSxDQUFDLENBQUE7SUFDekQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxlQUFlLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFN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QixDQUFDLENBQUE7QUFFRCxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsT0FBZSxFQUFFLE1BQWMsRUFBbUIsRUFBRSxDQUM3RSxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLG9CQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBRXBFLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFDdkIsSUFBWSxFQUNaLEVBQVUsRUFDVixNQUFpQixFQUNqQixNQUFjLEVBQzhCLEVBQUU7SUFDOUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUNsQyxNQUFNLENBQUMsc0JBQXNCLEVBQzdCLCtCQUFrQixFQUNsQixNQUFNLENBQUMsUUFBUSxDQUNoQixDQUFBO0lBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ3RFLE1BQU0sS0FBSyxHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsaUNBQW9CLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2xGLE9BQU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQzlDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBFeGVjdXRlV2l0aENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IE5BTUUgYXMgQWRhcHRlck5hbWUsIENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCB7IGV0aGVycywgQmlnTnVtYmVyIH0gZnJvbSAnZXRoZXJzJ1xuaW1wb3J0IGFkZHJlc3NQcm92aWRlckFCSSBmcm9tICcuLi9hYmlzL2FkZHJlc3NfcHJvdmlkZXIuanNvbidcbmltcG9ydCByZWdpc3RyeUV4Y2hhbmdlc0FCSSBmcm9tICcuLi9hYmlzL3JlZ2lzdHJ5X2V4Y2hhbmdlcy5qc29uJ1xuaW1wb3J0IGVyYzIwQUJJIGZyb20gJy4uL2FiaXMvRVJDMjAuanNvbidcbmltcG9ydCB7IERlY2ltYWwgfSBmcm9tICdkZWNpbWFsLmpzJ1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWydjcnlwdG8nXVxuXG5leHBvcnQgY29uc3QgZW5kcG9pbnRSZXN1bHRQYXRocyA9IHtcbiAgY3J5cHRvOiAncmF0ZScsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uc2VTY2hlbWEge1xuICBwb29sOiBzdHJpbmdcbiAgaW5wdXQ6IHN0cmluZ1xuICBpbnB1dFRva2VuOiBzdHJpbmdcbiAgaW5wdXREZWNpbWFsczogbnVtYmVyXG4gIG91dHB1dDogc3RyaW5nXG4gIG91dHB1dFRva2VuOiBzdHJpbmdcbiAgb3V0cHV0RGVjaW1hbHM6IG51bWJlclxuICByYXRlOiBudW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBmcm9tOiBbJ2Jhc2UnLCAnZnJvbScsICdjb2luJ10sXG4gIGZyb21BZGRyZXNzOiBmYWxzZSxcbiAgZnJvbURlY2ltYWxzOiBmYWxzZSxcbiAgdG86IFsncXVvdGUnLCAndG8nLCAnbWFya2V0J10sXG4gIHRvQWRkcmVzczogZmFsc2UsXG4gIHRvRGVjaW1hbHM6IGZhbHNlLFxuICBhbW91bnQ6IGZhbHNlLFxuICByZXN1bHRQYXRoOiBmYWxzZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbWV0ZXJzKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgeyBhZGRyZXNzOiBmcm9tLCBkZWNpbWFsczogZnJvbURlY2ltYWxzIH0gPSBhd2FpdCBnZXRUb2tlbkRldGFpbHModmFsaWRhdG9yLCAnZnJvbScsIGNvbmZpZylcbiAgY29uc3QgeyBhZGRyZXNzOiB0bywgZGVjaW1hbHM6IHRvRGVjaW1hbHMgfSA9IGF3YWl0IGdldFRva2VuRGV0YWlscyh2YWxpZGF0b3IsICd0bycsIGNvbmZpZylcbiAgY29uc3QgaW5wdXRBbW91bnQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuYW1vdW50IHx8IDFcbiAgY29uc3QgYW1vdW50ID0gQmlnTnVtYmVyLmZyb20oaW5wdXRBbW91bnQpLm11bChCaWdOdW1iZXIuZnJvbSgxMCkucG93KGZyb21EZWNpbWFscykpXG4gIGNvbnN0IHJlc3VsdFBhdGggPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEucmVzdWx0UGF0aFxuXG4gIGNvbnN0IFtwb29sLCBvdXRwdXRdID0gYXdhaXQgZ2V0QmVzdFJhdGUoZnJvbSwgdG8sIGFtb3VudCwgY29uZmlnKVxuXG4gIGNvbnN0IG91dHB1dEFtb3VudCA9IG5ldyBEZWNpbWFsKG91dHB1dC50b1N0cmluZygpKS5kaXYobmV3IERlY2ltYWwoMTApLnBvdyh0b0RlY2ltYWxzKSlcbiAgY29uc3QgcmF0ZSA9IG91dHB1dEFtb3VudC5kaXYoaW5wdXRBbW91bnQpXG5cbiAgY29uc3QgZGF0YTogUmVzcG9uc2VTY2hlbWEgPSB7XG4gICAgcG9vbCxcbiAgICBpbnB1dDogYW1vdW50LnRvU3RyaW5nKCksXG4gICAgaW5wdXRUb2tlbjogZnJvbSxcbiAgICBpbnB1dERlY2ltYWxzOiBmcm9tRGVjaW1hbHMsXG4gICAgb3V0cHV0OiBvdXRwdXQudG9TdHJpbmcoKSxcbiAgICBvdXRwdXRUb2tlbjogdG8sXG4gICAgb3V0cHV0RGVjaW1hbHM6IHRvRGVjaW1hbHMsXG4gICAgcmF0ZTogcmF0ZS50b051bWJlcigpLFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgc3RhdHVzVGV4dDogJ09LJyxcbiAgICBoZWFkZXJzOiB7fSxcbiAgICBjb25maWc6IHt9LFxuICAgIGRhdGE6IGRhdGEsXG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFtyZXN1bHRQYXRoXSlcblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIFJlcXVlc3Rlci53aXRoUmVzdWx0KHJlc3BvbnNlLCByZXN1bHQpLCBjb25maWcudmVyYm9zZSlcbn1cblxuLyoqXG4gKiBnZXRUb2tlbkRldGFpbHMgd2lsbCBmaW5kIHRoZSBhZGRyZXNzIGFuZCBudW1iZXIgb2YgZGVjaW1hbCBmb3IgYSB0b2tlbi5cbiAqXG4gKiBUaGUgb3JkZXIgb2Ygb3BlcmF0aW9ucyBpcyBhcyBmb2xsb3dzOlxuICogIC0gYWRkcmVzczpcbiAqICAgICAxLiBDaGVjayBpZiB0aGUgYWRkcmVzcyB3YXMgcHJvdmlkZWQgaW4gdGhlIHJlcXVlc3QuXG4gKiAgICAgMi4gSWYgbm90LCBjaGVjayB0aGUgc3ltYm9sIGluIHRoZSByZXF1ZXN0IHRvIHNlZSBpZiB3ZSBoYXZlIHByZS1zZXQgdGhlIGFkZHJlc3MgZm9yIHRoaXMgc3ltYm9sL25ldHdvcmsuXG4gKiAgICAgMy4gSWYgbm90LCB3ZSBhc3N1bWUgdGhlIHN5bWJvbCBwYXJhbSB3YXMgYWN0dWFsbHkgdGhlIGFkZHJlc3MuXG4gKiAgLSBkZWNpbWFsczpcbiAqICAgICAxLiBDaGVjayBpZiB0aGUgbnVtYmVyIG9mIGRlY2ltYWxzIHdhcyBwcm92aWRlZCBpbiB0aGUgcmVxdWVzdC5cbiAqICAgICAyLiBRdWVyeSB0aGUgY29udHJhY3QgYXQgdGhlIGFkZHJlc3MgZm91bmQgYWJvdmUgdG8gc2VlIGhvdyBtYW55IGRlY2ltYWxzIGl0J3Mgc2V0IHRvLlxuICogQHBhcmFtIHZhbGlkYXRvciBUaGUgdmFsaWRhdGlvbiBjbGFzcyB0byB1c2VcbiAqIEBwYXJhbSBkaXJlY3Rpb24gVXNlZCB0byBnZXQgdGhlIHBhcmFtcyBpbiB0aGUgcmVxdWVzdFxuICogLSBge2RpcmVjdGlvbn1gIGlzIHRoZSBzeW1ib2wgb2YgdGhlIHRva2VuICh0byBmaW5kIHByZS1zZXQgdG9rZW4gZGV0YWlscylcbiAqIC0gYHtkaXJlY3Rpb259QWRkcmVzc2AgaXMgdGhlIHRva2VuIGFkZHJlc3MgYXMgc2V0IGluIHRoZSByZXF1ZXN0XG4gKiAtIGB7ZGlyZWN0aW9ufURlY2ltYWxzYCBpcyB0aGUgbnVtYmVyIG9mIGRlY2ltYWxzIGZvciB0aGUgdG9rZW4gYXMgc2V0IGluIHRoZSByZXF1ZXN0XG4gKiBAcGFyYW0gY29uZmlnIENvbmZpZ3VyYXRpb24gdG8gZXh0cmFjdCB0b2tlbiBkZWNpbWFscyBmcm9tXG4gKi9cbmNvbnN0IGdldFRva2VuRGV0YWlscyA9IGFzeW5jIChcbiAgdmFsaWRhdG9yOiBWYWxpZGF0b3IsXG4gIGRpcmVjdGlvbjogc3RyaW5nLFxuICBjb25maWc6IENvbmZpZyxcbik6IFByb21pc2U8eyBhZGRyZXNzOiBzdHJpbmc7IGRlY2ltYWxzOiBudW1iZXIgfT4gPT4ge1xuICBjb25zdCBzeW1ib2wgPSB2YWxpZGF0b3Iub3ZlcnJpZGVTeW1ib2woXG4gICAgQWRhcHRlck5hbWUsXG4gICAgdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhW2RpcmVjdGlvbl0sXG4gICkgYXMgc3RyaW5nXG4gIGNvbnN0IGFkZHJlc3MgPVxuICAgIHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YVtgJHtkaXJlY3Rpb259QWRkcmVzc2BdIHx8XG4gICAgdmFsaWRhdG9yLm92ZXJyaWRlVG9rZW4oc3ltYm9sLCBjb25maWcubmV0d29yaykgfHxcbiAgICBzeW1ib2xcbiAgY29uc3QgZGVjaW1hbHMgPVxuICAgIHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YVtgJHtkaXJlY3Rpb259RGVjaW1hbHNgXSB8fCAoYXdhaXQgZ2V0RGVjaW1hbHMoYWRkcmVzcywgY29uZmlnKSlcblxuICByZXR1cm4geyBhZGRyZXNzLCBkZWNpbWFscyB9XG59XG5cbmNvbnN0IGdldERlY2ltYWxzID0gYXN5bmMgKGFkZHJlc3M6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBQcm9taXNlPG51bWJlcj4gPT5cbiAgbmV3IGV0aGVycy5Db250cmFjdChhZGRyZXNzLCBlcmMyMEFCSSwgY29uZmlnLnByb3ZpZGVyKS5kZWNpbWFscygpXG5cbmNvbnN0IGdldEJlc3RSYXRlID0gYXN5bmMgKFxuICBmcm9tOiBzdHJpbmcsXG4gIHRvOiBzdHJpbmcsXG4gIGFtb3VudDogQmlnTnVtYmVyLFxuICBjb25maWc6IENvbmZpZyxcbik6IFByb21pc2U8W3Bvb2w6IHN0cmluZywgb3V0cHV0OiBCaWdOdW1iZXJdPiA9PiB7XG4gIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5Db250cmFjdChcbiAgICBjb25maWcuYWRkcmVzc1Byb3ZpZGVyQWRkcmVzcyxcbiAgICBhZGRyZXNzUHJvdmlkZXJBQkksXG4gICAgY29uZmlnLnByb3ZpZGVyLFxuICApXG4gIGNvbnN0IGV4Y2hhbmdlID0gYXdhaXQgcHJvdmlkZXIuZ2V0X2FkZHJlc3MoY29uZmlnLmV4Y2hhbmdlUHJvdmlkZXJJZClcbiAgY29uc3Qgc3dhcHMgPSBuZXcgZXRoZXJzLkNvbnRyYWN0KGV4Y2hhbmdlLCByZWdpc3RyeUV4Y2hhbmdlc0FCSSwgY29uZmlnLnByb3ZpZGVyKVxuICByZXR1cm4gc3dhcHMuZ2V0X2Jlc3RfcmF0ZShmcm9tLCB0bywgYW1vdW50KVxufVxuIl19