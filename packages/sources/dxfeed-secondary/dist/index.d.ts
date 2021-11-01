/// <reference types="node" />
/// <reference types="@chainlink/types" />
import { makeConfig, NAME } from './config';
declare const makeExecute: import("@chainlink/types").ExecuteFactory<import("@chainlink/types").Config>;
declare const server: () => Promise<import("http").Server>;
export { NAME, makeExecute, makeConfig, server };
//# sourceMappingURL=index.d.ts.map