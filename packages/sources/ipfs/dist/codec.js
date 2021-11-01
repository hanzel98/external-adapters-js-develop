"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserialize = exports.serialize = exports.CODEC_JSON = exports.CODEC_DAG_CBOR = void 0;
const tslib_1 = require("tslib");
const dagCBOR = tslib_1.__importStar(require("ipld-dag-cbor"));
exports.CODEC_DAG_CBOR = 'dag-cbor';
exports.CODEC_JSON = 'json';
// eslint-disable-next-line @typescript-eslint/ban-types
const serialize = (data, codec) => {
    if (typeof data !== 'string' && !codec) {
        throw Error(`Unable to serialize object without codec`);
    }
    if (typeof data === 'string' && !codec)
        return data;
    switch (codec) {
        case exports.CODEC_DAG_CBOR:
            if (typeof data === 'string')
                throw Error(`${exports.CODEC_DAG_CBOR} codec cannot serialize strings`);
            return dagCBOR.util.serialize(data);
        case exports.CODEC_JSON:
            return Buffer.from(JSON.stringify(data));
    }
    throw Error(`Unknown codec: ${codec}`);
};
exports.serialize = serialize;
const deserialize = (data, codec) => {
    if (!codec)
        return data.toString();
    switch (codec) {
        case exports.CODEC_DAG_CBOR:
            return dagCBOR.util.deserialize(data);
        case exports.CODEC_JSON:
            return JSON.parse(data.toString());
    }
    throw Error(`Unknown codec: ${codec}`);
};
exports.deserialize = deserialize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29kZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtEQUF3QztBQUUzQixRQUFBLGNBQWMsR0FBRyxVQUFVLENBQUE7QUFDM0IsUUFBQSxVQUFVLEdBQUcsTUFBTSxDQUFBO0FBRWhDLHdEQUF3RDtBQUNqRCxNQUFNLFNBQVMsR0FBRyxDQUFDLElBQXFCLEVBQUUsS0FBYyxFQUF1QixFQUFFO0lBQ3RGLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ3RDLE1BQU0sS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7S0FDeEQ7SUFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLElBQUksQ0FBQTtJQUVuRCxRQUFRLEtBQUssRUFBRTtRQUNiLEtBQUssc0JBQWM7WUFDakIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO2dCQUFFLE1BQU0sS0FBSyxDQUFDLEdBQUcsc0JBQWMsaUNBQWlDLENBQUMsQ0FBQTtZQUM3RixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3JDLEtBQUssa0JBQVU7WUFDYixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0tBQzNDO0lBRUQsTUFBTSxLQUFLLENBQUMsa0JBQWtCLEtBQUssRUFBRSxDQUFDLENBQUE7QUFDeEMsQ0FBQyxDQUFBO0FBZlksUUFBQSxTQUFTLGFBZXJCO0FBRU0sTUFBTSxXQUFXLEdBQUcsQ0FDekIsSUFBWSxFQUNaLEtBQWMsRUFDd0MsRUFBRTtJQUN4RCxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBRWxDLFFBQVEsS0FBSyxFQUFFO1FBQ2IsS0FBSyxzQkFBYztZQUNqQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZDLEtBQUssa0JBQVU7WUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7S0FDckM7SUFFRCxNQUFNLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUN4QyxDQUFDLENBQUE7QUFkWSxRQUFBLFdBQVcsZUFjdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkYWdDQk9SIGZyb20gJ2lwbGQtZGFnLWNib3InXG5cbmV4cG9ydCBjb25zdCBDT0RFQ19EQUdfQ0JPUiA9ICdkYWctY2JvcidcbmV4cG9ydCBjb25zdCBDT0RFQ19KU09OID0gJ2pzb24nXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG5leHBvcnQgY29uc3Qgc2VyaWFsaXplID0gKGRhdGE6IHN0cmluZyB8IG9iamVjdCwgY29kZWM/OiBzdHJpbmcpOiBzdHJpbmcgfCBVaW50OEFycmF5ID0+IHtcbiAgaWYgKHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJyAmJiAhY29kZWMpIHtcbiAgICB0aHJvdyBFcnJvcihgVW5hYmxlIHRvIHNlcmlhbGl6ZSBvYmplY3Qgd2l0aG91dCBjb2RlY2ApXG4gIH1cbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyAmJiAhY29kZWMpIHJldHVybiBkYXRhXG5cbiAgc3dpdGNoIChjb2RlYykge1xuICAgIGNhc2UgQ09ERUNfREFHX0NCT1I6XG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB0aHJvdyBFcnJvcihgJHtDT0RFQ19EQUdfQ0JPUn0gY29kZWMgY2Fubm90IHNlcmlhbGl6ZSBzdHJpbmdzYClcbiAgICAgIHJldHVybiBkYWdDQk9SLnV0aWwuc2VyaWFsaXplKGRhdGEpXG4gICAgY2FzZSBDT0RFQ19KU09OOlxuICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICB9XG5cbiAgdGhyb3cgRXJyb3IoYFVua25vd24gY29kZWM6ICR7Y29kZWN9YClcbn1cblxuZXhwb3J0IGNvbnN0IGRlc2VyaWFsaXplID0gKFxuICBkYXRhOiBCdWZmZXIsXG4gIGNvZGVjPzogc3RyaW5nLFxuKTogUmV0dXJuVHlwZTx0eXBlb2YgZGFnQ0JPUi51dGlsLmRlc2VyaWFsaXplPiB8IHN0cmluZyA9PiB7XG4gIGlmICghY29kZWMpIHJldHVybiBkYXRhLnRvU3RyaW5nKClcblxuICBzd2l0Y2ggKGNvZGVjKSB7XG4gICAgY2FzZSBDT0RFQ19EQUdfQ0JPUjpcbiAgICAgIHJldHVybiBkYWdDQk9SLnV0aWwuZGVzZXJpYWxpemUoZGF0YSlcbiAgICBjYXNlIENPREVDX0pTT046XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhLnRvU3RyaW5nKCkpXG4gIH1cblxuICB0aHJvdyBFcnJvcihgVW5rbm93biBjb2RlYzogJHtjb2RlY31gKVxufVxuIl19