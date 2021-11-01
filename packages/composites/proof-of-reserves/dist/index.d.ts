/// <reference types="@chainlink/types" />
declare const _default: {
    NAME: string;
    makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
    makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
    handlers: import("@chainlink/ea-bootstrap").ExecuteHandler;
};
export = _default;
//# sourceMappingURL=index.d.ts.map