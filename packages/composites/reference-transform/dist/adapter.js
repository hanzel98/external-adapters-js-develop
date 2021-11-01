"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const config_1 = require("./config");
const ea_reference_data_reader_1 = require("@chainlink/ea-reference-data-reader");
const customParams = {
    source: true,
    contract: ['referenceContract'],
    multiply: false,
    operator: ['operator'],
    dividend: false,
    network: false,
};
const transform = (offchain, onchain, operator, dividendConfig) => {
    if (operator === 'multiply') {
        return offchain * onchain;
    }
    else if (operator === 'divide') {
        let dividend = offchain;
        let divisor = onchain;
        if (dividendConfig === 'on-chain') {
            dividend = onchain;
            divisor = offchain;
        }
        return dividend / divisor;
    }
    throw new Error('Invalid operator');
};
const execute = async (input, config) => {
    const validator = new ea_bootstrap_1.Validator(input, customParams, { source: Object.keys(config.sources) });
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const source = validator.validated.data.source;
    const contract = validator.validated.data.contract;
    const multiply = validator.validated.data.multiply || 100000000;
    const operator = validator.validated.data.operator;
    const dividend = validator.validated.data.dividend || 'off-chain';
    const network = validator.validated.data.network || config_1.DEFAULT_NETWORK;
    if (operator !== 'multiply' && operator !== 'divide')
        throw new ea_bootstrap_1.AdapterError({
            jobRunID,
            message: `Invalid operator parameter supplied.`,
            statusCode: 400,
        });
    if (dividend !== 'on-chain' && dividend !== 'off-chain')
        throw new ea_bootstrap_1.AdapterError({
            jobRunID,
            message: `Invalid divident parameter supplied.`,
            statusCode: 400,
        });
    ea_bootstrap_1.Logger.debug('Getting value from contract: ' + contract);
    let price = await ea_reference_data_reader_1.getRpcLatestAnswer(network, contract, 1);
    price = price / multiply;
    ea_bootstrap_1.Logger.debug('Value: ' + price);
    if (price <= 0)
        throw new ea_bootstrap_1.AdapterError({
            jobRunID,
            message: `On-chain value equal or less than 0.`,
            statusCode: 500,
        });
    const options = config.sources[source];
    const response = (await ea_bootstrap_1.Requester.request({ ...options, data: input })).data;
    response.data.result = transform(response.result, price, operator, dividend);
    ea_bootstrap_1.Logger.debug('New result: ' + response.data.result);
    return ea_bootstrap_1.Requester.success(jobRunID, response);
};
exports.execute = execute;
const makeExecute = (config) => {
    return async (request) => exports.execute(request, config || config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUFvRjtBQUVwRixxQ0FBOEQ7QUFDOUQsa0ZBQXdFO0FBRXhFLE1BQU0sWUFBWSxHQUFHO0lBQ25CLE1BQU0sRUFBRSxJQUFJO0lBQ1osUUFBUSxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDL0IsUUFBUSxFQUFFLEtBQUs7SUFDZixRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUM7SUFDdEIsUUFBUSxFQUFFLEtBQUs7SUFDZixPQUFPLEVBQUUsS0FBSztDQUNmLENBQUE7QUFFRCxNQUFNLFNBQVMsR0FBRyxDQUFDLFFBQWdCLEVBQUUsT0FBZSxFQUFFLFFBQWdCLEVBQUUsY0FBc0IsRUFBRSxFQUFFO0lBQ2hHLElBQUksUUFBUSxLQUFLLFVBQVUsRUFBRTtRQUMzQixPQUFPLFFBQVEsR0FBRyxPQUFPLENBQUE7S0FDMUI7U0FBTSxJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDaEMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3ZCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUNyQixJQUFJLGNBQWMsS0FBSyxVQUFVLEVBQUU7WUFDakMsUUFBUSxHQUFHLE9BQU8sQ0FBQTtZQUNsQixPQUFPLEdBQUcsUUFBUSxDQUFBO1NBQ25CO1FBQ0QsT0FBTyxRQUFRLEdBQUcsT0FBTyxDQUFBO0tBQzFCO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFxQixFQUFFLE1BQWMsRUFBNEIsRUFBRTtJQUMvRixNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFP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aWRhdG9yLCBBZGFwdGVyRXJyb3IsIExvZ2dlciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQWRhcHRlclJlc3BvbnNlLCBFeGVjdXRlLCBBZGFwdGVyUmVxdWVzdCB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBtYWtlQ29uZmlnLCBDb25maWcsIERFRkFVTFRfTkVUV09SSyB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgZ2V0UnBjTGF0ZXN0QW5zd2VyIH0gZnJvbSAnQGNoYWlubGluay9lYS1yZWZlcmVuY2UtZGF0YS1yZWFkZXInXG5cbmNvbnN0IGN1c3RvbVBhcmFtcyA9IHtcbiAgc291cmNlOiB0cnVlLFxuICBjb250cmFjdDogWydyZWZlcmVuY2VDb250cmFjdCddLFxuICBtdWx0aXBseTogZmFsc2UsXG4gIG9wZXJhdG9yOiBbJ29wZXJhdG9yJ10sXG4gIGRpdmlkZW5kOiBmYWxzZSxcbiAgbmV0d29yazogZmFsc2UsXG59XG5cbmNvbnN0IHRyYW5zZm9ybSA9IChvZmZjaGFpbjogbnVtYmVyLCBvbmNoYWluOiBudW1iZXIsIG9wZXJhdG9yOiBzdHJpbmcsIGRpdmlkZW5kQ29uZmlnOiBzdHJpbmcpID0+IHtcbiAgaWYgKG9wZXJhdG9yID09PSAnbXVsdGlwbHknKSB7XG4gICAgcmV0dXJuIG9mZmNoYWluICogb25jaGFpblxuICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSAnZGl2aWRlJykge1xuICAgIGxldCBkaXZpZGVuZCA9IG9mZmNoYWluXG4gICAgbGV0IGRpdmlzb3IgPSBvbmNoYWluXG4gICAgaWYgKGRpdmlkZW5kQ29uZmlnID09PSAnb24tY2hhaW4nKSB7XG4gICAgICBkaXZpZGVuZCA9IG9uY2hhaW5cbiAgICAgIGRpdmlzb3IgPSBvZmZjaGFpblxuICAgIH1cbiAgICByZXR1cm4gZGl2aWRlbmQgLyBkaXZpc29yXG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG9wZXJhdG9yJylcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGUgPSBhc3luYyAoaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0LCBjb25maWc6IENvbmZpZyk6IFByb21pc2U8QWRhcHRlclJlc3BvbnNlPiA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoaW5wdXQsIGN1c3RvbVBhcmFtcywgeyBzb3VyY2U6IE9iamVjdC5rZXlzKGNvbmZpZy5zb3VyY2VzKSB9KVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3Qgc291cmNlID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLnNvdXJjZVxuICBjb25zdCBjb250cmFjdCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5jb250cmFjdFxuICBjb25zdCBtdWx0aXBseSA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5tdWx0aXBseSB8fCAxMDAwMDAwMDBcbiAgY29uc3Qgb3BlcmF0b3IgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEub3BlcmF0b3JcbiAgY29uc3QgZGl2aWRlbmQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuZGl2aWRlbmQgfHwgJ29mZi1jaGFpbidcbiAgY29uc3QgbmV0d29yayA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5uZXR3b3JrIHx8IERFRkFVTFRfTkVUV09SS1xuXG4gIGlmIChvcGVyYXRvciAhPT0gJ211bHRpcGx5JyAmJiBvcGVyYXRvciAhPT0gJ2RpdmlkZScpXG4gICAgdGhyb3cgbmV3IEFkYXB0ZXJFcnJvcih7XG4gICAgICBqb2JSdW5JRCxcbiAgICAgIG1lc3NhZ2U6IGBJbnZhbGlkIG9wZXJhdG9yIHBhcmFtZXRlciBzdXBwbGllZC5gLFxuICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgIH0pXG5cbiAgaWYgKGRpdmlkZW5kICE9PSAnb24tY2hhaW4nICYmIGRpdmlkZW5kICE9PSAnb2ZmLWNoYWluJylcbiAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgIGpvYlJ1bklELFxuICAgICAgbWVzc2FnZTogYEludmFsaWQgZGl2aWRlbnQgcGFyYW1ldGVyIHN1cHBsaWVkLmAsXG4gICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgfSlcblxuICBMb2dnZXIuZGVidWcoJ0dldHRpbmcgdmFsdWUgZnJvbSBjb250cmFjdDogJyArIGNvbnRyYWN0KVxuXG4gIGxldCBwcmljZSA9IGF3YWl0IGdldFJwY0xhdGVzdEFuc3dlcihuZXR3b3JrLCBjb250cmFjdCwgMSlcbiAgcHJpY2UgPSBwcmljZSAvIG11bHRpcGx5XG4gIExvZ2dlci5kZWJ1ZygnVmFsdWU6ICcgKyBwcmljZSlcblxuICBpZiAocHJpY2UgPD0gMClcbiAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgIGpvYlJ1bklELFxuICAgICAgbWVzc2FnZTogYE9uLWNoYWluIHZhbHVlIGVxdWFsIG9yIGxlc3MgdGhhbiAwLmAsXG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgfSlcblxuICBjb25zdCBvcHRpb25zID0gY29uZmlnLnNvdXJjZXNbc291cmNlXVxuICBjb25zdCByZXNwb25zZSA9IChhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdCh7IC4uLm9wdGlvbnMsIGRhdGE6IGlucHV0IH0pKS5kYXRhXG4gIHJlc3BvbnNlLmRhdGEucmVzdWx0ID0gdHJhbnNmb3JtKHJlc3BvbnNlLnJlc3VsdCwgcHJpY2UsIG9wZXJhdG9yLCBkaXZpZGVuZClcblxuICBMb2dnZXIuZGVidWcoJ05ldyByZXN1bHQ6ICcgKyByZXNwb25zZS5kYXRhLnJlc3VsdClcblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3BvbnNlKVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUV4ZWN1dGUgPSAoY29uZmlnPzogQ29uZmlnKTogRXhlY3V0ZSA9PiB7XG4gIHJldHVybiBhc3luYyAocmVxdWVzdDogQWRhcHRlclJlcXVlc3QpID0+IGV4ZWN1dGUocmVxdWVzdCwgY29uZmlnIHx8IG1ha2VDb25maWcoKSlcbn1cbiJdfQ==