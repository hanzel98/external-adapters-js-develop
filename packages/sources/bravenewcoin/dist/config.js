"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_ENDPOINT = exports.NAME = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.NAME = 'BRAVENEWCOIN';
exports.DEFAULT_ENDPOINT = 'crypto';
const makeConfig = (prefix = '') => {
    const config = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
    config.defaultEndpoint = exports.DEFAULT_ENDPOINT;
    return config;
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBbUQ7QUFHdEMsUUFBQSxJQUFJLEdBQUcsY0FBYyxDQUFBO0FBRXJCLFFBQUEsZ0JBQWdCLEdBQUcsUUFBUSxDQUFBO0FBRWpDLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBVSxFQUFFO0lBQ2hELE1BQU0sTUFBTSxHQUFHLHdCQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDakQsTUFBTSxDQUFDLGVBQWUsR0FBRyx3QkFBZ0IsQ0FBQTtJQUN6QyxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQUpZLFFBQUEsVUFBVSxjQUl0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnQlJBVkVORVdDT0lOJ1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FTkRQT0lOVCA9ICdjcnlwdG8nXG5cbmV4cG9ydCBjb25zdCBtYWtlQ29uZmlnID0gKHByZWZpeCA9ICcnKTogQ29uZmlnID0+IHtcbiAgY29uc3QgY29uZmlnID0gUmVxdWVzdGVyLmdldERlZmF1bHRDb25maWcocHJlZml4KVxuICBjb25maWcuZGVmYXVsdEVuZHBvaW50ID0gREVGQVVMVF9FTkRQT0lOVFxuICByZXR1cm4gY29uZmlnXG59XG4iXX0=