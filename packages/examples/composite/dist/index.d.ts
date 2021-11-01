/// <reference types="node" />
/// <reference types="@chainlink/types" />
declare const _default: {
    server: () => Promise<import("http").Server>;
    NAME: string;
    makeConfig: () => import("./config").Config;
    makeExecute: () => import("@chainlink/types").Execute;
};
export = _default;
//# sourceMappingURL=index.d.ts.map