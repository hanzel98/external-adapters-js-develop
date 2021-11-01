/// <reference types="node" />
/// <reference types="@chainlink/types" />
declare const _default: {
    server: () => Promise<import("http").Server>;
    NAME: string;
    makeExecute: import("@chainlink/types").ExecuteFactory<import("./config").Config>;
    makeConfig: (prefix?: string | undefined) => import("./config").Config;
};
export = _default;
//# sourceMappingURL=index.d.ts.map