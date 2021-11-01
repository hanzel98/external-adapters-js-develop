"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapSubgraph = void 0;
const dataProvider_1 = require("../dataProvider");
const graphqlQueries_1 = require("./graphqlQueries");
class UniswapSubgraph {
    constructor(url) {
        this.url = url;
    }
    async getToken(jobRunID, symbol) {
        const data = {
            query: graphqlQueries_1.getTokenQuery,
            variables: {
                symbol,
            },
            graphqlEndpoint: this.url,
        };
        const response = await dataProvider_1.fetchFromGraphqlAdapter(jobRunID, data);
        if (!response.result.data) {
            const error = response.result.error || 'Failed to get token information';
            throw new Error(error);
        }
        const tokens = response.result.data.tokens;
        if (tokens.length !== 1) {
            throw new Error(`Token ${symbol} not found`);
        }
        const token = tokens[0];
        return {
            id: token.id,
            decimals: token.decimals,
        };
    }
    async getTokenPairPrice(jobRunID, token0Address, token1Address) {
        const req1Data = {
            query: graphqlQueries_1.getPairQuery,
            variables: {
                token0ID: token0Address,
                token1ID: token1Address,
            },
            graphqlEndpoint: this.url,
        };
        const req1Response = await dataProvider_1.fetchFromGraphqlAdapter(jobRunID, req1Data);
        const req1Pairs = req1Response.result.data.pairs;
        if (req1Pairs.length > 0) {
            const highestVolumePair = req1Pairs[0];
            return highestVolumePair['token1Price'];
        }
        // Try reverse token0 and token1
        const req2Data = {
            query: graphqlQueries_1.getPairQuery,
            variables: {
                token0ID: token1Address,
                token1ID: token0Address,
            },
            graphqlEndpoint: this.url,
        };
        const req2Response = await dataProvider_1.fetchFromGraphqlAdapter(jobRunID, req2Data);
        const req2Pairs = req2Response.result.data.pairs;
        if (req2Pairs.length > 0) {
            const highestVolumePair = req2Pairs[0];
            return highestVolumePair['token0Price'];
        }
        return null;
    }
}
exports.UniswapSubgraph = UniswapSubgraph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tZXRob2RzL3ByaWNlcy9kZXgvdW5pc3dhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBeUQ7QUFDekQscURBQThEO0FBRTlELE1BQWEsZUFBZTtJQUcxQixZQUFZLEdBQVc7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBZ0IsRUFBRSxNQUFjO1FBQzdDLE1BQU0sSUFBSSxHQUEwQjtZQUNsQyxLQUFLLEVBQUUsOEJBQWE7WUFDcEIsU0FBUyxFQUFFO2dCQUNULE1BQU07YUFDUDtZQUNELGVBQWUsRUFBRSxJQUFJLENBQUMsR0FBRztTQUMxQixDQUFBO1FBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxzQ0FBdUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3pCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLGlDQUFpQyxDQUFBO1lBQ3hFLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDdkI7UUFDRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDMUMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsTUFBTSxZQUFZLENBQUMsQ0FBQTtTQUM3QztRQUNELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2QixPQUFPO1lBQ0wsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFZO1lBQ3RCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBa0I7U0FDbkMsQ0FBQTtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsaUJBQWlCLENBQ3JCLFFBQWdCLEVBQ2hCLGFBQXFCLEVBQ3JCLGFBQXFCO1FBRXJCLE1BQU0sUUFBUSxHQUEwQjtZQUN0QyxLQUFLLEVBQUUsNkJBQVk7WUFDbkIsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsYUFBYTthQUN4QjtZQUNELGVBQWUsRUFBRSxJQUFJLENBQUMsR0FBRztTQUMxQixDQUFBO1FBQ0QsTUFBTSxZQUFZLEdBQUcsTUFBTSxzQ0FBdUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDdEUsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ2hELElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEIsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDdEMsT0FBTyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUN4QztRQUVELGdDQUFnQztRQUNoQyxNQUFNLFFBQVEsR0FBMEI7WUFDdEMsS0FBSyxFQUFFLDZCQUFZO1lBQ25CLFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLGFBQWE7YUFDeEI7WUFDRCxlQUFlLEVBQUUsSUFBSSxDQUFDLEdBQUc7U0FDMUIsQ0FBQTtRQUVELE1BQU0sWUFBWSxHQUFHLE1BQU0sc0NBQXVCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3RFLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUNoRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RDLE9BQU8saUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDeEM7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7Q0FDRjtBQXJFRCwwQ0FxRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXhTdWJncmFwaCwgR3JhcGhxbEFkYXB0ZXJSZXF1ZXN0LCBUb2tlbkluZm9ybWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnXG5pbXBvcnQgeyBmZXRjaEZyb21HcmFwaHFsQWRhcHRlciB9IGZyb20gJy4uL2RhdGFQcm92aWRlcidcbmltcG9ydCB7IGdldFBhaXJRdWVyeSwgZ2V0VG9rZW5RdWVyeSB9IGZyb20gJy4vZ3JhcGhxbFF1ZXJpZXMnXG5cbmV4cG9ydCBjbGFzcyBVbmlzd2FwU3ViZ3JhcGggaW1wbGVtZW50cyBEZXhTdWJncmFwaCB7XG4gIHByaXZhdGUgdXJsOiBzdHJpbmdcblxuICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykge1xuICAgIHRoaXMudXJsID0gdXJsXG4gIH1cblxuICBhc3luYyBnZXRUb2tlbihqb2JSdW5JRDogc3RyaW5nLCBzeW1ib2w6IHN0cmluZyk6IFByb21pc2U8VG9rZW5JbmZvcm1hdGlvbj4ge1xuICAgIGNvbnN0IGRhdGE6IEdyYXBocWxBZGFwdGVyUmVxdWVzdCA9IHtcbiAgICAgIHF1ZXJ5OiBnZXRUb2tlblF1ZXJ5LFxuICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgIHN5bWJvbCxcbiAgICAgIH0sXG4gICAgICBncmFwaHFsRW5kcG9pbnQ6IHRoaXMudXJsLFxuICAgIH1cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRnJvbUdyYXBocWxBZGFwdGVyKGpvYlJ1bklELCBkYXRhKVxuICAgIGlmICghcmVzcG9uc2UucmVzdWx0LmRhdGEpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gcmVzcG9uc2UucmVzdWx0LmVycm9yIHx8ICdGYWlsZWQgdG8gZ2V0IHRva2VuIGluZm9ybWF0aW9uJ1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKVxuICAgIH1cbiAgICBjb25zdCB0b2tlbnMgPSByZXNwb25zZS5yZXN1bHQuZGF0YS50b2tlbnNcbiAgICBpZiAodG9rZW5zLmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUb2tlbiAke3N5bWJvbH0gbm90IGZvdW5kYClcbiAgICB9XG4gICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbMF1cbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRva2VuLmlkIGFzIHN0cmluZyxcbiAgICAgIGRlY2ltYWxzOiB0b2tlbi5kZWNpbWFscyBhcyBudW1iZXIsXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0VG9rZW5QYWlyUHJpY2UoXG4gICAgam9iUnVuSUQ6IHN0cmluZyxcbiAgICB0b2tlbjBBZGRyZXNzOiBzdHJpbmcsXG4gICAgdG9rZW4xQWRkcmVzczogc3RyaW5nLFxuICApOiBQcm9taXNlPG51bWJlciB8IG51bGw+IHtcbiAgICBjb25zdCByZXExRGF0YTogR3JhcGhxbEFkYXB0ZXJSZXF1ZXN0ID0ge1xuICAgICAgcXVlcnk6IGdldFBhaXJRdWVyeSxcbiAgICAgIHZhcmlhYmxlczoge1xuICAgICAgICB0b2tlbjBJRDogdG9rZW4wQWRkcmVzcyxcbiAgICAgICAgdG9rZW4xSUQ6IHRva2VuMUFkZHJlc3MsXG4gICAgICB9LFxuICAgICAgZ3JhcGhxbEVuZHBvaW50OiB0aGlzLnVybCxcbiAgICB9XG4gICAgY29uc3QgcmVxMVJlc3BvbnNlID0gYXdhaXQgZmV0Y2hGcm9tR3JhcGhxbEFkYXB0ZXIoam9iUnVuSUQsIHJlcTFEYXRhKVxuICAgIGNvbnN0IHJlcTFQYWlycyA9IHJlcTFSZXNwb25zZS5yZXN1bHQuZGF0YS5wYWlyc1xuICAgIGlmIChyZXExUGFpcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaGlnaGVzdFZvbHVtZVBhaXIgPSByZXExUGFpcnNbMF1cbiAgICAgIHJldHVybiBoaWdoZXN0Vm9sdW1lUGFpclsndG9rZW4xUHJpY2UnXVxuICAgIH1cblxuICAgIC8vIFRyeSByZXZlcnNlIHRva2VuMCBhbmQgdG9rZW4xXG4gICAgY29uc3QgcmVxMkRhdGE6IEdyYXBocWxBZGFwdGVyUmVxdWVzdCA9IHtcbiAgICAgIHF1ZXJ5OiBnZXRQYWlyUXVlcnksXG4gICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgdG9rZW4wSUQ6IHRva2VuMUFkZHJlc3MsXG4gICAgICAgIHRva2VuMUlEOiB0b2tlbjBBZGRyZXNzLFxuICAgICAgfSxcbiAgICAgIGdyYXBocWxFbmRwb2ludDogdGhpcy51cmwsXG4gICAgfVxuXG4gICAgY29uc3QgcmVxMlJlc3BvbnNlID0gYXdhaXQgZmV0Y2hGcm9tR3JhcGhxbEFkYXB0ZXIoam9iUnVuSUQsIHJlcTJEYXRhKVxuICAgIGNvbnN0IHJlcTJQYWlycyA9IHJlcTJSZXNwb25zZS5yZXN1bHQuZGF0YS5wYWlyc1xuICAgIGlmIChyZXEyUGFpcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaGlnaGVzdFZvbHVtZVBhaXIgPSByZXEyUGFpcnNbMF1cbiAgICAgIHJldHVybiBoaWdoZXN0Vm9sdW1lUGFpclsndG9rZW4wUHJpY2UnXVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iXX0=