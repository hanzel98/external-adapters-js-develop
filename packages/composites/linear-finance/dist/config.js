"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.INDICES = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const xbci_1 = tslib_1.__importDefault(require("./indices/xbci"));
const xlci_1 = tslib_1.__importDefault(require("./indices/xlci"));
exports.INDICES = ['xbci', 'xlci'];
const makeConfig = (prefix) => {
    return {
        ...ea_bootstrap_1.Requester.getDefaultConfig(prefix),
        indices: {
            xbci: xbci_1.default,
            xlci: xlci_1.default,
        },
    };
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsMERBQW1EO0FBQ25ELGtFQUFpQztBQUNqQyxrRUFBaUM7QUFFcEIsUUFBQSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFTaEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFlLEVBQVUsRUFBRTtJQUNwRCxPQUFPO1FBQ0wsR0FBRyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUNyQyxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUosY0FBSTtZQUNKLElBQUksRUFBSixjQUFJO1NBQ0w7S0FDRixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBUlksUUFBQSxVQUFVLGNBUXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIGFzIEJhc2VDb25maWcgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgUmVxdWVzdGVyIH0gZnJvbSAnQGNoYWlubGluay9lYS1ib290c3RyYXAnXG5pbXBvcnQgeGJjaSBmcm9tICcuL2luZGljZXMveGJjaSdcbmltcG9ydCB4bGNpIGZyb20gJy4vaW5kaWNlcy94bGNpJ1xuXG5leHBvcnQgY29uc3QgSU5ESUNFUyA9IFsneGJjaScsICd4bGNpJ11cbmV4cG9ydCB0eXBlIEluZGV4VHlwZSA9IHR5cGVvZiBJTkRJQ0VTW251bWJlcl1cblxuZXhwb3J0IHR5cGUgQ29uZmlnID0gQmFzZUNvbmZpZyAmIHtcbiAgaW5kaWNlczoge1xuICAgIFtrZXkgaW4gSW5kZXhUeXBlXTogc3RyaW5nXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VDb25maWcgPSAocHJlZml4Pzogc3RyaW5nKTogQ29uZmlnID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5SZXF1ZXN0ZXIuZ2V0RGVmYXVsdENvbmZpZyhwcmVmaXgpLFxuICAgIGluZGljZXM6IHtcbiAgICAgIHhiY2ksXG4gICAgICB4bGNpLFxuICAgIH0sXG4gIH1cbn1cbiJdfQ==