import { Account, Config, DataResponse, ExecuteFactory, InputParameters } from '@chainlink/types';
export declare type IsSupported = (coin: string, chain: string) => boolean;
export declare type BalancesResponse = DataResponse<Account[], any>;
export declare type GetBalance = (account: Account, config: BalanceConfig) => Promise<BalancesResponse>;
export declare type GetBalances = (accounts: Account[], config: BalanceConfig) => Promise<BalancesResponse>;
export declare type BalanceConfig = Config & {
    confirmations?: number;
    isSupported: IsSupported;
    getBalance?: GetBalance;
    getBalances?: GetBalances;
};
export declare const inputParameters: InputParameters;
export declare const make: ExecuteFactory<BalanceConfig>;
//# sourceMappingURL=balance.d.ts.map