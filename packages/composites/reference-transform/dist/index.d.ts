/// <reference types="@chainlink/types" />
declare const _default: {
    NAME: string;
    makeConfig: (prefix?: string) => import("./config").Config;
    makeExecute: (config?: import("./config").Config | undefined) => import("@chainlink/types").Execute;
    handlers: import("@chainlink/ea-bootstrap").ExecuteHandler;
};
export = _default;
//# sourceMappingURL=index.d.ts.map