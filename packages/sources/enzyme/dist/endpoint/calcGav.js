"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ethers_1 = require("ethers");
const FundValueCalculator_json_1 = tslib_1.__importDefault(require("../abis/FundValueCalculator.json"));
exports.supportedEndpoints = ['calcGav'];
exports.inputParameters = {
    calculatorContract: true,
    vaultProxy: true,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const calculatorContractAddress = validator.validated.data.calculatorContract;
    const vaultProxyAddress = validator.validated.data.vaultProxy;
    const [, gav] = await calcGav(calculatorContractAddress, vaultProxyAddress, config);
    const response = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: { gav: gav.toString() },
    };
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, gav.toString()), config.verbose);
};
exports.execute = execute;
const calcGav = (address, proxy, config) => {
    const contract = new ethers_1.ethers.Contract(address, FundValueCalculator_json_1.default, config.provider);
    return contract.calcGav(proxy);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY0dhdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9jYWxjR2F2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBOEQ7QUFHOUQsbUNBQTBDO0FBQzFDLHdHQUFxRTtBQUV4RCxRQUFBLGtCQUFrQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7QUFFaEMsUUFBQSxlQUFlLEdBQW9CO0lBQzlDLGtCQUFrQixFQUFFLElBQUk7SUFDeEIsVUFBVSxFQUFFLElBQUk7Q0FDakIsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0seUJBQXlCLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUE7SUFDN0UsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUE7SUFFN0QsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMseUJBQXlCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFFbkYsTUFBTSxRQUFRLEdBQUc7UUFDZixNQUFNLEVBQUUsR0FBRztRQUNYLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFO0tBQzlCLENBQUE7SUFDRCxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSx3QkFBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3BHLENBQUMsQ0FBQTtBQWxCWSxRQUFBLE9BQU8sV0FrQm5CO0FBRUQsTUFBTSxPQUFPLEdBQUcsQ0FDZCxPQUFlLEVBQ2YsS0FBYSxFQUNiLE1BQWMsRUFDd0MsRUFBRTtJQUN4RCxNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGtDQUFzQixFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0RixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEV4ZWN1dGVXaXRoQ29uZmlnLCBJbnB1dFBhcmFtZXRlcnMgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJ1xuaW1wb3J0IHsgZXRoZXJzLCBCaWdOdW1iZXIgfSBmcm9tICdldGhlcnMnXG5pbXBvcnQgRnVuZFZhbHVlQ2FsY3VsYXRvckFCSSBmcm9tICcuLi9hYmlzL0Z1bmRWYWx1ZUNhbGN1bGF0b3IuanNvbidcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnY2FsY0dhdiddXG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgY2FsY3VsYXRvckNvbnRyYWN0OiB0cnVlLFxuICB2YXVsdFByb3h5OiB0cnVlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBjYWxjdWxhdG9yQ29udHJhY3RBZGRyZXNzID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmNhbGN1bGF0b3JDb250cmFjdFxuICBjb25zdCB2YXVsdFByb3h5QWRkcmVzcyA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS52YXVsdFByb3h5XG5cbiAgY29uc3QgWywgZ2F2XSA9IGF3YWl0IGNhbGNHYXYoY2FsY3VsYXRvckNvbnRyYWN0QWRkcmVzcywgdmF1bHRQcm94eUFkZHJlc3MsIGNvbmZpZylcblxuICBjb25zdCByZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBzdGF0dXNUZXh0OiAnT0snLFxuICAgIGhlYWRlcnM6IHt9LFxuICAgIGNvbmZpZzoge30sXG4gICAgZGF0YTogeyBnYXY6IGdhdi50b1N0cmluZygpIH0sXG4gIH1cbiAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGpvYlJ1bklELCBSZXF1ZXN0ZXIud2l0aFJlc3VsdChyZXNwb25zZSwgZ2F2LnRvU3RyaW5nKCkpLCBjb25maWcudmVyYm9zZSlcbn1cblxuY29uc3QgY2FsY0dhdiA9IChcbiAgYWRkcmVzczogc3RyaW5nLFxuICBwcm94eTogc3RyaW5nLFxuICBjb25maWc6IENvbmZpZyxcbik6IFByb21pc2U8W2Rlbm9taW5hdGlvbkFzc2V0OiBzdHJpbmcsIGdhdjogQmlnTnVtYmVyXT4gPT4ge1xuICBjb25zdCBjb250cmFjdCA9IG5ldyBldGhlcnMuQ29udHJhY3QoYWRkcmVzcywgRnVuZFZhbHVlQ2FsY3VsYXRvckFCSSwgY29uZmlnLnByb3ZpZGVyKVxuICByZXR1cm4gY29udHJhY3QuY2FsY0dhdihwcm94eSlcbn1cbiJdfQ==