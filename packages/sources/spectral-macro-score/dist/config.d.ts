import { Config } from '@chainlink/types';
export declare const NAME = "SPECTRAL_MACRO_SCORE";
export declare const DEFAULT_ENDPOINT = "spectral-proxy";
export declare const DEFAULT_BASE_URL = "https://xzff24vr3m.execute-api.us-east-2.amazonaws.com/default/";
export declare const DEFAULT_TIMEOUT = 60000;
export interface SpectralAdapterConfig extends Config {
    rpcUrl: string;
    nfcAddress: string;
}
export declare const makeConfig: (prefix?: string | undefined) => SpectralAdapterConfig;
//# sourceMappingURL=config.d.ts.map