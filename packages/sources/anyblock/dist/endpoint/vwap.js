"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['vwap'];
const customError = (data) => {
    return !data.hits || !data.hits.hits || data.hits.hits.length < 1;
};
exports.inputParameters = {
    address: true,
    debug: false,
    roundDay: false,
    start: false,
    end: false,
};
const buildVWAP = (response, debug) => {
    const sources = response.data.hits.hits.map((i) => {
        const reserve0 = i._source.args.find((j) => j.pos === 0);
        const reserve1 = i._source.args.find((j) => j.pos === 1);
        return {
            timestamp: i._source.timestamp,
            reserve0: parseInt(reserve0['value.hex'], 16),
            reserve1: parseInt(reserve1['value.hex'], 16),
        };
    });
    let overallVolume = 0;
    let sumAmountAndPrices = 0;
    for (let i = 1; i < sources.length; i++) {
        const reserve0volume = Math.abs(sources[i].reserve0 - sources[i - 1].reserve0);
        const price = sources[i].reserve0 / sources[i].reserve1;
        overallVolume += reserve0volume;
        sumAmountAndPrices += price * reserve0volume;
    }
    const vwap = sumAmountAndPrices / overallVolume;
    const resp = {
        status: response.status,
        data: { result: vwap },
    };
    if (debug)
        resp.data.raw = sources;
    return resp;
};
const cleanupDate = (inputDate, roundDay) => {
    let outputDate;
    try {
        outputDate = parseInt(inputDate);
        if (roundDay) {
            const date = new Date(outputDate);
            date.setUTCHours(0, 0, 0, 0);
            outputDate = date.getTime();
        }
    }
    catch (err) {
        return inputDate;
    }
    return outputDate;
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    // TODO: validate this is a checksum address
    const address = validator.validated.data.address;
    const debug = validator.validated.data.debug || false;
    const roundDay = validator.validated.data.roundDay || false;
    let start = validator.validated.data.start;
    let end = validator.validated.data.end;
    const url = '/ethereum/ethereum/mainnet/es/event/search/';
    end = cleanupDate(end, roundDay);
    start = cleanupDate(start, roundDay);
    if (!start && !end) {
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        end = date.getTime() / 1000;
        start = end - 60 * 60 * 24;
    }
    else if (!start) {
        start = end - 60 * 60 * 24;
    }
    else if (!end) {
        end = start + 60 * 60 * 24;
    }
    else if (start === end) {
        start = end - 60 * 60 * 24;
    }
    const body = {
        query: {
            bool: {
                filter: [
                    { term: { 'address.raw': address } },
                    { term: { 'event.raw': 'Sync' } },
                    {
                        range: {
                            timestamp: {
                                gte: start,
                                lte: end,
                            },
                        },
                    },
                ],
            },
        },
        sort: [{ timestamp: 'asc' }],
        size: 10000,
        _source: ['timestamp', 'args'],
    };
    const options = {
        ...config.api,
        url,
        data: body,
    };
    const response = await ea_bootstrap_1.Requester.request(options, customError);
    const vwapResp = buildVWAP(response, debug);
    return ea_bootstrap_1.Requester.success(jobRunID, vwapResp, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidndhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC92d2FwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUE4RDtBQUdqRCxRQUFBLGtCQUFrQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7QUFFMUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRTtJQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7QUFDbkUsQ0FBQyxDQUFBO0FBRVksUUFBQSxlQUFlLEdBQW9CO0lBQzlDLE9BQU8sRUFBRSxJQUFJO0lBQ2IsS0FBSyxFQUFFLEtBQUs7SUFDWixRQUFRLEVBQUUsS0FBSztJQUNmLEtBQUssRUFBRSxLQUFLO0lBQ1osR0FBRyxFQUFFLEtBQUs7Q0FDWCxDQUFBO0FBRUQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxRQUFhLEVBQUUsS0FBYyxFQUFFLEVBQUU7SUFDbEQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1FBQ3JELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUM3RCxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDN0QsT0FBTztZQUNMLFNBQVMsRUFBRSxDQUFDLENBQUMsT0FB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QUUsS0FBSztnQ0FDVixHQUFHLEVBQUUsR0FBRzs2QkFDVDt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7UUFDRCxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLEVBQUUsS0FBSztRQUNYLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7S0FDL0IsQ0FBQTtJQUVELE1BQU0sT0FBTyxHQUFHO1FBQ2QsR0FBRyxNQUFNLENBQUMsR0FBRztRQUNiLEdBQUc7UUFDSCxJQUFJLEVBQUUsSUFBSTtLQUNYLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM5RCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzNDLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBOURZLFFBQUEsT0FBTyxXQThEbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsndndhcCddXG5cbmNvbnN0IGN1c3RvbUVycm9yID0gKGRhdGE6IGFueSkgPT4ge1xuICByZXR1cm4gIWRhdGEuaGl0cyB8fCAhZGF0YS5oaXRzLmhpdHMgfHwgZGF0YS5oaXRzLmhpdHMubGVuZ3RoIDwgMVxufVxuXG5leHBvcnQgY29uc3QgaW5wdXRQYXJhbWV0ZXJzOiBJbnB1dFBhcmFtZXRlcnMgPSB7XG4gIGFkZHJlc3M6IHRydWUsXG4gIGRlYnVnOiBmYWxzZSxcbiAgcm91bmREYXk6IGZhbHNlLFxuICBzdGFydDogZmFsc2UsXG4gIGVuZDogZmFsc2UsXG59XG5cbmNvbnN0IGJ1aWxkVldBUCA9IChyZXNwb25zZTogYW55LCBkZWJ1ZzogYm9vbGVhbikgPT4ge1xuICBjb25zdCBzb3VyY2VzID0gcmVzcG9uc2UuZGF0YS5oaXRzLmhpdHMubWFwKChpOiBhbnkpID0+IHtcbiAgICBjb25zdCByZXNlcnZlMCA9IGkuX3NvdXJjZS5hcmdzLmZpbmQoKGo6IGFueSkgPT4gai5wb3MgPT09IDApXG4gICAgY29uc3QgcmVzZXJ2ZTEgPSBpLl9zb3VyY2UuYXJncy5maW5kKChqOiBhbnkpID0+IGoucG9zID09PSAxKVxuICAgIHJldHVybiB7XG4gICAgICB0aW1lc3RhbXA6IGkuX3NvdXJjZS50aW1lc3RhbXAsXG4gICAgICByZXNlcnZlMDogcGFyc2VJbnQocmVzZXJ2ZTBbJ3ZhbHVlLmhleCddLCAxNiksXG4gICAgICByZXNlcnZlMTogcGFyc2VJbnQocmVzZXJ2ZTFbJ3ZhbHVlLmhleCddLCAxNiksXG4gICAgfVxuICB9KVxuXG4gIGxldCBvdmVyYWxsVm9sdW1lID0gMFxuICBsZXQgc3VtQW1vdW50QW5kUHJpY2VzID0gMFxuICBmb3IgKGxldCBpID0gMTsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByZXNlcnZlMHZvbHVtZSA9IE1hdGguYWJzKHNvdXJjZXNbaV0ucmVzZXJ2ZTAgLSBzb3VyY2VzW2kgLSAxXS5yZXNlcnZlMClcbiAgICBjb25zdCBwcmljZSA9IHNvdXJjZXNbaV0ucmVzZXJ2ZTAgLyBzb3VyY2VzW2ldLnJlc2VydmUxXG4gICAgb3ZlcmFsbFZvbHVtZSArPSByZXNlcnZlMHZvbHVtZVxuICAgIHN1bUFtb3VudEFuZFByaWNlcyArPSBwcmljZSAqIHJlc2VydmUwdm9sdW1lXG4gIH1cblxuICBjb25zdCB2d2FwID0gc3VtQW1vdW50QW5kUHJpY2VzIC8gb3ZlcmFsbFZvbHVtZVxuICBjb25zdCByZXNwOiBhbnkgPSB7XG4gICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgZGF0YTogeyByZXN1bHQ6IHZ3YXAgfSxcbiAgfVxuXG4gIGlmIChkZWJ1ZykgcmVzcC5kYXRhLnJhdyA9IHNvdXJjZXNcbiAgcmV0dXJuIHJlc3Bcbn1cblxuY29uc3QgY2xlYW51cERhdGUgPSAoaW5wdXREYXRlOiBzdHJpbmcsIHJvdW5kRGF5OiBib29sZWFuKSA9PiB7XG4gIGxldCBvdXRwdXREYXRlOiBudW1iZXJcbiAgdHJ5IHtcbiAgICBvdXRwdXREYXRlID0gcGFyc2VJbnQoaW5wdXREYXRlKVxuICAgIGlmIChyb3VuZERheSkge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKG91dHB1dERhdGUpXG4gICAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApXG4gICAgICBvdXRwdXREYXRlID0gZGF0ZS5nZXRUaW1lKClcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBpbnB1dERhdGVcbiAgfVxuICByZXR1cm4gb3V0cHV0RGF0ZVxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICAvLyBUT0RPOiB2YWxpZGF0ZSB0aGlzIGlzIGEgY2hlY2tzdW0gYWRkcmVzc1xuICBjb25zdCBhZGRyZXNzID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmFkZHJlc3NcbiAgY29uc3QgZGVidWcgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuZGVidWcgfHwgZmFsc2VcbiAgY29uc3Qgcm91bmREYXkgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEucm91bmREYXkgfHwgZmFsc2VcbiAgbGV0IHN0YXJ0ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLnN0YXJ0XG4gIGxldCBlbmQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuZW5kXG5cbiAgY29uc3QgdXJsID0gJy9ldGhlcmV1bS9ldGhlcmV1bS9tYWlubmV0L2VzL2V2ZW50L3NlYXJjaC8nXG5cbiAgZW5kID0gY2xlYW51cERhdGUoZW5kLCByb3VuZERheSlcbiAgc3RhcnQgPSBjbGVhbnVwRGF0ZShzdGFydCwgcm91bmREYXkpXG5cbiAgaWYgKCFzdGFydCAmJiAhZW5kKSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApXG4gICAgZW5kID0gZGF0ZS5nZXRUaW1lKCkgLyAxMDAwXG5cbiAgICBzdGFydCA9IGVuZCAtIDYwICogNjAgKiAyNFxuICB9IGVsc2UgaWYgKCFzdGFydCkge1xuICAgIHN0YXJ0ID0gZW5kIC0gNjAgKiA2MCAqIDI0XG4gIH0gZWxzZSBpZiAoIWVuZCkge1xuICAgIGVuZCA9IHN0YXJ0ICsgNjAgKiA2MCAqIDI0XG4gIH0gZWxzZSBpZiAoc3RhcnQgPT09IGVuZCkge1xuICAgIHN0YXJ0ID0gZW5kIC0gNjAgKiA2MCAqIDI0XG4gIH1cblxuICBjb25zdCBib2R5ID0ge1xuICAgIHF1ZXJ5OiB7XG4gICAgICBib29sOiB7XG4gICAgICAgIGZpbHRlcjogW1xuICAgICAgICAgIHsgdGVybTogeyAnYWRkcmVzcy5yYXcnOiBhZGRyZXNzIH0gfSxcbiAgICAgICAgICB7IHRlcm06IHsgJ2V2ZW50LnJhdyc6ICdTeW5jJyB9IH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgdGltZXN0YW1wOiB7XG4gICAgICAgICAgICAgICAgZ3RlOiBzdGFydCxcbiAgICAgICAgICAgICAgICBsdGU6IGVuZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzb3J0OiBbeyB0aW1lc3RhbXA6ICdhc2MnIH1dLFxuICAgIHNpemU6IDEwMDAwLFxuICAgIF9zb3VyY2U6IFsndGltZXN0YW1wJywgJ2FyZ3MnXSxcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICB1cmwsXG4gICAgZGF0YTogYm9keSxcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3Qob3B0aW9ucywgY3VzdG9tRXJyb3IpXG4gIGNvbnN0IHZ3YXBSZXNwID0gYnVpbGRWV0FQKHJlc3BvbnNlLCBkZWJ1ZylcbiAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGpvYlJ1bklELCB2d2FwUmVzcCwgY29uZmlnLnZlcmJvc2UpXG59XG4iXX0=