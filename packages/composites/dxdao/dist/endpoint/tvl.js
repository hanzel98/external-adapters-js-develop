"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenAllocations = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ethers_1 = require("ethers");
exports.NAME = 'TVL';
const customParams = {
    pairContractAddress: true,
};
const dxdWethContractAbi = [
    {
        type: 'function',
        stateMutability: 'view',
        payable: false,
        outputs: [
            {
                type: 'uint256',
                name: '',
            },
        ],
        name: 'balanceOf',
        inputs: [
            {
                type: 'address',
                name: '_owner',
            },
        ],
        constant: true,
    },
];
const getTokenAllocations = async (request, config) => {
    const validator = new ea_bootstrap_1.Validator(request, customParams);
    if (validator.error)
        throw validator.error;
    const wethContractAddress = config.wethContractAddress;
    const { pairContractAddress } = validator.validated.data;
    const tvlInWei = await getTvlAtAddressInWei(pairContractAddress, wethContractAddress, config.rpcUrl);
    return [
        {
            symbol: 'ETH',
            balance: tvlInWei.toString(),
            decimals: 18,
        },
    ];
};
exports.getTokenAllocations = getTokenAllocations;
const getTvlAtAddressInWei = async (pairContractAddress, wethContractAddress, jsonRpcUrl) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(jsonRpcUrl);
    ea_bootstrap_1.Logger.info(`Fetching TVL for contract '${pairContractAddress}' using WETH contract address ${wethContractAddress}`);
    const contract = new ethers_1.ethers.Contract(wethContractAddress, dxdWethContractAbi, provider);
    const tvlInWei = (await contract.balanceOf(pairContractAddress)).mul(2);
    return tvlInWei;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHZsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L3R2bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBMkQ7QUFFM0QsbUNBQTBDO0FBSTdCLFFBQUEsSUFBSSxHQUFHLEtBQUssQ0FBQTtBQUV6QixNQUFNLFlBQVksR0FBRztJQUNuQixtQkFBbUIsRUFBRSxJQUFJO0NBQzFCLENBQUE7QUFFRCxNQUFNLGtCQUFrQixHQUFHO0lBQ3pCO1FBQ0UsSUFBSSxFQUFFLFVBQVU7UUFDaEIsZUFBZSxFQUFFLE1BQU07UUFDdkIsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsRUFBRTthQUNUO1NBQ0Y7UUFDRCxJQUFJLEVBQUUsV0FBVztRQUNqQixNQUFNLEVBQUU7WUFDTjtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsUUFBUTthQUNmO1NBQ0Y7UUFDRCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQTtBQUVNLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxFQUN0QyxPQUF1QixFQUN2QixNQUFjLEVBQ29DLEVBQUU7SUFDcEQsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUN0RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBQzFDLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFBO0lBQ3RELE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFBO0lBQ3hELE1BQU0sUUFBUSxHQUFHLE1BQU0sb0JBQW9CLENBQ3pDLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsTUFBTSxDQUFDLE1BQU0sQ0FDZCxDQUFBO0lBQ0QsT0FBTztRQUNMO1lBQ0UsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUM1QixRQUFRLEVBQUUsRUFBRTtTQUNiO0tBQ0YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQXBCWSxRQUFBLG1CQUFtQix1QkFvQi9CO0FBRUQsTUFBTSxvQkFBb0IsR0FBRyxLQUFLLEVBQ2hDLG1CQUEyQixFQUMzQixtQkFBMkIsRUFDM0IsVUFBa0IsRUFDRSxFQUFFO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDakUscUJBQU0sQ0FBQyxJQUFJLENBQ1QsOEJBQThCLG1CQUFtQixpQ0FBaUMsbUJBQW1CLEVBQUUsQ0FDeEcsQ0FBQTtJQUNELE1BQU0sUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN2RixNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sUUFBUSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3ZFLE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbGlkYXRvciwgTG9nZ2VyIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBBZGFwdGVyUmVxdWVzdCB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBldGhlcnMsIEJpZ051bWJlciB9IGZyb20gJ2V0aGVycydcbmltcG9ydCAqIGFzIFRva2VuQWxsb2NhdGlvbiBmcm9tICdAY2hhaW5saW5rL3Rva2VuLWFsbG9jYXRpb24tYWRhcHRlcidcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZydcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnVFZMJ1xuXG5jb25zdCBjdXN0b21QYXJhbXMgPSB7XG4gIHBhaXJDb250cmFjdEFkZHJlc3M6IHRydWUsXG59XG5cbmNvbnN0IGR4ZFdldGhDb250cmFjdEFiaSA9IFtcbiAge1xuICAgIHR5cGU6ICdmdW5jdGlvbicsXG4gICAgc3RhdGVNdXRhYmlsaXR5OiAndmlldycsXG4gICAgcGF5YWJsZTogZmFsc2UsXG4gICAgb3V0cHV0czogW1xuICAgICAge1xuICAgICAgICB0eXBlOiAndWludDI1NicsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG5hbWU6ICdiYWxhbmNlT2YnLFxuICAgIGlucHV0czogW1xuICAgICAge1xuICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgIG5hbWU6ICdfb3duZXInLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuXVxuXG5leHBvcnQgY29uc3QgZ2V0VG9rZW5BbGxvY2F0aW9ucyA9IGFzeW5jIChcbiAgcmVxdWVzdDogQWRhcHRlclJlcXVlc3QsXG4gIGNvbmZpZzogQ29uZmlnLFxuKTogUHJvbWlzZTxUb2tlbkFsbG9jYXRpb24udHlwZXMuVG9rZW5BbGxvY2F0aW9uW10+ID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBjdXN0b21QYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuICBjb25zdCB3ZXRoQ29udHJhY3RBZGRyZXNzID0gY29uZmlnLndldGhDb250cmFjdEFkZHJlc3NcbiAgY29uc3QgeyBwYWlyQ29udHJhY3RBZGRyZXNzIH0gPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGFcbiAgY29uc3QgdHZsSW5XZWkgPSBhd2FpdCBnZXRUdmxBdEFkZHJlc3NJbldlaShcbiAgICBwYWlyQ29udHJhY3RBZGRyZXNzLFxuICAgIHdldGhDb250cmFjdEFkZHJlc3MsXG4gICAgY29uZmlnLnJwY1VybCxcbiAgKVxuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHN5bWJvbDogJ0VUSCcsIC8vIEluc3RlYWQgb2YgcXVlcnlpbmcgdGhlIFdFVEggcHJpY2UsIGdldCBFVEggcHJpY2VcbiAgICAgIGJhbGFuY2U6IHR2bEluV2VpLnRvU3RyaW5nKCksXG4gICAgICBkZWNpbWFsczogMTgsXG4gICAgfSxcbiAgXVxufVxuXG5jb25zdCBnZXRUdmxBdEFkZHJlc3NJbldlaSA9IGFzeW5jIChcbiAgcGFpckNvbnRyYWN0QWRkcmVzczogc3RyaW5nLFxuICB3ZXRoQ29udHJhY3RBZGRyZXNzOiBzdHJpbmcsXG4gIGpzb25ScGNVcmw6IHN0cmluZyxcbik6IFByb21pc2U8QmlnTnVtYmVyPiA9PiB7XG4gIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuSnNvblJwY1Byb3ZpZGVyKGpzb25ScGNVcmwpXG4gIExvZ2dlci5pbmZvKFxuICAgIGBGZXRjaGluZyBUVkwgZm9yIGNvbnRyYWN0ICcke3BhaXJDb250cmFjdEFkZHJlc3N9JyB1c2luZyBXRVRIIGNvbnRyYWN0IGFkZHJlc3MgJHt3ZXRoQ29udHJhY3RBZGRyZXNzfWAsXG4gIClcbiAgY29uc3QgY29udHJhY3QgPSBuZXcgZXRoZXJzLkNvbnRyYWN0KHdldGhDb250cmFjdEFkZHJlc3MsIGR4ZFdldGhDb250cmFjdEFiaSwgcHJvdmlkZXIpXG4gIGNvbnN0IHR2bEluV2VpID0gKGF3YWl0IGNvbnRyYWN0LmJhbGFuY2VPZihwYWlyQ29udHJhY3RBZGRyZXNzKSkubXVsKDIpXG4gIHJldHVybiB0dmxJbldlaVxufVxuIl19