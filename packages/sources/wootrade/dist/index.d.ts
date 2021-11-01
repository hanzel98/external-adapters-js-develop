/// <reference types="node" />
/// <reference types="@chainlink/types" />
declare const _default: {
    server: () => Promise<import("http").Server>;
    NAME: string;
    makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
    makeWSHandler: (config?: import("@chainlink/types").Config | undefined) => import("@chainlink/types").MakeWSHandler;
    makeConfig: (prefix?: string | undefined) => import("@chainlink/types").Config;
};
export = _default;
//# sourceMappingURL=index.d.ts.map