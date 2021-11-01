"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const paypal = tslib_1.__importStar(require("@paypal/payouts-sdk"));
exports.supportedEndpoints = ['getpayout', 'read'];
exports.inputParameters = {
    payout_id: true,
    type: false,
};
const paramOptions = {
    type: ['ITEM', 'BATCH'],
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters, paramOptions);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const payout_id = validator.validated.data.payout_id;
    const type = validator.validated.data.type || 'BATCH';
    let paypal_req;
    switch (type) {
        case 'BATCH':
            paypal_req = new paypal.payouts.PayoutsGetRequest(payout_id);
            break;
        case 'ITEM':
            paypal_req = new paypal.payouts.PayoutsItemGetRequest(payout_id);
            break;
        default:
            throw new ea_bootstrap_1.AdapterError({
                jobRunID,
                message: `Payout type ${type} not supported.`,
                statusCode: 400,
            });
    }
    try {
        const response = await config.api.client.execute(paypal_req);
        return ea_bootstrap_1.Requester.success(jobRunID, { data: response, status: response.statusCode });
    }
    catch (e) {
        throw ea_bootstrap_1.Requester.errored(jobRunID, e, e.statusCode);
    }
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50L2dldFBheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTRFO0FBRTVFLG9FQUE2QztBQUVoQyxRQUFBLGtCQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBRTFDLFFBQUEsZUFBZSxHQUFvQjtJQUM5QyxTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksRUFBRSxLQUFLO0NBQ1osQ0FBQTtBQUVELE1BQU0sWUFBWSxHQUFHO0lBQ25CLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7Q0FDeEIsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUFlLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDdkUsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLFNBQVMsR0FBVyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUE7SUFDNUQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQTtJQUVyRCxJQUFJLFVBQVUsQ0FBQTtJQUNkLFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxPQUFPO1lBQ1YsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM1RCxNQUFLO1FBQ1AsS0FBSyxNQUFNO1lBQ1QsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNoRSxNQUFLO1FBQ1A7WUFDRSxNQUFNLElBQUksMkJBQVksQ0FBQztnQkFDckIsUUFBUTtnQkFDUixPQUFPLEVBQUUsZUFBZSxJQUFJLGlCQUFpQjtnQkFDN0MsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFBO0tBQ0w7SUFFRCxJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDNUQsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtLQUNwRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtLQUNuRDtBQUNILENBQUMsQ0FBQTtBQTlCWSxRQUFBLE9BQU8sV0E4Qm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdGVyLCBWYWxpZGF0b3IsIEFkYXB0ZXJFcnJvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnLCBFeGVjdXRlV2l0aENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCAqIGFzIHBheXBhbCBmcm9tICdAcGF5cGFsL3BheW91dHMtc2RrJ1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWydnZXRwYXlvdXQnLCAncmVhZCddXG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgcGF5b3V0X2lkOiB0cnVlLFxuICB0eXBlOiBmYWxzZSxcbn1cblxuY29uc3QgcGFyYW1PcHRpb25zID0ge1xuICB0eXBlOiBbJ0lURU0nLCAnQkFUQ0gnXSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAocmVxdWVzdCwgXywgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgaW5wdXRQYXJhbWV0ZXJzLCBwYXJhbU9wdGlvbnMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuXG4gIGNvbnN0IGpvYlJ1bklEID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5pZFxuICBjb25zdCBwYXlvdXRfaWQ6IHN0cmluZyA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5wYXlvdXRfaWRcbiAgY29uc3QgdHlwZSA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS50eXBlIHx8ICdCQVRDSCdcblxuICBsZXQgcGF5cGFsX3JlcVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdCQVRDSCc6XG4gICAgICBwYXlwYWxfcmVxID0gbmV3IHBheXBhbC5wYXlvdXRzLlBheW91dHNHZXRSZXF1ZXN0KHBheW91dF9pZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnSVRFTSc6XG4gICAgICBwYXlwYWxfcmVxID0gbmV3IHBheXBhbC5wYXlvdXRzLlBheW91dHNJdGVtR2V0UmVxdWVzdChwYXlvdXRfaWQpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgICAgam9iUnVuSUQsXG4gICAgICAgIG1lc3NhZ2U6IGBQYXlvdXQgdHlwZSAke3R5cGV9IG5vdCBzdXBwb3J0ZWQuYCxcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgfSlcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb25maWcuYXBpLmNsaWVudC5leGVjdXRlKHBheXBhbF9yZXEpXG4gICAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGpvYlJ1bklELCB7IGRhdGE6IHJlc3BvbnNlLCBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c0NvZGUgfSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IFJlcXVlc3Rlci5lcnJvcmVkKGpvYlJ1bklELCBlLCBlLnN0YXR1c0NvZGUpXG4gIH1cbn1cbiJdfQ==