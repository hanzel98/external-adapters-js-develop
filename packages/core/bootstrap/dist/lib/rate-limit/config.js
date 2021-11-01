"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.DEFAULT_RATE_LIMIT_ENABLED = void 0;
const provider_limits_1 = require("../provider-limits");
const util_1 = require("../util");
const external_adapter_1 = require("../external-adapter");
const cache_1 = require("../cache");
exports.DEFAULT_RATE_LIMIT_ENABLED = true;
function get(context) {
    const enabled = util_1.parseBool(util_1.getEnv('CACHE_ENABLED') ?? cache_1.DEFAULT_CACHE_ENABLED) &&
        util_1.parseBool(util_1.getEnv('RATE_LIMIT_ENABLED') ?? exports.DEFAULT_RATE_LIMIT_ENABLED);
    let capacity = parseInt(util_1.getEnv('RATE_LIMIT_CAPACITY') || '');
    if (!capacity && enabled) {
        const provider = util_1.getEnv('RATE_LIMIT_API_PROVIDER') || context.name?.toLowerCase() || '';
        const tier = util_1.getEnv('RATE_LIMIT_API_TIER') || '';
        try {
            const providerConfig = provider_limits_1.getRateLimit(provider, tier);
            capacity = Number(providerConfig.minute);
        }
        catch (e) {
            external_adapter_1.logger.error(e.message);
        }
    }
    let burstCapacity1s = 0;
    let burstCapacity1m = 0;
    if (enabled) {
        const provider = util_1.getEnv('RATE_LIMIT_API_PROVIDER') || context.name?.toLowerCase() || '';
        const tier = util_1.getEnv('RATE_LIMIT_API_TIER') || '';
        try {
            const limit = provider_limits_1.getHTTPLimit(provider, tier, 'rateLimit1s');
            burstCapacity1s = Number(limit);
        }
        catch {
            // Ignore
        }
        try {
            const limit = provider_limits_1.getHTTPLimit(provider, tier, 'rateLimit1m');
            burstCapacity1m = Number(limit);
        }
        catch {
            // Ignore
        }
    }
    return {
        burstCapacity1s,
        burstCapacity1m,
        totalCapacity: capacity,
        enabled: enabled && !!capacity,
    };
}
exports.get = get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yYXRlLWxpbWl0L2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBK0Q7QUFDL0Qsa0NBQTJDO0FBQzNDLDBEQUE0QztBQUU1QyxvQ0FBZ0Q7QUFFbkMsUUFBQSwwQkFBMEIsR0FBRyxJQUFJLENBQUE7QUFpQjlDLFNBQWdCLEdBQUcsQ0FBQyxPQUF1QjtJQUN6QyxNQUFNLE9BQU8sR0FDWCxnQkFBUyxDQUFDLGFBQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSw2QkFBcUIsQ0FBQztRQUMzRCxnQkFBUyxDQUFDLGFBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLGtDQUEwQixDQUFDLENBQUE7SUFDdkUsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzVELElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFO1FBQ3hCLE1BQU0sUUFBUSxHQUFHLGFBQU0sQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFBO1FBQ3ZGLE1BQU0sSUFBSSxHQUFHLGFBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNoRCxJQUFJO1lBQ0YsTUFBTSxjQUFjLEdBQUcsOEJBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDbkQsUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDekM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLHlCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUN4QjtLQUNGO0lBQ0QsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQTtJQUN2QixJQUFJLE9BQU8sRUFBRTtRQUNYLE1BQU0sUUFBUSxHQUFHLGFBQU0sQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFBO1FBQ3ZGLE1BQU0sSUFBSSxHQUFHLGFBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNoRCxJQUFJO1lBQ0YsTUFBTSxLQUFLLEdBQUcsOEJBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFBO1lBQ3pELGVBQWUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDaEM7UUFBQyxNQUFNO1lBQ04sU0FBUztTQUNWO1FBQ0QsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLDhCQUFZLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQTtZQUN6RCxlQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ2hDO1FBQUMsTUFBTTtZQUNOLFNBQVM7U0FDVjtLQUNGO0lBQ0QsT0FBTztRQUNMLGVBQWU7UUFDZixlQUFlO1FBQ2YsYUFBYSxFQUFFLFFBQVE7UUFDdkIsT0FBTyxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsUUFBUTtLQUMvQixDQUFBO0FBQ0gsQ0FBQztBQXZDRCxrQkF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRSYXRlTGltaXQsIGdldEhUVFBMaW1pdCB9IGZyb20gJy4uL3Byb3ZpZGVyLWxpbWl0cydcbmltcG9ydCB7IGdldEVudiwgcGFyc2VCb29sIH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uL2V4dGVybmFsLWFkYXB0ZXInXG5pbXBvcnQgeyBBZGFwdGVyQ29udGV4dCB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBERUZBVUxUX0NBQ0hFX0VOQUJMRUQgfSBmcm9tICcuLi9jYWNoZSdcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkFURV9MSU1JVF9FTkFCTEVEID0gdHJ1ZVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgdGltZSB0byBsaXZlIG9uIGEgc3Vic2NyaXB0aW9uLCBpZiBubyBuZXcgcmVxdWVzdHMgY29tZSBpbiB0aGF0IGRvIG5vdFxuICAgKiBvcmlnaW5hdGUgZnJvbSB0aGUgd2FybSB1cCBlbmdpbmUgaXRzZWxmXG4gICAqL1xuICBidXJzdENhcGFjaXR5MXM6IG51bWJlclxuICBidXJzdENhcGFjaXR5MW06IG51bWJlclxuICB0b3RhbENhcGFjaXR5OiBudW1iZXJcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiBSYXRlIExpbWl0IG9wdGlvbiBpcyBhY3RpdmF0ZWRcbiAgICovXG4gIGVuYWJsZWQ6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldChjb250ZXh0OiBBZGFwdGVyQ29udGV4dCk6IENvbmZpZyB7XG4gIGNvbnN0IGVuYWJsZWQgPVxuICAgIHBhcnNlQm9vbChnZXRFbnYoJ0NBQ0hFX0VOQUJMRUQnKSA/PyBERUZBVUxUX0NBQ0hFX0VOQUJMRUQpICYmXG4gICAgcGFyc2VCb29sKGdldEVudignUkFURV9MSU1JVF9FTkFCTEVEJykgPz8gREVGQVVMVF9SQVRFX0xJTUlUX0VOQUJMRUQpXG4gIGxldCBjYXBhY2l0eSA9IHBhcnNlSW50KGdldEVudignUkFURV9MSU1JVF9DQVBBQ0lUWScpIHx8ICcnKVxuICBpZiAoIWNhcGFjaXR5ICYmIGVuYWJsZWQpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IGdldEVudignUkFURV9MSU1JVF9BUElfUFJPVklERVInKSB8fCBjb250ZXh0Lm5hbWU/LnRvTG93ZXJDYXNlKCkgfHwgJydcbiAgICBjb25zdCB0aWVyID0gZ2V0RW52KCdSQVRFX0xJTUlUX0FQSV9USUVSJykgfHwgJydcbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvdmlkZXJDb25maWcgPSBnZXRSYXRlTGltaXQocHJvdmlkZXIsIHRpZXIpXG4gICAgICBjYXBhY2l0eSA9IE51bWJlcihwcm92aWRlckNvbmZpZy5taW51dGUpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmVycm9yKGUubWVzc2FnZSlcbiAgICB9XG4gIH1cbiAgbGV0IGJ1cnN0Q2FwYWNpdHkxcyA9IDBcbiAgbGV0IGJ1cnN0Q2FwYWNpdHkxbSA9IDBcbiAgaWYgKGVuYWJsZWQpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IGdldEVudignUkFURV9MSU1JVF9BUElfUFJPVklERVInKSB8fCBjb250ZXh0Lm5hbWU/LnRvTG93ZXJDYXNlKCkgfHwgJydcbiAgICBjb25zdCB0aWVyID0gZ2V0RW52KCdSQVRFX0xJTUlUX0FQSV9USUVSJykgfHwgJydcbiAgICB0cnkge1xuICAgICAgY29uc3QgbGltaXQgPSBnZXRIVFRQTGltaXQocHJvdmlkZXIsIHRpZXIsICdyYXRlTGltaXQxcycpXG4gICAgICBidXJzdENhcGFjaXR5MXMgPSBOdW1iZXIobGltaXQpXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJZ25vcmVcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGxpbWl0ID0gZ2V0SFRUUExpbWl0KHByb3ZpZGVyLCB0aWVyLCAncmF0ZUxpbWl0MW0nKVxuICAgICAgYnVyc3RDYXBhY2l0eTFtID0gTnVtYmVyKGxpbWl0KVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlXG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgYnVyc3RDYXBhY2l0eTFzLFxuICAgIGJ1cnN0Q2FwYWNpdHkxbSxcbiAgICB0b3RhbENhcGFjaXR5OiBjYXBhY2l0eSxcbiAgICBlbmFibGVkOiBlbmFibGVkICYmICEhY2FwYWNpdHksXG4gIH1cbn1cbiJdfQ==