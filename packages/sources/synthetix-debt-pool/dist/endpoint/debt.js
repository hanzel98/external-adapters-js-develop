"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.endpointResultPaths = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ethers_1 = require("ethers");
exports.supportedEndpoints = ['debt'];
exports.endpointResultPaths = {
    debt: 'debt',
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const debt = await getCurrentDebt(config.rpcUrl, config.debtPoolCacheAddress);
    const result = {
        data: {
            result: debt.total.toString(),
            total: debt.total.toString(),
            isInvalid: debt.isInvalid,
        },
    };
    return ea_bootstrap_1.Requester.success(jobRunID, result, config.verbose);
};
exports.execute = execute;
const DEBT_POOL_ABI = [
    {
        constant: true,
        inputs: [],
        name: 'currentDebt',
        outputs: [
            {
                internalType: 'uint256',
                name: 'debt',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'anyRateIsInvalid',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
const getCurrentDebt = async (rpcUrl, debtPoolAddress) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
    const debtPool = new ethers_1.ethers.Contract(debtPoolAddress, DEBT_POOL_ABI, provider);
    const [totalDebt, isInvalid] = await debtPool.currentDebt();
    return {
        total: totalDebt,
        isInvalid,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9kZWJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE4RDtBQUc5RCxtQ0FBK0I7QUFFbEIsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRTdCLFFBQUEsbUJBQW1CLEdBQUc7SUFDakMsSUFBSSxFQUFFLE1BQU07Q0FDYixDQUFBO0FBY00sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4QyxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBQzFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDN0UsTUFBTSxNQUFNLEdBQUc7UUFDYixJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzVCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUMxQjtLQUNGLENBQUE7SUFDRCxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzVELENBQUMsQ0FBQTtBQWJZLFFBQUEsT0FBTyxXQWFuQjtBQUVELE1BQU0sYUFBYSxHQUFHO0lBQ3BCO1FBQ0UsUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsRUFBRTtRQUNWLElBQUksRUFBRSxhQUFhO1FBQ25CLE9BQU8sRUFBRTtZQUNQO2dCQUNFLFlBQVksRUFBRSxTQUFTO2dCQUN2QixJQUFJLEVBQUUsTUFBTTtnQkFDWixJQUFJLEVBQUUsU0FBUzthQUNoQjtZQUNEO2dCQUNFLFlBQVksRUFBRSxNQUFNO2dCQUNwQixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsS0FBSztRQUNkLGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLElBQUksRUFBRSxVQUFVO0tBQ2pCO0NBQ0YsQ0FBQTtBQUVELE1BQU0sY0FBYyxHQUFHLEtBQUssRUFDMUIsTUFBYyxFQUNkLGVBQXVCLEVBQ00sRUFBRTtJQUMvQixNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzdELE1BQU0sUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzlFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEdBQUcsTUFBTSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDM0QsT0FBTztRQUNMLEtBQUssRUFBRSxTQUFTO1FBQ2hCLFNBQVM7S0FDVixDQUFBO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEV4ZWN1dGVXaXRoQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCB7IGV0aGVycyB9IGZyb20gJ2V0aGVycydcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnZGVidCddXG5cbmV4cG9ydCBjb25zdCBlbmRwb2ludFJlc3VsdFBhdGhzID0ge1xuICBkZWJ0OiAnZGVidCcsXG59XG5cbmludGVyZmFjZSBDdXJyZW50RGVidFJlc3VsdHMge1xuICB0b3RhbDogZXRoZXJzLkJpZ051bWJlclxuICBpc0ludmFsaWQ6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZVNjaGVtYSB7XG4gIGRhdGE6IHtcbiAgICB0b3RhbDogc3RyaW5nXG4gICAgaXNJbnZhbGlkOiBib29sZWFuXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdClcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBkZWJ0ID0gYXdhaXQgZ2V0Q3VycmVudERlYnQoY29uZmlnLnJwY1VybCwgY29uZmlnLmRlYnRQb29sQ2FjaGVBZGRyZXNzKVxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgZGF0YToge1xuICAgICAgcmVzdWx0OiBkZWJ0LnRvdGFsLnRvU3RyaW5nKCksXG4gICAgICB0b3RhbDogZGVidC50b3RhbC50b1N0cmluZygpLFxuICAgICAgaXNJbnZhbGlkOiBkZWJ0LmlzSW52YWxpZCxcbiAgICB9LFxuICB9XG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzdWx0LCBjb25maWcudmVyYm9zZSlcbn1cblxuY29uc3QgREVCVF9QT09MX0FCSSA9IFtcbiAge1xuICAgIGNvbnN0YW50OiB0cnVlLFxuICAgIGlucHV0czogW10sXG4gICAgbmFtZTogJ2N1cnJlbnREZWJ0JyxcbiAgICBvdXRwdXRzOiBbXG4gICAgICB7XG4gICAgICAgIGludGVybmFsVHlwZTogJ3VpbnQyNTYnLFxuICAgICAgICBuYW1lOiAnZGVidCcsXG4gICAgICAgIHR5cGU6ICd1aW50MjU2JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGludGVybmFsVHlwZTogJ2Jvb2wnLFxuICAgICAgICBuYW1lOiAnYW55UmF0ZUlzSW52YWxpZCcsXG4gICAgICAgIHR5cGU6ICdib29sJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBwYXlhYmxlOiBmYWxzZSxcbiAgICBzdGF0ZU11dGFiaWxpdHk6ICd2aWV3JyxcbiAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICB9LFxuXVxuXG5jb25zdCBnZXRDdXJyZW50RGVidCA9IGFzeW5jIChcbiAgcnBjVXJsOiBzdHJpbmcsXG4gIGRlYnRQb29sQWRkcmVzczogc3RyaW5nLFxuKTogUHJvbWlzZTxDdXJyZW50RGVidFJlc3VsdHM+ID0+IHtcbiAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZXRoZXJzLnByb3ZpZGVycy5Kc29uUnBjUHJvdmlkZXIocnBjVXJsKVxuICBjb25zdCBkZWJ0UG9vbCA9IG5ldyBldGhlcnMuQ29udHJhY3QoZGVidFBvb2xBZGRyZXNzLCBERUJUX1BPT0xfQUJJLCBwcm92aWRlcilcbiAgY29uc3QgW3RvdGFsRGVidCwgaXNJbnZhbGlkXSA9IGF3YWl0IGRlYnRQb29sLmN1cnJlbnREZWJ0KClcbiAgcmV0dXJuIHtcbiAgICB0b3RhbDogdG90YWxEZWJ0LFxuICAgIGlzSW52YWxpZCxcbiAgfVxufVxuIl19