"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.separateBatches = void 0;
/**
 * Separates a batched request into indivdual requests and calls a callback function with the individual request passed in
 * @param input The original batched request
 * @param dataFields The input request data object's fields
 * @param callback Callback function that is called after batching is complete
 */
const separateBatches = async (input, callback) => {
    await separateBatchesHelper(input, input, Object.keys(input.data), callback);
};
exports.separateBatches = separateBatches;
const separateBatchesHelper = async (curr, input, dataFields, callback) => {
    if (dataFields.length === 0) {
        await callback(curr);
    }
    else {
        let dataValues = input.data[dataFields[0]];
        if (dataValues != null && dataValues != undefined) {
            dataValues = Array.isArray(dataValues) ? dataValues : [dataValues];
            for (const val of dataValues) {
                const updatedCurr = {
                    ...curr,
                    data: {
                        ...curr.data,
                        [dataFields[0]]: val,
                    },
                };
                await separateBatchesHelper(updatedCurr, input, dataFields.slice(1), callback);
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3dzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOzs7OztHQUtHO0FBQ0ksTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUNsQyxLQUFxQixFQUNyQixRQUF3RCxFQUN6QyxFQUFFO0lBQ2pCLE1BQU0scUJBQXFCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUM5RSxDQUFDLENBQUE7QUFMWSxRQUFBLGVBQWUsbUJBSzNCO0FBRUQsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQ2pDLElBQW9CLEVBQ3BCLEtBQXFCLEVBQ3JCLFVBQW9CLEVBQ3BCLFFBQXdELEVBQ3pDLEVBQUU7SUFDakIsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMzQixNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUNyQjtTQUFNO1FBQ0wsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMxQyxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksVUFBVSxJQUFJLFNBQVMsRUFBRTtZQUNqRCxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2xFLEtBQUssTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFO2dCQUM1QixNQUFNLFdBQVcsR0FBRztvQkFDbEIsR0FBRyxJQUFJO29CQUNQLElBQUksRUFBRTt3QkFDSixHQUFHLElBQUksQ0FBQyxJQUFJO3dCQUNaLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRztxQkFDckI7aUJBQ0YsQ0FBQTtnQkFDRCxNQUFNLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUMvRTtTQUNGO0tBQ0Y7QUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGFwdGVyUmVxdWVzdCB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbi8qKlxuICogU2VwYXJhdGVzIGEgYmF0Y2hlZCByZXF1ZXN0IGludG8gaW5kaXZkdWFsIHJlcXVlc3RzIGFuZCBjYWxscyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIGluZGl2aWR1YWwgcmVxdWVzdCBwYXNzZWQgaW5cbiAqIEBwYXJhbSBpbnB1dCBUaGUgb3JpZ2luYWwgYmF0Y2hlZCByZXF1ZXN0XG4gKiBAcGFyYW0gZGF0YUZpZWxkcyBUaGUgaW5wdXQgcmVxdWVzdCBkYXRhIG9iamVjdCdzIGZpZWxkc1xuICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGJhdGNoaW5nIGlzIGNvbXBsZXRlXG4gKi9cbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUJhdGNoZXMgPSBhc3luYyAoXG4gIGlucHV0OiBBZGFwdGVyUmVxdWVzdCxcbiAgY2FsbGJhY2s6IChzaW5nbGVJbnB1dDogQWRhcHRlclJlcXVlc3QpID0+IFByb21pc2U8dm9pZD4sXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgYXdhaXQgc2VwYXJhdGVCYXRjaGVzSGVscGVyKGlucHV0LCBpbnB1dCwgT2JqZWN0LmtleXMoaW5wdXQuZGF0YSksIGNhbGxiYWNrKVxufVxuXG5jb25zdCBzZXBhcmF0ZUJhdGNoZXNIZWxwZXIgPSBhc3luYyAoXG4gIGN1cnI6IEFkYXB0ZXJSZXF1ZXN0LFxuICBpbnB1dDogQWRhcHRlclJlcXVlc3QsXG4gIGRhdGFGaWVsZHM6IHN0cmluZ1tdLFxuICBjYWxsYmFjazogKHNpbmdsZUlucHV0OiBBZGFwdGVyUmVxdWVzdCkgPT4gUHJvbWlzZTx2b2lkPixcbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoZGF0YUZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICBhd2FpdCBjYWxsYmFjayhjdXJyKVxuICB9IGVsc2Uge1xuICAgIGxldCBkYXRhVmFsdWVzID0gaW5wdXQuZGF0YVtkYXRhRmllbGRzWzBdXVxuICAgIGlmIChkYXRhVmFsdWVzICE9IG51bGwgJiYgZGF0YVZhbHVlcyAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGRhdGFWYWx1ZXMgPSBBcnJheS5pc0FycmF5KGRhdGFWYWx1ZXMpID8gZGF0YVZhbHVlcyA6IFtkYXRhVmFsdWVzXVxuICAgICAgZm9yIChjb25zdCB2YWwgb2YgZGF0YVZhbHVlcykge1xuICAgICAgICBjb25zdCB1cGRhdGVkQ3VyciA9IHtcbiAgICAgICAgICAuLi5jdXJyLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIC4uLmN1cnIuZGF0YSxcbiAgICAgICAgICAgIFtkYXRhRmllbGRzWzBdXTogdmFsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgc2VwYXJhdGVCYXRjaGVzSGVscGVyKHVwZGF0ZWRDdXJyLCBpbnB1dCwgZGF0YUZpZWxkcy5zbGljZSgxKSwgY2FsbGJhY2spXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=