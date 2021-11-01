"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
exports.supportedEndpoints = ['stock', 'price'];
const customError = (data) => data.Response === 'Error';
const commonKeys = {
    N225: 'nk225',
};
exports.inputParameters = {
    base: ['base', 'from', 'coin'],
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    const url = `get_real_data`;
    let idx = validator.validated.data.base.toUpperCase();
    idx = commonKeys[idx] || idx;
    const params = {
        idx,
    };
    const reqConfig = {
        ...config.api,
        params,
        url,
    };
    const response = await ea_bootstrap_1.Requester.request(reqConfig, customError);
    response.data.result = parseFloat(response.data.price.replace(',', ''));
    return ea_bootstrap_1.Requester.success(jobRunID, response, config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnQvc3RvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQThEO0FBR2pELFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFFcEQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFBO0FBRTVELE1BQU0sVUFBVSxHQUEyQjtJQUN6QyxJQUFJLEVBQUUsT0FBTztDQUNkLENBQUE7QUFFWSxRQUFBLGVBQWUsR0FBb0I7SUFDOUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7Q0FDL0IsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUE4QixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUFlLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFBO0lBRTFDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBRXZDLE1BQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQTtJQUMzQixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFFckQsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUE7SUFFNUIsTUFBTSxNQUFNLEdBQUc7UUFDYixHQUFHO0tBQ0osQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHO1FBQ2hCLEdBQUcsTUFBTSxDQUFDLEdBQUc7UUFDYixNQUFNO1FBQ04sR0FBRztLQUNKLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNoRSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3ZFLE9BQU8sd0JBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBeEJZLFFBQUEsT0FBTyxXQXdCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgRXhlY3V0ZVdpdGhDb25maWcsIENvbmZpZywgSW5wdXRQYXJhbWV0ZXJzIH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFsnc3RvY2snLCAncHJpY2UnXVxuXG5jb25zdCBjdXN0b21FcnJvciA9IChkYXRhOiBhbnkpID0+IGRhdGEuUmVzcG9uc2UgPT09ICdFcnJvcidcblxuY29uc3QgY29tbW9uS2V5czogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgTjIyNTogJ25rMjI1Jyxcbn1cblxuZXhwb3J0IGNvbnN0IGlucHV0UGFyYW1ldGVyczogSW5wdXRQYXJhbWV0ZXJzID0ge1xuICBiYXNlOiBbJ2Jhc2UnLCAnZnJvbScsICdjb2luJ10sXG59XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlOiBFeGVjdXRlV2l0aENvbmZpZzxDb25maWc+ID0gYXN5bmMgKHJlcXVlc3QsIF8sIGNvbmZpZykgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKHJlcXVlc3QsIGlucHV0UGFyYW1ldGVycylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkXG5cbiAgY29uc3QgdXJsID0gYGdldF9yZWFsX2RhdGFgXG4gIGxldCBpZHggPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuYmFzZS50b1VwcGVyQ2FzZSgpXG5cbiAgaWR4ID0gY29tbW9uS2V5c1tpZHhdIHx8IGlkeFxuXG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBpZHgsXG4gIH1cblxuICBjb25zdCByZXFDb25maWcgPSB7XG4gICAgLi4uY29uZmlnLmFwaSxcbiAgICBwYXJhbXMsXG4gICAgdXJsLFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChyZXFDb25maWcsIGN1c3RvbUVycm9yKVxuICByZXNwb25zZS5kYXRhLnJlc3VsdCA9IHBhcnNlRmxvYXQocmVzcG9uc2UuZGF0YS5wcmljZS5yZXBsYWNlKCcsJywgJycpKVxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3Moam9iUnVuSUQsIHJlc3BvbnNlLCBjb25maWcudmVyYm9zZSlcbn1cbiJdfQ==