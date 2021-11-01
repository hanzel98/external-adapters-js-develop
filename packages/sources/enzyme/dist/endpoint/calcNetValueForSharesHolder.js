"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ethers_1 = require("ethers");
const FundValueCalculator_json_1 = tslib_1.__importDefault(require("../abis/FundValueCalculator.json"));
exports.supportedEndpoints = ['calcNetValueForSharesHolder'];
exports.inputParameters = {
    calculatorContract: true,
    vaultProxy: true,
    sharesHolder: true,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const calculatorContractAddress = validator.validated.data.calculatorContract;
    const vaultProxyAddress = validator.validated.data.vaultProxy;
    const sharesHolderAddress = validator.validated.data.sharesHolder;
    const [, netValue] = await calcNetValueForSharesHolder(calculatorContractAddress, vaultProxyAddress, sharesHolderAddress, config);
    const response = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: { netValue: netValue.toString() },
    };
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, netValue.toString()), config.verbose);
};
exports.execute = execute;
const calcNetValueForSharesHolder = (address, proxy, sharesHolder, config) => {
    const contract = new ethers_1.ethers.Contract(address, FundValueCalculator_json_1.default, config.provider);
    return contract.calcNetValueForSharesHolder(proxy, sharesHolder);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY05ldFZhbHVlRm9yU2hhcmVzSG9sZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2NhbGNOZXRWYWx1ZUZvclNoYXJlc0hvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQThEO0FBRzlELG1DQUEwQztBQUMxQyx3R0FBcUU7QUFFeEQsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUE7QUFFcEQsUUFBQSxlQUFlLEdBQW9CO0lBQzlDLGtCQUFrQixFQUFFLElBQUk7SUFDeEIsVUFBVSxFQUFFLElBQUk7SUFDaEIsWUFBWSxFQUFFLElBQUk7Q0FDbkIsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0seUJBQXlCLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUE7SUFDN0UsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDN0QsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUE7SUFFakUsTUFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsTUFBTSwyQkFBMkIsQ0FDcEQseUJBQXlCLEVBQ3pCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsTUFBTSxDQUNQLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRztRQUNmLE1BQU0sRUFBRSxHQUFHO1FBQ1gsVUFBVSxFQUFFLElBQUk7UUFDaEIsT0FBTyxFQUFFLEVBQUU7UUFDWCxNQUFNLEVBQUUsRUFBRTtRQUNWLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUU7S0FDeEMsQ0FBQTtJQUNELE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQ3RCLFFBQVEsRUFDUix3QkFBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQ25ELE1BQU0sQ0FBQyxPQUFPLENBQ2YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQTVCWSxRQUFBLE9BQU8sV0E0Qm5CO0FBRUQsTUFBTSwyQkFBMkIsR0FBRyxDQUNsQyxPQUFlLEVBQ2YsS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLE1BQWMsRUFDNkMsRUFBRTtJQUM3RCxNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGtDQUFzQixFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0RixPQUFPLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEV4ZWN1dGVXaXRoQ29uZmlnLCBJbnB1dFBhcmFtZXRlcnMgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJ1xuaW1wb3J0IHsgZXRoZXJzLCBCaWdOdW1iZXIgfSBmcm9tICdldGhlcnMnXG5pbXBvcnQgRnVuZFZhbHVlQ2FsY3VsYXRvckFCSSBmcm9tICcuLi9hYmlzL0Z1bmRWYWx1ZUNhbGN1bGF0b3IuanNvbidcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnY2FsY05ldFZhbHVlRm9yU2hhcmVzSG9sZGVyJ11cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBjYWxjdWxhdG9yQ29udHJhY3Q6IHRydWUsXG4gIHZhdWx0UHJveHk6IHRydWUsXG4gIHNoYXJlc0hvbGRlcjogdHJ1ZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbWV0ZXJzKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgY2FsY3VsYXRvckNvbnRyYWN0QWRkcmVzcyA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5jYWxjdWxhdG9yQ29udHJhY3RcbiAgY29uc3QgdmF1bHRQcm94eUFkZHJlc3MgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEudmF1bHRQcm94eVxuICBjb25zdCBzaGFyZXNIb2xkZXJBZGRyZXNzID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLnNoYXJlc0hvbGRlclxuXG4gIGNvbnN0IFssIG5ldFZhbHVlXSA9IGF3YWl0IGNhbGNOZXRWYWx1ZUZvclNoYXJlc0hvbGRlcihcbiAgICBjYWxjdWxhdG9yQ29udHJhY3RBZGRyZXNzLFxuICAgIHZhdWx0UHJveHlBZGRyZXNzLFxuICAgIHNoYXJlc0hvbGRlckFkZHJlc3MsXG4gICAgY29uZmlnLFxuICApXG5cbiAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgc3RhdHVzVGV4dDogJ09LJyxcbiAgICBoZWFkZXJzOiB7fSxcbiAgICBjb25maWc6IHt9LFxuICAgIGRhdGE6IHsgbmV0VmFsdWU6IG5ldFZhbHVlLnRvU3RyaW5nKCkgfSxcbiAgfVxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3MoXG4gICAgam9iUnVuSUQsXG4gICAgUmVxdWVzdGVyLndpdGhSZXN1bHQocmVzcG9uc2UsIG5ldFZhbHVlLnRvU3RyaW5nKCkpLFxuICAgIGNvbmZpZy52ZXJib3NlLFxuICApXG59XG5cbmNvbnN0IGNhbGNOZXRWYWx1ZUZvclNoYXJlc0hvbGRlciA9IChcbiAgYWRkcmVzczogc3RyaW5nLFxuICBwcm94eTogc3RyaW5nLFxuICBzaGFyZXNIb2xkZXI6IHN0cmluZyxcbiAgY29uZmlnOiBDb25maWcsXG4pOiBQcm9taXNlPFtkZW5vbWluYXRpb25Bc3NldDogc3RyaW5nLCBuZXRWYWx1ZTogQmlnTnVtYmVyXT4gPT4ge1xuICBjb25zdCBjb250cmFjdCA9IG5ldyBldGhlcnMuQ29udHJhY3QoYWRkcmVzcywgRnVuZFZhbHVlQ2FsY3VsYXRvckFCSSwgY29uZmlnLnByb3ZpZGVyKVxuICByZXR1cm4gY29udHJhY3QuY2FsY05ldFZhbHVlRm9yU2hhcmVzSG9sZGVyKHByb3h5LCBzaGFyZXNIb2xkZXIpXG59XG4iXX0=