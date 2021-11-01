"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeJsonTree = exports.getDataForEpoch = exports.getDataForCID = exports.getDataFromIPNS = void 0;
const getDataFromIPNS = async (jobRunID, ipfs, ipnsName, context) => {
    const params = { id: jobRunID, data: { endpoint: 'read', ipns: ipnsName, type: 'dag' } };
    const response = await ipfs(params, context);
    return response.result;
};
exports.getDataFromIPNS = getDataFromIPNS;
const getDataForCID = async (jobRunID, ipfs, cid, context) => {
    const params = { id: jobRunID, data: { endpoint: 'read', cid, codec: 'json' } };
    const response = await ipfs(params, context);
    return response.result;
};
exports.getDataForCID = getDataForCID;
const getDataForEpoch = async (jobRunID, ipfs, ipnsName, epoch, context) => {
    const oracleRewardsDataByEpoch = await exports.getDataFromIPNS(jobRunID, ipfs, ipnsName, context);
    if (!(epoch in oracleRewardsDataByEpoch.dataByEpoch)) {
        throw Error(`Epoch ${epoch} was not found in OracleRewardsDataByEpoch`);
    }
    return exports.getDataForCID(jobRunID, ipfs, oracleRewardsDataByEpoch.dataByEpoch[epoch].toV1(), context);
};
exports.getDataForEpoch = getDataForEpoch;
const storeJsonTree = async (jobRunID, ipfs, data, context) => {
    const params = { id: jobRunID, data: { endpoint: 'write', data, codec: 'json', cidVersion: 1 } };
    const response = await ipfs(params, context);
    return response.result;
};
exports.storeJsonTree = storeJsonTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBmcy1kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lwZnMtZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUF1Q08sTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUNsQyxRQUFnQixFQUNoQixJQUFhLEVBQ2IsUUFBZ0IsRUFDaEIsT0FBdUIsRUFDWSxFQUFFO0lBQ3JDLE1BQU0sTUFBTSxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUE7SUFDeEYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzVDLE9BQU8sUUFBUSxDQUFDLE1BQWtDLENBQUE7QUFDcEQsQ0FBQyxDQUFBO0FBVFksUUFBQSxlQUFlLG1CQVMzQjtBQUVNLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsUUFBZ0IsRUFDaEIsSUFBYSxFQUNiLEdBQXdCLEVBQ3hCLE9BQXVCLEVBQ3ZCLEVBQUU7SUFDRixNQUFNLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUE7SUFDL0UsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzVDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQTtBQUN4QixDQUFDLENBQUE7QUFUWSxRQUFBLGFBQWEsaUJBU3pCO0FBRU0sTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUNsQyxRQUFnQixFQUNoQixJQUFhLEVBQ2IsUUFBZ0IsRUFDaEIsS0FBYSxFQUNiLE9BQXVCLEVBQ0ssRUFBRTtJQUM5QixNQUFNLHdCQUF3QixHQUFHLE1BQU0sdUJBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN6RixJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksd0JBQXdCLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDcEQsTUFBTSxLQUFLLENBQUMsU0FBUyxLQUFLLDRDQUE0QyxDQUFDLENBQUE7S0FDeEU7SUFDRCxPQUFPLHFCQUFhLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDbkcsQ0FBQyxDQUFBO0FBWlksUUFBQSxlQUFlLG1CQVkzQjtBQUVNLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsUUFBZ0IsRUFDaEIsSUFBYSxFQUNiLElBQW9CLEVBQ3BCLE9BQXVCLEVBQ3ZCLEVBQUU7SUFDRixNQUFNLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQTtJQUNoRyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDNUMsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFBO0FBQ3hCLENBQUMsQ0FBQTtBQVRZLFFBQUEsYUFBYSxpQkFTekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeGVjdXRlLCBBZGFwdGVyQ29udGV4dCB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdldGhlcnMnXG5pbXBvcnQgeyB0eXBlcyB9IGZyb20gJ0BjaGFpbmxpbmsvaXBmcy1hZGFwdGVyJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEFkZHJlc3NSZXdhcmRzIHtcbiAgW2FkZHJlc3M6IHN0cmluZ106IEJpZ051bWJlclxufVxuXG5leHBvcnQgdHlwZSBNZXJrbGVUcmVlRGF0YSA9IFtzdHJpbmcsIHN0cmluZ11bXVxuXG5leHBvcnQgaW50ZXJmYWNlIE9yYWNsZVJld2FyZHNEYXRhQnlFcG9jaCB7XG4gIGxhdGVzdEVwb2NoOiBudW1iZXJcbiAgZGF0YUJ5RXBvY2g6IHtcbiAgICBbZXBvY2g6IG51bWJlcl06IHR5cGVzLnJlYWQuQ0lEXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcmFjbGVSZXdhcmRzRGF0YSB7XG4gIGVwb2NoOiBudW1iZXJcbiAgcmV0cm9hY3RpdmVUcmFkZVZvbHVtZT86IHtcbiAgICBbYWRkcmVzczogc3RyaW5nXTogbnVtYmVyXG4gIH1cbiAgdHJhZGVWb2x1bWU/OiB7XG4gICAgW2FkZHJlc3M6IHN0cmluZ106IG51bWJlclxuICB9XG4gIGlzRXhwb1VzZXI/OiB7XG4gICAgW2FkZHJlc3M6IHN0cmluZ106IGJvb2xlYW5cbiAgfVxuICB0cmFkZUZlZXNQYWlkOiB7XG4gICAgW2FkZHJlc3M6IHN0cmluZ106IG51bWJlclxuICB9XG4gIG9wZW5JbnRlcmVzdDoge1xuICAgIFthZGRyZXNzOiBzdHJpbmddOiBudW1iZXJcbiAgfVxuICBxdW90ZVNjb3JlOiB7XG4gICAgW2FkZHJlc3M6IHN0cmluZ106IG51bWJlclxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXREYXRhRnJvbUlQTlMgPSBhc3luYyAoXG4gIGpvYlJ1bklEOiBzdHJpbmcsXG4gIGlwZnM6IEV4ZWN1dGUsXG4gIGlwbnNOYW1lOiBzdHJpbmcsXG4gIGNvbnRleHQ6IEFkYXB0ZXJDb250ZXh0LFxuKTogUHJvbWlzZTxPcmFjbGVSZXdhcmRzRGF0YUJ5RXBvY2g+ID0+IHtcbiAgY29uc3QgcGFyYW1zID0geyBpZDogam9iUnVuSUQsIGRhdGE6IHsgZW5kcG9pbnQ6ICdyZWFkJywgaXBuczogaXBuc05hbWUsIHR5cGU6ICdkYWcnIH0gfVxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGlwZnMocGFyYW1zLCBjb250ZXh0KVxuICByZXR1cm4gcmVzcG9uc2UucmVzdWx0IGFzIE9yYWNsZVJld2FyZHNEYXRhQnlFcG9jaFxufVxuXG5leHBvcnQgY29uc3QgZ2V0RGF0YUZvckNJRCA9IGFzeW5jIChcbiAgam9iUnVuSUQ6IHN0cmluZyxcbiAgaXBmczogRXhlY3V0ZSxcbiAgY2lkOiB0eXBlcy5yZWFkLklQRlNQYXRoLFxuICBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCxcbikgPT4ge1xuICBjb25zdCBwYXJhbXMgPSB7IGlkOiBqb2JSdW5JRCwgZGF0YTogeyBlbmRwb2ludDogJ3JlYWQnLCBjaWQsIGNvZGVjOiAnanNvbicgfSB9XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaXBmcyhwYXJhbXMsIGNvbnRleHQpXG4gIHJldHVybiByZXNwb25zZS5yZXN1bHRcbn1cblxuZXhwb3J0IGNvbnN0IGdldERhdGFGb3JFcG9jaCA9IGFzeW5jIChcbiAgam9iUnVuSUQ6IHN0cmluZyxcbiAgaXBmczogRXhlY3V0ZSxcbiAgaXBuc05hbWU6IHN0cmluZyxcbiAgZXBvY2g6IG51bWJlcixcbiAgY29udGV4dDogQWRhcHRlckNvbnRleHQsXG4pOiBQcm9taXNlPE9yYWNsZVJld2FyZHNEYXRhPiA9PiB7XG4gIGNvbnN0IG9yYWNsZVJld2FyZHNEYXRhQnlFcG9jaCA9IGF3YWl0IGdldERhdGFGcm9tSVBOUyhqb2JSdW5JRCwgaXBmcywgaXBuc05hbWUsIGNvbnRleHQpXG4gIGlmICghKGVwb2NoIGluIG9yYWNsZVJld2FyZHNEYXRhQnlFcG9jaC5kYXRhQnlFcG9jaCkpIHtcbiAgICB0aHJvdyBFcnJvcihgRXBvY2ggJHtlcG9jaH0gd2FzIG5vdCBmb3VuZCBpbiBPcmFjbGVSZXdhcmRzRGF0YUJ5RXBvY2hgKVxuICB9XG4gIHJldHVybiBnZXREYXRhRm9yQ0lEKGpvYlJ1bklELCBpcGZzLCBvcmFjbGVSZXdhcmRzRGF0YUJ5RXBvY2guZGF0YUJ5RXBvY2hbZXBvY2hdLnRvVjEoKSwgY29udGV4dClcbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JlSnNvblRyZWUgPSBhc3luYyAoXG4gIGpvYlJ1bklEOiBzdHJpbmcsXG4gIGlwZnM6IEV4ZWN1dGUsXG4gIGRhdGE6IE1lcmtsZVRyZWVEYXRhLFxuICBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCxcbikgPT4ge1xuICBjb25zdCBwYXJhbXMgPSB7IGlkOiBqb2JSdW5JRCwgZGF0YTogeyBlbmRwb2ludDogJ3dyaXRlJywgZGF0YSwgY29kZWM6ICdqc29uJywgY2lkVmVyc2lvbjogMSB9IH1cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBpcGZzKHBhcmFtcywgY29udGV4dClcbiAgcmV0dXJuIHJlc3BvbnNlLnJlc3VsdFxufVxuIl19