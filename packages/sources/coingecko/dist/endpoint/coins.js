"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['coins'];
exports.inputParameters = {};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const url = '/coins/list';
    const options = {
        ...config.api,
        url,
        params: {
            x_cg_pro_api_key: config.apiKey,
        },
    };
    const response = await ea_bootstrap_1.Requester.request(options);
    return ea_bootstrap_1.Requester.success(jobRunID, response, true);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29pbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnQvY29pbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQThEO0FBR2pELFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUU5QixRQUFBLGVBQWUsR0FBb0IsRUFBRSxDQUFBO0FBUTNDLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQTtJQUUxQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUE7SUFDekIsTUFBTSxPQUFPLEdBQUc7UUFDZCxHQUFHLE1BQU0sQ0FBQyxHQUFHO1FBQ2IsR0FBRztRQUNILE1BQU0sRUFBRTtZQUNOLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ2hDO0tBQ0YsQ0FBQTtJQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQWtCLE9BQU8sQ0FBQyxDQUFBO0lBQ2xFLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUNwRCxDQUFDLENBQUE7QUFmWSxRQUFBLE9BQU8sV0FlbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQ29uZmlnLCBFeGVjdXRlV2l0aENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnY29pbnMnXVxuXG5leHBvcnQgY29uc3QgaW5wdXRQYXJhbWV0ZXJzOiBJbnB1dFBhcmFtZXRlcnMgPSB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIENvaW5zUmVzcG9uc2Uge1xuICBpZDogc3RyaW5nXG4gIHN5bWJvbDogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChyZXF1ZXN0LCBfLCBjb25maWcpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0KVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuaWRcbiAgY29uc3QgdXJsID0gJy9jb2lucy9saXN0J1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIC4uLmNvbmZpZy5hcGksXG4gICAgdXJsLFxuICAgIHBhcmFtczoge1xuICAgICAgeF9jZ19wcm9fYXBpX2tleTogY29uZmlnLmFwaUtleSxcbiAgICB9LFxuICB9XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUmVxdWVzdGVyLnJlcXVlc3Q8Q29pbnNSZXNwb25zZVtdPihvcHRpb25zKVxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3BvbnNlLCB0cnVlKVxufVxuIl19