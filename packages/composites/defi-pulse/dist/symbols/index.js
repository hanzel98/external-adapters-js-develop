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
exports.getSymbol = void 0;
const ethers_1 = require("ethers");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const getDirectory = async (network) => {
    const directory = await Promise.resolve().then(() => __importStar(require(`./directory.${network}.json`)));
    return directory;
};
const ERC20ABI = ['function symbol() view returns (string)'];
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
const getERC20Symbol = async (rpcUrl, address) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
    const _symbol = (abi) => new ethers_1.ethers.Contract(address, abi, provider).symbol();
    ea_bootstrap_1.Logger.debug('Calling blockchain to get ERC20 token symbol...');
    try {
        return await _symbol(ERC20ABI);
    }
    catch (ignoreable) {
        // TODO: is this error really ignoreable in all cases?
        return ethers_1.utils.parseBytes32String(await _symbol(ERC20ABI_bytes32));
    }
};
let cachedDirectory;
const getSymbol = async (address, rpcUrl, network) => {
    if (!cachedDirectory) {
        cachedDirectory = await getDirectory(network);
    }
    return cachedDirectory[address] || (await getERC20Symbol(rpcUrl, address));
};
exports.getSymbol = getSymbol;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3ltYm9scy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQXNDO0FBQ3RDLDBEQUFnRDtBQUloRCxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsT0FBZSxFQUFzQixFQUFFO0lBQ2pFLE1BQU0sU0FBUyxHQUFHLHdEQUFhLGVBQWUsT0FBTyxPQUFPLEdBQUMsQ0FBQTtJQUM3RCxPQUFPLFNBQVMsQ0FBQTtBQUNsQixDQUFDLENBQUE7QUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUE7QUFDNUQsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QjtRQUNFLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRTtZQUNQO2dCQUNFLElBQUksRUFBRSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2FBQ2hCO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsS0FBSztRQUNkLGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLElBQUksRUFBRSxVQUFVO0tBQ2pCO0NBQ0YsQ0FBQTtBQUVELE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxNQUFjLEVBQUUsT0FBZSxFQUFtQixFQUFFO0lBQ2hGLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDN0QsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2xGLHFCQUFNLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUE7SUFDL0QsSUFBSTtRQUNGLE9BQU8sTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDL0I7SUFBQyxPQUFPLFVBQVUsRUFBRTtRQUNuQixzREFBc0Q7UUFDdEQsT0FBTyxjQUFLLENBQUMsa0JBQWtCLENBQUMsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO0tBQ2pFO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsSUFBSSxlQUEwQixDQUFBO0FBRXZCLE1BQU0sU0FBUyxHQUFHLEtBQUssRUFDNUIsT0FBZSxFQUNmLE1BQWMsRUFDZCxPQUFlLEVBQ0UsRUFBRTtJQUNuQixJQUFJLENBQUMsZUFBZSxFQUFFO1FBQ3BCLGVBQWUsR0FBRyxNQUFNLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUM5QztJQUNELE9BQU8sZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7QUFDNUUsQ0FBQyxDQUFBO0FBVFksUUFBQSxTQUFTLGFBU3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXRoZXJzLCB1dGlscyB9IGZyb20gJ2V0aGVycydcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuXG50eXBlIERpcmVjdG9yeSA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cblxuY29uc3QgZ2V0RGlyZWN0b3J5ID0gYXN5bmMgKG5ldHdvcms6IHN0cmluZyk6IFByb21pc2U8RGlyZWN0b3J5PiA9PiB7XG4gIGNvbnN0IGRpcmVjdG9yeSA9IGF3YWl0IGltcG9ydChgLi9kaXJlY3RvcnkuJHtuZXR3b3JrfS5qc29uYClcbiAgcmV0dXJuIGRpcmVjdG9yeVxufVxuXG5jb25zdCBFUkMyMEFCSSA9IFsnZnVuY3Rpb24gc3ltYm9sKCkgdmlldyByZXR1cm5zIChzdHJpbmcpJ11cbmNvbnN0IEVSQzIwQUJJX2J5dGVzMzIgPSBbXG4gIHtcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgICBpbnB1dHM6IFtdLFxuICAgIG5hbWU6ICdzeW1ib2wnLFxuICAgIG91dHB1dHM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIHR5cGU6ICdieXRlczMyJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBwYXlhYmxlOiBmYWxzZSxcbiAgICBzdGF0ZU11dGFiaWxpdHk6ICd2aWV3JyxcbiAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICB9LFxuXVxuXG5jb25zdCBnZXRFUkMyMFN5bWJvbCA9IGFzeW5jIChycGNVcmw6IHN0cmluZywgYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZXRoZXJzLnByb3ZpZGVycy5Kc29uUnBjUHJvdmlkZXIocnBjVXJsKVxuICBjb25zdCBfc3ltYm9sID0gKGFiaTogYW55KSA9PiBuZXcgZXRoZXJzLkNvbnRyYWN0KGFkZHJlc3MsIGFiaSwgcHJvdmlkZXIpLnN5bWJvbCgpXG4gIExvZ2dlci5kZWJ1ZygnQ2FsbGluZyBibG9ja2NoYWluIHRvIGdldCBFUkMyMCB0b2tlbiBzeW1ib2wuLi4nKVxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBfc3ltYm9sKEVSQzIwQUJJKVxuICB9IGNhdGNoIChpZ25vcmVhYmxlKSB7XG4gICAgLy8gVE9ETzogaXMgdGhpcyBlcnJvciByZWFsbHkgaWdub3JlYWJsZSBpbiBhbGwgY2FzZXM/XG4gICAgcmV0dXJuIHV0aWxzLnBhcnNlQnl0ZXMzMlN0cmluZyhhd2FpdCBfc3ltYm9sKEVSQzIwQUJJX2J5dGVzMzIpKVxuICB9XG59XG5cbmxldCBjYWNoZWREaXJlY3Rvcnk6IERpcmVjdG9yeVxuXG5leHBvcnQgY29uc3QgZ2V0U3ltYm9sID0gYXN5bmMgKFxuICBhZGRyZXNzOiBzdHJpbmcsXG4gIHJwY1VybDogc3RyaW5nLFxuICBuZXR3b3JrOiBzdHJpbmcsXG4pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBpZiAoIWNhY2hlZERpcmVjdG9yeSkge1xuICAgIGNhY2hlZERpcmVjdG9yeSA9IGF3YWl0IGdldERpcmVjdG9yeShuZXR3b3JrKVxuICB9XG4gIHJldHVybiBjYWNoZWREaXJlY3RvcnlbYWRkcmVzc10gfHwgKGF3YWl0IGdldEVSQzIwU3ltYm9sKHJwY1VybCwgYWRkcmVzcykpXG59XG4iXX0=