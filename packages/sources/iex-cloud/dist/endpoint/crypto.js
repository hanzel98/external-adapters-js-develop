"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("../config");
exports.supportedEndpoints = ['crypto'];
exports.inputParameters = {
    base: ['base', 'from', 'coin', 'asset', 'symbol'],
    quote: ['quote', 'to', 'market'],
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const base = validator.overrideSymbol(config_1.NAME);
    const quote = validator.validated.data.quote;
    const url = `crypto/${base.toUpperCase()}${quote.toUpperCase()}/quote`;
    const params = {
        token: config.apiKey,
    };
    const reqConfig = {
        ...config.api,
        params,
        url,
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig);
    response.data.result = ea_bootstrap_1.Requester.validateResultNumber(response.data, ['latestPrice']);
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2NyeXB0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBOEQ7QUFFOUQsc0NBQStDO0FBRWxDLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUUvQixRQUFBLGVBQWUsR0FBb0I7SUFDOUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztJQUNqRCxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQztDQUNqQyxDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxPQUFPLEVBQUUsdUJBQWUsQ0FBQyxDQUFBO0lBQ3pELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDdkMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxhQUFXLENBQVcsQ0FBQTtJQUM1RCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDNUMsTUFBTSxHQUFHLEdBQUcsVUFBVSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUE7SUFFdEUsTUFBTSxNQUFNLEdBQUc7UUFDYixLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU07S0FDckIsQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHO1FBQ2hCLEdBQUcsTUFBTSxDQUFDLEdBQUc7UUFDYixNQUFNO1FBQ04sR0FBRztLQUNKLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLHdCQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7SUFFckYsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM5RCxDQUFDLENBQUE7QUF2QlksUUFBQSxPQUFPLFdBdUJuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBFeGVjdXRlV2l0aENvbmZpZywgQ29uZmlnLCBJbnB1dFBhcmFtZXRlcnMgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgTkFNRSBhcyBBZGFwdGVyTmFtZSB9IGZyb20gJy4uL2NvbmZpZydcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnY3J5cHRvJ11cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBiYXNlOiBbJ2Jhc2UnLCAnZnJvbScsICdjb2luJywgJ2Fzc2V0JywgJ3N5bWJvbCddLFxuICBxdW90ZTogWydxdW90ZScsICd0bycsICdtYXJrZXQnXSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbWV0ZXJzKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgYmFzZSA9IHZhbGlkYXRvci5vdmVycmlkZVN5bWJvbChBZGFwdGVyTmFtZSkgYXMgc3RyaW5nXG4gIGNvbnN0IHF1b3RlID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLnF1b3RlXG4gIGNvbnN0IHVybCA9IGBjcnlwdG8vJHtiYXNlLnRvVXBwZXJDYXNlKCl9JHtxdW90ZS50b1VwcGVyQ2FzZSgpfS9xdW90ZWBcblxuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgdG9rZW46IGNvbmZpZy5hcGlLZXksXG4gIH1cblxuICBjb25zdCByZXFDb25maWcgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICBwYXJhbXMsXG4gICAgdXJsLFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChyZXFDb25maWcpXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gUmVxdWVzdGVyLnZhbGlkYXRlUmVzdWx0TnVtYmVyKHJlc3BvbnNlLmRhdGEsIFsnbGF0ZXN0UHJpY2UnXSlcblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3BvbnNlLCBjb25maWcudmVyYm9zZSlcbn1cbiJdfQ==