/// <reference types="node" />
/// <reference types="@chainlink/types" />
declare const _default: {
    server: () => Promise<import("http").Server>;
    NAME: string;
    makeExecute: (config?: import("./config").Config | undefined) => (request: import("@chainlink/types").AdapterRequest) => Promise<import("@chainlink/types").AdapterResponse>;
    makeConfig: (prefix?: string | undefined) => import("./config").Config;
};
export = _default;
//# sourceMappingURL=index.d.ts.map