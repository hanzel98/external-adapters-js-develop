"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.customParams = exports.supportedEndpoints = void 0;
const live_1 = require("./live");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
/**
 * This endpoint is similar to live but is supposed to only be used to fetch forex data.  This is why quote is a required parameter.
 * The reason for this split is that we want to enable WS for this endpoint but not for live.
 */
exports.supportedEndpoints = ['forex'];
exports.customParams = {
    base: ['base', 'from', 'symbol', 'market'],
    quote: ['quote', 'to', 'market', 'convert'],
};
const execute = async (input, context, config) => {
    const validator = new ea_bootstrap_1.Validator(input, exports.customParams);
    if (validator.error)
        throw validator.error;
    const transformedInputData = {
        ...input,
        data: {
            ...input.data,
            to: validator.validated.data.quote,
        },
    };
    return await live_1.execute(transformedInputData, context, config);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnQvZm9yZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQStDO0FBQy9DLDBEQUFtRDtBQUVuRDs7O0dBR0c7QUFFVSxRQUFBLGtCQUFrQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFOUIsUUFBQSxZQUFZLEdBQUc7SUFDMUIsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0lBQzFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztDQUM1QyxDQUFBO0FBRU0sTUFBTSxPQUFPLEdBQThCLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ2pGLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVMsQ0FBQyxLQUFLLEVBQUUsb0JBQVksQ0FBQyxDQUFBO0lBQ3BELElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUE7SUFDMUMsTUFBTSxvQkFBb0IsR0FBRztRQUMzQixHQUFHLEtBQUs7UUFDUixJQUFJLEVBQUU7WUFDSixHQUFHLEtBQUssQ0FBQyxJQUFJO1lBQ2IsRUFBRSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUs7U0FDbkM7S0FDRixDQUFBO0lBQ0QsT0FBTyxNQUFNLGNBQVcsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDakUsQ0FBQyxDQUFBO0FBWFksUUFBQSxPQUFPLFdBV25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIENvbmZpZyB9IGZyb20gJ0BjaGFpbmxpbmsvdHlwZXMnXG5pbXBvcnQgeyBleGVjdXRlIGFzIGxpdmVFeGVjdXRlIH0gZnJvbSAnLi9saXZlJ1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5cbi8qKlxuICogVGhpcyBlbmRwb2ludCBpcyBzaW1pbGFyIHRvIGxpdmUgYnV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgYmUgdXNlZCB0byBmZXRjaCBmb3JleCBkYXRhLiAgVGhpcyBpcyB3aHkgcXVvdGUgaXMgYSByZXF1aXJlZCBwYXJhbWV0ZXIuXG4gKiBUaGUgcmVhc29uIGZvciB0aGlzIHNwbGl0IGlzIHRoYXQgd2Ugd2FudCB0byBlbmFibGUgV1MgZm9yIHRoaXMgZW5kcG9pbnQgYnV0IG5vdCBmb3IgbGl2ZS5cbiAqL1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRW5kcG9pbnRzID0gWydmb3JleCddXG5cbmV4cG9ydCBjb25zdCBjdXN0b21QYXJhbXMgPSB7XG4gIGJhc2U6IFsnYmFzZScsICdmcm9tJywgJ3N5bWJvbCcsICdtYXJrZXQnXSxcbiAgcXVvdGU6IFsncXVvdGUnLCAndG8nLCAnbWFya2V0JywgJ2NvbnZlcnQnXSxcbn1cblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGU6IEV4ZWN1dGVXaXRoQ29uZmlnPENvbmZpZz4gPSBhc3luYyAoaW5wdXQsIGNvbnRleHQsIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKGlucHV0LCBjdXN0b21QYXJhbXMpXG4gIGlmICh2YWxpZGF0b3IuZXJyb3IpIHRocm93IHZhbGlkYXRvci5lcnJvclxuICBjb25zdCB0cmFuc2Zvcm1lZElucHV0RGF0YSA9IHtcbiAgICAuLi5pbnB1dCxcbiAgICBkYXRhOiB7XG4gICAgICAuLi5pbnB1dC5kYXRhLFxuICAgICAgdG86IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5xdW90ZSxcbiAgICB9LFxuICB9XG4gIHJldHVybiBhd2FpdCBsaXZlRXhlY3V0ZSh0cmFuc2Zvcm1lZElucHV0RGF0YSwgY29udGV4dCwgY29uZmlnKVxufVxuIl19