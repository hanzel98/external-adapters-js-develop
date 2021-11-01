"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ea_reference_data_reader_1 = require("@chainlink/ea-reference-data-reader");
const config_1 = require("./config");
const checks_1 = require("./checks");
const customParams = {
    check: true,
    source: true,
    referenceContract: ['referenceContract', 'contract'],
    multiply: true,
    network: false,
};
const execute = async (input, config) => {
    const validator = new ea_bootstrap_1.Validator(input, customParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const referenceContract = validator.validated.data.referenceContract;
    const multiply = validator.validated.data.multiply;
    const check = validator.validated.data.check;
    const source = validator.validated.data.source;
    const network = validator.validated.data.network || config_1.DEFAULT_NETWORK;
    const halted = await checks_1.getCheckImpl(checks_1.getCheckProvider(check))(input);
    if (halted) {
        const result = await ea_reference_data_reader_1.getLatestAnswer(network, referenceContract, multiply, input.meta);
        return ea_bootstrap_1.Requester.success(jobRunID, { data: { result }, status: 200 });
    }
    return await config.getPriceAdapter(source)(input);
};
exports.execute = execute;
const makeExecute = (config) => {
    return async (request) => exports.execute(request, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBEQUE4RDtBQUM5RCxrRkFBcUU7QUFDckUscUNBQThEO0FBQzlELHFDQUF5RDtBQUV6RCxNQUFNLFlBQVksR0FBRztJQUNuQixLQUFLLEVBQUUsSUFBSTtJQUNYLE1BQU0sRUFBRSxJQUFJO0lBQ1osaUJBQWlCLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUM7SUFDcEQsUUFBUSxFQUFFLElBQUk7SUFDZCxPQUFPLEVBQUUsS0FBSztDQUNmLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBcUIsRUFBRSxNQUFjLEVBQTRCLEVBQUU7SUFDL0YsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUNwRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUE7SUFDcEUsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ2xELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUM1QyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFFOUMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLHdCQUFlLENBQUE7SUFFbkUsTUFBTSxNQUFNLEdBQUcsTUFBTSxxQkFBWSxDQUFDLHlCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDakUsSUFBSSxNQUFNLEVBQUU7UUFDVixNQUFNLE1BQU0sR0FBRyxNQUFNLDBDQUFlLENBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEYsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtLQUN0RTtJQUVELE9BQU8sTUFBTSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3BELENBQUMsQ0FBQTtBQW5CWSxRQUFBLE9BQU8sV0FtQm5CO0FBRU0sTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFlLEVBQVcsRUFBRTtJQUN0RCxPQUFPLEtBQUssRUFBRSxPQUF1QixFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSSxtQkFBVSxFQUFFLENBQUMsQ0FBQTtBQUNwRixDQUFDLENBQUE7QUFGWSxRQUFBLFdBQVcsZUFFdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGFwdGVyUmVxdWVzdCwgQWRhcHRlclJlc3BvbnNlLCBFeGVjdXRlIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeyBnZXRMYXRlc3RBbnN3ZXIgfSBmcm9tICdAY2hhaW5saW5rL2VhLXJlZmVyZW5jZS1kYXRhLXJlYWRlcidcbmltcG9ydCB7IENvbmZpZywgbWFrZUNvbmZpZywgREVGQVVMVF9ORVRXT1JLIH0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgeyBnZXRDaGVja0ltcGwsIGdldENoZWNrUHJvdmlkZXIgfSBmcm9tICcuL2NoZWNrcydcblxuY29uc3QgY3VzdG9tUGFyYW1zID0ge1xuICBjaGVjazogdHJ1ZSxcbiAgc291cmNlOiB0cnVlLFxuICByZWZlcmVuY2VDb250cmFjdDogWydyZWZlcmVuY2VDb250cmFjdCcsICdjb250cmFjdCddLFxuICBtdWx0aXBseTogdHJ1ZSxcbiAgbmV0d29yazogZmFsc2UsXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlID0gYXN5bmMgKGlucHV0OiBBZGFwdGVyUmVxdWVzdCwgY29uZmlnOiBDb25maWcpOiBQcm9taXNlPEFkYXB0ZXJSZXNwb25zZT4gPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKGlucHV0LCBjdXN0b21QYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCByZWZlcmVuY2VDb250cmFjdCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5yZWZlcmVuY2VDb250cmFjdFxuICBjb25zdCBtdWx0aXBseSA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5tdWx0aXBseVxuICBjb25zdCBjaGVjayA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5jaGVja1xuICBjb25zdCBzb3VyY2UgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuc291cmNlXG5cbiAgY29uc3QgbmV0d29yayA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5uZXR3b3JrIHx8IERFRkFVTFRfTkVUV09SS1xuXG4gIGNvbnN0IGhhbHRlZCA9IGF3YWl0IGdldENoZWNrSW1wbChnZXRDaGVja1Byb3ZpZGVyKGNoZWNrKSkoaW5wdXQpXG4gIGlmIChoYWx0ZWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnZXRMYXRlc3RBbnN3ZXIobmV0d29yaywgcmVmZXJlbmNlQ29udHJhY3QsIG11bHRpcGx5LCBpbnB1dC5tZXRhKVxuICAgIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2Vzcyhqb2JSdW5JRCwgeyBkYXRhOiB7IHJlc3VsdCB9LCBzdGF0dXM6IDIwMCB9KVxuICB9XG5cbiAgcmV0dXJuIGF3YWl0IGNvbmZpZy5nZXRQcmljZUFkYXB0ZXIoc291cmNlKShpbnB1dClcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VFeGVjdXRlID0gKGNvbmZpZz86IENvbmZpZyk6IEV4ZWN1dGUgPT4ge1xuICByZXR1cm4gYXN5bmMgKHJlcXVlc3Q6IEFkYXB0ZXJSZXF1ZXN0KSA9PiBleGVjdXRlKHJlcXVlc3QsIGNvbmZpZyB8fCBtYWtlQ29uZmlnKCkpXG59XG4iXX0=