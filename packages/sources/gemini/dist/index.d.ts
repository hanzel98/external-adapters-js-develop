/// <reference types="node" />
import { makeExecute } from './adapter';
import { makeConfig, NAME } from './config';
import * as types from './endpoint';
declare const server: () => Promise<import("http").Server>;
export { NAME, makeExecute, makeConfig, server, types };
//# sourceMappingURL=index.d.ts.map