"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootReducer = exports.selectParticiantsHeartbeatsFor = exports.selectTotalNumberOfHeartbeatsFor = exports.Intervals = exports.IntervalNames = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const _1 = require(".");
const config_1 = require("../cache-warmer/config");
const actions_1 = require("./actions");
var IntervalNames;
(function (IntervalNames) {
    IntervalNames["MINUTE"] = "MINUTE";
    IntervalNames["HOUR"] = "HOUR";
})(IntervalNames = exports.IntervalNames || (exports.IntervalNames = {}));
exports.Intervals = {
    [IntervalNames.MINUTE]: 60 * 1000,
    [IntervalNames.HOUR]: 60 * 60 * 1000,
};
const initialHeartbeatsState = {
    total: {},
    participants: {},
};
const DEFAULT_COST = 1;
const heartbeatReducer = toolkit_1.createReducer(initialHeartbeatsState, (builder) => {
    builder.addCase(actions_1.successfulResponseObserved, (state, action) => {
        const heartbeat = {
            id: _1.makeId(action.payload.input),
            c: action.payload.response.data.cost || DEFAULT_COST,
            t: Date.parse(action.payload.createdAt),
            h: !!action.payload.response.maxAge,
        };
        const { id } = heartbeat;
        // Init if first time seeing this id
        if (!state.participants[id]) {
            state.participants[id] = {
                HOUR: [],
            };
        }
        const storedIntervals = [IntervalNames.HOUR];
        for (const intervalName of storedIntervals) {
            const prevLength = state.participants[id][intervalName].length;
            /**
             * We skip adding warmup requests to state since
             * we dont use them anyway, but we still want to
             * re-compute throughtput on every incoming request
             */
            const isWarmupRequest = action.payload.input.id === config_1.WARMUP_REQUEST_ID;
            if (!isWarmupRequest) {
                state.participants[id][intervalName] = state.participants[id][intervalName].concat([
                    heartbeat,
                ]);
            }
            // remove all heartbeats that are older than the current interval
            const window = heartbeat.t - exports.Intervals[intervalName];
            const isInWindow = (h) => h.t >= window;
            state.participants[id][intervalName] = sortedFilter(state.participants[id][intervalName], isInWindow);
            const newLength = state.participants[id][intervalName].length;
            /**
             * We update our total observed heartbeats by the diff of this participants heartbeats length.
             * Ex. Let us have 5 observed heartbeats within the current hour interval across all
             * participants, then state.total[intervalName] = 5.
             * Let us have 3 observed heartbeats in the current participant, where 2 have just become stale,
             * since they are over an hour old.
             *
             * Then we have the following:
             * state.total[intervalName] = state.total[intervalName] + (newLength - prevLength)
             * state.total[HOUR] = state.total[HOUR] + (newLength - prevLength)
             * state.total[HOUR] = 5 + (1 - 3)
             * state.total[HOUR] = 5 + -2
             * state.total[HOUR] = 3
             */
            state.total[intervalName] = (state.total[intervalName] ?? 0) + (newLength - prevLength);
        }
        return state;
    });
});
/**
 * Remove stale heartbeat entries from an array.
 * This function assumes that the array is sorted by timestamp,
 * where the oldest entry lives in the 0th index, and the newest entry
 * lives in the arr.length-1th index
 * @param heartbeats The heartbeats to filter
 * @param filter The windowing function to apply
 */
function sortedFilter(heartbeats, windowingFunction) {
    // if we want a higher performance implementation
    // we can later resort to a custom array class that is circular
    // so we can amortize expensive operations like resizing, and make
    // operations like moving the head index much quicker
    const firstNonStaleHeartbeatIndex = heartbeats.findIndex(windowingFunction);
    if (firstNonStaleHeartbeatIndex === -1) {
        return [];
    }
    return heartbeats.slice(firstNonStaleHeartbeatIndex);
}
function selectTotalNumberOfHeartbeatsFor(state, interval) {
    return (state.total[interval] ?? 0) + 1;
}
exports.selectTotalNumberOfHeartbeatsFor = selectTotalNumberOfHeartbeatsFor;
function selectParticiantsHeartbeatsFor(state, interval, id) {
    return state.participants[id]?.[interval] ?? [];
}
exports.selectParticiantsHeartbeatsFor = selectParticiantsHeartbeatsFor;
exports.rootReducer = toolkit_1.combineReducers({
    heartbeats: heartbeatReducer,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcmF0ZS1saW1pdC9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUFpRTtBQUNqRSx3QkFBMEI7QUFDMUIsbURBQTBEO0FBQzFELHVDQUFzRDtBQUV0RCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDdkIsa0NBQWlCLENBQUE7SUFDakIsOEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUd4QjtBQUVZLFFBQUEsU0FBUyxHQUE4QjtJQUNsRCxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUNqQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7Q0FDckMsQ0FBQTtBQThCRCxNQUFNLHNCQUFzQixHQUFlO0lBQ3pDLEtBQUssRUFBRSxFQUFFO0lBQ1QsWUFBWSxFQUFFLEVBQUU7Q0FDakIsQ0FBQTtBQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQTtBQUV0QixNQUFNLGdCQUFnQixHQUFHLHVCQUFhLENBQWEsc0JBQXNCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUNyRixPQUFPLENBQUMsT0FBTyxDQUFDLG9DQUEwQixFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzVELE1BQU0sU0FBUyxHQUFjO1lBQzNCLEVBQUUsRUFBRSxTQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDaEMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksWUFBWTtZQUNwRCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUN2QyxDQUFD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QUksRUFBRSxDQUFBO0FBQ2pELENBQUM7QUFORCx3RUFNQztBQUVZLFFBQUEsV0FBVyxHQUFHLHlCQUFlLENBQUM7SUFDekMsVUFBVSxFQUFFLGdCQUFnQjtDQUM3QixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMsIGNyZWF0ZVJlZHVjZXIgfSBmcm9tICdAcmVkdXhqcy90b29sa2l0J1xuaW1wb3J0IHsgbWFrZUlkIH0gZnJvbSAnLidcbmltcG9ydCB7IFdBUk1VUF9SRVFVRVNUX0lEIH0gZnJvbSAnLi4vY2FjaGUtd2FybWVyL2NvbmZpZydcbmltcG9ydCB7IHN1Y2Nlc3NmdWxSZXNwb25zZU9ic2VydmVkIH0gZnJvbSAnLi9hY3Rpb25zJ1xuXG5leHBvcnQgZW51bSBJbnRlcnZhbE5hbWVzIHtcbiAgTUlOVVRFID0gJ01JTlVURScsXG4gIEhPVVIgPSAnSE9VUicsXG59XG5cbmV4cG9ydCBjb25zdCBJbnRlcnZhbHM6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7XG4gIFtJbnRlcnZhbE5hbWVzLk1JTlVURV06IDYwICogMTAwMCxcbiAgW0ludGVydmFsTmFtZXMuSE9VUl06IDYwICogNjAgKiAxMDAwLFxufVxuXG4vLyBTaG9ydGVuZWQgbmFtZXMgdG8gcmVkdWNlIG1lbW9yeSB1c2FnZVxuZXhwb3J0IGludGVyZmFjZSBIZWFydGJlYXQge1xuICBpZDogc3RyaW5nXG4gIC8qKlxuICAgKiBDb3N0XG4gICAqL1xuICBjOiBudW1iZXJcbiAgLyoqXG4gICAqIFRpbWVzdGFtcFxuICAgKi9cbiAgdDogbnVtYmVyXG4gIC8qKlxuICAgKiBpc0NhY2hlSGl0XG4gICAqL1xuICBoOiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVhcnRiZWF0cyB7XG4gIHRvdGFsOiB7XG4gICAgW2ludGVydmFsOiBzdHJpbmddOiBudW1iZXJcbiAgfVxuICBwYXJ0aWNpcGFudHM6IHtcbiAgICBbcGFydGljaXBhbnRJZDogc3RyaW5nXToge1xuICAgICAgW2ludGVydmFsOiBzdHJpbmddOiBIZWFydGJlYXRbXVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBpbml0aWFsSGVhcnRiZWF0c1N0YXRlOiBIZWFydGJlYXRzID0ge1xuICB0b3RhbDoge30sXG4gIHBhcnRpY2lwYW50czoge30sXG59XG5cbmNvbnN0IERFRkFVTFRfQ09TVCA9IDFcblxuY29uc3QgaGVhcnRiZWF0UmVkdWNlciA9IGNyZWF0ZVJlZHVjZXI8SGVhcnRiZWF0cz4oaW5pdGlhbEhlYXJ0YmVhdHNTdGF0ZSwgKGJ1aWxkZXIpID0+IHtcbiAgYnVpbGRlci5hZGRDYXNlKHN1Y2Nlc3NmdWxSZXNwb25zZU9ic2VydmVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGhlYXJ0YmVhdDogSGVhcnRiZWF0ID0ge1xuICAgICAgaWQ6IG1ha2VJZChhY3Rpb24ucGF5bG9hZC5pbnB1dCksXG4gICAgICBjOiBhY3Rpb24ucGF5bG9hZC5yZXNwb25zZS5kYXRhLmNvc3QgfHwgREVGQVVMVF9DT1NULFxuICAgICAgdDogRGF0ZS5wYXJzZShhY3Rpb24ucGF5bG9hZC5jcmVhdGVkQXQpLFxuICAgICAgaDogISFhY3Rpb24ucGF5bG9hZC5yZXNwb25zZS5tYXhBZ2UsXG4gICAgfVxuICAgIGNvbnN0IHsgaWQgfSA9IGhlYXJ0YmVhdFxuICAgIC8vIEluaXQgaWYgZmlyc3QgdGltZSBzZWVpbmcgdGhpcyBpZFxuICAgIGlmICghc3RhdGUucGFydGljaXBhbnRzW2lkXSkge1xuICAgICAgc3RhdGUucGFydGljaXBhbnRzW2lkXSA9IHtcbiAgICAgICAgSE9VUjogW10sXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0b3JlZEludGVydmFscyA9IFtJbnRlcnZhbE5hbWVzLkhPVVJdXG5cbiAgICBmb3IgKGNvbnN0IGludGVydmFsTmFtZSBvZiBzdG9yZWRJbnRlcnZhbHMpIHtcbiAgICAgIGNvbnN0IHByZXZMZW5ndGggPSBzdGF0ZS5wYXJ0aWNpcGFudHNbaWRdW2ludGVydmFsTmFtZV0ubGVuZ3RoXG4gICAgICAvKipcbiAgICAgICAqIFdlIHNraXAgYWRkaW5nIHdhcm11cCByZXF1ZXN0cyB0byBzdGF0ZSBzaW5jZVxuICAgICAgICogd2UgZG9udCB1c2UgdGhlbSBhbnl3YXksIGJ1dCB3ZSBzdGlsbCB3YW50IHRvXG4gICAgICAgKiByZS1jb21wdXRlIHRocm91Z2h0cHV0IG9uIGV2ZXJ5IGluY29taW5nIHJlcXVlc3RcbiAgICAgICAqL1xuICAgICAgY29uc3QgaXNXYXJtdXBSZXF1ZXN0ID0gYWN0aW9uLnBheWxvYWQuaW5wdXQuaWQgPT09IFdBUk1VUF9SRVFVRVNUX0lEXG4gICAgICBpZiAoIWlzV2FybXVwUmVxdWVzdCkge1xuICAgICAgICBzdGF0ZS5wYXJ0aWNpcGFudHNbaWRdW2ludGVydmFsTmFtZV0gPSBzdGF0ZS5wYXJ0aWNpcGFudHNbaWRdW2ludGVydmFsTmFtZV0uY29uY2F0KFtcbiAgICAgICAgICBoZWFydGJlYXQsXG4gICAgICAgIF0pXG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBhbGwgaGVhcnRiZWF0cyB0aGF0IGFyZSBvbGRlciB0aGFuIHRoZSBjdXJyZW50IGludGVydmFsXG4gICAgICBjb25zdCB3aW5kb3cgPSBoZWFydGJlYXQudCAtIEludGVydmFsc1tpbnRlcnZhbE5hbWVdXG4gICAgICBjb25zdCBpc0luV2luZG93ID0gKGg6IEhlYXJ0YmVhdCkgPT4gaC50ID49IHdpbmRvd1xuICAgICAgc3RhdGUucGFydGljaXBhbnRzW2lkXVtpbnRlcnZhbE5hbWVdID0gc29ydGVkRmlsdGVyKFxuICAgICAgICBzdGF0ZS5wYXJ0aWNpcGFudHNbaWRdW2ludGVydmFsTmFtZV0sXG4gICAgICAgIGlzSW5XaW5kb3csXG4gICAgICApXG4gICAgICBjb25zdCBuZXdMZW5ndGggPSBzdGF0ZS5wYXJ0aWNpcGFudHNbaWRdW2ludGVydmFsTmFtZV0ubGVuZ3RoXG4gICAgICAvKipcbiAgICAgICAqIFdlIHVwZGF0ZSBvdXIgdG90YWwgb2JzZXJ2ZWQgaGVhcnRiZWF0cyBieSB0aGUgZGlmZiBvZiB0aGlzIHBhcnRpY2lwYW50cyBoZWFydGJlYXRzIGxlbmd0aC5cbiAgICAgICAqIEV4LiBMZXQgdXMgaGF2ZSA1IG9ic2VydmVkIGhlYXJ0YmVhdHMgd2l0aGluIHRoZSBjdXJyZW50IGhvdXIgaW50ZXJ2YWwgYWNyb3NzIGFsbFxuICAgICAgICogcGFydGljaXBhbnRzLCB0aGVuIHN0YXRlLnRvdGFsW2ludGVydmFsTmFtZV0gPSA1LlxuICAgICAgICogTGV0IHVzIGhhdmUgMyBvYnNlcnZlZCBoZWFydGJlYXRzIGluIHRoZSBjdXJyZW50IHBhcnRpY2lwYW50LCB3aGVyZSAyIGhhdmUganVzdCBiZWNvbWUgc3RhbGUsXG4gICAgICAgKiBzaW5jZSB0aGV5IGFyZSBvdmVyIGFuIGhvdXIgb2xkLlxuICAgICAgICpcbiAgICAgICAqIFRoZW4gd2UgaGF2ZSB0aGUgZm9sbG93aW5nOlxuICAgICAgICogc3RhdGUudG90YWxbaW50ZXJ2YWxOYW1lXSA9IHN0YXRlLnRvdGFsW2ludGVydmFsTmFtZV0gKyAobmV3TGVuZ3RoIC0gcHJldkxlbmd0aClcbiAgICAgICAqIHN0YXRlLnRvdGFsW0hPVVJdID0gc3RhdGUudG90YWxbSE9VUl0gKyAobmV3TGVuZ3RoIC0gcHJldkxlbmd0aClcbiAgICAgICAqIHN0YXRlLnRvdGFsW0hPVVJdID0gNSArICgxIC0gMylcbiAgICAgICAqIHN0YXRlLnRvdGFsW0hPVVJdID0gNSArIC0yXG4gICAgICAgKiBzdGF0ZS50b3RhbFtIT1VSXSA9IDNcbiAgICAgICAqL1xuICAgICAgc3RhdGUudG90YWxbaW50ZXJ2YWxOYW1lXSA9IChzdGF0ZS50b3RhbFtpbnRlcnZhbE5hbWVdID8/IDApICsgKG5ld0xlbmd0aCAtIHByZXZMZW5ndGgpXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlXG4gIH0pXG59KVxuXG4vKipcbiAqIFJlbW92ZSBzdGFsZSBoZWFydGJlYXQgZW50cmllcyBmcm9tIGFuIGFycmF5LlxuICogVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgdGhlIGFycmF5IGlzIHNvcnRlZCBieSB0aW1lc3RhbXAsXG4gKiB3aGVyZSB0aGUgb2xkZXN0IGVudHJ5IGxpdmVzIGluIHRoZSAwdGggaW5kZXgsIGFuZCB0aGUgbmV3ZXN0IGVudHJ5XG4gKiBsaXZlcyBpbiB0aGUgYXJyLmxlbmd0aC0xdGggaW5kZXhcbiAqIEBwYXJhbSBoZWFydGJlYXRzIFRoZSBoZWFydGJlYXRzIHRvIGZpbHRlclxuICogQHBhcmFtIGZpbHRlciBUaGUgd2luZG93aW5nIGZ1bmN0aW9uIHRvIGFwcGx5XG4gKi9cbmZ1bmN0aW9uIHNvcnRlZEZpbHRlcihcbiAgaGVhcnRiZWF0czogSGVhcnRiZWF0W10sXG4gIHdpbmRvd2luZ0Z1bmN0aW9uOiAoaDogSGVhcnRiZWF0KSA9PiBib29sZWFuLFxuKTogSGVhcnRiZWF0W10ge1xuICAvLyBpZiB3ZSB3YW50IGEgaGlnaGVyIHBlcmZvcm1hbmNlIGltcGxlbWVudGF0aW9uXG4gIC8vIHdlIGNhbiBsYXRlciByZXNvcnQgdG8gYSBjdXN0b20gYXJyYXkgY2xhc3MgdGhhdCBpcyBjaXJjdWxhclxuICAvLyBzbyB3ZSBjYW4gYW1vcnRpemUgZXhwZW5zaXZlIG9wZXJhdGlvbnMgbGlrZSByZXNpemluZywgYW5kIG1ha2VcbiAgLy8gb3BlcmF0aW9ucyBsaWtlIG1vdmluZyB0aGUgaGVhZCBpbmRleCBtdWNoIHF1aWNrZXJcbiAgY29uc3QgZmlyc3ROb25TdGFsZUhlYXJ0YmVhdEluZGV4ID0gaGVhcnRiZWF0cy5maW5kSW5kZXgod2luZG93aW5nRnVuY3Rpb24pXG4gIGlmIChmaXJzdE5vblN0YWxlSGVhcnRiZWF0SW5kZXggPT09IC0xKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICByZXR1cm4gaGVhcnRiZWF0cy5zbGljZShmaXJzdE5vblN0YWxlSGVhcnRiZWF0SW5kZXgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RUb3RhbE51bWJlck9mSGVhcnRiZWF0c0ZvcihcbiAgc3RhdGU6IEhlYXJ0YmVhdHMsXG4gIGludGVydmFsOiBJbnRlcnZhbE5hbWVzLFxuKTogbnVtYmVyIHtcbiAgcmV0dXJuIChzdGF0ZS50b3RhbFtpbnRlcnZhbF0gPz8gMCkgKyAxXG59XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0UGFydGljaWFudHNIZWFydGJlYXRzRm9yKFxuICBzdGF0ZTogSGVhcnRiZWF0cyxcbiAgaW50ZXJ2YWw6IEludGVydmFsTmFtZXMsXG4gIGlkOiBzdHJpbmcsXG4pOiBIZWFydGJlYXRbXSB7XG4gIHJldHVybiBzdGF0ZS5wYXJ0aWNpcGFudHNbaWRdPy5baW50ZXJ2YWxdID8/IFtdXG59XG5cbmV4cG9ydCBjb25zdCByb290UmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGhlYXJ0YmVhdHM6IGhlYXJ0YmVhdFJlZHVjZXIsXG59KVxuZXhwb3J0IHR5cGUgUm9vdFN0YXRlID0gUmV0dXJuVHlwZTx0eXBlb2Ygcm9vdFJlZHVjZXI+XG4iXX0=