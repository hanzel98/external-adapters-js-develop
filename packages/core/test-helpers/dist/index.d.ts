/// <reference types="@chainlink/types" />
import * as behaviors from './behaviors';
declare const _default: {
    TESTING_PRIVATE_KEY: string;
    startChain(port?: number): Promise<import("hardhat/internal/hardhat-network/jsonrpc/server").JsonRpcServer>;
    shouldBehaveLikeBalanceAdapter: typeof behaviors.shouldBehaveLikeBalanceAdapter;
    assertError(statusCode: any, data: any, expectedJobId: any): void;
    assertSuccess(statusCode: any, data: any, expectedJobId: any): void;
    successes(requests: any[], execute: import("@chainlink/types").Execute, assertions?: any): void;
    validationErrors(requests: any[], execute: import("@chainlink/types").Execute): void;
    serverErrors(requests: any[], execute: import("@chainlink/types").Execute): void;
};
export = _default;
//# sourceMappingURL=index.d.ts.map