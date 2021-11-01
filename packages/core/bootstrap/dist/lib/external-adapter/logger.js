"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.censor = exports.paths = void 0;
const tslib_1 = require("tslib");
const util_1 = require("../util");
const pino_1 = tslib_1.__importDefault(require("pino"));
const config_1 = require("../ws/config");
const lodash_1 = require("lodash");
exports.paths = [...config_1.wsRedactPaths];
const sensitiveKeys = [
    /cookie/i,
    /passw(or)?d/i,
    /^pw$/,
    /^pass$/i,
    /secret/i,
    /token/i,
    /api[-._]?key/i,
];
const censor = (v) => {
    try {
        const url = new URL(v);
        url.searchParams.forEach((_, name) => {
            if (sensitiveKeys.some((rx) => rx.test(name))) {
                url.searchParams.set(name, 'REDACTED');
            }
        });
        return url.toString();
    }
    catch {
        // if not a URL
        return '[REDACTED]';
    }
};
exports.censor = censor;
exports.logger = pino_1.default({
    level: process.env.LOG_LEVEL || 'info',
    prettyPrint: process.env.NODE_ENV === 'development',
    prettifier: require('pino-pretty'),
    formatters: {
        level(label) {
            return { level: label };
        },
    },
    hooks: {
        logMethod(inputArgs, method) {
            // flipping the order of inputs (switching from winston to pino)
            const length = inputArgs.length;
            const arg1 = inputArgs.shift();
            if (length >= 2) {
                // if input includes message string + data object
                const arg2 = lodash_1.cloneDeep(inputArgs.shift());
                // add instanceId if not present
                if (typeof arg2 === 'object' && !arg2.instanceId)
                    arg2.instanceId = util_1.uuid();
                return method.apply(this, [arg2, arg1, ...inputArgs]);
            }
            return method.apply(this, [arg1, ...inputArgs]);
        },
    },
    redact: {
        paths: exports.paths,
        censor: exports.censor,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9leHRlcm5hbC1hZGFwdGVyL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsa0NBQThCO0FBQzlCLHdEQUF1QjtBQUN2Qix5Q0FBNEM7QUFDNUMsbUNBQWtDO0FBRXJCLFFBQUEsS0FBSyxHQUFHLENBQUMsR0FBRyxzQkFBYSxDQUFDLENBQUE7QUFFdkMsTUFBTSxhQUFhLEdBQUc7SUFDcEIsU0FBUztJQUNULGNBQWM7SUFDZCxNQUFNO0lBQ04sU0FBUztJQUNULFNBQVM7SUFDVCxRQUFRO0lBQ1IsZUFBZTtDQUNoQixDQUFBO0FBRU0sTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtJQUNsQyxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQzdDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQTthQUN2QztRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUE7S0FDdEI7SUFBQyxNQUFNO1FBQ04sZUFBZTtRQUNmLE9BQU8sWUFBWSxDQUFBO0tBQ3BCO0FBQ0gsQ0FBQyxDQUFBO0FBYlksUUFBQSxNQUFNLFVBYWxCO0FBRVksUUFBQSxNQUFNLEdBQUcsY0FBSSxDQUFDO0lBQ3pCLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxNQUFNO0lBQ3RDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxhQUFhO0lBQ25ELFVBQVUsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ2xDLFVBQVUsRUFBRTtRQUNWLEtBQUssQ0FBQyxLQUFLO1lBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQTtRQUN6QixDQUFDO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxTQUFTLENBQUMsU0FBUyxFQUFFLE1BQU07WUFDekIsZ0VBQWdFO1lBQ2hFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7WUFDL0IsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQzlCLElBQUksTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDZixpREFBaUQ7Z0JBQ2pELE1BQU0sSUFBSSxHQUFHLGtCQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7Z0JBRXpDLGdDQUFnQztnQkFDaEMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtvQkFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQUksRUFBRSxDQUFBO2dCQUUxRSxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUE7YUFDdEQ7WUFDRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQTtRQUNqRCxDQUFDO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUwsYUFBSztRQUNMLE1BQU0sRUFBTixjQUFNO0tBQ1A7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dWlkIH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCBwaW5vIGZyb20gJ3Bpbm8nXG5pbXBvcnQgeyB3c1JlZGFjdFBhdGhzIH0gZnJvbSAnLi4vd3MvY29uZmlnJ1xuaW1wb3J0IHsgY2xvbmVEZWVwIH0gZnJvbSAnbG9kYXNoJ1xuXG5leHBvcnQgY29uc3QgcGF0aHMgPSBbLi4ud3NSZWRhY3RQYXRoc11cblxuY29uc3Qgc2Vuc2l0aXZlS2V5cyA9IFtcbiAgL2Nvb2tpZS9pLFxuICAvcGFzc3cob3IpP2QvaSxcbiAgL15wdyQvLFxuICAvXnBhc3MkL2ksXG4gIC9zZWNyZXQvaSxcbiAgL3Rva2VuL2ksXG4gIC9hcGlbLS5fXT9rZXkvaSxcbl1cblxuZXhwb3J0IGNvbnN0IGNlbnNvciA9ICh2OiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHYpXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5mb3JFYWNoKChfLCBuYW1lKSA9PiB7XG4gICAgICBpZiAoc2Vuc2l0aXZlS2V5cy5zb21lKChyeCkgPT4gcngudGVzdChuYW1lKSkpIHtcbiAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQobmFtZSwgJ1JFREFDVEVEJylcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB1cmwudG9TdHJpbmcoKVxuICB9IGNhdGNoIHtcbiAgICAvLyBpZiBub3QgYSBVUkxcbiAgICByZXR1cm4gJ1tSRURBQ1RFRF0nXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxvZ2dlciA9IHBpbm8oe1xuICBsZXZlbDogcHJvY2Vzcy5lbnYuTE9HX0xFVkVMIHx8ICdpbmZvJyxcbiAgcHJldHR5UHJpbnQ6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnLFxuICBwcmV0dGlmaWVyOiByZXF1aXJlKCdwaW5vLXByZXR0eScpLFxuICBmb3JtYXR0ZXJzOiB7XG4gICAgbGV2ZWwobGFiZWwpIHtcbiAgICAgIHJldHVybiB7IGxldmVsOiBsYWJlbCB9XG4gICAgfSxcbiAgfSxcbiAgaG9va3M6IHtcbiAgICBsb2dNZXRob2QoaW5wdXRBcmdzLCBtZXRob2QpIHtcbiAgICAgIC8vIGZsaXBwaW5nIHRoZSBvcmRlciBvZiBpbnB1dHMgKHN3aXRjaGluZyBmcm9tIHdpbnN0b24gdG8gcGlubylcbiAgICAgIGNvbnN0IGxlbmd0aCA9IGlucHV0QXJncy5sZW5ndGhcbiAgICAgIGNvbnN0IGFyZzEgPSBpbnB1dEFyZ3Muc2hpZnQoKVxuICAgICAgaWYgKGxlbmd0aCA+PSAyKSB7XG4gICAgICAgIC8vIGlmIGlucHV0IGluY2x1ZGVzIG1lc3NhZ2Ugc3RyaW5nICsgZGF0YSBvYmplY3RcbiAgICAgICAgY29uc3QgYXJnMiA9IGNsb25lRGVlcChpbnB1dEFyZ3Muc2hpZnQoKSlcblxuICAgICAgICAvLyBhZGQgaW5zdGFuY2VJZCBpZiBub3QgcHJlc2VudFxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmICFhcmcyLmluc3RhbmNlSWQpIGFyZzIuaW5zdGFuY2VJZCA9IHV1aWQoKVxuXG4gICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhpcywgW2FyZzIsIGFyZzEsIC4uLmlucHV0QXJnc10pXG4gICAgICB9XG4gICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoaXMsIFthcmcxLCAuLi5pbnB1dEFyZ3NdKVxuICAgIH0sXG4gIH0sXG4gIHJlZGFjdDoge1xuICAgIHBhdGhzLFxuICAgIGNlbnNvcixcbiAgfSxcbn0pXG4iXX0=