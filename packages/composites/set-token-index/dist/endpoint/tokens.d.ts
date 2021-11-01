import { ExecuteWithConfig, InputParameters } from '@chainlink/types';
import { Config } from '../config';
export declare const supportedEndpoints: string[];
export declare const getToken: (address: string, rpcUrl: string, network: string) => Promise<{
    symbol: string;
    decimals: number;
}>;
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=tokens.d.ts.map