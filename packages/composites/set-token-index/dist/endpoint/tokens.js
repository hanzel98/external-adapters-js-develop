"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.getToken = exports.supportedEndpoints = void 0;
const ethers_1 = require("ethers");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['tokens'];
const getDirectory = async (network) => {
    return await Promise.resolve().then(() => __importStar(require(`./directory.${network}.json`)));
};
const ERC20ABI = [
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
const ERC20ABI_bytes32 = [
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                name: '',
                type: 'bytes32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
const getOnChainErc20Token = async (rpcUrl, address) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
    const _symbol = (abi) => new ethers_1.ethers.Contract(address, abi, provider).symbol();
    const decimals = await new ethers_1.ethers.Contract(address, ERC20ABI, provider).decimals();
    ea_bootstrap_1.Logger.debug(`Fetching ERC20 token details from blockchain on address ${address}`);
    return { symbol: await getOnChainSymbol(_symbol), decimals };
};
const getOnChainSymbol = async (_symbol) => {
    try {
        return await _symbol(ERC20ABI);
    }
    catch (ignoreable) {
        // TODO: is this error really ignoreable in all cases?
        return ethers_1.utils.parseBytes32String(await _symbol(ERC20ABI_bytes32));
    }
};
let cachedDirectory;
const getToken = async (address, rpcUrl, network) => {
    if (!cachedDirectory) {
        cachedDirectory = await getDirectory(network);
    }
    return cachedDirectory[address] || (await getOnChainErc20Token(rpcUrl, address));
};
exports.getToken = getToken;
exports.inputParameters = {
    address: true,
};
const execute = async (input, _, config) => {
    const validator = new ea_bootstrap_1.Validator(input, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.jobRunID;
    const address = validator.validated.data.address;
    if (!cachedDirectory) {
        cachedDirectory = await getDirectory(config.network);
    }
    const token = cachedDirectory[address] || (await getOnChainErc20Token(config.rpcUrl, address));
    const response = {
        data: token,
    };
    return ea_bootstrap_1.Requester.success(jobRunID, response, true);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L3Rva2Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQXNDO0FBQ3RDLDBEQUFzRTtBQUl6RCxRQUFBLGtCQUFrQixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7QUFJNUMsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUFFLE9BQWUsRUFBc0IsRUFBRTtJQUNqRSxPQUFPLHdEQUFhLGVBQWUsT0FBTyxPQUFPLEdBQUMsQ0FBQTtBQUNwRCxDQUFDLENBQUE7QUFFRCxNQUFNLFFBQVEsR0FBRztJQUNmO1FBQ0UsUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUN2QyxPQUFPLEVBQUUsS0FBSztRQUNkLGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLElBQUksRUFBRSxVQUFVO0tBQ2pCO0lBQ0Q7UUFDRSxRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFVBQVU7UUFDaEIsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN0QyxPQUFPLEVBQUUsS0FBSztRQUNkLGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLElBQUksRUFBRSxVQUFVO0tBQ2pCO0NBQ0YsQ0FBQTtBQUVELE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkI7UUFDRSxRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxJQUFJLEVBQUUsRUFBRTtnQkFDUixJQUFJLEVBQUUsU0FBUzthQUNo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bkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBldGhlcnMsIHV0aWxzIH0gZnJvbSAnZXRoZXJzJ1xuaW1wb3J0IHsgTG9nZ2VyLCBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIElucHV0UGFyYW1ldGVycyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ3Rva2VucyddXG5cbnR5cGUgRGlyZWN0b3J5ID0gUmVjb3JkPHN0cmluZywgeyBzeW1ib2w6IHN0cmluZzsgZGVjaW1hbHM6IG51bWJlciB9PlxuXG5jb25zdCBnZXREaXJlY3RvcnkgPSBhc3luYyAobmV0d29yazogc3RyaW5nKTogUHJvbWlzZTxEaXJlY3Rvcnk+ID0+IHtcbiAgcmV0dXJuIGF3YWl0IGltcG9ydChgLi9kaXJlY3RvcnkuJHtuZXR3b3JrfS5qc29uYClcbn1cblxuY29uc3QgRVJDMjBBQkkgPSBbXG4gIHtcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgICBpbnB1dHM6IFtdLFxuICAgIG5hbWU6ICdzeW1ib2wnLFxuICAgIG91dHB1dHM6IFt7IG5hbWU6ICcnLCB0eXBlOiAnc3RyaW5nJyB9XSxcbiAgICBwYXlhYmxlOiBmYWxzZSxcbiAgICBzdGF0ZU11dGFiaWxpdHk6ICd2aWV3JyxcbiAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICB9LFxuICB7XG4gICAgY29uc3RhbnQ6IHRydWUsXG4gICAgaW5wdXRzOiBbXSxcbiAgICBuYW1lOiAnZGVjaW1hbHMnLFxuICAgIG91dHB1dHM6IFt7IG5hbWU6ICcnLCB0eXBlOiAndWludDgnIH1dLFxuICAgIHBheWFibGU6IGZhbHNlLFxuICAgIHN0YXRlTXV0YWJpbGl0eTogJ3ZpZXcnLFxuICAgIHR5cGU6ICdmdW5jdGlvbicsXG4gIH0sXG5dXG5cbmNvbnN0IEVSQzIwQUJJX2J5dGVzMzIgPSBbXG4gIHtcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgICBpbnB1dHM6IFtdLFxuICAgIG5hbWU6ICdzeW1ib2wnLFxuICAgIG91dHB1dHM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIHR5cGU6ICdieXRlczMyJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBwYXlhYmxlOiBmYWxzZSxcbiAgICBzdGF0ZU11dGFiaWxpdHk6ICd2aWV3JyxcbiAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICB9LFxuXVxuXG5jb25zdCBnZXRPbkNoYWluRXJjMjBUb2tlbiA9IGFzeW5jIChcbiAgcnBjVXJsOiBzdHJpbmcsXG4gIGFkZHJlc3M6IHN0cmluZyxcbik6IFByb21pc2U8eyBzeW1ib2w6IHN0cmluZzsgZGVjaW1hbHM6IG51bWJlciB9PiA9PiB7XG4gIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuSnNvblJwY1Byb3ZpZGVyKHJwY1VybClcbiAgY29uc3QgX3N5bWJvbCA9IChhYmk6IGV0aGVycy5Db250cmFjdEludGVyZmFjZSkgPT5cbiAgICBuZXcgZXRoZXJzLkNvbnRyYWN0KGFkZHJlc3MsIGFiaSwgcHJvdmlkZXIpLnN5bWJvbCgpXG4gIGNvbnN0IGRlY2ltYWxzID0gYXdhaXQgbmV3IGV0aGVycy5Db250cmFjdChhZGRyZXNzLCBFUkMyMEFCSSwgcHJvdmlkZXIpLmRlY2ltYWxzKClcbiAgTG9nZ2VyLmRlYnVnKGBGZXRjaGluZyBFUkMyMCB0b2tlbiBkZXRhaWxzIGZyb20gYmxvY2tjaGFpbiBvbiBhZGRyZXNzICR7YWRkcmVzc31gKVxuICByZXR1cm4geyBzeW1ib2w6IGF3YWl0IGdldE9uQ2hhaW5TeW1ib2woX3N5bWJvbCksIGRlY2ltYWxzIH1cbn1cblxuY29uc3QgZ2V0T25DaGFpblN5bWJvbCA9IGFzeW5jIChcbiAgX3N5bWJvbDogKGFiaTogZXRoZXJzLkNvbnRyYWN0SW50ZXJmYWNlKSA9PiBQcm9taXNlPHN0cmluZz4sXG4pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBfc3ltYm9sKEVSQzIwQUJJKVxuICB9IGNhdGNoIChpZ25vcmVhYmxlKSB7XG4gICAgLy8gVE9ETzogaXMgdGhpcyBlcnJvciByZWFsbHkgaWdub3JlYWJsZSBpbiBhbGwgY2FzZXM/XG4gICAgcmV0dXJuIHV0aWxzLnBhcnNlQnl0ZXMzMlN0cmluZyhhd2FpdCBfc3ltYm9sKEVSQzIwQUJJX2J5dGVzMzIpKVxuICB9XG59XG5cbmxldCBjYWNoZWREaXJlY3Rvcnk6IERpcmVjdG9yeVxuXG5leHBvcnQgY29uc3QgZ2V0VG9rZW4gPSBhc3luYyAoXG4gIGFkZHJlc3M6IHN0cmluZyxcbiAgcnBjVXJsOiBzdHJpbmcsXG4gIG5ldHdvcms6IHN0cmluZyxcbik6IFByb21pc2U8eyBzeW1ib2w6IHN0cmluZzsgZGVjaW1hbHM6IG51bWJlciB9PiA9PiB7XG4gIGlmICghY2FjaGVkRGlyZWN0b3J5KSB7XG4gICAgY2FjaGVkRGlyZWN0b3J5ID0gYXdhaXQgZ2V0RGlyZWN0b3J5KG5ldHdvcmspXG4gIH1cbiAgcmV0dXJuIGNhY2hlZERpcmVjdG9yeVthZGRyZXNzXSB8fCAoYXdhaXQgZ2V0T25DaGFpbkVyYzIwVG9rZW4ocnBjVXJsLCBhZGRyZXNzKSlcbn1cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBhZGRyZXNzOiB0cnVlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChpbnB1dCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoaW5wdXQsIGlucHV0UGFyYW1ldGVycylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmpvYlJ1bklEXG4gIGNvbnN0IGFkZHJlc3MgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuYWRkcmVzc1xuXG4gIGlmICghY2FjaGVkRGlyZWN0b3J5KSB7XG4gICAgY2FjaGVkRGlyZWN0b3J5ID0gYXdhaXQgZ2V0RGlyZWN0b3J5KGNvbmZpZy5uZXR3b3JrKVxuICB9XG4gIGNvbnN0IHRva2VuID0gY2FjaGVkRGlyZWN0b3J5W2FkZHJlc3NdIHx8IChhd2FpdCBnZXRPbkNoYWluRXJjMjBUb2tlbihjb25maWcucnBjVXJsLCBhZGRyZXNzKSlcblxuICBjb25zdCByZXNwb25zZSA9IHtcbiAgICBkYXRhOiB0b2tlbixcbiAgfVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgcmVzcG9uc2UsIHRydWUpXG59XG4iXX0=