/// <reference types="node" />
/// <reference types="@chainlink/types" />
declare const _default: {
    server: () => Promise<import("http").Server>;
    makeExecute: import("@chainlink/types").ExecuteFactory<import("./config").Config>;
    makeConfig: (prefix?: string | undefined, network?: string) => import("./config").Config;
};
export = _default;
//# sourceMappingURL=index.d.ts.map