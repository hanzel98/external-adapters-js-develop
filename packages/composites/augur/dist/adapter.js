"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExecute = exports.execute = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const methods_1 = require("./methods");
const config_1 = require("./config");
const customParams = {
    method: true,
};
const execute = async (input, context, config) => {
    const validator = new ea_bootstrap_1.Validator(input, customParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.jobRunID;
    const method = validator.validated.data.method;
    ea_bootstrap_1.Logger.debug(`Augur: Choosing method ${method}`);
    switch (method.toLowerCase()) {
        case 'resolve':
            ea_bootstrap_1.Logger.debug(`Augur: Chose method resolve`);
            return methods_1.resolveMarkets.execute(input, context, config);
        case 'create':
            ea_bootstrap_1.Logger.debug(`Augur: Chose method create`);
            return methods_1.createMarkets.execute(input, context, config);
        case 'poke':
            ea_bootstrap_1.Logger.debug(`Augur: Chose method poke`);
            return methods_1.pokeMarkets.execute(input, context, config);
        default:
            throw new ea_bootstrap_1.AdapterError({
                jobRunID,
                message: `Method ${method} not supported.`,
                statusCode: 400,
            });
    }
};
exports.execute = execute;
const makeExecute = () => {
    return async (request, context) => exports.execute(request, context, config_1.makeConfig());
};
exports.makeExecute = makeExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUF5RTtBQUV6RSx1Q0FBc0U7QUFDdEUscUNBQTZDO0FBRTdDLE1BQU0sWUFBWSxHQUFHO0lBQ25CLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNqRixNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ3BELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFFMUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUE7SUFDN0MsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBRTlDLHFCQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ2hELFFBQVEsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQzVCLEtBQUssU0FBUztZQUNaLHFCQUFNLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUE7WUFDM0MsT0FBTyx3QkFBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZELEtBQUssUUFBUTtZQUNYLHFCQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUE7WUFDMUMsT0FBTyx1QkFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3RELEtBQUssTUFBTTtZQUNULHFCQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7WUFDeEMsT0FBTyxxQkFBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3BEO1lBQ0UsTUFBTSxJQUFJLDJCQUFZLENBQUM7Z0JBQ3JCLFFBQVE7Z0JBQ1IsT0FBTyxFQUFFLFVBQVUsTUFBTSxpQkFBaUI7Z0JBQzFDLFVBQVUsRUFBRSxHQUFHO2FBQ2hCLENBQUMsQ0FBQTtLQUNMO0FBQ0gsQ0FBQyxDQUFBO0FBekJZLFFBQUEsT0FBTyxXQXlCbkI7QUFFTSxNQUFNLFdBQVcsR0FBRyxHQUFZLEVBQUU7SUFDdkMsT0FBTyxLQUFLLEVBQUUsT0FBdUIsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLG1CQUFVLEVBQUUsQ0FBQyxDQUFBO0FBQzVGLENBQUMsQ0FBQTtBQUZZLFFBQUEsV0FBVyxlQUV2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkYXB0ZXJFcnJvciwgTG9nZ2VyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEFkYXB0ZXJSZXF1ZXN0LCBFeGVjdXRlV2l0aENvbmZpZywgRXhlY3V0ZSB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyByZXNvbHZlTWFya2V0cywgY3JlYXRlTWFya2V0cywgcG9rZU1hcmtldHMgfSBmcm9tICcuL21ldGhvZHMnXG5pbXBvcnQgeyBDb25maWcsIG1ha2VDb25maWcgfSBmcm9tICcuL2NvbmZpZydcblxuY29uc3QgY3VzdG9tUGFyYW1zID0ge1xuICBtZXRob2Q6IHRydWUsXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKGlucHV0LCBjb250ZXh0LCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihpbnB1dCwgY3VzdG9tUGFyYW1zKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuam9iUnVuSURcbiAgY29uc3QgbWV0aG9kID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLm1ldGhvZFxuXG4gIExvZ2dlci5kZWJ1ZyhgQXVndXI6IENob29zaW5nIG1ldGhvZCAke21ldGhvZH1gKVxuICBzd2l0Y2ggKG1ldGhvZC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAncmVzb2x2ZSc6XG4gICAgICBMb2dnZXIuZGVidWcoYEF1Z3VyOiBDaG9zZSBtZXRob2QgcmVzb2x2ZWApXG4gICAgICByZXR1cm4gcmVzb2x2ZU1hcmtldHMuZXhlY3V0ZShpbnB1dCwgY29udGV4dCwgY29uZmlnKVxuICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICBMb2dnZXIuZGVidWcoYEF1Z3VyOiBDaG9zZSBtZXRob2QgY3JlYXRlYClcbiAgICAgIHJldHVybiBjcmVhdGVNYXJrZXRzLmV4ZWN1dGUoaW5wdXQsIGNvbnRleHQsIGNvbmZpZylcbiAgICBjYXNlICdwb2tlJzpcbiAgICAgIExvZ2dlci5kZWJ1ZyhgQXVndXI6IENob3NlIG1ldGhvZCBwb2tlYClcbiAgICAgIHJldHVybiBwb2tlTWFya2V0cy5leGVjdXRlKGlucHV0LCBjb250ZXh0LCBjb25maWcpXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3Ioe1xuICAgICAgICBqb2JSdW5JRCxcbiAgICAgICAgbWVzc2FnZTogYE1ldGhvZCAke21ldGhvZH0gbm90IHN1cHBvcnRlZC5gLFxuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlRXhlY3V0ZSA9ICgpOiBFeGVjdXRlID0+IHtcbiAgcmV0dXJuIGFzeW5jIChyZXF1ZXN0OiBBZGFwdGVyUmVxdWVzdCwgY29udGV4dCkgPT4gZXhlY3V0ZShyZXF1ZXN0LCBjb250ZXh0LCBtYWtlQ29uZmlnKCkpXG59XG4iXX0=