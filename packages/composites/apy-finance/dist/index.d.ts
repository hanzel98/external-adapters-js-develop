/// <reference types="node" />
import { makeExecute } from './adapter';
import { makeConfig } from './config';
declare const NAME = "APY-Finance";
declare const server: () => Promise<import("http").Server>;
export { NAME, makeConfig, makeExecute, server };
//# sourceMappingURL=index.d.ts.map