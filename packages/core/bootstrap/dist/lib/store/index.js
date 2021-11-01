"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureStore = exports.toActionPayload = exports.asAction = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const redux_1 = require("redux");
const remote_redux_devtools_1 = require("remote-redux-devtools");
const asAction = () => (p) => ({
    payload: exports.toActionPayload(p),
});
exports.asAction = asAction;
const toActionPayload = (data) => ({
    id: toolkit_1.nanoid(),
    createdAt: new Date().toISOString(),
    ...data,
});
exports.toActionPayload = toActionPayload;
function configureStore(rootReducer, preloadedState = {}, middleware = []) {
    const middlewareEnhancer = redux_1.applyMiddleware(...middleware);
    const enhancers = [middlewareEnhancer];
    const composedEnhancers = process.env.NODE_ENV === 'development'
        ? remote_redux_devtools_1.composeWithDevTools({
            realtime: true,
            port: 8000,
            actionsBlacklist: ['WS/MESSAGE_RECEIVED'],
        })(...enhancers)
        : redux_1.compose(...enhancers);
    // Create a store with the root reducer function being the one exposed by the manager.
    return redux_1.createStore(rootReducer, preloadedState, composedEnhancers);
}
exports.configureStore = configureStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUF5QztBQUN6QyxpQ0FVYztBQUNkLGlFQUEyRDtBQUVwRCxNQUFNLFFBQVEsR0FDbkIsR0FBTSxFQUFFLENBQ1IsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxPQUFPLEVBQUUsdUJBQWUsQ0FBSSxDQUFDLENBQUM7Q0FDL0IsQ0FBQyxDQUFBO0FBSlMsUUFBQSxRQUFRLFlBSWpCO0FBRUcsTUFBTSxlQUFlLEdBQUcsQ0FBSSxJQUFPLEVBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQzlELEVBQUUsRUFBRSxnQkFBTSxFQUFFO0lBQ1osU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO0lBQ25DLEdBQUcsSUFBSTtDQUNSLENBQUMsQ0FBQTtBQUpXLFFBQUEsZUFBZSxtQkFJMUI7QUFPRixTQUFnQixjQUFjLENBQzVCLFdBQW9CLEVBQ3BCLGlCQUFzQyxFQUFFLEVBQ3hDLGFBQThELEVBQUU7SUFFaEUsTUFBTSxrQkFBa0IsR0FBRyx1QkFBZSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUE7SUFFekQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ3RDLE1BQU0saUJBQWlCLEdBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWE7UUFDcEMsQ0FBQyxDQUFDLDJDQUFtQixDQUFDO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLElBQUk7WUFDVixnQkFBZ0IsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1NBQzFDLENBQUMsQ0FBQyxHQUFJLFNBQWlCLENBQUM7UUFDM0IsQ0FBQyxDQUFDLGVBQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFBO0lBRTNCLHNGQUFzRjtJQUN0RixPQUFPLG1CQUFXLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3BFLENBQUM7QUFuQkQsd0NBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmFub2lkIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCdcbmltcG9ydCB7XG4gIEFueUFjdGlvbixcbiAgYXBwbHlNaWRkbGV3YXJlLFxuICBjb21wb3NlLFxuICBjcmVhdGVTdG9yZSxcbiAgRGlzcGF0Y2gsXG4gIE1pZGRsZXdhcmUsXG4gIFByZWxvYWRlZFN0YXRlLFxuICBSZWR1Y2VyLFxuICBTdG9yZSxcbn0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb21wb3NlV2l0aERldlRvb2xzIH0gZnJvbSAncmVtb3RlLXJlZHV4LWRldnRvb2xzJ1xuXG5leHBvcnQgY29uc3QgYXNBY3Rpb24gPVxuICA8VD4oKSA9PlxuICAocDogVCkgPT4gKHtcbiAgICBwYXlsb2FkOiB0b0FjdGlvblBheWxvYWQ8VD4ocCksXG4gIH0pXG5cbmV4cG9ydCBjb25zdCB0b0FjdGlvblBheWxvYWQgPSA8VD4oZGF0YTogVCk6IEFjdGlvbkJhc2UgJiBUID0+ICh7XG4gIGlkOiBuYW5vaWQoKSxcbiAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gIC4uLmRhdGEsXG59KVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbkJhc2Uge1xuICBpZDogc3RyaW5nXG4gIGNyZWF0ZWRBdDogc3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShcbiAgcm9vdFJlZHVjZXI6IFJlZHVjZXIsXG4gIHByZWxvYWRlZFN0YXRlOiBQcmVsb2FkZWRTdGF0ZTxhbnk+ID0ge30sXG4gIG1pZGRsZXdhcmU6IE1pZGRsZXdhcmU8dW5rbm93biwgYW55LCBEaXNwYXRjaDxBbnlBY3Rpb24+PltdID0gW10sXG4pOiBTdG9yZSB7XG4gIGNvbnN0IG1pZGRsZXdhcmVFbmhhbmNlciA9IGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKVxuXG4gIGNvbnN0IGVuaGFuY2VycyA9IFttaWRkbGV3YXJlRW5oYW5jZXJdXG4gIGNvbnN0IGNvbXBvc2VkRW5oYW5jZXJzOiBhbnkgPVxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnXG4gICAgICA/IGNvbXBvc2VXaXRoRGV2VG9vbHMoe1xuICAgICAgICAgIHJlYWx0aW1lOiB0cnVlLFxuICAgICAgICAgIHBvcnQ6IDgwMDAsXG4gICAgICAgICAgYWN0aW9uc0JsYWNrbGlzdDogWydXUy9NRVNTQUdFX1JFQ0VJVkVEJ10sXG4gICAgICAgIH0pKC4uLihlbmhhbmNlcnMgYXMgYW55KSlcbiAgICAgIDogY29tcG9zZSguLi5lbmhhbmNlcnMpXG5cbiAgLy8gQ3JlYXRlIGEgc3RvcmUgd2l0aCB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uIGJlaW5nIHRoZSBvbmUgZXhwb3NlZCBieSB0aGUgbWFuYWdlci5cbiAgcmV0dXJuIGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgY29tcG9zZWRFbmhhbmNlcnMpXG59XG4iXX0=