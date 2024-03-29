"use strict";
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
const config_1 = require("./config");
module.exports = {
    NAME: config_1.NAME,
    makeExecute: adapter_1.makeExecute,
    makeWSHandler: adapter_1.makeWSHandler,
    makeConfig: config_1.makeConfig,
    ...ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute(), adapter_1.makeWSHandler(), adapter_1.endpointSelector),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBd0U7QUFDeEUscUNBQTJDO0FBRTNDLGlCQUFTO0lBQ1AsSUFBSSxFQUFKLGFBQUk7SUFDSixXQUFXLEVBQVgscUJBQVc7SUFDWCxhQUFhLEVBQWIsdUJBQWE7SUFDYixVQUFVLEVBQVYsbUJBQVU7SUFDVixHQUFHLHFCQUFNLENBQUMsYUFBSSxFQUFFLHFCQUFXLEVBQUUsRUFBRSx1QkFBYSxFQUFFLEVBQUUsMEJBQWdCLENBQUM7Q0FDbEUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cG9zZSB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgZW5kcG9pbnRTZWxlY3RvciwgbWFrZUV4ZWN1dGUsIG1ha2VXU0hhbmRsZXIgfSBmcm9tICcuL2FkYXB0ZXInXG5pbXBvcnQgeyBtYWtlQ29uZmlnLCBOQU1FIH0gZnJvbSAnLi9jb25maWcnXG5cbmV4cG9ydCA9IHtcbiAgTkFNRSxcbiAgbWFrZUV4ZWN1dGUsXG4gIG1ha2VXU0hhbmRsZXIsXG4gIG1ha2VDb25maWcsXG4gIC4uLmV4cG9zZShOQU1FLCBtYWtlRXhlY3V0ZSgpLCBtYWtlV1NIYW5kbGVyKCksIGVuZHBvaW50U2VsZWN0b3IpLFxufVxuIl19