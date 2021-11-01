import { InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const inputParameters: InputParameters;
declare type Response = {
    jobRunID: string;
    statusCode: number;
    status?: string;
    data: any;
    result: any;
    error?: any;
};
export declare type JobRequest = {
    id: string;
    data: Request;
};
export declare type Request = {
    method?: string;
};
export declare type GetRequest = Request & {
    transfer_id: string;
};
export declare type SendRequest = Request & {
    destination: string;
    amount: string;
    currency?: string;
    source?: string;
};
export declare const createRequest: (input: JobRequest) => Promise<unknown>;
export declare const execute: (req: JobRequest) => Promise<Response>;
export {};
//# sourceMappingURL=dwolla.d.ts.map