/// <reference types="node" />
/// <reference types="@chainlink/types" />
declare const _default: {
    server: () => Promise<import("http").Server>;
    NAME: string;
    makeExecute: import("@chainlink/types").ExecuteFactory<import("./config").ExtendedConfig>;
    makeConfig: (prefix?: string | undefined) => import("./config").ExtendedConfig;
};
export = _default;
//# sourceMappingURL=index.d.ts.map