"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = exports.getAssetId = exports.authenticate = exports.apiHeaders = exports.host = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.host = 'bravenewcoin.p.rapidapi.com';
exports.apiHeaders = {
    'x-rapidapi-host': exports.host,
    'x-rapidapi-key': process.env.API_KEY,
};
const authenticate = async () => {
    const response = await ea_bootstrap_1.Requester.request({
        method: 'POST',
        url: `https://${exports.host}/oauth/token`,
        headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            useQueryString: true,
            ...exports.apiHeaders,
        },
        data: {
            audience: 'https://api.bravenewcoin.com',
            client_id: process.env.CLIENT_ID,
            grant_type: 'client_credentials',
        },
    });
    return response.data.access_token;
};
exports.authenticate = authenticate;
const getAssetId = async (symbol) => {
    const response = await ea_bootstrap_1.Requester.request({
        url: `https://${exports.host}/asset`,
        headers: {
            'content-type': 'application/octet-stream',
            useQueryString: true,
            ...exports.apiHeaders,
        },
        params: {
            status: 'ACTIVE',
            symbol,
        },
    });
    return response.data.content[0].id;
};
exports.getAssetId = getAssetId;
const convert = async (token, baseAssetId, quoteAssetId) => {
    const url = `https://${exports.host}/market-cap`;
    const path = ['content', 0, 'price'];
    const base = await ea_bootstrap_1.Requester.request({
        url,
        headers: {
            ...exports.apiHeaders,
            authorization: `Bearer ${token}`,
            useQueryString: true,
        },
        params: {
            assetId: baseAssetId,
        },
    });
    const basePrice = ea_bootstrap_1.Requester.validateResultNumber(base.data, path);
    if (quoteAssetId.toUpperCase() === 'USD') {
        const result = basePrice;
        return {
            status: 200,
            data: { result },
            result,
        };
    }
    const quote = await ea_bootstrap_1.Requester.request({
        url,
        headers: {
            ...exports.apiHeaders,
            authorization: `Bearer ${token}`,
            useQueryString: true,
        },
        params: {
            assetId: quoteAssetId,
        },
    });
    const quotePrice = ea_bootstrap_1.Requester.validateResultNumber(quote.data, path);
    const result = basePrice / quotePrice;
    return {
        status: 200,
        data: { result },
        result,
    };
};
exports.convert = convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUFtRDtBQUV0QyxRQUFBLElBQUksR0FBRyw2QkFBNkIsQ0FBQTtBQUNwQyxRQUFBLFVBQVUsR0FBRztJQUN4QixpQkFBaUIsRUFBRSxZQUFJO0lBQ3ZCLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztDQUN0QyxDQUFBO0FBRU0sTUFBTSxZQUFZLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDckMsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQztRQUN2QyxNQUFNLEVBQUUsTUFBTTtRQUNkLEdBQUcsRUFBRSxXQUFXLFlBQUksY0FBYztRQUNsQyxPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLE1BQU0sRUFBRSxrQkFBa0I7WUFDMUIsY0FBYyxFQUFFLElBQUk7WUFDcEIsR0FBRyxrQkFBVTtTQUNkO1FBQ0QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTO1lBQ2hDLFVBQVUsRUFBRSxvQkFBb0I7U0FDakM7S0FDRixDQUFDLENBQUE7SUFDRixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFBO0FBQ25DLENBQUMsQ0FBQTtBQWpCWSxRQUFBLFlBQVksZ0JBaUJ4QjtBQUVNLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxNQUFXLEVBQUUsRUFBRTtJQUM5QyxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLEdBQUcsRUFBRSxXQUFXLFlBQUksUUFBUTtRQUM1QixPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsMEJBQTBCO1lBQzFDLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLEdBQUcsa0JBQVU7U0FDZDtRQUNELE1BQU0sRUFBRTtZQUNOLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE1BQU07U0FDUDtLQUNGLENBQUMsQ0FBQTtJQUNGLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0FBQ3BDLENBQUMsQ0FBQTtBQWRZLFFBQUEsVUFBVSxjQWN0QjtBQUVNLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFVLEVBQUUsV0FBZ0IsRUFBRSxZQUFpQixFQUFFLEVBQUU7SUFDL0UsTUFBTSxHQUFHLEdBQUcsV0FBVyxZQUFJLGFBQWEsQ0FBQTtJQUN4QyxNQUFNLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDcEMsTUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQztRQUNuQyxHQUFHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsR0FBRyxrQkFBVTtZQUNiLGFBQWEsRUFBRSxVQUFVLEtBQUssRUFBRTtZQUNoQyxjQUFjLEVBQUUsSUFBSTtTQUNyQjtRQUNELE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxXQUFXO1NBQ3JCO0tBQ0YsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxTQUFTLEdBQUcsd0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2pFLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRTtRQUN4QyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUE7UUFDeEIsT0FBTztZQUNMLE1BQU0sRUFBRSxHQUFHO1lBQ1gsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFO1lBQ2hCLE1BQU07U0FDUCxDQUFBO0tBQ0Y7SUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3BDLEdBQUc7UUFDSCxPQUFPLEVBQUU7WUFDUCxHQUFHLGtCQUFVO1lBQ2IsYUFBYSxFQUFFLFVBQVUsS0FBSyxFQUFFO1lBQ2hDLGNBQWMsRUFBRSxJQUFJO1NBQ3JCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLFlBQVk7U0FDdEI7S0FDRixDQUFDLENBQUE7SUFDRixNQUFNLFVBQVUsR0FBRyx3QkFBUyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDbkUsTUFBTSxNQUFNLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBQTtJQUNyQyxPQUFPO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUU7UUFDaEIsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUE7QUF6Q1ksUUFBQSxPQUFPLFdBeUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuXG5leHBvcnQgY29uc3QgaG9zdCA9ICdicmF2ZW5ld2NvaW4ucC5yYXBpZGFwaS5jb20nXG5leHBvcnQgY29uc3QgYXBpSGVhZGVycyA9IHtcbiAgJ3gtcmFwaWRhcGktaG9zdCc6IGhvc3QsXG4gICd4LXJhcGlkYXBpLWtleSc6IHByb2Nlc3MuZW52LkFQSV9LRVksXG59XG5cbmV4cG9ydCBjb25zdCBhdXRoZW50aWNhdGUgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogYGh0dHBzOi8vJHtob3N0fS9vYXV0aC90b2tlbmAsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgdXNlUXVlcnlTdHJpbmc6IHRydWUsXG4gICAgICAuLi5hcGlIZWFkZXJzLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgYXVkaWVuY2U6ICdodHRwczovL2FwaS5icmF2ZW5ld2NvaW4uY29tJyxcbiAgICAgIGNsaWVudF9pZDogcHJvY2Vzcy5lbnYuQ0xJRU5UX0lELFxuICAgICAgZ3JhbnRfdHlwZTogJ2NsaWVudF9jcmVkZW50aWFscycsXG4gICAgfSxcbiAgfSlcbiAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuXG59XG5cbmV4cG9ydCBjb25zdCBnZXRBc3NldElkID0gYXN5bmMgKHN5bWJvbDogYW55KSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3Qoe1xuICAgIHVybDogYGh0dHBzOi8vJHtob3N0fS9hc3NldGAsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICAgdXNlUXVlcnlTdHJpbmc6IHRydWUsXG4gICAgICAuLi5hcGlIZWFkZXJzLFxuICAgIH0sXG4gICAgcGFyYW1zOiB7XG4gICAgICBzdGF0dXM6ICdBQ1RJVkUnLFxuICAgICAgc3ltYm9sLFxuICAgIH0sXG4gIH0pXG4gIHJldHVybiByZXNwb25zZS5kYXRhLmNvbnRlbnRbMF0uaWRcbn1cblxuZXhwb3J0IGNvbnN0IGNvbnZlcnQgPSBhc3luYyAodG9rZW46IGFueSwgYmFzZUFzc2V0SWQ6IGFueSwgcXVvdGVBc3NldElkOiBhbnkpID0+IHtcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vJHtob3N0fS9tYXJrZXQtY2FwYFxuICBjb25zdCBwYXRoID0gWydjb250ZW50JywgMCwgJ3ByaWNlJ11cbiAgY29uc3QgYmFzZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KHtcbiAgICB1cmwsXG4gICAgaGVhZGVyczoge1xuICAgICAgLi4uYXBpSGVhZGVycyxcbiAgICAgIGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgdXNlUXVlcnlTdHJpbmc6IHRydWUsXG4gICAgfSxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGFzc2V0SWQ6IGJhc2VBc3NldElkLFxuICAgIH0sXG4gIH0pXG4gIGNvbnN0IGJhc2VQcmljZSA9IFJlcXVlc3Rlci52YWxpZGF0ZVJlc3VsdE51bWJlcihiYXNlLmRhdGEsIHBhdGgpXG4gIGlmIChxdW90ZUFzc2V0SWQudG9VcHBlckNhc2UoKSA9PT0gJ1VTRCcpIHtcbiAgICBjb25zdCByZXN1bHQgPSBiYXNlUHJpY2VcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICBkYXRhOiB7IHJlc3VsdCB9LFxuICAgICAgcmVzdWx0LFxuICAgIH1cbiAgfVxuICBjb25zdCBxdW90ZSA9IGF3YWl0IFJlcXVlc3Rlci5yZXF1ZXN0KHtcbiAgICB1cmwsXG4gICAgaGVhZGVyczoge1xuICAgICAgLi4uYXBpSGVhZGVycyxcbiAgICAgIGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgdXNlUXVlcnlTdHJpbmc6IHRydWUsXG4gICAgfSxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGFzc2V0SWQ6IHF1b3RlQXNzZXRJZCxcbiAgICB9LFxuICB9KVxuICBjb25zdCBxdW90ZVByaWNlID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHF1b3RlLmRhdGEsIHBhdGgpXG4gIGNvbnN0IHJlc3VsdCA9IGJhc2VQcmljZSAvIHF1b3RlUHJpY2VcbiAgcmV0dXJuIHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBkYXRhOiB7IHJlc3VsdCB9LFxuICAgIHJlc3VsdCxcbiAgfVxufVxuIl19