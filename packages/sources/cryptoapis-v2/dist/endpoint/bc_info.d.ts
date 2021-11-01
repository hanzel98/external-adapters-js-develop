import { ExecuteWithConfig, Config, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export interface ResponseSchema {
    apiVersion: string;
    requestId: string;
    data: {
        item: {
            hash: string;
            height: number;
            previousBlockHash: string;
            timestamp: number;
            transactionsCount: number;
            blockchainSpecific: {
                difficulty: string;
                nonce: number;
                size: number;
                bits: string;
                chainwork: string;
                merkleRoot: string;
                strippedSize: number;
                version: number;
                versionHex: string;
                weight: number;
            };
        };
    };
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=bc_info.d.ts.map