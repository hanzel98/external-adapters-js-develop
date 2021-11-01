import { AdapterContext } from '@chainlink/types';
export declare const DEFAULT_RATE_LIMIT_ENABLED = true;
export interface Config {
    /**
     * The time to live on a subscription, if no new requests come in that do not
     * originate from the warm up engine itself
     */
    burstCapacity1s: number;
    burstCapacity1m: number;
    totalCapacity: number;
    /**
     * Determines if Rate Limit option is activated
     */
    enabled: boolean;
}
export declare function get(context: AdapterContext): Config;
//# sourceMappingURL=config.d.ts.map