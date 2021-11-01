import { Networks } from './config';
export interface NetworkHealthCheck {
    (network: Networks, delta: number, deltaBlocks: number): Promise<undefined | boolean>;
}
export declare const getSequencerHealth: NetworkHealthCheck;
export declare const requestBlockHeight: (network: Networks) => Promise<number>;
export declare const getL1RollupStatus: NetworkHealthCheck;
export declare const getStatusByTransaction: (network: Networks, timeout: number) => Promise<boolean>;
//# sourceMappingURL=network.d.ts.map