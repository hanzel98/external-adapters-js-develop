/// <reference types="node" />
/// <reference types="@chainlink/types" />
declare const _default: {
    server: () => Promise<import("http").Server>;
    NAME: string;
    makeConfig: () => import("@chainlink/types").Config;
    makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
};
export = _default;
//# sourceMappingURL=index.d.ts.map