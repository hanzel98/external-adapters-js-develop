/// <reference types="node" />
import { makeExecute } from './adapter';
import { makeConfig, NAME } from './config';
declare const server: () => Promise<import("http").Server>;
export { NAME, makeExecute, makeConfig, server };
//# sourceMappingURL=index.d.ts.map