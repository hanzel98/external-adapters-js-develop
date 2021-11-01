/// <reference types="node" />
import { endpointSelector, makeExecute, makeWSHandler } from './adapter';
import { makeConfig, NAME } from './config';
declare const server: () => Promise<import("http").Server>;
export { NAME, makeExecute, makeWSHandler, makeConfig, endpointSelector, server };
//# sourceMappingURL=index.d.ts.map