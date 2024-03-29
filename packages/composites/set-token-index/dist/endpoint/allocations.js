"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.getToken = exports.supportedEndpoints = void 0;
const ethers_1 = require("ethers");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("../adapter");
exports.supportedEndpoints = ['allocations'];
function getToken(context, id, address) {
    const execute = adapter_1.makeExecute();
    const options = {
        data: {
            endpoint: 'tokens',
            address,
            maxAge: 60 * 60 * 1000, // 1 hour
        },
        method: 'post',
        id,
    };
    return new Promise((resolve, reject) => {
        const middleware = ea_bootstrap_1.makeMiddleware(execute);
        ea_bootstrap_1.withMiddleware(execute, context, middleware)
            .then((executeWithMiddleware) => {
            executeWithMiddleware(options, context).then((value) => resolve(value.data));
        })
            .catch((error) => reject(error));
    });
}
exports.getToken = getToken;
/*
  NOTICE!

  The current implementation is fetching data directly from SetToken contracts (https://etherscan.io/address/0x78733fa5e70e3ab61dc49d93921b289e4b667093#code)
  Note that this implementation won't work in other networks unless we deploy a copy of the contract.

  The correct implementation should use SetProtocol.js typed library instead to fetch data directly from the SetToken contract directly.
  The ChainlinkAdapter.getAllocations(ISetToken _setToken) should be reimplemented in JS in order to use it.
*/
const ABI = [
    {
        inputs: [{ internalType: 'contract ISetToken', name: '_setToken', type: 'address' }],
        name: 'getAllocations',
        outputs: [
            { internalType: 'address[]', name: '', type: 'address[]' },
            { internalType: 'int256[]', name: '', type: 'int256[]' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
exports.inputParameters = {
    contractAddress: true,
    setAddress: true,
};
const execute = async (input, context, config) => {
    const validator = new ea_bootstrap_1.Validator(input, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.jobRunID;
    const contractAddress = validator.validated.data.contractAddress;
    const setAddress = validator.validated.data.setAddress;
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(config.rpcUrl);
    const index = new ethers_1.ethers.Contract(contractAddress, ABI, provider);
    const [addresses, balances] = await index.getAllocations(setAddress);
    // Token balances are coming already normalized as 18 decimals token
    const allocations = await Promise.all(addresses.map(async (address, i) => {
        const token = await getToken(context, jobRunID, address);
        return {
            balance: balances[i].toString(),
            ...token,
        };
    }));
    const response = {
        data: allocations,
    };
    return ea_bootstrap_1.Requester.success(jobRunID, response, true);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsb2NhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnQvYWxsb2NhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQStCO0FBRS9CLDBEQUE4RjtBQUc5Rix3Q0FBd0M7QUFFM0IsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRWpELFNBQWdCLFFBQVEsQ0FDdEIsT0FBdUIsRUFDdkIsRUFBVSxFQUNWLE9BQWU7SUFFZixNQUFNLE9BQU8sR0FBRyxxQkFBVyxFQUFFLENBQUE7SUFDN0IsTUFBTSxPQUFPLEdBQUc7UUFDZCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsUUFBUTtZQUNsQixPQUFPO1lBQ1AsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLFNBQVM7U0FDbEM7UUFDRCxNQUFNLEVBQUUsTUFBTTtRQUNkLEVBQUU7S0FDSCxDQUFBO0lBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxNQUFNLFVBQVUsR0FBRyw2QkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzFDLDZCQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUM7YUFDekMsSUFBSSxDQUFDLENBQUMscUJBQXFCLEVBQUUsRUFBRTtZQUM5QixxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDOUUsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNwQyxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUF2QkQsNEJBdUJDO0FBRUQ7Ozs7Ozs7O0VBUUU7QUFFRixNQUFNLEdBQUcsR0FBRztJQUNWO1FBQ0UsTUFBTSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDcEYsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixPQUFPLEVBQUU7WUFDUCxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQzFELEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7U0FDekQ7UUFDRCxlQUFlLEVBQUUsTUFBTTtRQUN2QixJQUFJLEVBQUUsVUFBVTtLQUNqQjtDQUNGLENBQUE7QUFFWSxRQUFBLGVBQWUsR0FBb0I7SUFDOUMsZUFBZSxFQUFFLElBQUk7SUFDckIsVUFBVSxFQUFFLElBQUk7Q0FDakIsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNqRixNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsS0FBSyxFQUFFLHVCQUFlLENBQUMsQ0FBQTtJQUN2RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFBO0lBQzdDLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQTtJQUNoRSxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUE7SUFFdEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxlQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDcEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFakUsTUFBTSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsR0FBRyxNQUFNLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7SUFFcEUsb0VBQW9FO0lBQ3BFLE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDbkMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBZSxFQUFFLENBQVMsRUFBRSxFQUFFO1FBQ2pELE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDeEQsT0FBTztZQUNMLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQy9CLEdBQUcsS0FBSztTQUNULENBQUE7SUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFBO0lBQ0QsTUFBTSxRQUFRLEdBQUc7UUFDZixJQUFJLEVBQUUsV0FBVztLQUNsQixDQUFBO0lBRUQsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ3BELENBQUMsQ0FBQTtBQTVCWSxRQUFBLE9BQU8sV0E0Qm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXRoZXJzIH0gZnJvbSAnZXRoZXJzJ1xuaW1wb3J0IHsgQWRhcHRlckNvbnRleHQsIEV4ZWN1dGVXaXRoQ29uZmlnLCBJbnB1dFBhcmFtZXRlcnMgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgbWFrZU1pZGRsZXdhcmUsIFJlcXVlc3RlciwgVmFsaWRhdG9yLCB3aXRoTWlkZGxld2FyZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJ1xuaW1wb3J0ICogYXMgVEEgZnJvbSAnLi4vLi4vLi4vdG9rZW4tYWxsb2NhdGlvbidcbmltcG9ydCB7IG1ha2VFeGVjdXRlIH0gZnJvbSAnLi4vYWRhcHRlcidcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnYWxsb2NhdGlvbnMnXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9rZW4oXG4gIGNvbnRleHQ6IEFkYXB0ZXJDb250ZXh0LFxuICBpZDogc3RyaW5nLFxuICBhZGRyZXNzOiBzdHJpbmcsXG4pOiBQcm9taXNlPFRBLnR5cGVzLlRva2VuQWxsb2NhdGlvbltdPiB7XG4gIGNvbnN0IGV4ZWN1dGUgPSBtYWtlRXhlY3V0ZSgpXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgZGF0YToge1xuICAgICAgZW5kcG9pbnQ6ICd0b2tlbnMnLFxuICAgICAgYWRkcmVzcyxcbiAgICAgIG1heEFnZTogNjAgKiA2MCAqIDEwMDAsIC8vIDEgaG91clxuICAgIH0sXG4gICAgbWV0aG9kOiAncG9zdCcsXG4gICAgaWQsXG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBtaWRkbGV3YXJlID0gbWFrZU1pZGRsZXdhcmUoZXhlY3V0ZSlcbiAgICB3aXRoTWlkZGxld2FyZShleGVjdXRlLCBjb250ZXh0LCBtaWRkbGV3YXJlKVxuICAgICAgLnRoZW4oKGV4ZWN1dGVXaXRoTWlkZGxld2FyZSkgPT4ge1xuICAgICAgICBleGVjdXRlV2l0aE1pZGRsZXdhcmUob3B0aW9ucywgY29udGV4dCkudGhlbigodmFsdWUpID0+IHJlc29sdmUodmFsdWUuZGF0YSkpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSlcbiAgfSlcbn1cblxuLypcbiAgTk9USUNFIVxuXG4gIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIGlzIGZldGNoaW5nIGRhdGEgZGlyZWN0bHkgZnJvbSBTZXRUb2tlbiBjb250cmFjdHMgKGh0dHBzOi8vZXRoZXJzY2FuLmlvL2FkZHJlc3MvMHg3ODczM2ZhNWU3MGUzYWI2MWRjNDlkOTM5MjFiMjg5ZTRiNjY3MDkzI2NvZGUpXG4gIE5vdGUgdGhhdCB0aGlzIGltcGxlbWVudGF0aW9uIHdvbid0IHdvcmsgaW4gb3RoZXIgbmV0d29ya3MgdW5sZXNzIHdlIGRlcGxveSBhIGNvcHkgb2YgdGhlIGNvbnRyYWN0LlxuXG4gIFRoZSBjb3JyZWN0IGltcGxlbWVudGF0aW9uIHNob3VsZCB1c2UgU2V0UHJvdG9jb2wuanMgdHlwZWQgbGlicmFyeSBpbnN0ZWFkIHRvIGZldGNoIGRhdGEgZGlyZWN0bHkgZnJvbSB0aGUgU2V0VG9rZW4gY29udHJhY3QgZGlyZWN0bHkuXG4gIFRoZSBDaGFpbmxpbmtBZGFwdGVyLmdldEFsbG9jYXRpb25zKElTZXRUb2tlbiBfc2V0VG9rZW4pIHNob3VsZCBiZSByZWltcGxlbWVudGVkIGluIEpTIGluIG9yZGVyIHRvIHVzZSBpdC5cbiovXG5cbmNvbnN0IEFCSSA9IFtcbiAge1xuICAgIGlucHV0czogW3sgaW50ZXJuYWxUeXBlOiAnY29udHJhY3QgSVNldFRva2VuJywgbmFtZTogJ19zZXRUb2tlbicsIHR5cGU6ICdhZGRyZXNzJyB9XSxcbiAgICBuYW1lOiAnZ2V0QWxsb2NhdGlvbnMnLFxuICAgIG91dHB1dHM6IFtcbiAgICAgIHsgaW50ZXJuYWxUeXBlOiAnYWRkcmVzc1tdJywgbmFtZTogJycsIHR5cGU6ICdhZGRyZXNzW10nIH0sXG4gICAgICB7IGludGVybmFsVHlwZTogJ2ludDI1NltdJywgbmFtZTogJycsIHR5cGU6ICdpbnQyNTZbXScgfSxcbiAgICBdLFxuICAgIHN0YXRlTXV0YWJpbGl0eTogJ3ZpZXcnLFxuICAgIHR5cGU6ICdmdW5jdGlvbicsXG4gIH0sXG5dXG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgY29udHJhY3RBZGRyZXNzOiB0cnVlLFxuICBzZXRBZGRyZXNzOiB0cnVlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChpbnB1dCwgY29udGV4dCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoaW5wdXQsIGlucHV0UGFyYW1ldGVycylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmpvYlJ1bklEXG4gIGNvbnN0IGNvbnRyYWN0QWRkcmVzcyA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5jb250cmFjdEFkZHJlc3NcbiAgY29uc3Qgc2V0QWRkcmVzcyA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5zZXRBZGRyZXNzXG5cbiAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZXRoZXJzLnByb3ZpZGVycy5Kc29uUnBjUHJvdmlkZXIoY29uZmlnLnJwY1VybClcbiAgY29uc3QgaW5kZXggPSBuZXcgZXRoZXJzLkNvbnRyYWN0KGNvbnRyYWN0QWRkcmVzcywgQUJJLCBwcm92aWRlcilcblxuICBjb25zdCBbYWRkcmVzc2VzLCBiYWxhbmNlc10gPSBhd2FpdCBpbmRleC5nZXRBbGxvY2F0aW9ucyhzZXRBZGRyZXNzKVxuXG4gIC8vIFRva2VuIGJhbGFuY2VzIGFyZSBjb21pbmcgYWxyZWFkeSBub3JtYWxpemVkIGFzIDE4IGRlY2ltYWxzIHRva2VuXG4gIGNvbnN0IGFsbG9jYXRpb25zID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgYWRkcmVzc2VzLm1hcChhc3luYyAoYWRkcmVzczogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0VG9rZW4oY29udGV4dCwgam9iUnVuSUQsIGFkZHJlc3MpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBiYWxhbmNlOiBiYWxhbmNlc1tpXS50b1N0cmluZygpLFxuICAgICAgICAuLi50b2tlbixcbiAgICAgIH1cbiAgICB9KSxcbiAgKVxuICBjb25zdCByZXNwb25zZSA9IHtcbiAgICBkYXRhOiBhbGxvY2F0aW9ucyxcbiAgfVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIHRydWUpXG59XG4iXX0=