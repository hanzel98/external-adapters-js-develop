/// <reference types="node" />
/// <reference types="@chainlink/types" />
declare const _default: {
    server: () => Promise<import("http").Server>;
    NAME: string;
    makeConfig: (prefix?: string | undefined) => import("./config").Config;
    makeExecute: (config?: import("./config").Config | undefined) => import("@chainlink/types").Execute;
};
export = _default;
//# sourceMappingURL=index.d.ts.map