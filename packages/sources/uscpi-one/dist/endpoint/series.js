"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.endpointResultPaths = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['series'];
exports.endpointResultPaths = {
    series: 'value',
};
const customError = (data) => data.Response === 'Error';
exports.inputParameters = {
    serie: false,
    year: false,
    month: false,
    resultPath: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const serie = validator.validated.data.serie || 'CUSR0000SA0';
    const year = validator.validated.data.year;
    const month = validator.validated.data.month
        ? capitalizeFirstLetter(validator.validated.data.month)
        : '';
    const resultPath = validator.validated.data.resultPath || 'value';
    const url = `/timeseries/data/${serie}`;
    const options = { ...config.api, url };
    const response = await ea_bootstrap_1.Requester.request(options, customError);
    const data = response.data.Results.series[0].data;
    let filter;
    if (!year && !month) {
        filter = data.filter((obj) => {
            return obj['latest'] === 'true';
        });
    }
    else {
        filter = data.filter((obj) => {
            return obj['year'] === year && obj['periodName'] === month;
        });
    }
    const result = ea_bootstrap_1.Requester.validateResultNumber(filter, [0, resultPath]);
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, result), config.verbose);
};
exports.execute = execute;
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L3Nlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEQ7QUFHakQsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBRS9CLFFBQUEsbUJBQW1CLEdBQUc7SUFDakMsTUFBTSxFQUFFLE9BQU87Q0FDaEIsQ0FBQTtBQXlCRCxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUE7QUFFL0MsUUFBQSxlQUFlLEdBQW9CO0lBQzlDLEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFLEtBQUs7SUFDWCxLQUFLLEVBQUUsS0FBSztJQUNaLFVBQVUsRUFBRSxLQUFLO0NBQ2xCLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDN0UsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSx1QkFBZSxDQUFDLENBQUE7SUFDekQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksYUFBYSxDQUFBO0lBQzdELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtJQUMxQyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQzFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdkQsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUNOLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUE7SUFFakUsTUFBTSxHQUFHLEdBQUcsb0JBQW9CLEtBQUssRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sT0FBTyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ3RDLE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQWlCLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM5RSxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBRWpELElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNuQixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQWUsRUFBRSxFQUFFO1lBQ3ZDLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLE1BQU0sQ0FBQTtRQUNqQyxDQUFDLENBQUMsQ0FBQTtLQUNIO1NBQU07UUFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQWUsRUFBRSxFQUFFO1lBQ3ZDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssS0FBSyxDQUFBO1FBQzVELENBQUMsQ0FBQyxDQUFBO0tBQ0g7SUFDRCxNQUFNLE1BQU0sR0FBRyx3QkFBUyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFBO0lBQ3RFLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLHdCQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDNUYsQ0FBQyxDQUFBO0FBN0JZLFFBQUEsT0FBTyxXQTZCbkI7QUFFRCxNQUFNLHFCQUFxQixHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDL0MsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDekQsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IENvbmZpZywgRXhlY3V0ZVdpdGhDb25maWcsIElucHV0UGFyYW1ldGVycyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbmRwb2ludHMgPSBbJ3NlcmllcyddXG5cbmV4cG9ydCBjb25zdCBlbmRwb2ludFJlc3VsdFBhdGhzID0ge1xuICBzZXJpZXM6ICd2YWx1ZScsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uc2VTY2hlbWEge1xuICBzdGF0dXM6IHN0cmluZ1xuICByZXNwb25zZVRpbWU6IG51bWJlclxuICBtZXNzYWdlOiBbXVxuICBSZXN1bHRzOiB7XG4gICAgc2VyaWVzOiBbXG4gICAgICB7XG4gICAgICAgIHNlcmllc0lkOiBzdHJpbmdcbiAgICAgICAgZGF0YTogW0RhdGFTY2hlbWFdXG4gICAgICB9LFxuICAgIF1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFTY2hlbWEge1xuICB5ZWFyOiBzdHJpbmdcbiAgcGVyaW9kOiBzdHJpbmdcbiAgcGVyaW9kTmFtZTogc3RyaW5nXG4gIGxhdGVzdDogc3RyaW5nXG4gIHZhbHVlOiBzdHJpbmdcbiAgZm9vdG5vdGVzOiBbXVxufVxuXG5jb25zdCBjdXN0b21FcnJvciA9IChkYXRhOiBhbnkpID0+IGRhdGEuUmVzcG9uc2UgPT09ICdFcnJvcidcblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBzZXJpZTogZmFsc2UsXG4gIHllYXI6IGZhbHNlLFxuICBtb250aDogZmFsc2UsXG4gIHJlc3VsdFBhdGg6IGZhbHNlLFxufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBzZXJpZSA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5zZXJpZSB8fCAnQ1VTUjAwMDBTQTAnXG4gIGNvbnN0IHllYXIgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEueWVhclxuICBjb25zdCBtb250aCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5tb250aFxuICAgID8gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5tb250aClcbiAgICA6ICcnXG4gIGNvbnN0IHJlc3VsdFBhdGggPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEucmVzdWx0UGF0aCB8fCAndmFsdWUnXG5cbiAgY29uc3QgdXJsID0gYC90aW1lc2VyaWVzL2RhdGEvJHtzZXJpZX1gXG4gIGNvbnN0IG9wdGlvbnMgPSB7IC4uLmNvbmZpZy5hcGksIHVybCB9XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3Q8UmVzcG9uc2VTY2hlbWE+KG9wdGlvbnMsIGN1c3RvbUVycm9yKVxuICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YS5SZXN1bHRzLnNlcmllc1swXS5kYXRhXG5cbiAgbGV0IGZpbHRlclxuICBpZiAoIXllYXIgJiYgIW1vbnRoKSB7XG4gICAgZmlsdGVyID0gZGF0YS5maWx0ZXIoKG9iajogRGF0YVNjaGVtYSkgPT4ge1xuICAgICAgcmV0dXJuIG9ialsnbGF0ZXN0J10gPT09ICd0cnVlJ1xuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZmlsdGVyID0gZGF0YS5maWx0ZXIoKG9iajogRGF0YVNjaGVtYSkgPT4ge1xuICAgICAgcmV0dXJuIG9ialsneWVhciddID09PSB5ZWFyICYmIG9ialsncGVyaW9kTmFtZSddID09PSBtb250aFxuICAgIH0pXG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKGZpbHRlciwgWzAsIHJlc3VsdFBhdGhdKVxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIFJlcXVlc3Rlci53aXRoUmVzdWx0KHJlc3BvbnNlLCByZXN1bHQpLCBjb25maWcudmVyYm9zZSlcbn1cblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKHN0cmluZzogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSlcbn1cbiJdfQ==