"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.supportedEndpoints = void 0;
const ethers_1 = require("ethers");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['allocations'];
const controllerABI = [
    {
        inputs: [],
        name: 'pools',
        outputs: [{ type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
];
const addressListABI = [
    {
        inputs: [],
        name: 'length',
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ type: 'uint256' }],
        name: 'at',
        outputs: [{ type: 'address' }, { type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
];
const vTokenABI = [
    {
        inputs: [],
        name: 'token',
        outputs: [{ type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'totalValue',
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
];
const tokenABI = [
    {
        inputs: [],
        name: 'symbol',
        outputs: [{ type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'decimals',
        outputs: [{ type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
    },
];
const getToken = async (tokenAddress, provider) => {
    const token = new ethers_1.ethers.Contract(tokenAddress, tokenABI, provider);
    let symbol = await token.symbol();
    // Instead of querying the WETH price, get ETH price
    if (symbol.toUpperCase() === 'WETH') {
        symbol = 'ETH';
    }
    const decimals = await token.decimals();
    return {
        symbol,
        decimals,
    };
};
const getTotalValue = async (vTokenAddress, provider) => {
    const vToken = new ethers_1.ethers.Contract(vTokenAddress, vTokenABI, provider);
    const tokenAddress = (await vToken.token());
    const token = await getToken(tokenAddress, provider);
    return {
        ...token,
        token: tokenAddress,
        balance: (await vToken.totalValue()),
    };
};
const getPoolValue = async (poolAddress, provider) => {
    const pool = new ethers_1.ethers.Contract(poolAddress, addressListABI, provider);
    const listLength = await pool.length();
    const _getValue = async (index) => getTotalValue((await pool.at(index))[0], provider);
    const getValues = new Array(listLength.toNumber()).fill(0).map((_, i) => _getValue(i));
    return Promise.all(getValues);
};
const execute = async (input, _, config) => {
    const validator = new ea_bootstrap_1.Validator(input, {});
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.jobRunID;
    const controllerAddress = config.controllerAddress;
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(config.rpcUrl);
    const controller = new ethers_1.ethers.Contract(controllerAddress, controllerABI, provider);
    const pool = (await controller.pools());
    const values = await getPoolValue(pool, provider);
    const tokens = {};
    values.forEach(({ token, balance, symbol, decimals }) => {
        if (token in tokens) {
            tokens[token].balance = tokens[token].balance.add(balance);
        }
        else {
            tokens[token] = {
                symbol,
                decimals,
                balance,
            };
        }
    });
    const _convertBigNumberish = (input) => ({
        ...input,
        balance: input.balance.toString(),
    });
    const allocations = Object.values(tokens).map((token) => _convertBigNumberish(token));
    const response = {
        data: allocations,
    };
    return ea_bootstrap_1.Requester.success(jobRunID, response, true);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsb2NhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnQvYWxsb2NhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQStCO0FBSS9CLDBEQUE4RDtBQUVqRCxRQUFBLGtCQUFrQixHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7QUFFakQsTUFBTSxhQUFhLEdBQUc7SUFDcEI7UUFDRSxNQUFNLEVBQUUsRUFBRTtRQUNWLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDOUIsZUFBZSxFQUFFLE1BQU07UUFDdkIsSUFBSSxFQUFFLFVBQVU7S0FDakI7Q0FDRixDQUFBO0FBRUQsTUFBTSxjQUFjLEdBQUc7SUFDckI7UUFDRSxNQUFNLEVBQUUsRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDOUIsZUFBZSxFQUFFLE1BQU07UUFDdkIsSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRDtRQUNFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDbkQsZUFBZSxFQUFFLE1BQU07UUFDdkIsSUFBSSxFQUFFLFVBQVU7S0FDakI7Q0FDRixDQUFBO0FBRUQsTUFBTSxTQUFTLEdBQUc7SUFDaEI7UUFDRSxNQUFNLEVBQUUsRUFBRTtRQUNWLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDOUIsZUFBZSxFQUFFLE1BQU07UUFDdkIsSUFBSSxFQUFF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QUNSLENBQUE7U0FDRjtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLEtBSTdCLEVBQXlCLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsS0FBSztRQUNSLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtLQUNsQyxDQUFDLENBQUE7SUFFRixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNyRixNQUFNLFFBQVEsR0FBRztRQUNmLElBQUksRUFBRSxXQUFXO0tBQ2xCLENBQUE7SUFFRCxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDcEQsQ0FBQyxDQUFBO0FBNUNZLFFBQUEsT0FBTyxXQTRDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBldGhlcnMgfSBmcm9tICdldGhlcnMnXG5pbXBvcnQgeyB0eXBlcyB9IGZyb20gJ0BjaGFpbmxpbmsvdG9rZW4tYWxsb2NhdGlvbi1hZGFwdGVyJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJ1xuaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnYWxsb2NhdGlvbnMnXVxuXG5jb25zdCBjb250cm9sbGVyQUJJID0gW1xuICB7XG4gICAgaW5wdXRzOiBbXSxcbiAgICBuYW1lOiAncG9vbHMnLFxuICAgIG91dHB1dHM6IFt7IHR5cGU6ICdhZGRyZXNzJyB9XSxcbiAgICBzdGF0ZU11dGFiaWxpdHk6ICd2aWV3JyxcbiAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICB9LFxuXVxuXG5jb25zdCBhZGRyZXNzTGlzdEFCSSA9IFtcbiAge1xuICAgIGlucHV0czogW10sXG4gICAgbmFtZTogJ2xlbmd0aCcsXG4gICAgb3V0cHV0czogW3sgdHlwZTogJ3VpbnQyNTYnIH1dLFxuICAgIHN0YXRlTXV0YWJpbGl0eTogJ3ZpZXcnLFxuICAgIHR5cGU6ICdmdW5jdGlvbicsXG4gIH0sXG4gIHtcbiAgICBpbnB1dHM6IFt7IHR5cGU6ICd1aW50MjU2JyB9XSxcbiAgICBuYW1lOiAnYXQnLFxuICAgIG91dHB1dHM6IFt7IHR5cGU6ICdhZGRyZXNzJyB9LCB7IHR5cGU6ICd1aW50MjU2JyB9XSxcbiAgICBzdGF0ZU11dGFiaWxpdHk6ICd2aWV3JyxcbiAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICB9LFxuXVxuXG5jb25zdCB2VG9rZW5BQkkgPSBbXG4gIHtcbiAgICBpbnB1dHM6IFtdLFxuICAgIG5hbWU6ICd0b2tlbicsXG4gICAgb3V0cHV0czogW3sgdHlwZTogJ2FkZHJlc3MnIH1dLFxuICAgIHN0YXRlTXV0YWJpbGl0eTogJ3ZpZXcnLFxuICAgIHR5cGU6ICdmdW5jdGlvbicsXG4gIH0sXG4gIHtcbiAgICBpbnB1dHM6IFtdLFxuICAgIG5hbWU6ICd0b3RhbFZhbHVlJyxcbiAgICBvdXRwdXRzOiBbeyB0eXBlOiAndWludDI1NicgfV0sXG4gICAgc3RhdGVNdXRhYmlsaXR5OiAndmlldycsXG4gICAgdHlwZTogJ2Z1bmN0aW9uJyxcbiAgfSxcbl1cblxuY29uc3QgdG9rZW5BQkkgPSBbXG4gIHtcbiAgICBpbnB1dHM6IFtdLFxuICAgIG5hbWU6ICdzeW1ib2wnLFxuICAgIG91dHB1dHM6IFt7IHR5cGU6ICdzdHJpbmcnIH1dLFxuICAgIHN0YXRlTXV0YWJpbGl0eTogJ3ZpZXcnLFxuICAgIHR5cGU6ICdmdW5jdGlvbicsXG4gIH0sXG4gIHtcbiAgICBpbnB1dHM6IFtdLFxuICAgIG5hbWU6ICdkZWNpbWFscycsXG4gICAgb3V0cHV0czogW3sgdHlwZTogJ3VpbnQ4JyB9XSxcbiAgICBzdGF0ZU11dGFiaWxpdHk6ICd2aWV3JyxcbiAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICB9LFxuXVxuXG5jb25zdCBnZXRUb2tlbiA9IGFzeW5jICh0b2tlbkFkZHJlc3M6IHN0cmluZywgcHJvdmlkZXI6IGV0aGVycy5wcm92aWRlcnMuUHJvdmlkZXIpID0+IHtcbiAgY29uc3QgdG9rZW4gPSBuZXcgZXRoZXJzLkNvbnRyYWN0KHRva2VuQWRkcmVzcywgdG9rZW5BQkksIHByb3ZpZGVyKVxuICBsZXQgc3ltYm9sID0gYXdhaXQgdG9rZW4uc3ltYm9sKClcbiAgLy8gSW5zdGVhZCBvZiBxdWVyeWluZyB0aGUgV0VUSCBwcmljZSwgZ2V0IEVUSCBwcmljZVxuICBpZiAoc3ltYm9sLnRvVXBwZXJDYXNlKCkgPT09ICdXRVRIJykge1xuICAgIHN5bWJvbCA9ICdFVEgnXG4gIH1cbiAgY29uc3QgZGVjaW1hbHMgPSBhd2FpdCB0b2tlbi5kZWNpbWFscygpXG4gIHJldHVybiB7XG4gICAgc3ltYm9sLFxuICAgIGRlY2ltYWxzLFxuICB9XG59XG5cbmNvbnN0IGdldFRvdGFsVmFsdWUgPSBhc3luYyAodlRva2VuQWRkcmVzczogc3RyaW5nLCBwcm92aWRlcjogZXRoZXJzLnByb3ZpZGVycy5Qcm92aWRlcikgPT4ge1xuICBjb25zdCB2VG9rZW4gPSBuZXcgZXRoZXJzLkNvbnRyYWN0KHZUb2tlbkFkZHJlc3MsIHZUb2tlbkFCSSwgcHJvdmlkZXIpXG4gIGNvbnN0IHRva2VuQWRkcmVzcyA9IChhd2FpdCB2VG9rZW4udG9rZW4oKSkgYXMgc3RyaW5nXG4gIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0VG9rZW4odG9rZW5BZGRyZXNzLCBwcm92aWRlcilcbiAgcmV0dXJuIHtcbiAgICAuLi50b2tlbixcbiAgICB0b2tlbjogdG9rZW5BZGRyZXNzLFxuICAgIGJhbGFuY2U6IChhd2FpdCB2VG9rZW4udG90YWxWYWx1ZSgpKSBhcyBldGhlcnMuQmlnTnVtYmVyLFxuICB9XG59XG5cbmNvbnN0IGdldFBvb2xWYWx1ZSA9IGFzeW5jIChwb29sQWRkcmVzczogc3RyaW5nLCBwcm92aWRlcjogZXRoZXJzLnByb3ZpZGVycy5Qcm92aWRlcikgPT4ge1xuICBjb25zdCBwb29sID0gbmV3IGV0aGVycy5Db250cmFjdChwb29sQWRkcmVzcywgYWRkcmVzc0xpc3RBQkksIHByb3ZpZGVyKVxuICBjb25zdCBsaXN0TGVuZ3RoOiBldGhlcnMuQmlnTnVtYmVyID0gYXdhaXQgcG9vbC5sZW5ndGgoKVxuXG4gIGNvbnN0IF9nZXRWYWx1ZSA9IGFzeW5jIChpbmRleDogbnVtYmVyKSA9PiBnZXRUb3RhbFZhbHVlKChhd2FpdCBwb29sLmF0KGluZGV4KSlbMF0sIHByb3ZpZGVyKVxuICBjb25zdCBnZXRWYWx1ZXMgPSBuZXcgQXJyYXkobGlzdExlbmd0aC50b051bWJlcigpKS5maWxsKDApLm1hcCgoXywgaSkgPT4gX2dldFZhbHVlKGkpKVxuICByZXR1cm4gUHJvbWlzZS5hbGwoZ2V0VmFsdWVzKVxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChpbnB1dCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoaW5wdXQsIHt9KVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuam9iUnVuSURcbiAgY29uc3QgY29udHJvbGxlckFkZHJlc3MgPSBjb25maWcuY29udHJvbGxlckFkZHJlc3NcblxuICBjb25zdCBwcm92aWRlciA9IG5ldyBldGhlcnMucHJvdmlkZXJzLkpzb25ScGNQcm92aWRlcihjb25maWcucnBjVXJsKVxuXG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgZXRoZXJzLkNvbnRyYWN0KGNvbnRyb2xsZXJBZGRyZXNzLCBjb250cm9sbGVyQUJJLCBwcm92aWRlcilcbiAgY29uc3QgcG9vbCA9IChhd2FpdCBjb250cm9sbGVyLnBvb2xzKCkpIGFzIHN0cmluZ1xuXG4gIGNvbnN0IHZhbHVlcyA9IGF3YWl0IGdldFBvb2xWYWx1ZShwb29sLCBwcm92aWRlcilcblxuICBjb25zdCB0b2tlbnM6IHtcbiAgICBbdG9rZW46IHN0cmluZ106IHsgc3ltYm9sOiBzdHJpbmc7IGRlY2ltYWxzOiBudW1iZXI7IGJhbGFuY2U6IGV0aGVycy5CaWdOdW1iZXIgfVxuICB9ID0ge31cbiAgdmFsdWVzLmZvckVhY2goKHsgdG9rZW4sIGJhbGFuY2UsIHN5bWJvbCwgZGVjaW1hbHMgfSkgPT4ge1xuICAgIGlmICh0b2tlbiBpbiB0b2tlbnMpIHtcbiAgICAgIHRva2Vuc1t0b2tlbl0uYmFsYW5jZSA9IHRva2Vuc1t0b2tlbl0uYmFsYW5jZS5hZGQoYmFsYW5jZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdG9rZW5zW3Rva2VuXSA9IHtcbiAgICAgICAgc3ltYm9sLFxuICAgICAgICBkZWNpbWFscyxcbiAgICAgICAgYmFsYW5jZSxcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgX2NvbnZlcnRCaWdOdW1iZXJpc2ggPSAoaW5wdXQ6IHtcbiAgICBzeW1ib2w6IHN0cmluZ1xuICAgIGRlY2ltYWxzOiBudW1iZXJcbiAgICBiYWxhbmNlOiBldGhlcnMuQmlnTnVtYmVyXG4gIH0pOiB0eXBlcy5Ub2tlbkFsbG9jYXRpb24gPT4gKHtcbiAgICAuLi5pbnB1dCxcbiAgICBiYWxhbmNlOiBpbnB1dC5iYWxhbmNlLnRvU3RyaW5nKCksXG4gIH0pXG5cbiAgY29uc3QgYWxsb2NhdGlvbnMgPSBPYmplY3QudmFsdWVzKHRva2VucykubWFwKCh0b2tlbikgPT4gX2NvbnZlcnRCaWdOdW1iZXJpc2godG9rZW4pKVxuICBjb25zdCByZXNwb25zZSA9IHtcbiAgICBkYXRhOiBhbGxvY2F0aW9ucyxcbiAgfVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIHRydWUpXG59XG4iXX0=