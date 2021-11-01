/// <reference types="node" />
import { makeExecute } from './adapter';
import { makeConfig } from './config';
declare const NAME = "DYDX_REWARDS";
declare const server: () => Promise<import("http").Server>;
export { NAME, makeExecute, makeConfig, server };
//# sourceMappingURL=index.d.ts.map