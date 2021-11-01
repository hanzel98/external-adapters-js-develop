/// <reference types="@chainlink/types" />
declare const _default: {
    NAME: string;
    makeExecute: import("@chainlink/types").ExecuteFactory<import("./config").Config>;
    makeConfig: (prefix?: string) => import("./config").Config;
    handlers: import("@chainlink/ea-bootstrap").ExecuteHandler;
};
export = _default;
//# sourceMappingURL=index.d.ts.map