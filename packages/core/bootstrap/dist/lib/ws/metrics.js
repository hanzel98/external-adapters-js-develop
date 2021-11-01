"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ws_message_errors = exports.ws_message_total = exports.ws_subscription_errors = exports.ws_subscription_total = exports.ws_subscription_active = exports.ws_connection_retries = exports.ws_connection_errors = exports.ws_connection_active = void 0;
const tslib_1 = require("tslib");
const client = tslib_1.__importStar(require("prom-client"));
exports.ws_connection_active = new client.Gauge({
    name: 'ws_connection_active',
    help: 'The number of active connections',
    labelNames: ['key', 'url', 'experimental'],
});
exports.ws_connection_errors = new client.Counter({
    name: 'ws_connection_errors',
    help: 'The number of connection errors',
    labelNames: ['key', 'url', 'message', 'experimental'],
});
exports.ws_connection_retries = new client.Counter({
    name: 'ws_connection_retries',
    help: 'The number of connection retries',
    labelNames: ['key', 'url', 'experimental'],
});
exports.ws_subscription_active = new client.Gauge({
    name: 'ws_subscription_active',
    help: 'The number of active subscriptions',
    labelNames: [
        'connection_key',
        'connection_url',
        'feed_id',
        'subscription_key',
        'experimental',
    ],
});
exports.ws_subscription_total = new client.Counter({
    name: 'ws_subscription_total',
    help: 'The number of subscriptions opened in total',
    labelNames: [
        'connection_key',
        'connection_url',
        'feed_id',
        'subscription_key',
        'experimental',
    ],
});
exports.ws_subscription_errors = new client.Counter({
    name: 'ws_subscription_errors',
    help: 'The number of subscriptions errors',
    labelNames: [
        'connection_key',
        'connection_url',
        'feed_id',
        'subscription_key',
        'message',
        'experimental',
    ],
});
exports.ws_message_total = new client.Counter({
    name: 'ws_message_total',
    help: 'The number of messages received in total',
    labelNames: ['feed_id', 'subscription_key', 'experimental'],
});
// TODO: Message error action
exports.ws_message_errors = new client.Counter({
    name: 'ws_message_errors',
    help: 'The number of message errors received in total',
    labelNames: ['connection_key', 'connection_url', 'subscription_key', 'experimental'],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvd3MvbWV0cmljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNERBQXFDO0FBRXhCLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ25ELElBQUksRUFBRSxzQkFBc0I7SUFDNUIsSUFBSSxFQUFFLGtDQUFrQztJQUN4QyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLGNBQWMsQ0FBVTtDQUNwRCxDQUFDLENBQUE7QUFFVyxRQUFBLG9CQUFvQixHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNyRCxJQUFJLEVBQUUsc0JBQXNCO0lBQzVCLElBQUksRUFBRSxpQ0FBaUM7SUFDdkMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFVO0NBQy9ELENBQUMsQ0FBQTtBQUVXLFFBQUEscUJBQXFCLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3RELElBQUksRUFBRSx1QkFBdUI7SUFDN0IsSUFBSSxFQUFFLGtDQUFrQztJQUN4QyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLGNBQWMsQ0FBVTtDQUNwRCxDQUFDLENBQUE7QUFFVyxRQUFBLHNCQUFzQixHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNyRCxJQUFJLEVBQUUsd0JBQXdCO0lBQzlCLElBQUksRUFBRSxvQ0FBb0M7SUFDMUMsVUFBVSxFQUFFO1FBQ1YsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixTQUFTO1FBQ1Qsa0JBQWtCO1FBQ2xCLGNBQWM7S0FDTjtDQUNYLENBQUMsQ0FBQTtBQUVXLFFBQUEscUJBQXFCLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3RELElBQUksRUFBRSx1QkFBdUI7SUFDN0IsSUFBSSxFQUFFLDZDQUE2QztJQUNuRCxVQUFVLEVBQUU7UUFDVixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLFNBQVM7UUFDVCxrQkFBa0I7UUFDbEIsY0FBYztLQUNOO0NBQ1gsQ0FBQyxDQUFBO0FBRVcsUUFBQSxzQkFBc0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDdkQsSUFBSSxFQUFFLHdCQUF3QjtJQUM5QixJQUFJLEVBQUUsb0NBQW9DO0lBQzFDLFVBQVUsRUFBRTtRQUNWLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsU0FBUztRQUNULGtCQUFrQjtRQUNsQixTQUFTO1FBQ1QsY0FBYztLQUNOO0NBQ1gsQ0FBQyxDQUFBO0FBRVcsUUFBQSxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakQsSUFBSSxFQUFFLGtCQUFrQjtJQUN4QixJQUFJLEVBQUUsMENBQTBDO0lBQ2hELFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLENBQVU7Q0FDckUsQ0FBQyxDQUFBO0FBRUYsNkJBQTZCO0FBQ2hCLFFBQUEsaUJBQWlCLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2xELElBQUksRUFBRSxtQkFBbUI7SUFDekIsSUFBSSxFQUFFLGdEQUFnRDtJQUN0RCxVQUFVLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLENBQVU7Q0FDOUYsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2xpZW50IGZyb20gJ3Byb20tY2xpZW50J1xuXG5leHBvcnQgY29uc3Qgd3NfY29ubmVjdGlvbl9hY3RpdmUgPSBuZXcgY2xpZW50LkdhdWdlKHtcbiAgbmFtZTogJ3dzX2Nvbm5lY3Rpb25fYWN0aXZlJyxcbiAgaGVscDogJ1RoZSBudW1iZXIgb2YgYWN0aXZlIGNvbm5lY3Rpb25zJyxcbiAgbGFiZWxOYW1lczogWydrZXknLCAndXJsJywgJ2V4cGVyaW1lbnRhbCddIGFzIGNvbnN0LFxufSlcblxuZXhwb3J0IGNvbnN0IHdzX2Nvbm5lY3Rpb25fZXJyb3JzID0gbmV3IGNsaWVudC5Db3VudGVyKHtcbiAgbmFtZTogJ3dzX2Nvbm5lY3Rpb25fZXJyb3JzJyxcbiAgaGVscDogJ1RoZSBudW1iZXIgb2YgY29ubmVjdGlvbiBlcnJvcnMnLFxuICBsYWJlbE5hbWVzOiBbJ2tleScsICd1cmwnLCAnbWVzc2FnZScsICdleHBlcmltZW50YWwnXSBhcyBjb25zdCxcbn0pXG5cbmV4cG9ydCBjb25zdCB3c19jb25uZWN0aW9uX3JldHJpZXMgPSBuZXcgY2xpZW50LkNvdW50ZXIoe1xuICBuYW1lOiAnd3NfY29ubmVjdGlvbl9yZXRyaWVzJyxcbiAgaGVscDogJ1RoZSBudW1iZXIgb2YgY29ubmVjdGlvbiByZXRyaWVzJyxcbiAgbGFiZWxOYW1lczogWydrZXknLCAndXJsJywgJ2V4cGVyaW1lbnRhbCddIGFzIGNvbnN0LFxufSlcblxuZXhwb3J0IGNvbnN0IHdzX3N1YnNjcmlwdGlvbl9hY3RpdmUgPSBuZXcgY2xpZW50LkdhdWdlKHtcbiAgbmFtZTogJ3dzX3N1YnNjcmlwdGlvbl9hY3RpdmUnLFxuICBoZWxwOiAnVGhlIG51bWJlciBvZiBhY3RpdmUgc3Vic2NyaXB0aW9ucycsXG4gIGxhYmVsTmFtZXM6IFtcbiAgICAnY29ubmVjdGlvbl9rZXknLFxuICAgICdjb25uZWN0aW9uX3VybCcsXG4gICAgJ2ZlZWRfaWQnLFxuICAgICdzdWJzY3JpcHRpb25fa2V5JyxcbiAgICAnZXhwZXJpbWVudGFsJyxcbiAgXSBhcyBjb25zdCxcbn0pXG5cbmV4cG9ydCBjb25zdCB3c19zdWJzY3JpcHRpb25fdG90YWwgPSBuZXcgY2xpZW50LkNvdW50ZXIoe1xuICBuYW1lOiAnd3Nfc3Vic2NyaXB0aW9uX3RvdGFsJyxcbiAgaGVscDogJ1RoZSBudW1iZXIgb2Ygc3Vic2NyaXB0aW9ucyBvcGVuZWQgaW4gdG90YWwnLFxuICBsYWJlbE5hbWVzOiBbXG4gICAgJ2Nvbm5lY3Rpb25fa2V5JyxcbiAgICAnY29ubmVjdGlvbl91cmwnLFxuICAgICdmZWVkX2lkJyxcbiAgICAnc3Vic2NyaXB0aW9uX2tleScsXG4gICAgJ2V4cGVyaW1lbnRhbCcsXG4gIF0gYXMgY29uc3QsXG59KVxuXG5leHBvcnQgY29uc3Qgd3Nfc3Vic2NyaXB0aW9uX2Vycm9ycyA9IG5ldyBjbGllbnQuQ291bnRlcih7XG4gIG5hbWU6ICd3c19zdWJzY3JpcHRpb25fZXJyb3JzJyxcbiAgaGVscDogJ1RoZSBudW1iZXIgb2Ygc3Vic2NyaXB0aW9ucyBlcnJvcnMnLFxuICBsYWJlbE5hbWVzOiBbXG4gICAgJ2Nvbm5lY3Rpb25fa2V5JyxcbiAgICAnY29ubmVjdGlvbl91cmwnLFxuICAgICdmZWVkX2lkJyxcbiAgICAnc3Vic2NyaXB0aW9uX2tleScsXG4gICAgJ21lc3NhZ2UnLFxuICAgICdleHBlcmltZW50YWwnLFxuICBdIGFzIGNvbnN0LFxufSlcblxuZXhwb3J0IGNvbnN0IHdzX21lc3NhZ2VfdG90YWwgPSBuZXcgY2xpZW50LkNvdW50ZXIoe1xuICBuYW1lOiAnd3NfbWVzc2FnZV90b3RhbCcsXG4gIGhlbHA6ICdUaGUgbnVtYmVyIG9mIG1lc3NhZ2VzIHJlY2VpdmVkIGluIHRvdGFsJyxcbiAgbGFiZWxOYW1lczogWydmZWVkX2lkJywgJ3N1YnNjcmlwdGlvbl9rZXknLCAnZXhwZXJpbWVudGFsJ10gYXMgY29uc3QsXG59KVxuXG4vLyBUT0RPOiBNZXNzYWdlIGVycm9yIGFjdGlvblxuZXhwb3J0IGNvbnN0IHdzX21lc3NhZ2VfZXJyb3JzID0gbmV3IGNsaWVudC5Db3VudGVyKHtcbiAgbmFtZTogJ3dzX21lc3NhZ2VfZXJyb3JzJyxcbiAgaGVscDogJ1RoZSBudW1iZXIgb2YgbWVzc2FnZSBlcnJvcnMgcmVjZWl2ZWQgaW4gdG90YWwnLFxuICBsYWJlbE5hbWVzOiBbJ2Nvbm5lY3Rpb25fa2V5JywgJ2Nvbm5lY3Rpb25fdXJsJywgJ3N1YnNjcmlwdGlvbl9rZXknLCAnZXhwZXJpbWVudGFsJ10gYXMgY29uc3QsXG59KVxuIl19