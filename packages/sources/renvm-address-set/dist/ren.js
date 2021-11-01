"use strict";
/**
 * Taken from github.com/renproject/ren-js@5bfaf3f
 * This provides a v1 interop layer so we can continue using legacy behaviour
 * with the new v2 package
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenName = exports.RenTokens = exports.parseRenContract = exports.isAsset = exports.Assets = exports.Asset = exports.isRenNetwork = exports.isRenContract = exports.resolveInToken = exports.RenContracts = exports.RenContract = void 0;
const interfaces_1 = require("@renproject/interfaces");
var RenContract;
(function (RenContract) {
    RenContract["Btc2Eth"] = "BTC0Btc2Eth";
    RenContract["Eth2Btc"] = "BTC0Eth2Btc";
    RenContract["Zec2Eth"] = "ZEC0Zec2Eth";
    RenContract["Eth2Zec"] = "ZEC0Eth2Zec";
    RenContract["Bch2Eth"] = "BCH0Bch2Eth";
    RenContract["Eth2Bch"] = "BCH0Eth2Bch";
})(RenContract = exports.RenContract || (exports.RenContract = {}));
exports.RenContracts = [
    RenContract.Btc2Eth,
    RenContract.Eth2Btc,
    RenContract.Zec2Eth,
    RenContract.Eth2Zec,
    RenContract.Bch2Eth,
    RenContract.Eth2Bch,
];
const resolveInToken = (sendToken) => {
    switch (sendToken) {
        case 'BTC':
            return RenContract.Btc2Eth;
        case 'BCH':
            return RenContract.Bch2Eth;
        case 'ZEC':
            return RenContract.Zec2Eth;
        default:
            return sendToken;
    }
};
exports.resolveInToken = resolveInToken;
const isRenContract = (maybeRenContract) => exports.RenContracts.indexOf(maybeRenContract) !== -1;
exports.isRenContract = isRenContract;
const isRenNetwork = (maybeRenNetwork) => interfaces_1.RenNetworks.indexOf(maybeRenNetwork) !== -1;
exports.isRenNetwork = isRenNetwork;
var Asset;
(function (Asset) {
    Asset["BTC"] = "BTC";
    Asset["ZEC"] = "ZEC";
    Asset["ETH"] = "ETH";
    Asset["BCH"] = "BCH";
})(Asset = exports.Asset || (exports.Asset = {}));
exports.Assets = [Asset.BTC, Asset.ZEC, Asset.ETH, Asset.BCH];
const isAsset = (maybeAsset) => exports.Assets.indexOf(maybeAsset) !== -1; // tslint:disable-line: no-any
exports.isAsset = isAsset;
const renContractRegex = /^(.*)0(.*)2(.*)$/;
const defaultMatch = [undefined, undefined, undefined, undefined];
/**
 * parseRenContract splits a RenVM contract (e.g. `BTC0Eth2Btc`) into the asset
 * (`BTC`), the origin chain (`Eth`) and the target chain (`Btc`).
 */
const parseRenContract = (renContract) => {
    // re.exec("BTC0Eth2Btc") => ['BTC0Eth2Btc', 'BTC', 'Eth', 'Btc']
    const [, asset, from, to] = renContractRegex.exec(renContract) || defaultMatch;
    if (!asset || !from || !to) {
        throw new Error(`Invalid Ren Contract "${renContract}"`);
    }
    return {
        asset: asset,
        from: from,
        to: to,
    };
};
exports.parseRenContract = parseRenContract;
var RenTokens;
(function (RenTokens) {
    RenTokens["BTC"] = "BTC";
    RenTokens["ZEC"] = "ZEC";
    RenTokens["BCH"] = "BCH";
})(RenTokens = exports.RenTokens || (exports.RenTokens = {}));
const getTokenName = (tokenOrContract) => {
    switch (tokenOrContract) {
        case RenTokens.BTC:
        case RenTokens.ZEC:
        case RenTokens.BCH:
            return tokenOrContract;
        case Asset.BTC:
        case 'BTC':
            return RenTokens.BTC;
        case Asset.ZEC:
        case 'ZEC':
            return RenTokens.ZEC;
        case Asset.BCH:
        case 'BCH':
            return RenTokens.BCH;
        case Asset.ETH:
            throw new Error(`Unexpected token ${tokenOrContract}`);
        default:
            return exports.getTokenName(exports.parseRenContract(tokenOrContract).asset);
    }
};
exports.getTokenName = getTokenName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Jlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7O0FBRUgsdURBQWdFO0FBRWhFLElBQVksV0FPWDtBQVBELFdBQVksV0FBVztJQUNyQixzQ0FBdUIsQ0FBQTtJQUN2QixzQ0FBdUIsQ0FBQTtJQUN2QixzQ0FBdUIsQ0FBQTtJQUN2QixzQ0FBdUIsQ0FBQTtJQUN2QixzQ0FBdUIsQ0FBQTtJQUN2QixzQ0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBUFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFPdEI7QUFDWSxRQUFBLFlBQVksR0FBRztJQUMxQixXQUFXLENBQUMsT0FBTztJQUNuQixXQUFXLENBQUMsT0FBTztJQUNuQixXQUFXLENBQUMsT0FBTztJQUNuQixXQUFXLENBQUMsT0FBTztJQUNuQixXQUFXLENBQUMsT0FBTztJQUNuQixXQUFXLENBQUMsT0FBTztDQUNwQixDQUFBO0FBRU0sTUFBTSxjQUFjLEdBQUcsQ0FBQyxTQUFpQixFQUFlLEVBQUU7SUFDL0QsUUFBUSxTQUFTLEVBQUU7UUFDakIsS0FBSyxLQUFLO1lBQ1IsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFBO1FBQzVCLEtBQUssS0FBSztZQUNSLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQTtRQUM1QixLQUFLLEtBQUs7WUFDUixPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUE7UUFDNUI7WUFDRSxPQUFPLFNBQXdCLENBQUE7S0FDbEM7QUFDSCxDQUFDLENBQUE7QUFYWSxRQUFBLGNBQWMsa0JBVzFCO0FBRU0sTUFBTSxhQUFhLEdBQUcsQ0FBQyxnQkFBcUIsRUFBbUMsRUFBRSxDQUN0RixvQkFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBRGxDLFFBQUEsYUFBYSxpQkFDcUI7QUFFeEMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxlQUFvQixFQUFpQyxFQUFFLENBQ2xGLHdCQUFXLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBRGhDLFFBQUEsWUFBWSxnQkFDb0I7QUFFN0MsSUFBWSxLQUtYO0FBTEQsV0FBWSxLQUFLO0lBQ2Ysb0JBQVcsQ0FBQTtJQUNYLG9CQUFXLENBQUE7SUFDWCxvQkFBVyxDQUFBO0lBQ1gsb0JBQVcsQ0FBQTtBQUNiLENBQUMsRUFMVyxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFLaEI7QUFDWSxRQUFBLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMzRCxNQUFNLE9BQU8sR0FBRyxDQUFDLFVBQWUsRUFBdUIsRUFBRSxDQUFDLGNBQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQyw4QkFBOEI7QUFBcEgsUUFBQSxPQUFPLFdBQThFO0FBUWxHLE1BQU0sZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUE7QUFDM0MsTUFBTSxZQUFZLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUVqRTs7O0dBR0c7QUFDSSxNQUFNLGdCQUFnQixHQUFHLENBQUMsV0FBd0IsRUFBc0IsRUFBRTtJQUMvRSxpRUFBaUU7SUFDakUsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksWUFBWSxDQUFBO0lBQzlFLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsV0FBVyxHQUFHLENBQUMsQ0FBQTtLQUN6RDtJQUVELE9BQU87UUFDTCxLQUFLLEVBQUUsS0FBYztRQUNyQixJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxFQUFFO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQVpZLFFBQUEsZ0JBQWdCLG9CQVk1QjtBQUVELElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQix3QkFBVyxDQUFBO0lBQ1gsd0JBQVcsQ0FBQTtJQUNYLHdCQUFXLENBQUE7QUFDYixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFTSxNQUFNLFlBQVksR0FBRyxDQUMxQixlQUEwRSxFQUMvRCxFQUFFO0lBQ2IsUUFBUSxlQUFlLEVBQUU7UUFDdkIsS0FBSyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQ25CLEtBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUNuQixLQUFLLFNBQVMsQ0FBQyxHQUFHO1lBQ2hCLE9BQU8sZUFBNEIsQ0FBQTtRQUNyQyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDZixLQUFLLEtBQUs7WUFDUixPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUE7UUFDdEIsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ2YsS0FBSyxLQUFLO1lBQ1IsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFBO1FBQ3RCLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNmLEtBQUssS0FBSztZQUNSLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQTtRQUN0QixLQUFLLEtBQUssQ0FBQyxHQUFHO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsZUFBZSxFQUFFLENBQUMsQ0FBQTtRQUN4RDtZQUNFLE9BQU8sb0JBQVksQ0FBQyx3QkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUMvRDtBQUNILENBQUMsQ0FBQTtBQXRCWSxRQUFBLFlBQVksZ0JBc0J4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGFrZW4gZnJvbSBnaXRodWIuY29tL3JlbnByb2plY3QvcmVuLWpzQDViZmFmM2ZcbiAqIFRoaXMgcHJvdmlkZXMgYSB2MSBpbnRlcm9wIGxheWVyIHNvIHdlIGNhbiBjb250aW51ZSB1c2luZyBsZWdhY3kgYmVoYXZpb3VyXG4gKiB3aXRoIHRoZSBuZXcgdjIgcGFja2FnZVxuICovXG5cbmltcG9ydCB7IFJlbk5ldHdvcmssIFJlbk5ldHdvcmtzIH0gZnJvbSAnQHJlbnByb2plY3QvaW50ZXJmYWNlcydcblxuZXhwb3J0IGVudW0gUmVuQ29udHJhY3Qge1xuICBCdGMyRXRoID0gJ0JUQzBCdGMyRXRoJyxcbiAgRXRoMkJ0YyA9ICdCVEMwRXRoMkJ0YycsXG4gIFplYzJFdGggPSAnWkVDMFplYzJFdGgnLFxuICBFdGgyWmVjID0gJ1pFQzBFdGgyWmVjJyxcbiAgQmNoMkV0aCA9ICdCQ0gwQmNoMkV0aCcsXG4gIEV0aDJCY2ggPSAnQkNIMEV0aDJCY2gnLFxufVxuZXhwb3J0IGNvbnN0IFJlbkNvbnRyYWN0cyA9IFtcbiAgUmVuQ29udHJhY3QuQnRjMkV0aCxcbiAgUmVuQ29udHJhY3QuRXRoMkJ0YyxcbiAgUmVuQ29udHJhY3QuWmVjMkV0aCxcbiAgUmVuQ29udHJhY3QuRXRoMlplYyxcbiAgUmVuQ29udHJhY3QuQmNoMkV0aCxcbiAgUmVuQ29udHJhY3QuRXRoMkJjaCxcbl1cblxuZXhwb3J0IGNvbnN0IHJlc29sdmVJblRva2VuID0gKHNlbmRUb2tlbjogc3RyaW5nKTogUmVuQ29udHJhY3QgPT4ge1xuICBzd2l0Y2ggKHNlbmRUb2tlbikge1xuICAgIGNhc2UgJ0JUQyc6XG4gICAgICByZXR1cm4gUmVuQ29udHJhY3QuQnRjMkV0aFxuICAgIGNhc2UgJ0JDSCc6XG4gICAgICByZXR1cm4gUmVuQ29udHJhY3QuQmNoMkV0aFxuICAgIGNhc2UgJ1pFQyc6XG4gICAgICByZXR1cm4gUmVuQ29udHJhY3QuWmVjMkV0aFxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc2VuZFRva2VuIGFzIFJlbkNvbnRyYWN0XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGlzUmVuQ29udHJhY3QgPSAobWF5YmVSZW5Db250cmFjdDogYW55KTogbWF5YmVSZW5Db250cmFjdCBpcyBSZW5Db250cmFjdCA9PlxuICBSZW5Db250cmFjdHMuaW5kZXhPZihtYXliZVJlbkNvbnRyYWN0KSAhPT0gLTFcblxuZXhwb3J0IGNvbnN0IGlzUmVuTmV0d29yayA9IChtYXliZVJlbk5ldHdvcms6IGFueSk6IG1heWJlUmVuTmV0d29yayBpcyBSZW5OZXR3b3JrID0+XG4gIFJlbk5ldHdvcmtzLmluZGV4T2YobWF5YmVSZW5OZXR3b3JrKSAhPT0gLTFcblxuZXhwb3J0IGVudW0gQXNzZXQge1xuICBCVEMgPSAnQlRDJyxcbiAgWkVDID0gJ1pFQycsXG4gIEVUSCA9ICdFVEgnLFxuICBCQ0ggPSAnQkNIJyxcbn1cbmV4cG9ydCBjb25zdCBBc3NldHMgPSBbQXNzZXQuQlRDLCBBc3NldC5aRUMsIEFzc2V0LkVUSCwgQXNzZXQuQkNIXVxuZXhwb3J0IGNvbnN0IGlzQXNzZXQgPSAobWF5YmVBc3NldDogYW55KTogbWF5YmVBc3NldCBpcyBBc3NldCA9PiBBc3NldHMuaW5kZXhPZihtYXliZUFzc2V0KSAhPT0gLTEgLy8gdHNsaW50OmRpc2FibGUtbGluZTogbm8tYW55XG5cbmludGVyZmFjZSBSZW5Db250cmFjdERldGFpbHMge1xuICBhc3NldDogQXNzZXRcbiAgZnJvbTogc3RyaW5nXG4gIHRvOiBzdHJpbmdcbn1cblxuY29uc3QgcmVuQ29udHJhY3RSZWdleCA9IC9eKC4qKTAoLiopMiguKikkL1xuY29uc3QgZGVmYXVsdE1hdGNoID0gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cblxuLyoqXG4gKiBwYXJzZVJlbkNvbnRyYWN0IHNwbGl0cyBhIFJlblZNIGNvbnRyYWN0IChlLmcuIGBCVEMwRXRoMkJ0Y2ApIGludG8gdGhlIGFzc2V0XG4gKiAoYEJUQ2ApLCB0aGUgb3JpZ2luIGNoYWluIChgRXRoYCkgYW5kIHRoZSB0YXJnZXQgY2hhaW4gKGBCdGNgKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHBhcnNlUmVuQ29udHJhY3QgPSAocmVuQ29udHJhY3Q6IFJlbkNvbnRyYWN0KTogUmVuQ29udHJhY3REZXRhaWxzID0+IHtcbiAgLy8gcmUuZXhlYyhcIkJUQzBFdGgyQnRjXCIpID0+IFsnQlRDMEV0aDJCdGMnLCAnQlRDJywgJ0V0aCcsICdCdGMnXVxuICBjb25zdCBbLCBhc3NldCwgZnJvbSwgdG9dID0gcmVuQ29udHJhY3RSZWdleC5leGVjKHJlbkNvbnRyYWN0KSB8fCBkZWZhdWx0TWF0Y2hcbiAgaWYgKCFhc3NldCB8fCAhZnJvbSB8fCAhdG8pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgUmVuIENvbnRyYWN0IFwiJHtyZW5Db250cmFjdH1cImApXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFzc2V0OiBhc3NldCBhcyBBc3NldCxcbiAgICBmcm9tOiBmcm9tLFxuICAgIHRvOiB0byxcbiAgfVxufVxuXG5leHBvcnQgZW51bSBSZW5Ub2tlbnMge1xuICBCVEMgPSAnQlRDJyxcbiAgWkVDID0gJ1pFQycsXG4gIEJDSCA9ICdCQ0gnLFxufVxuXG5leHBvcnQgY29uc3QgZ2V0VG9rZW5OYW1lID0gKFxuICB0b2tlbk9yQ29udHJhY3Q6IFJlblRva2VucyB8IFJlbkNvbnRyYWN0IHwgQXNzZXQgfCAoJ0JUQycgfCAnWkVDJyB8ICdCQ0gnKSxcbik6IFJlblRva2VucyA9PiB7XG4gIHN3aXRjaCAodG9rZW5PckNvbnRyYWN0KSB7XG4gICAgY2FzZSBSZW5Ub2tlbnMuQlRDOlxuICAgIGNhc2UgUmVuVG9rZW5zLlpFQzpcbiAgICBjYXNlIFJlblRva2Vucy5CQ0g6XG4gICAgICByZXR1cm4gdG9rZW5PckNvbnRyYWN0IGFzIFJlblRva2Vuc1xuICAgIGNhc2UgQXNzZXQuQlRDOlxuICAgIGNhc2UgJ0JUQyc6XG4gICAgICByZXR1cm4gUmVuVG9rZW5zLkJUQ1xuICAgIGNhc2UgQXNzZXQuWkVDOlxuICAgIGNhc2UgJ1pFQyc6XG4gICAgICByZXR1cm4gUmVuVG9rZW5zLlpFQ1xuICAgIGNhc2UgQXNzZXQuQkNIOlxuICAgIGNhc2UgJ0JDSCc6XG4gICAgICByZXR1cm4gUmVuVG9rZW5zLkJDSFxuICAgIGNhc2UgQXNzZXQuRVRIOlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIHRva2VuICR7dG9rZW5PckNvbnRyYWN0fWApXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBnZXRUb2tlbk5hbWUocGFyc2VSZW5Db250cmFjdCh0b2tlbk9yQ29udHJhY3QpLmFzc2V0KVxuICB9XG59XG4iXX0=