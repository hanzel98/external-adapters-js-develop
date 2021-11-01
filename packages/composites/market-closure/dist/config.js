"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.DEFAULT_NETWORK = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const dataProvider_1 = require("./dataProvider");
exports.DEFAULT_NETWORK = 'ETHEREUM';
const makeConfig = (prefix = '') => {
    const getPriceAdapter = (name) => {
        const dataProviderUrl = ea_bootstrap_1.util.getRequiredEnv('ADAPTER_URL', name.toUpperCase());
        const defaultConfig = ea_bootstrap_1.Requester.getDefaultConfig(prefix);
        defaultConfig.api.baseURL = dataProviderUrl;
        defaultConfig.api.method = 'post';
        return dataProvider_1.getDataProvider(defaultConfig.api);
    };
    return { getPriceAdapter };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBeUQ7QUFDekQsaURBQThEO0FBRWpELFFBQUEsZUFBZSxHQUFHLFVBQVUsQ0FBQTtBQVFsQyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQVUsRUFBRTtJQUNoRCxNQUFNLGVBQWUsR0FBb0IsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNoRCxNQUFNLGVBQWUsR0FBRyxtQkFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFDOUUsTUFBTSxhQUFhLEdBQUcsd0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN4RCxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUE7UUFDM0MsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ2pDLE9BQU8sOEJBQWUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFBO0lBRUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFBO0FBQzVCLENBQUMsQ0FBQTtBQVZZLFFBQUEsVUFBVSxjQVV0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgdXRpbCB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgZ2V0RGF0YVByb3ZpZGVyLCBQcmljZUFkYXB0ZXIgfSBmcm9tICcuL2RhdGFQcm92aWRlcidcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTkVUV09SSyA9ICdFVEhFUkVVTSdcblxuZXhwb3J0IHR5cGUgR2V0UHJpY2VBZGFwdGVyID0gKG5hbWU6IHN0cmluZykgPT4gUHJpY2VBZGFwdGVyXG5cbmV4cG9ydCB0eXBlIENvbmZpZyA9IHtcbiAgZ2V0UHJpY2VBZGFwdGVyOiBHZXRQcmljZUFkYXB0ZXJcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4ID0gJycpOiBDb25maWcgPT4ge1xuICBjb25zdCBnZXRQcmljZUFkYXB0ZXI6IEdldFByaWNlQWRhcHRlciA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgZGF0YVByb3ZpZGVyVXJsID0gdXRpbC5nZXRSZXF1aXJlZEVudignQURBUFRFUl9VUkwnLCBuYW1lLnRvVXBwZXJDYXNlKCkpXG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IFJlcXVlc3Rlci5nZXREZWZhdWx0Q29uZmlnKHByZWZpeClcbiAgICBkZWZhdWx0Q29uZmlnLmFwaS5iYXNlVVJMID0gZGF0YVByb3ZpZGVyVXJsXG4gICAgZGVmYXVsdENvbmZpZy5hcGkubWV0aG9kID0gJ3Bvc3QnXG4gICAgcmV0dXJuIGdldERhdGFQcm92aWRlcihkZWZhdWx0Q29uZmlnLmFwaSlcbiAgfVxuXG4gIHJldHVybiB7IGdldFByaWNlQWRhcHRlciB9XG59XG4iXX0=