import { ExecuteWithConfig, Config, InputParameters, EndpointResultPaths } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const endpointResultPaths: EndpointResultPaths;
export interface ResponseSchema {
    data: {
        height: number;
        version: number;
        mrkl_root: string;
        timestamp: number;
        bits: number;
        nonce: number;
        hash: string;
        prev_block_hash: string;
        next_block_hash: string;
        size: number;
        pool_difficulty: number;
        difficulty: number;
        difficulty_double: number;
        tx_count: number;
        reward_block: number;
        reward_fees: number;
        confirmations: number;
        is_orphan: boolean;
        curr_max_timestamp: number;
        is_sw_block: boolean;
        stripped_size: number;
        sigops: number;
        weight: number;
        extras: {
            pool_name: string;
            pool_link: string;
        };
    };
    err_code: number;
    err_no: number;
    message: string;
    status: string;
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=block.d.ts.map