/// <reference types="node" />
/// <reference types="@chainlink/types" />
declare const _default: {
    server: () => Promise<import("http").Server>;
    NAME: string;
    makeExecute: (config?: import("./config").Config | undefined) => import("@chainlink/types").Execute;
    makeConfig: () => import("./config").Config;
};
export = _default;
//# sourceMappingURL=index.d.ts.map