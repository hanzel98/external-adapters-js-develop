import { AdapterErrorResponse } from '@chainlink/types';
export declare class AdapterError extends Error {
    jobRunID: string;
    status: string;
    statusCode: number;
    name: string;
    message: string;
    cause: any;
    constructor({ jobRunID, status, statusCode, name, message, cause, }: Partial<AdapterError>);
    toJSONResponse(): AdapterErrorResponse;
}
//# sourceMappingURL=errors.d.ts.map