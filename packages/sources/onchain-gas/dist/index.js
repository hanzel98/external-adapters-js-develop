"use strict";
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const adapter_1 = require("./adapter");
const config_1 = require("./config");
module.exports = {
    NAME: config_1.NAME,
    makeExecute: adapter_1.makeExecute,
    makeConfig: config_1.makeConfig,
    ...ea_bootstrap_1.expose(config_1.NAME, adapter_1.makeExecute(), adapter_1.makeWSHandler(config_1.makeConfig()), adapter_1.endpointSelector),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBEQUFnRDtBQUNoRCx1Q0FBd0U7QUFDeEUscUNBQTJDO0FBRTNDLGlCQUFTO0lBQ1AsSUFBSSxFQUFKLGFBQUk7SUFDSixXQUFXLEVBQVgscUJBQVc7SUFDWCxVQUFVLEVBQVYsbUJBQVU7SUFDVixHQUFHLHFCQUFNLENBQUMsYUFBSSxFQUFFLHFCQUFXLEVBQUUsRUFBRSx1QkFBYSxDQUFDLG1CQUFVLEVBQUUsQ0FBQyxFQUFFLDBCQUFnQixDQUFDO0NBQzlFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBvc2UgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IG1ha2VFeGVjdXRlLCBlbmRwb2ludFNlbGVjdG9yLCBtYWtlV1NIYW5kbGVyIH0gZnJvbSAnLi9hZGFwdGVyJ1xuaW1wb3J0IHsgbWFrZUNvbmZpZywgTkFNRSB9IGZyb20gJy4vY29uZmlnJ1xuXG5leHBvcnQgPSB7XG4gIE5BTUUsXG4gIG1ha2VFeGVjdXRlLFxuICBtYWtlQ29uZmlnLFxuICAuLi5leHBvc2UoTkFNRSwgbWFrZUV4ZWN1dGUoKSwgbWFrZVdTSGFuZGxlcihtYWtlQ29uZmlnKCkpLCBlbmRwb2ludFNlbGVjdG9yKSxcbn1cbiJdfQ==