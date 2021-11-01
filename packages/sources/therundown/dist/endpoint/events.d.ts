import { ExecuteWithConfig, Config, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const inputParameters: InputParameters;
export interface ResponseSchema {
    events: {
        score: {
            event_status: string;
        };
    }[];
}
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=events.d.ts.map