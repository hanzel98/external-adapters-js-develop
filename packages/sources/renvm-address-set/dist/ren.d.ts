/**
 * Taken from github.com/renproject/ren-js@5bfaf3f
 * This provides a v1 interop layer so we can continue using legacy behaviour
 * with the new v2 package
 */
import { RenNetwork } from '@renproject/interfaces';
export declare enum RenContract {
    Btc2Eth = "BTC0Btc2Eth",
    Eth2Btc = "BTC0Eth2Btc",
    Zec2Eth = "ZEC0Zec2Eth",
    Eth2Zec = "ZEC0Eth2Zec",
    Bch2Eth = "BCH0Bch2Eth",
    Eth2Bch = "BCH0Eth2Bch"
}
export declare const RenContracts: RenContract[];
export declare const resolveInToken: (sendToken: string) => RenContract;
export declare const isRenContract: (maybeRenContract: any) => maybeRenContract is RenContract;
export declare const isRenNetwork: (maybeRenNetwork: any) => maybeRenNetwork is RenNetwork;
export declare enum Asset {
    BTC = "BTC",
    ZEC = "ZEC",
    ETH = "ETH",
    BCH = "BCH"
}
export declare const Assets: Asset[];
export declare const isAsset: (maybeAsset: any) => maybeAsset is Asset;
interface RenContractDetails {
    asset: Asset;
    from: string;
    to: string;
}
/**
 * parseRenContract splits a RenVM contract (e.g. `BTC0Eth2Btc`) into the asset
 * (`BTC`), the origin chain (`Eth`) and the target chain (`Btc`).
 */
export declare const parseRenContract: (renContract: RenContract) => RenContractDetails;
export declare enum RenTokens {
    BTC = "BTC",
    ZEC = "ZEC",
    BCH = "BCH"
}
export declare const getTokenName: (tokenOrContract: RenTokens | RenContract | Asset | ('BTC' | 'ZEC' | 'BCH')) => RenTokens;
export {};
//# sourceMappingURL=ren.d.ts.map