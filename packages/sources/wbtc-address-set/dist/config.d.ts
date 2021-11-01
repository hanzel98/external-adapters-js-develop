import { Config as BaseConfig } from '@chainlink/types';
export declare const NAME = "WBTC";
export declare const DEFAULT_ENDPOINT = "addresses";
export declare const ENV_MEMBERS_ENDPOINT = "MEMBERS_ENDPOINT";
export declare const ENV_ADDRESSES_ENDPOINT = "ADDRESSES_ENDPOINT";
export declare type Config = BaseConfig & {
    membersEndpoint?: string;
    addressesEndpoint?: string;
};
export declare const makeConfig: (prefix?: string) => Config;
//# sourceMappingURL=config.d.ts.map