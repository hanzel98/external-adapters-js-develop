"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeInput = exports.Validator = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const util_1 = require("../util");
const errors_1 = require("./errors");
const logger_1 = require("./logger");
const presetSymbols_json_1 = tslib_1.__importDefault(require("./overrides/presetSymbols.json"));
const presetTokens_json_1 = tslib_1.__importDefault(require("./overrides/presetTokens.json"));
const presetIncludes_json_1 = tslib_1.__importDefault(require("./overrides/presetIncludes.json"));
const requester_1 = require("./requester");
const builder_1 = require("./builder");
class Validator {
    constructor(input = {}, customParams = {}, options = {}, shouldLogError = true) {
        this.overrideSymbol = (adapter, symbol) => {
            const defaultSymbol = symbol || this.validated.data.base;
            if (!defaultSymbol) {
                throw new errors_1.AdapterError({
                    jobRunID: this.validated.id,
                    statusCode: 400,
                    message: `Required parameter not supplied: base`,
                });
            }
            if (!this.validated.overrides)
                return defaultSymbol;
            if (!Array.isArray(defaultSymbol))
                return (this.validated.overrides.get(adapter.toLowerCase())?.get(defaultSymbol.toLowerCase()) ||
                    defaultSymbol);
            const multiple = [];
            for (const sym of defaultSymbol) {
                const overrided = this.validated.overrides.get(adapter.toLowerCase())?.get(sym.toLowerCase());
                if (!overrided)
                    multiple.push(sym);
                else
                    multiple.push(overrided);
            }
            return multiple;
        };
        this.overrideToken = (symbol, network = 'ethereum') => {
            if (!this.validated.tokenOverrides)
                return undefined;
            return this.validated.tokenOverrides.get(network.toLowerCase())?.get(symbol.toLowerCase());
        };
        this.overrideIncludes = (adapter, from, to) => {
            // Search through `presetIncludes` to find matching override for adapter and to/from pairing.
            const pairs = this.validated.includes.filter((val) => typeof val !== 'string').filter((pair) => pair.from.toLowerCase() === from.toLowerCase() &&
                pair.to.toLowerCase() === to.toLowerCase());
            for (const pair of pairs) {
                const matchingIncludes = pair.includes.find((include) => !include.adapters ||
                    include.adapters.length === 0 ||
                    include.adapters.includes(adapter.toUpperCase()));
                if (matchingIncludes) {
                    return matchingIncludes;
                }
            }
            return;
        };
        this.overrideReverseLookup = (adapter, type, symbol) => {
            const overrides = this.validated?.[type]?.get(adapter.toLowerCase());
            if (!overrides)
                return symbol;
            let originalSymbol;
            overrides.forEach((overridden, original) => {
                if (overridden.toLowerCase() === symbol.toLowerCase())
                    originalSymbol = original;
            });
            return originalSymbol || symbol;
        };
        this.formatOverride = (param) => {
            const _throwInvalid = () => {
                const message = `Parameter supplied with wrong format: "overrides"`;
                throw new errors_1.AdapterError({ jobRunID: this.validated.id, statusCode: 400, message });
            };
            if (!util_1.isObject(param))
                _throwInvalid();
            const _isValid = Object.values(param).every(util_1.isObject);
            if (!_isValid)
                _throwInvalid();
            const _keyToLowerCase = (entry) => {
                return [entry[0].toLowerCase(), entry[1]];
            };
            return new Map(Object.entries(param)
                .map(_keyToLowerCase)
                .map(([key, value]) => [key, new Map(Object.entries(value).map(_keyToLowerCase))]));
        };
        this.formatTokenOverrides = (param) => {
            const _throwInvalid = () => {
                const message = `Parameter supplied with wrong format: "tokenOverrides"`;
                throw new errors_1.AdapterError({ jobRunID: this.validated.id, statusCode: 400, message });
            };
            if (!util_1.isObject(param))
                _throwInvalid();
            const _isValid = Object.values(param).every(util_1.isObject);
            if (!_isValid)
                _throwInvalid();
            const _keyToLowerCase = (entry) => {
                return [entry[0].toLowerCase(), entry[1]];
            };
            return new Map(Object.entries(param)
                .map(_keyToLowerCase)
                .map(([key, value]) => [key, new Map(Object.entries(value).map(_keyToLowerCase))]));
        };
        this.formatIncludeOverrides = (param) => {
            const _throwInvalid = () => {
                const message = `Parameter supplied with wrong format: "includes"`;
                throw new errors_1.AdapterError({ jobRunID: this.validated.id, statusCode: 400, message });
            };
            if (!util_1.isArray(param))
                _throwInvalid();
            const _isValid = Object.values(param).every((val) => util_1.isObject(val) || typeof val === 'string');
            if (!_isValid)
                _throwInvalid();
            return param;
        };
        this.input = { ...input };
        this.customParams = { ...customParams };
        this.options = { ...options };
        this.validated = { data: {} };
        this.validateInput(shouldLogError);
        this.validateOverrides(shouldLogError);
        this.validateTokenOverrides(shouldLogError);
        this.validateIncludeOverrides(shouldLogError);
    }
    validateInput(shouldLogError) {
        this.input.id = this.input.id || '1';
        this.validated.id = this.input.id;
        try {
            for (const key in this.customParams) {
                const options = this.options[key];
                if (Array.isArray(this.customParams[key])) {
                    this.validateRequiredParam(this.getRequiredArrayParam(this.customParams[key]), key, options);
                }
                else if (this.customParams[key] === true) {
                    this.validateRequiredParam(this.input.data[key], key, options);
                }
                else if (typeof this.input.data[key] !== 'undefined') {
                    this.validateOptionalParam(this.input.data[key], key, options);
                }
            }
        }
        catch (error) {
            this.parseError(error, {
                input: this.input,
                options: this.options,
                customParams: this.customParams,
            }, shouldLogError);
        }
    }
    validateOverrides(shouldLogError) {
        try {
            if (!this.input.data?.overrides) {
                this.validated.overrides = this.formatOverride(presetSymbols_json_1.default);
                return;
            }
            this.validated.overrides = this.formatOverride(lodash_1.merge({ ...presetSymbols_json_1.default }, this.input.data.overrides));
        }
        catch (e) {
            this.parseError(e, {
                input: this.input,
                options: this.options,
                customParams: this.customParams,
            }, shouldLogError);
        }
    }
    validateTokenOverrides(shouldLogError) {
        try {
            if (!this.input.data?.tokenOverrides) {
                this.validated.tokenOverrides = this.formatTokenOverrides(presetTokens_json_1.default);
                return;
            }
            this.validated.tokenOverrides = this.formatTokenOverrides(lodash_1.merge({ ...presetTokens_json_1.default }, this.input.data.tokenOverrides));
        }
        catch (e) {
            this.parseError(e, {
                input: this.input,
                options: this.options,
                customParams: this.customParams,
            }, shouldLogError);
        }
    }
    validateIncludeOverrides(shouldLogError) {
        try {
            this.validated.includes = this.formatIncludeOverrides([
                ...(this.input.data?.includes || []),
                ...presetIncludes_json_1.default,
            ]);
        }
        catch (e) {
            this.parseError(e, {
                input: this.input,
                options: this.options,
                customParams: this.customParams,
            }, shouldLogError);
        }
    }
    parseError(error, context, shouldLogError) {
        const message = 'Error validating input.';
        if (error instanceof errors_1.AdapterError)
            this.error = error;
        else
            this.error = new errors_1.AdapterError({
                jobRunID: this.validated.id,
                statusCode: 400,
                message,
                cause: error,
            });
        if (shouldLogError) {
            logger_1.logger.error(message, { error: this.error, context });
        }
        this.errored = requester_1.Requester.errored(this.validated.id, this.error);
    }
    validateOptionalParam(param, key, options) {
        if (param && options) {
            if (!Array.isArray(options)) {
                const message = `Parameter options for ${key} must be of an Array type`;
                throw new errors_1.AdapterError({ jobRunID: this.validated.id, statusCode: 400, message });
            }
            if (!options.includes(param)) {
                const message = `${param} is not a supported ${key} option. Must be one of ${options}`;
                throw new errors_1.AdapterError({ jobRunID: this.validated.id, statusCode: 400, message });
            }
        }
        this.validated.data[key] = param;
    }
    validateRequiredParam(param, key, options) {
        if (typeof param === 'undefined') {
            const message = `Required parameter not supplied: ${key}`;
            throw new errors_1.AdapterError({ jobRunID: this.validated.id, statusCode: 400, message });
        }
        if (options) {
            if (!Array.isArray(options)) {
                const message = `Parameter options for ${key} must be of an Array type`;
                throw new errors_1.AdapterError({ jobRunID: this.validated.id, statusCode: 400, message });
            }
            if (!options.includes(param)) {
                const message = `${param} is not a supported ${key} option. Must be one of ${options.join(' || ')}`;
                throw new errors_1.AdapterError({ jobRunID: this.validated.id, statusCode: 400, message });
            }
        }
        this.validated.data[key] = param;
    }
    getRequiredArrayParam(keyArray) {
        for (const param of keyArray) {
            if (typeof this.input.data[param] !== 'undefined') {
                return this.input.data[param];
            }
        }
    }
}
exports.Validator = Validator;
function normalizeInput(request, apiEndpoint) {
    const input = { ...request };
    // if endpoint does not match, an override occurred and we must adjust it
    if (!apiEndpoint.supportedEndpoints.includes(input.data.endpoint))
        input.data.endpoint = apiEndpoint.supportedEndpoints[0];
    const fullParameters = { ...builder_1.inputParameters, ...apiEndpoint.inputParameters };
    const validator = new Validator(request, fullParameters);
    // remove undefined values
    const data = JSON.parse(JSON.stringify(validator.validated.data));
    // re-add maxAge
    if (request.data.maxAge)
        data.maxAge = request.data.maxAge;
    // re-add overrides
    if (request.data.overrides)
        data.overrides = request.data.overrides;
    if (request.data.tokenOverrides)
        data.tokenOverrides = request.data.tokenOverrides;
    if (request.data.includes)
        data.includes = request.data.includes;
    if (apiEndpoint.batchablePropertyPath) {
        for (const { name } of apiEndpoint.batchablePropertyPath) {
            const value = data[name];
            if (typeof value === 'string')
                data[name] = data[name].toUpperCase();
            if (Array.isArray(value)) {
                for (const index in data[name])
                    data[name][index] = data[name][index].toUpperCase();
            }
        }
    }
    return { ...request, data };
}
exports.normalizeInput = normalizeInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9leHRlcm5hbC1hZGFwdGVyL3ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBU0EsbUNBQThCO0FBQzlCLGtDQUEyQztBQUMzQyxxQ0FBdUM7QUFDdkMscUNBQWlDO0FBQ2pDLGdHQUEwRDtBQUMxRCw4RkFBd0Q7QUFDeEQsa0dBQTREO0FBQzVELDJDQUF1QztBQUN2Qyx1Q0FBMkM7QUFHM0MsTUFBYSxTQUFTO0lBUXBCLFlBQVksS0FBSyxHQUFHLEVBQUUsRUFBRSxZQUFZLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsY0FBYyxHQUFHLElBQUk7UUEwSDlFLG1CQUFjLEdBQUcsQ0FBQyxPQUFlLEVBQUUsTUFBMEIsRUFBcUIsRUFBRTtZQUNsRixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1lBQ3hELElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xCLE1BQU0sSUFBSSxxQkFBWSxDQUFDO29CQUNyQixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUMzQixVQUFVLEVBQUUsR0FBRztvQkFDZixPQUFPLEVBQUUsdUNBQXVDO2lCQUNqRCxDQUFDLENBQUE7YUFDSDtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7Z0JBQUUsT0FBTyxhQUFhLENBQUE7WUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO2dCQUMvQixPQUFPLENBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ3JGLGFBQWEsQ0FDZCxDQUFBO1lBQ0gsTUFB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QUFLLEtBQUssUUFBUTtnQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ3BFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7YUFDcEY7U0FDRjtLQUNGO0lBRUQsT0FBTyxFQUFFLEdBQUcsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFBO0FBQzdCLENBQUM7QUFuQ0Qsd0NBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWRhcHRlckVycm9yUmVzcG9uc2UsXG4gIE92ZXJyaWRlLFxuICBBZGFwdGVyUmVxdWVzdCxcbiAgQVBJRW5kcG9pbnQsXG4gIEluY2x1ZGVzLFxuICBJbmNsdWRlUGFpcixcbiAgQ29uZmlnLFxufSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBpc0FycmF5LCBpc09iamVjdCB9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgeyBBZGFwdGVyRXJyb3IgfSBmcm9tICcuL2Vycm9ycydcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJ1xuaW1wb3J0IHByZXNldFN5bWJvbHMgZnJvbSAnLi9vdmVycmlkZXMvcHJlc2V0U3ltYm9scy5qc29uJ1xuaW1wb3J0IHByZXNldFRva2VucyBmcm9tICcuL292ZXJyaWRlcy9wcmVzZXRUb2tlbnMuanNvbidcbmltcG9ydCBwcmVzZXRJbmNsdWRlcyBmcm9tICcuL292ZXJyaWRlcy9wcmVzZXRJbmNsdWRlcy5qc29uJ1xuaW1wb3J0IHsgUmVxdWVzdGVyIH0gZnJvbSAnLi9yZXF1ZXN0ZXInXG5pbXBvcnQgeyBpbnB1dFBhcmFtZXRlcnMgfSBmcm9tICcuL2J1aWxkZXInXG5cbmV4cG9ydCB0eXBlIE92ZXJyaWRlVHlwZSA9ICdvdmVycmlkZXMnIHwgJ3Rva2VuT3ZlcnJpZGVzJyB8ICdpbmNsdWRlcydcbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3Ige1xuICBpbnB1dDogYW55XG4gIGN1c3RvbVBhcmFtczogYW55XG4gIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueVtdPlxuICB2YWxpZGF0ZWQ6IGFueVxuICBlcnJvcjogQWRhcHRlckVycm9yIHwgdW5kZWZpbmVkXG4gIGVycm9yZWQ6IEFkYXB0ZXJFcnJvclJlc3BvbnNlIHwgdW5kZWZpbmVkXG5cbiAgY29uc3RydWN0b3IoaW5wdXQgPSB7fSwgY3VzdG9tUGFyYW1zID0ge30sIG9wdGlvbnMgPSB7fSwgc2hvdWxkTG9nRXJyb3IgPSB0cnVlKSB7XG4gICAgdGhpcy5pbnB1dCA9IHsgLi4uaW5wdXQgfVxuICAgIHRoaXMuY3VzdG9tUGFyYW1zID0geyAuLi5jdXN0b21QYXJhbXMgfVxuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4ub3B0aW9ucyB9XG4gICAgdGhpcy52YWxpZGF0ZWQgPSB7IGRhdGE6IHt9IH1cbiAgICB0aGlzLnZhbGlkYXRlSW5wdXQoc2hvdWxkTG9nRXJyb3IpXG4gICAgdGhpcy52YWxpZGF0ZU92ZXJyaWRlcyhzaG91bGRMb2dFcnJvcilcbiAgICB0aGlzLnZhbGlkYXRlVG9rZW5PdmVycmlkZXMoc2hvdWxkTG9nRXJyb3IpXG4gICAgdGhpcy52YWxpZGF0ZUluY2x1ZGVPdmVycmlkZXMoc2hvdWxkTG9nRXJyb3IpXG4gIH1cblxuICB2YWxpZGF0ZUlucHV0KHNob3VsZExvZ0Vycm9yOiBib29sZWFuKSB7XG4gICAgdGhpcy5pbnB1dC5pZCA9IHRoaXMuaW5wdXQuaWQgfHwgJzEnXG4gICAgdGhpcy52YWxpZGF0ZWQuaWQgPSB0aGlzLmlucHV0LmlkXG5cbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jdXN0b21QYXJhbXMpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1trZXldXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY3VzdG9tUGFyYW1zW2tleV0pKSB7XG4gICAgICAgICAgdGhpcy52YWxpZGF0ZVJlcXVpcmVkUGFyYW0oXG4gICAgICAgICAgICB0aGlzLmdldFJlcXVpcmVkQXJyYXlQYXJhbSh0aGlzLmN1c3RvbVBhcmFtc1trZXldKSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tUGFyYW1zW2tleV0gPT09IHRydWUpIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRlUmVxdWlyZWRQYXJhbSh0aGlzLmlucHV0LmRhdGFba2V5XSwga2V5LCBvcHRpb25zKVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmlucHV0LmRhdGFba2V5XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRlT3B0aW9uYWxQYXJhbSh0aGlzLmlucHV0LmRhdGFba2V5XSwga2V5LCBvcHRpb25zKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMucGFyc2VFcnJvcihcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIHtcbiAgICAgICAgICBpbnB1dDogdGhpcy5pbnB1dCxcbiAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgY3VzdG9tUGFyYW1zOiB0aGlzLmN1c3RvbVBhcmFtcyxcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdWxkTG9nRXJyb3IsXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVPdmVycmlkZXMoc2hvdWxkTG9nRXJyb3I6IGJvb2xlYW4pIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCF0aGlzLmlucHV0LmRhdGE/Lm92ZXJyaWRlcykge1xuICAgICAgICB0aGlzLnZhbGlkYXRlZC5vdmVycmlkZXMgPSB0aGlzLmZvcm1hdE92ZXJyaWRlKHByZXNldFN5bWJvbHMpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy52YWxpZGF0ZWQub3ZlcnJpZGVzID0gdGhpcy5mb3JtYXRPdmVycmlkZShcbiAgICAgICAgbWVyZ2UoeyAuLi5wcmVzZXRTeW1ib2xzIH0sIHRoaXMuaW5wdXQuZGF0YS5vdmVycmlkZXMpLFxuICAgICAgKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMucGFyc2VFcnJvcihcbiAgICAgICAgZSxcbiAgICAgICAge1xuICAgICAgICAgIGlucHV0OiB0aGlzLmlucHV0LFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICBjdXN0b21QYXJhbXM6IHRoaXMuY3VzdG9tUGFyYW1zLFxuICAgICAgICB9LFxuICAgICAgICBzaG91bGRMb2dFcnJvcixcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZVRva2VuT3ZlcnJpZGVzKHNob3VsZExvZ0Vycm9yOiBib29sZWFuKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdGhpcy5pbnB1dC5kYXRhPy50b2tlbk92ZXJyaWRlcykge1xuICAgICAgICB0aGlzLnZhbGlkYXRlZC50b2tlbk92ZXJyaWRlcyA9IHRoaXMuZm9ybWF0VG9rZW5PdmVycmlkZXMocHJlc2V0VG9rZW5zKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMudmFsaWRhdGVkLnRva2VuT3ZlcnJpZGVzID0gdGhpcy5mb3JtYXRUb2tlbk92ZXJyaWRlcyhcbiAgICAgICAgbWVyZ2UoeyAuLi5wcmVzZXRUb2tlbnMgfSwgdGhpcy5pbnB1dC5kYXRhLnRva2VuT3ZlcnJpZGVzKSxcbiAgICAgIClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnBhcnNlRXJyb3IoXG4gICAgICAgIGUsXG4gICAgICAgIHtcbiAgICAgICAgICBpbnB1dDogdGhpcy5pbnB1dCxcbiAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgY3VzdG9tUGFyYW1zOiB0aGlzLmN1c3RvbVBhcmFtcyxcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdWxkTG9nRXJyb3IsXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVJbmNsdWRlT3ZlcnJpZGVzKHNob3VsZExvZ0Vycm9yOiBib29sZWFuKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMudmFsaWRhdGVkLmluY2x1ZGVzID0gdGhpcy5mb3JtYXRJbmNsdWRlT3ZlcnJpZGVzKFtcbiAgICAgICAgLi4uKHRoaXMuaW5wdXQuZGF0YT8uaW5jbHVkZXMgfHwgW10pLFxuICAgICAgICAuLi5wcmVzZXRJbmNsdWRlcyxcbiAgICAgIF0pXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5wYXJzZUVycm9yKFxuICAgICAgICBlLFxuICAgICAgICB7XG4gICAgICAgICAgaW5wdXQ6IHRoaXMuaW5wdXQsXG4gICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgIGN1c3RvbVBhcmFtczogdGhpcy5jdXN0b21QYXJhbXMsXG4gICAgICAgIH0sXG4gICAgICAgIHNob3VsZExvZ0Vycm9yLFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlRXJyb3IoZXJyb3I6IGFueSwgY29udGV4dDogYW55LCBzaG91bGRMb2dFcnJvcjogYm9vbGVhbikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSAnRXJyb3IgdmFsaWRhdGluZyBpbnB1dC4nXG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQWRhcHRlckVycm9yKSB0aGlzLmVycm9yID0gZXJyb3JcbiAgICBlbHNlXG4gICAgICB0aGlzLmVycm9yID0gbmV3IEFkYXB0ZXJFcnJvcih7XG4gICAgICAgIGpvYlJ1bklEOiB0aGlzLnZhbGlkYXRlZC5pZCxcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBjYXVzZTogZXJyb3IsXG4gICAgICB9KVxuICAgIGlmIChzaG91bGRMb2dFcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UsIHsgZXJyb3I6IHRoaXMuZXJyb3IsIGNvbnRleHQgfSlcbiAgICB9XG4gICAgdGhpcy5lcnJvcmVkID0gUmVxdWVzdGVyLmVycm9yZWQodGhpcy52YWxpZGF0ZWQuaWQsIHRoaXMuZXJyb3IpXG4gIH1cblxuICBvdmVycmlkZVN5bWJvbCA9IChhZGFwdGVyOiBzdHJpbmcsIHN5bWJvbD86IHN0cmluZyB8IHN0cmluZ1tdKTogc3RyaW5nIHwgc3RyaW5nW10gPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRTeW1ib2wgPSBzeW1ib2wgfHwgdGhpcy52YWxpZGF0ZWQuZGF0YS5iYXNlXG4gICAgaWYgKCFkZWZhdWx0U3ltYm9sKSB7XG4gICAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHtcbiAgICAgICAgam9iUnVuSUQ6IHRoaXMudmFsaWRhdGVkLmlkLFxuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgIG1lc3NhZ2U6IGBSZXF1aXJlZCBwYXJhbWV0ZXIgbm90IHN1cHBsaWVkOiBiYXNlYCxcbiAgICAgIH0pXG4gICAgfVxuICAgIGlmICghdGhpcy52YWxpZGF0ZWQub3ZlcnJpZGVzKSByZXR1cm4gZGVmYXVsdFN5bWJvbFxuICAgIGlmICghQXJyYXkuaXNBcnJheShkZWZhdWx0U3ltYm9sKSlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMudmFsaWRhdGVkLm92ZXJyaWRlcy5nZXQoYWRhcHRlci50b0xvd2VyQ2FzZSgpKT8uZ2V0KGRlZmF1bHRTeW1ib2wudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgZGVmYXVsdFN5bWJvbFxuICAgICAgKVxuICAgIGNvbnN0IG11bHRpcGxlOiBzdHJpbmdbXSA9IFtdXG4gICAgZm9yIChjb25zdCBzeW0gb2YgZGVmYXVsdFN5bWJvbCkge1xuICAgICAgY29uc3Qgb3ZlcnJpZGVkID0gdGhpcy52YWxpZGF0ZWQub3ZlcnJpZGVzLmdldChhZGFwdGVyLnRvTG93ZXJDYXNlKCkpPy5nZXQoc3ltLnRvTG93ZXJDYXNlKCkpXG4gICAgICBpZiAoIW92ZXJyaWRlZCkgbXVsdGlwbGUucHVzaChzeW0pXG4gICAgICBlbHNlIG11bHRpcGxlLnB1c2gob3ZlcnJpZGVkKVxuICAgIH1cbiAgICByZXR1cm4gbXVsdGlwbGVcbiAgfVxuXG4gIG92ZXJyaWRlVG9rZW4gPSAoc3ltYm9sOiBzdHJpbmcsIG5ldHdvcmsgPSAnZXRoZXJldW0nKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVkLnRva2VuT3ZlcnJpZGVzKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGVkLnRva2VuT3ZlcnJpZGVzLmdldChuZXR3b3JrLnRvTG93ZXJDYXNlKCkpPy5nZXQoc3ltYm9sLnRvTG93ZXJDYXNlKCkpXG4gIH1cblxuICBvdmVycmlkZUluY2x1ZGVzID0gKGFkYXB0ZXI6IHN0cmluZywgZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogSW5jbHVkZVBhaXIgfCB1bmRlZmluZWQgPT4ge1xuICAgIC8vIFNlYXJjaCB0aHJvdWdoIGBwcmVzZXRJbmNsdWRlc2AgdG8gZmluZCBtYXRjaGluZyBvdmVycmlkZSBmb3IgYWRhcHRlciBhbmQgdG8vZnJvbSBwYWlyaW5nLlxuICAgIGNvbnN0IHBhaXJzID0gKFxuICAgICAgdGhpcy52YWxpZGF0ZWQuaW5jbHVkZXMuZmlsdGVyKFxuICAgICAgICAodmFsOiBzdHJpbmcgfCBJbmNsdWRlcykgPT4gdHlwZW9mIHZhbCAhPT0gJ3N0cmluZycsXG4gICAgICApIGFzIEluY2x1ZGVzW11cbiAgICApLmZpbHRlcihcbiAgICAgIChwYWlyKSA9PlxuICAgICAgICBwYWlyLmZyb20udG9Mb3dlckNhc2UoKSA9PT0gZnJvbS50b0xvd2VyQ2FzZSgpICYmXG4gICAgICAgIHBhaXIudG8udG9Mb3dlckNhc2UoKSA9PT0gdG8udG9Mb3dlckNhc2UoKSxcbiAgICApXG4gICAgZm9yIChjb25zdCBwYWlyIG9mIHBhaXJzKSB7XG4gICAgICBjb25zdCBtYXRjaGluZ0luY2x1ZGVzID0gcGFpci5pbmNsdWRlcy5maW5kKFxuICAgICAgICAoaW5jbHVkZSkgPT5cbiAgICAgICAgICAhaW5jbHVkZS5hZGFwdGVycyB8fFxuICAgICAgICAgIGluY2x1ZGUuYWRhcHRlcnMubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgaW5jbHVkZS5hZGFwdGVycy5pbmNsdWRlcyhhZGFwdGVyLnRvVXBwZXJDYXNlKCkpLFxuICAgICAgKVxuICAgICAgaWYgKG1hdGNoaW5nSW5jbHVkZXMpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoaW5nSW5jbHVkZXNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICBvdmVycmlkZVJldmVyc2VMb29rdXAgPSAoYWRhcHRlcjogc3RyaW5nLCB0eXBlOiBPdmVycmlkZVR5cGUsIHN5bWJvbDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBvdmVycmlkZXM6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSB0aGlzLnZhbGlkYXRlZD8uW3R5cGVdPy5nZXQoYWRhcHRlci50b0xvd2VyQ2FzZSgpKVxuICAgIGlmICghb3ZlcnJpZGVzKSByZXR1cm4gc3ltYm9sXG4gICAgbGV0IG9yaWdpbmFsU3ltYm9sOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICBvdmVycmlkZXMuZm9yRWFjaCgob3ZlcnJpZGRlbiwgb3JpZ2luYWwpID0+IHtcbiAgICAgIGlmIChvdmVycmlkZGVuLnRvTG93ZXJDYXNlKCkgPT09IHN5bWJvbC50b0xvd2VyQ2FzZSgpKSBvcmlnaW5hbFN5bWJvbCA9IG9yaWdpbmFsXG4gICAgfSlcbiAgICByZXR1cm4gb3JpZ2luYWxTeW1ib2wgfHwgc3ltYm9sXG4gIH1cblxuICBmb3JtYXRPdmVycmlkZSA9IChwYXJhbTogYW55KTogT3ZlcnJpZGUgPT4ge1xuICAgIGNvbnN0IF90aHJvd0ludmFsaWQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYFBhcmFtZXRlciBzdXBwbGllZCB3aXRoIHdyb25nIGZvcm1hdDogXCJvdmVycmlkZXNcImBcbiAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3IoeyBqb2JSdW5JRDogdGhpcy52YWxpZGF0ZWQuaWQsIHN0YXR1c0NvZGU6IDQwMCwgbWVzc2FnZSB9KVxuICAgIH1cbiAgICBpZiAoIWlzT2JqZWN0KHBhcmFtKSkgX3Rocm93SW52YWxpZCgpXG5cbiAgICBjb25zdCBfaXNWYWxpZCA9IE9iamVjdC52YWx1ZXMocGFyYW0pLmV2ZXJ5KGlzT2JqZWN0KVxuICAgIGlmICghX2lzVmFsaWQpIF90aHJvd0ludmFsaWQoKVxuXG4gICAgY29uc3QgX2tleVRvTG93ZXJDYXNlID0gKGVudHJ5OiBbc3RyaW5nLCBhbnldKTogW3N0cmluZywgYW55XSA9PiB7XG4gICAgICByZXR1cm4gW2VudHJ5WzBdLnRvTG93ZXJDYXNlKCksIGVudHJ5WzFdXVxuICAgIH1cbiAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgIE9iamVjdC5lbnRyaWVzKHBhcmFtKVxuICAgICAgICAubWFwKF9rZXlUb0xvd2VyQ2FzZSlcbiAgICAgICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiBba2V5LCBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHZhbHVlKS5tYXAoX2tleVRvTG93ZXJDYXNlKSldKSxcbiAgICApXG4gIH1cblxuICBmb3JtYXRUb2tlbk92ZXJyaWRlcyA9IChwYXJhbTogYW55KTogT3ZlcnJpZGUgPT4ge1xuICAgIGNvbnN0IF90aHJvd0ludmFsaWQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYFBhcmFtZXRlciBzdXBwbGllZCB3aXRoIHdyb25nIGZvcm1hdDogXCJ0b2tlbk92ZXJyaWRlc1wiYFxuICAgICAgdGhyb3cgbmV3IEFkYXB0ZXJFcnJvcih7IGpvYlJ1bklEOiB0aGlzLnZhbGlkYXRlZC5pZCwgc3RhdHVzQ29kZTogNDAwLCBtZXNzYWdlIH0pXG4gICAgfVxuICAgIGlmICghaXNPYmplY3QocGFyYW0pKSBfdGhyb3dJbnZhbGlkKClcblxuICAgIGNvbnN0IF9pc1ZhbGlkID0gT2JqZWN0LnZhbHVlcyhwYXJhbSkuZXZlcnkoaXNPYmplY3QpXG4gICAgaWYgKCFfaXNWYWxpZCkgX3Rocm93SW52YWxpZCgpXG5cbiAgICBjb25zdCBfa2V5VG9Mb3dlckNhc2UgPSAoZW50cnk6IFtzdHJpbmcsIGFueV0pOiBbc3RyaW5nLCBhbnldID0+IHtcbiAgICAgIHJldHVybiBbZW50cnlbMF0udG9Mb3dlckNhc2UoKSwgZW50cnlbMV1dXG4gICAgfVxuICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgT2JqZWN0LmVudHJpZXMocGFyYW0pXG4gICAgICAgIC5tYXAoX2tleVRvTG93ZXJDYXNlKVxuICAgICAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IFtrZXksIG5ldyBNYXAoT2JqZWN0LmVudHJpZXModmFsdWUpLm1hcChfa2V5VG9Mb3dlckNhc2UpKV0pLFxuICAgIClcbiAgfVxuXG4gIGZvcm1hdEluY2x1ZGVPdmVycmlkZXMgPSAocGFyYW06IGFueSk6IE92ZXJyaWRlID0+IHtcbiAgICBjb25zdCBfdGhyb3dJbnZhbGlkID0gKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGBQYXJhbWV0ZXIgc3VwcGxpZWQgd2l0aCB3cm9uZyBmb3JtYXQ6IFwiaW5jbHVkZXNcImBcbiAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3IoeyBqb2JSdW5JRDogdGhpcy52YWxpZGF0ZWQuaWQsIHN0YXR1c0NvZGU6IDQwMCwgbWVzc2FnZSB9KVxuICAgIH1cbiAgICBpZiAoIWlzQXJyYXkocGFyYW0pKSBfdGhyb3dJbnZhbGlkKClcblxuICAgIGNvbnN0IF9pc1ZhbGlkID0gT2JqZWN0LnZhbHVlcyhwYXJhbSkuZXZlcnkoKHZhbCkgPT4gaXNPYmplY3QodmFsKSB8fCB0eXBlb2YgdmFsID09PSAnc3RyaW5nJylcbiAgICBpZiAoIV9pc1ZhbGlkKSBfdGhyb3dJbnZhbGlkKClcblxuICAgIHJldHVybiBwYXJhbVxuICB9XG5cbiAgdmFsaWRhdGVPcHRpb25hbFBhcmFtKHBhcmFtOiBhbnksIGtleTogc3RyaW5nLCBvcHRpb25zOiBhbnlbXSkge1xuICAgIGlmIChwYXJhbSAmJiBvcHRpb25zKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGBQYXJhbWV0ZXIgb3B0aW9ucyBmb3IgJHtrZXl9IG11c3QgYmUgb2YgYW4gQXJyYXkgdHlwZWBcbiAgICAgICAgdGhyb3cgbmV3IEFkYXB0ZXJFcnJvcih7IGpvYlJ1bklEOiB0aGlzLnZhbGlkYXRlZC5pZCwgc3RhdHVzQ29kZTogNDAwLCBtZXNzYWdlIH0pXG4gICAgICB9XG4gICAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZXMocGFyYW0pKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtwYXJhbX0gaXMgbm90IGEgc3VwcG9ydGVkICR7a2V5fSBvcHRpb24uIE11c3QgYmUgb25lIG9mICR7b3B0aW9uc31gXG4gICAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3IoeyBqb2JSdW5JRDogdGhpcy52YWxpZGF0ZWQuaWQsIHN0YXR1c0NvZGU6IDQwMCwgbWVzc2FnZSB9KVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnZhbGlkYXRlZC5kYXRhW2tleV0gPSBwYXJhbVxuICB9XG5cbiAgdmFsaWRhdGVSZXF1aXJlZFBhcmFtKHBhcmFtOiBhbnksIGtleTogc3RyaW5nLCBvcHRpb25zOiBhbnlbXSkge1xuICAgIGlmICh0eXBlb2YgcGFyYW0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYFJlcXVpcmVkIHBhcmFtZXRlciBub3Qgc3VwcGxpZWQ6ICR7a2V5fWBcbiAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3IoeyBqb2JSdW5JRDogdGhpcy52YWxpZGF0ZWQuaWQsIHN0YXR1c0NvZGU6IDQwMCwgbWVzc2FnZSB9KVxuICAgIH1cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgUGFyYW1ldGVyIG9wdGlvbnMgZm9yICR7a2V5fSBtdXN0IGJlIG9mIGFuIEFycmF5IHR5cGVgXG4gICAgICAgIHRocm93IG5ldyBBZGFwdGVyRXJyb3IoeyBqb2JSdW5JRDogdGhpcy52YWxpZGF0ZWQuaWQsIHN0YXR1c0NvZGU6IDQwMCwgbWVzc2FnZSB9KVxuICAgICAgfVxuICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKHBhcmFtKSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7cGFyYW19IGlzIG5vdCBhIHN1cHBvcnRlZCAke2tleX0gb3B0aW9uLiBNdXN0IGJlIG9uZSBvZiAke29wdGlvbnMuam9pbihcbiAgICAgICAgICAnIHx8ICcsXG4gICAgICAgICl9YFxuICAgICAgICB0aHJvdyBuZXcgQWRhcHRlckVycm9yKHsgam9iUnVuSUQ6IHRoaXMudmFsaWRhdGVkLmlkLCBzdGF0dXNDb2RlOiA0MDAsIG1lc3NhZ2UgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy52YWxpZGF0ZWQuZGF0YVtrZXldID0gcGFyYW1cbiAgfVxuXG4gIGdldFJlcXVpcmVkQXJyYXlQYXJhbShrZXlBcnJheTogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIGtleUFycmF5KSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuaW5wdXQuZGF0YVtwYXJhbV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0LmRhdGFbcGFyYW1dXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVJbnB1dDxDIGV4dGVuZHMgQ29uZmlnPihcbiAgcmVxdWVzdDogQWRhcHRlclJlcXVlc3QsXG4gIGFwaUVuZHBvaW50OiBBUElFbmRwb2ludDxDPixcbik6IEFkYXB0ZXJSZXF1ZXN0IHtcbiAgY29uc3QgaW5wdXQgPSB7IC4uLnJlcXVlc3QgfVxuXG4gIC8vIGlmIGVuZHBvaW50IGRvZXMgbm90IG1hdGNoLCBhbiBvdmVycmlkZSBvY2N1cnJlZCBhbmQgd2UgbXVzdCBhZGp1c3QgaXRcbiAgaWYgKCFhcGlFbmRwb2ludC5zdXBwb3J0ZWRFbmRwb2ludHMuaW5jbHVkZXMoaW5wdXQuZGF0YS5lbmRwb2ludCkpXG4gICAgaW5wdXQuZGF0YS5lbmRwb2ludCA9IGFwaUVuZHBvaW50LnN1cHBvcnRlZEVuZHBvaW50c1swXVxuXG4gIGNvbnN0IGZ1bGxQYXJhbWV0ZXJzID0geyAuLi5pbnB1dFBhcmFtZXRlcnMsIC4uLmFwaUVuZHBvaW50LmlucHV0UGFyYW1ldGVycyB9XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IocmVxdWVzdCwgZnVsbFBhcmFtZXRlcnMpXG5cbiAgLy8gcmVtb3ZlIHVuZGVmaW5lZCB2YWx1ZXNcbiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhKSlcblxuICAvLyByZS1hZGQgbWF4QWdlXG4gIGlmIChyZXF1ZXN0LmRhdGEubWF4QWdlKSBkYXRhLm1heEFnZSA9IHJlcXVlc3QuZGF0YS5tYXhBZ2VcblxuICAvLyByZS1hZGQgb3ZlcnJpZGVzXG4gIGlmIChyZXF1ZXN0LmRhdGEub3ZlcnJpZGVzKSBkYXRhLm92ZXJyaWRlcyA9IHJlcXVlc3QuZGF0YS5vdmVycmlkZXNcbiAgaWYgKHJlcXVlc3QuZGF0YS50b2tlbk92ZXJyaWRlcykgZGF0YS50b2tlbk92ZXJyaWRlcyA9IHJlcXVlc3QuZGF0YS50b2tlbk92ZXJyaWRlc1xuICBpZiAocmVxdWVzdC5kYXRhLmluY2x1ZGVzKSBkYXRhLmluY2x1ZGVzID0gcmVxdWVzdC5kYXRhLmluY2x1ZGVzXG5cbiAgaWYgKGFwaUVuZHBvaW50LmJhdGNoYWJsZVByb3BlcnR5UGF0aCkge1xuICAgIGZvciAoY29uc3QgeyBuYW1lIH0gb2YgYXBpRW5kcG9pbnQuYmF0Y2hhYmxlUHJvcGVydHlQYXRoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGRhdGFbbmFtZV1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSBkYXRhW25hbWVdID0gZGF0YVtuYW1lXS50b1VwcGVyQ2FzZSgpXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChjb25zdCBpbmRleCBpbiBkYXRhW25hbWVdKSBkYXRhW25hbWVdW2luZGV4XSA9IGRhdGFbbmFtZV1baW5kZXhdLnRvVXBwZXJDYXNlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4geyAuLi5yZXF1ZXN0LCBkYXRhIH1cbn1cbiJdfQ==