"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckImpl = exports.getCheckProvider = exports.CheckProvider = void 0;
const schedule_1 = require("./schedule");
const tradinghours_1 = require("./tradinghours");
var CheckProvider;
(function (CheckProvider) {
    CheckProvider["Schedule"] = "schedule";
    CheckProvider["TradingHours"] = "tradinghours";
})(CheckProvider = exports.CheckProvider || (exports.CheckProvider = {}));
const isCheckProvider = (envVar) => Object.values(CheckProvider).includes(envVar);
const getCheckProvider = (check) => {
    return isCheckProvider(check) ? check : undefined;
};
exports.getCheckProvider = getCheckProvider;
const getCheckImpl = (type) => {
    switch (type) {
        case CheckProvider.Schedule:
            return schedule_1.isMarketClosed;
        case CheckProvider.TradingHours:
            return async (input) => {
                try {
                    return await tradinghours_1.isMarketClosed(input);
                }
                catch (e) {
                    return await schedule_1.isMarketClosed(input);
                }
            };
        default:
            throw Error(`Unknown protocol adapter type: ${type}`);
    }
};
exports.getCheckImpl = getCheckImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2tzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUF1RDtBQUN2RCxpREFBcUQ7QUFNckQsSUFBWSxhQUdYO0FBSEQsV0FBWSxhQUFhO0lBQ3ZCLHNDQUFxQixDQUFBO0lBQ3JCLDhDQUE2QixDQUFBO0FBQy9CLENBQUMsRUFIVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUd4QjtBQUVELE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBZSxFQUEyQixFQUFFLENBQ25FLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQWEsQ0FBQyxDQUFBO0FBRS9DLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFhLEVBQTZCLEVBQUU7SUFDM0UsT0FBTyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFFLEtBQXVCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtBQUN0RSxDQUFDLENBQUE7QUFGWSxRQUFBLGdCQUFnQixvQkFFNUI7QUFFTSxNQUFNLFlBQVksR0FBRyxDQUFDLElBQStCLEVBQVMsRUFBRTtJQUNyRSxRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssYUFBYSxDQUFDLFFBQVE7WUFDekIsT0FBTyx5QkFBUSxDQUFBO1FBQ2pCLEtBQUssYUFBYSxDQUFDLFlBQVk7WUFDN0IsT0FBTyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3JCLElBQUk7b0JBQ0YsT0FBTyxNQUFNLDZCQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBQ3ZCO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNWLE9BQU8sTUFBTSx5QkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUM3QjtZQUNILENBQUMsQ0FBQTtRQUNIO1lBQ0UsTUFBTSxLQUFLLENBQUMsa0NBQWtDLElBQUksRUFBRSxDQUFDLENBQUE7S0FDeEQ7QUFDSCxDQUFDLENBQUE7QUFmWSxRQUFBLFlBQVksZ0JBZXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNNYXJrZXRDbG9zZWQgYXMgc2NoZWR1bGUgfSBmcm9tICcuL3NjaGVkdWxlJ1xuaW1wb3J0IHsgaXNNYXJrZXRDbG9zZWQgYXMgdGggfSBmcm9tICcuL3RyYWRpbmdob3VycydcbmltcG9ydCB7IEFkYXB0ZXJSZXF1ZXN0IH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuLy8gV2UgY2hlY2sgZm9yIHNvbWV0aGluZyBhbmQgZ2V0IHllcy9ubyBhbnN3ZXJcbmV4cG9ydCB0eXBlIENoZWNrID0gKGlucHV0OiBBZGFwdGVyUmVxdWVzdCkgPT4gUHJvbWlzZTxib29sZWFuPlxuXG5leHBvcnQgZW51bSBDaGVja1Byb3ZpZGVyIHtcbiAgU2NoZWR1bGUgPSAnc2NoZWR1bGUnLFxuICBUcmFkaW5nSG91cnMgPSAndHJhZGluZ2hvdXJzJyxcbn1cblxuY29uc3QgaXNDaGVja1Byb3ZpZGVyID0gKGVudlZhcj86IHN0cmluZyk6IGVudlZhciBpcyBDaGVja1Byb3ZpZGVyID0+XG4gIE9iamVjdC52YWx1ZXMoQ2hlY2tQcm92aWRlcikuaW5jbHVkZXMoZW52VmFyIGFzIGFueSlcblxuZXhwb3J0IGNvbnN0IGdldENoZWNrUHJvdmlkZXIgPSAoY2hlY2s6IHN0cmluZyk6IENoZWNrUHJvdmlkZXIgfCB1bmRlZmluZWQgPT4ge1xuICByZXR1cm4gaXNDaGVja1Byb3ZpZGVyKGNoZWNrKSA/IChjaGVjayBhcyBDaGVja1Byb3ZpZGVyKSA6IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q2hlY2tJbXBsID0gKHR5cGU6IENoZWNrUHJvdmlkZXIgfCB1bmRlZmluZWQpOiBDaGVjayA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgQ2hlY2tQcm92aWRlci5TY2hlZHVsZTpcbiAgICAgIHJldHVybiBzY2hlZHVsZVxuICAgIGNhc2UgQ2hlY2tQcm92aWRlci5UcmFkaW5nSG91cnM6XG4gICAgICByZXR1cm4gYXN5bmMgKGlucHV0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHRoKGlucHV0KVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHNjaGVkdWxlKGlucHV0KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IEVycm9yKGBVbmtub3duIHByb3RvY29sIGFkYXB0ZXIgdHlwZTogJHt0eXBlfWApXG4gIH1cbn1cbiJdfQ==