"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beginObserveCacheMetrics = void 0;
const tslib_1 = require("tslib");
const client = tslib_1.__importStar(require("prom-client"));
const util_1 = require("../metrics/util");
const beginObserveCacheMetrics = ({ participantId, feedId, isFromWs, }) => {
    const cacheType = process.env.CACHE_TYPE === 'redis' ? CacheTypes.Redis : CacheTypes.Local;
    const base = {
        feed_id: feedId,
        participant_id: participantId,
        experimental: 'true',
        cache_type: cacheType,
        is_from_ws: String(isFromWs),
    };
    const recordCacheExecutionDuration = cache_execution_duration_seconds.startTimer();
    return {
        stalenessAndExecutionTime(cacheHit, staleness = 0) {
            cache_data_staleness_seconds.labels(base).set(staleness);
            return recordCacheExecutionDuration({ ...base, cache_hit: String(cacheHit) });
        },
        cacheGet({ value }) {
            if (typeof value === 'number' || typeof value === 'string') {
                const parsedValue = Number(value);
                if (!Number.isNaN(parsedValue) && Number.isFinite(parsedValue)) {
                    cache_data_get_values.labels(base).set(parsedValue);
                }
            }
            cache_data_get_count.labels(base).inc();
        },
        cacheSet({ statusCode, maxAge }) {
            cache_data_set_count.labels({ ...base, status_code: util_1.normalizeStatusCode(statusCode) }).inc();
            cache_data_max_age.labels(base).set(maxAge);
        },
    };
};
exports.beginObserveCacheMetrics = beginObserveCacheMetrics;
var CacheTypes;
(function (CacheTypes) {
    CacheTypes["Redis"] = "redis";
    CacheTypes["Local"] = "local";
})(CacheTypes || (CacheTypes = {}));
const baseLabels = [
    'feed_id',
    'participant_id',
    'cache_type',
    'is_from_ws',
    'experimental',
];
const cache_execution_duration_seconds = new client.Histogram({
    name: 'cache_execution_duration_seconds',
    help: 'A histogram bucket of the distribution of cache execution durations',
    labelNames: [...baseLabels, 'cache_hit'],
    buckets: [0.01, 0.1, 1, 10],
});
const cache_data_get_count = new client.Counter({
    name: 'cache_data_get_count',
    help: 'A counter that increments every time a value is fetched from the cache',
    labelNames: baseLabels,
});
const cache_data_get_values = new client.Gauge({
    name: 'cache_data_get_values',
    help: 'A gauge keeping track of values being fetched from cache',
    labelNames: baseLabels,
});
const cache_data_max_age = new client.Gauge({
    name: 'cache_data_max_age',
    help: 'A gauge tracking the max age of stored values in the cache',
    labelNames: baseLabels,
});
const cache_data_set_count = new client.Counter({
    name: 'cache_data_set_count',
    help: 'A counter that increments every time a value is set to the cache',
    labelNames: [...baseLabels, 'status_code'],
});
const cache_data_staleness_seconds = new client.Gauge({
    name: 'cache_data_staleness_seconds',
    help: 'Observes the staleness of the data returned',
    labelNames: baseLabels,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY2FjaGUvbWV0cmljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNERBQXFDO0FBQ3JDLDBDQUFxRDtBQU85QyxNQUFNLHdCQUF3QixHQUFHLENBQUMsRUFDdkMsYUFBYSxFQUNiLE1BQU0sRUFDTixRQUFRLEdBQ3FCLEVBQUUsRUFBRTtJQUNqQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUE7SUFDMUYsTUFBTSxJQUFJLEdBQUc7UUFDWCxPQUFPLEVBQUUsTUFBTTtRQUNmLGNBQWMsRUFBRSxhQUFhO1FBQzdCLFlBQVksRUFBRSxNQUFNO1FBQ3BCLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO0tBQzdCLENBQUE7SUFFRCxNQUFNLDRCQUE0QixHQUFHLGdDQUFnQyxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2xGLE9BQU87UUFDTCx5QkFBeUIsQ0FBQyxRQUFpQixFQUFFLFNBQVMsR0FBRyxDQUFDO1lBQ3hELDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDeEQsT0FBTyw0QkFBNEIsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQy9FLENBQUM7UUFFRCxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQXNCO1lBQ3BDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDMUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUM5RCxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2lCQUNwRDthQUNGO1lBQ0Qsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ3pDLENBQUM7UUFFRCxRQUFRLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUEwQztZQUNyRSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxXQUFXLEVBQUUsMEJBQW1CLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO1lBQzVGLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDN0MsQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDLENBQUE7QUFwQ1ksUUFBQSx3QkFBd0IsNEJBb0NwQztBQUVELElBQUssVUFHSjtBQUhELFdBQUssVUFBVTtJQUNiLDZCQUFlLENBQUE7SUFDZiw2QkFBZSxDQUFBO0FBQ2pCLENBQUMsRUFISSxVQUFVLEtBQVYsVUFBVSxRQUdkO0FBRUQsTUFBTSxVQUFVLEdBQUc7SUFDakIsU0FBUztJQUNULGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osWUFBWTtJQUNaLGNBQWM7Q0FDTixDQUFBO0FBRVYsTUFBTSxnQ0FBZ0MsR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDNUQsSUFBSSxFQUFFLGtDQUFrQztJQUN4QyxJQUFJLEVBQUUscUVBQXFFO0lBQzNFLFVBQVUsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLFdBQVcsQ0FBVTtJQUNqRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Q0FDNUIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDOUMsSUFBSSxFQUFFLHNCQUFzQjtJQUM1QixJQUFJLEVBQUUsd0VBQXdFO0lBQzlFLFVBQVUsRUFBRSxVQUFVO0NBQ3ZCLENBQUMsQ0FBQTtBQUVGLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzdDLElBQUksRUFBRSx1QkFBdUI7SUFDN0IsSUFBSSxFQUFFLDBEQUEwRDtJQUNoRSxVQUFVLEVBQUUsVUFBVTtDQUN2QixDQUFDLENBQUE7QUFFRixNQUFNLGtCQUFrQixHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztJQUMxQyxJQUFJLEVBQUUsb0JBQW9CO0lBQzFCLElBQUksRUFBRSw0REFBNEQ7SUFDbEUsVUFBVSxFQUFFLFVBQVU7Q0FDdkIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDOUMsSUFBSSxFQUFFLHNCQUFzQjtJQUM1QixJQUFJLEVBQUUsa0VBQWtFO0lBQ3hFLFVBQVUsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLGFBQWEsQ0FBQztDQUMzQyxDQUFDLENBQUE7QUFFRixNQUFNLDRCQUE0QixHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNwRCxJQUFJLEVBQUUsOEJBQThCO0lBQ3BDLElBQUksRUFBRSw2Q0FBNkM7SUFDbkQsVUFBVSxFQUFFLFVBQVU7Q0FDdkIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2xpZW50IGZyb20gJ3Byb20tY2xpZW50J1xuaW1wb3J0IHsgbm9ybWFsaXplU3RhdHVzQ29kZSB9IGZyb20gJy4uL21ldHJpY3MvdXRpbCdcblxuaW50ZXJmYWNlIENhY2hlRXhlY3V0aW9uRHVyYXRpb25QYXJhbXMge1xuICBwYXJ0aWNpcGFudElkOiBzdHJpbmdcbiAgZmVlZElkPzogc3RyaW5nXG4gIGlzRnJvbVdzOiBib29sZWFuXG59XG5leHBvcnQgY29uc3QgYmVnaW5PYnNlcnZlQ2FjaGVNZXRyaWNzID0gKHtcbiAgcGFydGljaXBhbnRJZCxcbiAgZmVlZElkLFxuICBpc0Zyb21Xcyxcbn06IENhY2hlRXhlY3V0aW9uRHVyYXRpb25QYXJhbXMpID0+IHtcbiAgY29uc3QgY2FjaGVUeXBlID0gcHJvY2Vzcy5lbnYuQ0FDSEVfVFlQRSA9PT0gJ3JlZGlzJyA/IENhY2hlVHlwZXMuUmVkaXMgOiBDYWNoZVR5cGVzLkxvY2FsXG4gIGNvbnN0IGJhc2UgPSB7XG4gICAgZmVlZF9pZDogZmVlZElkLFxuICAgIHBhcnRpY2lwYW50X2lkOiBwYXJ0aWNpcGFudElkLFxuICAgIGV4cGVyaW1lbnRhbDogJ3RydWUnLFxuICAgIGNhY2hlX3R5cGU6IGNhY2hlVHlwZSxcbiAgICBpc19mcm9tX3dzOiBTdHJpbmcoaXNGcm9tV3MpLFxuICB9XG5cbiAgY29uc3QgcmVjb3JkQ2FjaGVFeGVjdXRpb25EdXJhdGlvbiA9IGNhY2hlX2V4ZWN1dGlvbl9kdXJhdGlvbl9zZWNvbmRzLnN0YXJ0VGltZXIoKVxuICByZXR1cm4ge1xuICAgIHN0YWxlbmVzc0FuZEV4ZWN1dGlvblRpbWUoY2FjaGVIaXQ6IGJvb2xlYW4sIHN0YWxlbmVzcyA9IDApIHtcbiAgICAgIGNhY2hlX2RhdGFfc3RhbGVuZXNzX3NlY29uZHMubGFiZWxzKGJhc2UpLnNldChzdGFsZW5lc3MpXG4gICAgICByZXR1cm4gcmVjb3JkQ2FjaGVFeGVjdXRpb25EdXJhdGlvbih7IC4uLmJhc2UsIGNhY2hlX2hpdDogU3RyaW5nKGNhY2hlSGl0KSB9KVxuICAgIH0sXG5cbiAgICBjYWNoZUdldCh7IHZhbHVlIH06IHsgdmFsdWU6IHVua25vd24gfSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlcih2YWx1ZSlcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkVmFsdWUpICYmIE51bWJlci5pc0Zpbml0ZShwYXJzZWRWYWx1ZSkpIHtcbiAgICAgICAgICBjYWNoZV9kYXRhX2dldF92YWx1ZXMubGFiZWxzKGJhc2UpLnNldChwYXJzZWRWYWx1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FjaGVfZGF0YV9nZXRfY291bnQubGFiZWxzKGJhc2UpLmluYygpXG4gICAgfSxcblxuICAgIGNhY2hlU2V0KHsgc3RhdHVzQ29kZSwgbWF4QWdlIH06IHsgc3RhdHVzQ29kZTogbnVtYmVyOyBtYXhBZ2U6IG51bWJlciB9KSB7XG4gICAgICBjYWNoZV9kYXRhX3NldF9jb3VudC5sYWJlbHMoeyAuLi5iYXNlLCBzdGF0dXNfY29kZTogbm9ybWFsaXplU3RhdHVzQ29kZShzdGF0dXNDb2RlKSB9KS5pbmMoKVxuICAgICAgY2FjaGVfZGF0YV9tYXhfYWdlLmxhYmVscyhiYXNlKS5zZXQobWF4QWdlKVxuICAgIH0sXG4gIH1cbn1cblxuZW51bSBDYWNoZVR5cGVzIHtcbiAgUmVkaXMgPSAncmVkaXMnLFxuICBMb2NhbCA9ICdsb2NhbCcsXG59XG5cbmNvbnN0IGJhc2VMYWJlbHMgPSBbXG4gICdmZWVkX2lkJyxcbiAgJ3BhcnRpY2lwYW50X2lkJyxcbiAgJ2NhY2hlX3R5cGUnLFxuICAnaXNfZnJvbV93cycsXG4gICdleHBlcmltZW50YWwnLFxuXSBhcyBjb25zdFxuXG5jb25zdCBjYWNoZV9leGVjdXRpb25fZHVyYXRpb25fc2Vjb25kcyA9IG5ldyBjbGllbnQuSGlzdG9ncmFtKHtcbiAgbmFtZTogJ2NhY2hlX2V4ZWN1dGlvbl9kdXJhdGlvbl9zZWNvbmRzJyxcbiAgaGVscDogJ0EgaGlzdG9ncmFtIGJ1Y2tldCBvZiB0aGUgZGlzdHJpYnV0aW9uIG9mIGNhY2hlIGV4ZWN1dGlvbiBkdXJhdGlvbnMnLFxuICBsYWJlbE5hbWVzOiBbLi4uYmFzZUxhYmVscywgJ2NhY2hlX2hpdCddIGFzIGNvbnN0LFxuICBidWNrZXRzOiBbMC4wMSwgMC4xLCAxLCAxMF0sXG59KVxuXG5jb25zdCBjYWNoZV9kYXRhX2dldF9jb3VudCA9IG5ldyBjbGllbnQuQ291bnRlcih7XG4gIG5hbWU6ICdjYWNoZV9kYXRhX2dldF9jb3VudCcsXG4gIGhlbHA6ICdBIGNvdW50ZXIgdGhhdCBpbmNyZW1lbnRzIGV2ZXJ5IHRpbWUgYSB2YWx1ZSBpcyBmZXRjaGVkIGZyb20gdGhlIGNhY2hlJyxcbiAgbGFiZWxOYW1lczogYmFzZUxhYmVscyxcbn0pXG5cbmNvbnN0IGNhY2hlX2RhdGFfZ2V0X3ZhbHVlcyA9IG5ldyBjbGllbnQuR2F1Z2Uoe1xuICBuYW1lOiAnY2FjaGVfZGF0YV9nZXRfdmFsdWVzJyxcbiAgaGVscDogJ0EgZ2F1Z2Uga2VlcGluZyB0cmFjayBvZiB2YWx1ZXMgYmVpbmcgZmV0Y2hlZCBmcm9tIGNhY2hlJyxcbiAgbGFiZWxOYW1lczogYmFzZUxhYmVscyxcbn0pXG5cbmNvbnN0IGNhY2hlX2RhdGFfbWF4X2FnZSA9IG5ldyBjbGllbnQuR2F1Z2Uoe1xuICBuYW1lOiAnY2FjaGVfZGF0YV9tYXhfYWdlJyxcbiAgaGVscDogJ0EgZ2F1Z2UgdHJhY2tpbmcgdGhlIG1heCBhZ2Ugb2Ygc3RvcmVkIHZhbHVlcyBpbiB0aGUgY2FjaGUnLFxuICBsYWJlbE5hbWVzOiBiYXNlTGFiZWxzLFxufSlcblxuY29uc3QgY2FjaGVfZGF0YV9zZXRfY291bnQgPSBuZXcgY2xpZW50LkNvdW50ZXIoe1xuICBuYW1lOiAnY2FjaGVfZGF0YV9zZXRfY291bnQnLFxuICBoZWxwOiAnQSBjb3VudGVyIHRoYXQgaW5jcmVtZW50cyBldmVyeSB0aW1lIGEgdmFsdWUgaXMgc2V0IHRvIHRoZSBjYWNoZScsXG4gIGxhYmVsTmFtZXM6IFsuLi5iYXNlTGFiZWxzLCAnc3RhdHVzX2NvZGUnXSxcbn0pXG5cbmNvbnN0IGNhY2hlX2RhdGFfc3RhbGVuZXNzX3NlY29uZHMgPSBuZXcgY2xpZW50LkdhdWdlKHtcbiAgbmFtZTogJ2NhY2hlX2RhdGFfc3RhbGVuZXNzX3NlY29uZHMnLFxuICBoZWxwOiAnT2JzZXJ2ZXMgdGhlIHN0YWxlbmVzcyBvZiB0aGUgZGF0YSByZXR1cm5lZCcsXG4gIGxhYmVsTmFtZXM6IGJhc2VMYWJlbHMsXG59KVxuIl19