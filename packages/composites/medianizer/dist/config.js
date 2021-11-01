"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const makeConfig = (prefix = '') => {
    return ea_bootstrap_1.Requester.getDefaultConfig(prefix);
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHNUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFVLEVBQUU7SUFDaEQsT0FBTyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQUZZLFFBQUEsVUFBVSxjQUV0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4ID0gJycpOiBDb25maWcgPT4ge1xuICByZXR1cm4gUmVxdWVzdGVyLmdldERlZmF1bHRDb25maWcocHJlZml4KVxufVxuIl19