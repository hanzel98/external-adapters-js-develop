"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ethers_1 = require("ethers");
exports.supportedEndpoints = ['wallet'];
exports.inputParameters = {
    chainID: true,
    contractAddress: true,
};
const abi = [
    {
        inputs: [
            {
                internalType: 'enum AddressManager.Network',
                name: 'network',
                type: 'uint8',
            },
        ],
        name: 'walletAddresses',
        outputs: [
            {
                internalType: 'string[]',
                name: '',
                type: 'string[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const { chainID, contractAddress } = validator.validated.data;
    const rpcUrl = config.rpcUrl;
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
    const walletProviderContract = new ethers_1.ethers.Contract(contractAddress, abi, provider);
    const addresses = await walletProviderContract.walletAddresses(chainID);
    const result = {
        jobRunID,
        result: addresses,
        data: {
            result: addresses,
        },
        statusCode: 200,
    };
    return ea_bootstrap_1.Requester.success(jobRunID, result, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L3dhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEQ7QUFFOUQsbUNBQStCO0FBRWxCLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQVEvQixRQUFBLGVBQWUsR0FBb0I7SUFDOUMsT0FBTyxFQUFFLElBQUk7SUFDYixlQUFlLEVBQUUsSUFBSTtDQUN0QixDQUFBO0FBRUQsTUFBTSxHQUFHLEdBQUc7SUFDVjtRQUNFLE1BQU0sRUFBRTtZQUNOO2dCQUNFLFlBQVksRUFBRSw2QkFBNkI7Z0JBQzNDLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxPQUFPO2FBQ2Q7U0FDRjtRQUNELElBQUksRUFBRSxpQkFBaUI7UUFDdkIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLElBQUksRUFBRSxFQUFFO2dCQUNSLElBQUksRUFBRSxVQUFVO2FBQ2pCO1NBQ0Y7UUFDRCxlQUFlLEVBQUUsTUFBTTtRQUN2QixJQUFJLEVBQUUsVUFBVTtLQUNqQjtDQUNGLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDN0UsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSx1QkFBZSxDQUFDLENBQUE7SUFDekQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFBO0lBQzdELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxlQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM3RCxNQUFNLHNCQUFzQixHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2xGLE1BQU0sU0FBUyxHQUFHLE1BQU0sc0JBQXNCLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXZFLE1BQU0sTUFBTSxHQUFvQjtRQUM5QixRQUFRO1FBQ1IsTUFBTSxFQUFFLFNBQVM7UUFDakIsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxVQUFVLEVBQUUsR0FBRztLQUNoQixDQUFBO0lBRUQsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM1RCxDQUFDLENBQUE7QUFyQlksUUFBQSxPQUFPLFdBcUJuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBBZGFwdGVyUmVzcG9uc2UsIENvbmZpZywgRXhlY3V0ZVdpdGhDb25maWcsIElucHV0UGFyYW1ldGVycyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBldGhlcnMgfSBmcm9tICdldGhlcnMnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ3dhbGxldCddXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uc2VTY2hlbWEge1xuICBkYXRhOiB7XG4gICAgYWRkcmVzc2VzOiBzdHJpbmdbXVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgY2hhaW5JRDogdHJ1ZSxcbiAgY29udHJhY3RBZGRyZXNzOiB0cnVlLFxufVxuXG5jb25zdCBhYmkgPSBbXG4gIHtcbiAgICBpbnB1dHM6IFtcbiAgICAgIHtcbiAgICAgICAgaW50ZXJuYWxUeXBlOiAnZW51bSBBZGRyZXNzTWFuYWdlci5OZXR3b3JrJyxcbiAgICAgICAgbmFtZTogJ25ldHdvcmsnLFxuICAgICAgICB0eXBlOiAndWludDgnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG5hbWU6ICd3YWxsZXRBZGRyZXNzZXMnLFxuICAgIG91dHB1dHM6IFtcbiAgICAgIHtcbiAgICAgICAgaW50ZXJuYWxUeXBlOiAnc3RyaW5nW10nLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgdHlwZTogJ3N0cmluZ1tdJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBzdGF0ZU11dGFiaWxpdHk6ICd2aWV3JyxcbiAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICB9LFxuXVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCB7IGNoYWluSUQsIGNvbnRyYWN0QWRkcmVzcyB9ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhXG4gIGNvbnN0IHJwY1VybCA9IGNvbmZpZy5ycGNVcmxcbiAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZXRoZXJzLnByb3ZpZGVycy5Kc29uUnBjUHJvdmlkZXIocnBjVXJsKVxuICBjb25zdCB3YWxsZXRQcm92aWRlckNvbnRyYWN0ID0gbmV3IGV0aGVycy5Db250cmFjdChjb250cmFjdEFkZHJlc3MsIGFiaSwgcHJvdmlkZXIpXG4gIGNvbnN0IGFkZHJlc3NlcyA9IGF3YWl0IHdhbGxldFByb3ZpZGVyQ29udHJhY3Qud2FsbGV0QWRkcmVzc2VzKGNoYWluSUQpXG5cbiAgY29uc3QgcmVzdWx0OiBBZGFwdGVyUmVzcG9uc2UgPSB7XG4gICAgam9iUnVuSUQsXG4gICAgcmVzdWx0OiBhZGRyZXNzZXMsXG4gICAgZGF0YToge1xuICAgICAgcmVzdWx0OiBhZGRyZXNzZXMsXG4gICAgfSxcbiAgICBzdGF0dXNDb2RlOiAyMDAsXG4gIH1cblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3VsdCwgY29uZmlnLnZlcmJvc2UpXG59XG4iXX0=