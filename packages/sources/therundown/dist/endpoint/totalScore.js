"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['total-score'];
exports.inputParameters = {
    matchId: true,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const matchId = validator.validated.data.matchId;
    const url = `events/${matchId}`;
    const reqConfig = {
        ...config.api,
        headers: {
            ...config.api.headers,
            'x-rapidapi-key': config.apiKey,
        },
        params: {
            include: 'scores',
        },
        url,
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    if (response.data.score.event_status !== 'STATUS_FINAL') {
        throw new ea_bootstrap_1.AdapterError({
            jobRunID,
            message: 'Match status is not final',
            statusCode: 400,
        });
    }
    response.data.result =
        parseInt(response.data.score.score_away) + parseInt(response.data.score.score_home);
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG90YWxTY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC90b3RhbFNjb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE0RTtBQUcvRCxRQUFBLGtCQUFrQixHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7QUFFcEMsUUFBQSxlQUFlLEdBQW9CO0lBQzlDLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNoRCxNQUFNLEdBQUcsR0FBRyxVQUFVLE9BQU8sRUFBRSxDQUFBO0lBRS9CLE1BQU0sU0FBUyxHQUFHO1FBQ2hCLEdBQUcsTUFBTSxDQUFDLEdBQUc7UUFDYixPQUFPLEVBQUU7WUFDUCxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTztZQUNyQixnQkFBZ0IsRUFBRSxNQUFNLENBQUMsTUFBTTtTQUNoQztRQUNELE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO1FBQ0QsR0FBRztLQUNKLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRW5ELElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFLLGNBQWMsRUFBRTtRQUN2RCxNQUFNLElBQUksMkJBQVksQ0FBQztZQUNyQixRQUFRO1lBQ1IsT0FBTyxFQUFFLDJCQUEyQjtZQUNwQyxVQUFVLEVBQUUsR0FBRztTQUNoQixDQUFDLENBQUE7S0FDSDtJQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUNsQixRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3JGLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBakNZLFFBQUEsT0FBTyxXQWlDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciwgQWRhcHRlckVycm9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBFeGVjdXRlV2l0aENvbmZpZywgQ29uZmlnLCBJbnB1dFBhcmFtZXRlcnMgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWyd0b3RhbC1zY29yZSddXG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgbWF0Y2hJZDogdHJ1ZSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbWV0ZXJzKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgbWF0Y2hJZCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5tYXRjaElkXG4gIGNvbnN0IHVybCA9IGBldmVudHMvJHttYXRjaElkfWBcblxuICBjb25zdCByZXFDb25maWcgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAuLi5jb25maWcuYXBpLmhlYWRlcnMsXG4gICAgICAneC1yYXBpZGFwaS1rZXknOiBjb25maWcuYXBpS2V5LFxuICAgIH0sXG4gICAgcGFyYW1zOiB7XG4gICAgICBpbmNsdWRlOiAnc2NvcmVzJyxcbiAgICB9LFxuICAgIHVybCxcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3QocmVxQ29uZmlnKVxuXG4gIGlmIChyZXNwb25zZS5kYXRhLnNjb3JlLmV2ZW50X3N0YXR1cyAhPT0gJ1NUQVRVU19GSU5BTCcpIHtcbiAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgIGpvYlJ1bklELFxuICAgICAgbWVzc2FnZTogJ01hdGNoIHN0YXR1cyBpcyBub3QgZmluYWwnLFxuICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgIH0pXG4gIH1cblxuICByZXNwb25zZS5kYXRhLnJlc3VsdCA9XG4gICAgcGFyc2VJbnQocmVzcG9uc2UuZGF0YS5zY29yZS5zY29yZV9hd2F5KSArIHBhcnNlSW50KHJlc3BvbnNlLmRhdGEuc2NvcmUuc2NvcmVfaG9tZSlcbiAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGpvYlJ1bklELCByZXNwb25zZSwgY29uZmlnLnZlcmJvc2UpXG59XG4iXX0=