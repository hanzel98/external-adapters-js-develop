"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.supportedEndpoints = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const IRegistry_json_1 = tslib_1.__importDefault(require("../abi/IRegistry.json"));
const IAssetAllocation_json_1 = tslib_1.__importDefault(require("../abi/IAssetAllocation.json"));
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['allocations'];
const getAllocations = async (registry) => {
    const allocationIds = await registry.getAssetAllocationIds();
    const [components, balances, decimals] = await Promise.all([
        Promise.all(allocationIds.map((id) => registry.symbolOf(id))),
        Promise.all(allocationIds.map((id) => registry.balanceOf(id))),
        Promise.all(allocationIds.map((id) => registry.decimalsOf(id))),
    ]);
    return components.map((symbol, i) => ({
        symbol,
        balance: ethers_1.BigNumber.from(balances[i]).toString(),
        decimals: ethers_1.BigNumber.from(decimals[i]).toNumber(),
    }));
};
const execute = async (input, _, config) => {
    const validator = new ea_bootstrap_1.Validator(input, {});
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.jobRunID;
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(config.rpcUrl);
    const registry = new ethers_1.ethers.Contract(config.registryAddr, IRegistry_json_1.default, provider);
    const chainlinkRegistryAddress = await registry.chainlinkRegistryAddress();
    const chainlinkRegistry = new ethers_1.ethers.Contract(chainlinkRegistryAddress, IAssetAllocation_json_1.default, provider);
    const allocations = await getAllocations(chainlinkRegistry);
    const response = {
        data: allocations,
    };
    return ea_bootstrap_1.Requester.success(jobRunID, response, true);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsb2NhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnQvYWxsb2NhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG1DQUEwQztBQUMxQyxtRkFBK0M7QUFDL0MsaUdBQTZEO0FBRzdELDBEQUE4RDtBQUdqRCxRQUFBLGtCQUFrQixHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7QUFFakQsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLFFBQXlCLEVBQW1DLEVBQUU7SUFDMUYsTUFBTSxhQUFhLEdBQUcsTUFBTSxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtJQUM1RCxNQUFNLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBUSxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDeEUsQ0FBQyxDQUFBO0lBRUYsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBYyxFQUFFLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwRCxNQUFNO1FBQ04sT0FBTyxFQUFFLGtCQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUMvQyxRQUFRLEVBQUUsa0JBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0tBQ2pELENBQUMsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzNFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDMUMsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQTtJQUU3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNwRSxNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSx3QkFBVyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hGLE1BQU0sd0JBQXdCLEdBQUcsTUFBTSxRQUFRLENBQUMsd0JBQXdCLEVBQUUsQ0FBQTtJQUMxRSxNQUFNLGlCQUFpQixHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FDM0Msd0JBQXdCLEVBQ3hCLCtCQUFrQixFQUNsQixRQUFRLENBQ1QsQ0FBQTtJQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDM0QsTUFBTSxRQUFRLEdBQUc7UUFDZixJQUFJLEVBQUUsV0FBVztLQUNsQixDQUFBO0lBRUQsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ3BELENBQUMsQ0FBQTtBQXJCWSxRQUFBLE9BQU8sV0FxQm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmlnTnVtYmVyLCBldGhlcnMgfSBmcm9tICdldGhlcnMnXG5pbXBvcnQgcmVnaXN0cnlBYmkgZnJvbSAnLi4vYWJpL0lSZWdpc3RyeS5qc29uJ1xuaW1wb3J0IGFzc2V0QWxsb2NhdGlvbkFiaSBmcm9tICcuLi9hYmkvSUFzc2V0QWxsb2NhdGlvbi5qc29uJ1xuaW1wb3J0IHsgdHlwZXMgfSBmcm9tICdAY2hhaW5saW5rL3Rva2VuLWFsbG9jYXRpb24tYWRhcHRlcidcbmltcG9ydCB7IEV4ZWN1dGVXaXRoQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ2FsbG9jYXRpb25zJ11cblxuY29uc3QgZ2V0QWxsb2NhdGlvbnMgPSBhc3luYyAocmVnaXN0cnk6IGV0aGVycy5Db250cmFjdCk6IFByb21pc2U8dHlwZXMuVG9rZW5BbGxvY2F0aW9ucz4gPT4ge1xuICBjb25zdCBhbGxvY2F0aW9uSWRzID0gYXdhaXQgcmVnaXN0cnkuZ2V0QXNzZXRBbGxvY2F0aW9uSWRzKClcbiAgY29uc3QgW2NvbXBvbmVudHMsIGJhbGFuY2VzLCBkZWNpbWFsc106IGFueSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBQcm9taXNlLmFsbChhbGxvY2F0aW9uSWRzLm1hcCgoaWQ6IHN0cmluZykgPT4gcmVnaXN0cnkuc3ltYm9sT2YoaWQpKSksXG4gICAgUHJvbWlzZS5hbGwoYWxsb2NhdGlvbklkcy5tYXAoKGlkOiBzdHJpbmcpID0+IHJlZ2lzdHJ5LmJhbGFuY2VPZihpZCkpKSxcbiAgICBQcm9taXNlLmFsbChhbGxvY2F0aW9uSWRzLm1hcCgoaWQ6IHN0cmluZykgPT4gcmVnaXN0cnkuZGVjaW1hbHNPZihpZCkpKSxcbiAgXSlcblxuICByZXR1cm4gY29tcG9uZW50cy5tYXAoKHN5bWJvbDogc3RyaW5nLCBpOiBudW1iZXIpID0+ICh7XG4gICAgc3ltYm9sLFxuICAgIGJhbGFuY2U6IEJpZ051bWJlci5mcm9tKGJhbGFuY2VzW2ldKS50b1N0cmluZygpLFxuICAgIGRlY2ltYWxzOiBCaWdOdW1iZXIuZnJvbShkZWNpbWFsc1tpXSkudG9OdW1iZXIoKSxcbiAgfSkpXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKGlucHV0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihpbnB1dCwge30pXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5qb2JSdW5JRFxuXG4gIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuSnNvblJwY1Byb3ZpZGVyKGNvbmZpZy5ycGNVcmwpXG4gIGNvbnN0IHJlZ2lzdHJ5ID0gbmV3IGV0aGVycy5Db250cmFjdChjb25maWcucmVnaXN0cnlBZGRyLCByZWdpc3RyeUFiaSwgcHJvdmlkZXIpXG4gIGNvbnN0IGNoYWlubGlua1JlZ2lzdHJ5QWRkcmVzcyA9IGF3YWl0IHJlZ2lzdHJ5LmNoYWlubGlua1JlZ2lzdHJ5QWRkcmVzcygpXG4gIGNvbnN0IGNoYWlubGlua1JlZ2lzdHJ5ID0gbmV3IGV0aGVycy5Db250cmFjdChcbiAgICBjaGFpbmxpbmtSZWdpc3RyeUFkZHJlc3MsXG4gICAgYXNzZXRBbGxvY2F0aW9uQWJpLFxuICAgIHByb3ZpZGVyLFxuICApXG5cbiAgY29uc3QgYWxsb2NhdGlvbnMgPSBhd2FpdCBnZXRBbGxvY2F0aW9ucyhjaGFpbmxpbmtSZWdpc3RyeSlcbiAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgZGF0YTogYWxsb2NhdGlvbnMsXG4gIH1cblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3BvbnNlLCB0cnVlKVxufVxuIl19