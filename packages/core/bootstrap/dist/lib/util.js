"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredURL = exports.getURL = exports.ENV_ADAPTER_URL = exports.LEGACY_ENV_ADAPTER_URL = exports.deepType = exports.permutator = exports.isDebugLogLevel = exports.isDebug = exports.getHashOpts = exports.hash = exports.getKeyData = exports.includableAdapterRequestProperties = exports.excludableAdapterRequestProperties = exports.toFixedMax = exports.byName = exports.groupBy = exports.getRequiredEnv = exports.RequiredEnvError = exports.getEnv = exports.getWithCoalescing = exports.exponentialBackOffMs = exports.delay = exports.uuid = exports.getRandomRequiredEnv = exports.getRandomEnv = exports.toObjectWithNumbers = exports.parseBool = exports.isArray = exports.isObject = void 0;
const tslib_1 = require("tslib");
const decimal_js_1 = require("decimal.js");
const lodash_1 = require("lodash");
const object_hash_1 = tslib_1.__importDefault(require("object-hash"));
const uuid_1 = require("uuid");
const isObject = (o) => o !== null && typeof o === 'object' && Array.isArray(o) === false;
exports.isObject = isObject;
const isArray = (o) => o !== null && typeof o === 'object' && Array.isArray(o);
exports.isArray = isArray;
const parseBool = (value) => {
    if (!value)
        return false;
    const _val = value.toString().toLowerCase();
    return (_val === 'true' || _val === 'false') && _val === 'true';
};
exports.parseBool = parseBool;
// convert string values into Numbers where possible (for incoming query strings)
const toObjectWithNumbers = (obj) => {
    const toNumber = (v) => (isNaN(v) ? v : Number(v));
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, toNumber(v)]));
};
exports.toObjectWithNumbers = toObjectWithNumbers;
// pick a random string from env var after splitting with the delimiter ("a&b&c" "&" -> choice(["a","b","c"]))
const getRandomEnv = (name, delimiter = ',', prefix = '') => {
    const val = exports.getEnv(name, prefix);
    if (!val)
        return val;
    const items = val.split(delimiter);
    return items[Math.floor(Math.random() * items.length)];
};
exports.getRandomEnv = getRandomEnv;
// pick a random string from env var after splitting with the delimiter ("a&b&c" "&" -> choice(["a","b","c"]))
const getRandomRequiredEnv = (name, delimiter = ',', prefix = '') => {
    const val = exports.getRequiredEnv(name, prefix);
    const items = val.split(delimiter);
    return items[Math.floor(Math.random() * items.length)];
};
exports.getRandomRequiredEnv = getRandomRequiredEnv;
// We generate an UUID per instance
const uuid = () => {
    if (!process.env.UUID)
        process.env.UUID = uuid_1.v4();
    return process.env.UUID;
};
exports.uuid = uuid;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.delay = delay;
/**
 * Return a value used for exponential backoff in milliseconds.
 * @example
 * exponentialBackOffMs(1,100,1000,2) === 100
 * exponentialBackOffMs(2,100,1000,2) === 200
 * exponentialBackOffMs(3,100,1000,2) === 400
 *
 * @param retryCount The amount of retries that have passed
 * @param interval The interval in ms
 * @param max The maximum back-off in ms
 * @param coefficient The base multiplier
 */
const exponentialBackOffMs = (retryCount = 1, interval = 100, max = 1000, coefficient = 2) => Math.min(max, interval * coefficient ** (retryCount - 1));
exports.exponentialBackOffMs = exponentialBackOffMs;
const getWithCoalescing = async ({ get, isInFlight, retries = 5, interval = () => 100, }) => {
    const _self = async (_retries) => {
        if (_retries === 0)
            return;
        const retryCount = retries - _retries + 1;
        const entry = await get(retryCount);
        if (entry)
            return entry;
        const inFlight = await isInFlight(retryCount);
        if (!inFlight)
            return;
        await exports.delay(interval(retryCount));
        return await _self(_retries - 1);
    };
    return await _self(retries);
};
exports.getWithCoalescing = getWithCoalescing;
const getEnvName = (name, prefix = '') => {
    const envName = prefix ? `${prefix}_${name}` : name;
    if (!isEnvNameValid(envName))
        throw Error(`Invalid environment var name: ${envName}. Only '/^[_a-z0-9]+$/i' is supported.`);
    return envName;
};
// Only case-insensitive alphanumeric and underscore (_) are allowed for env vars
const isEnvNameValid = (name) => /^[_a-z0-9]+$/i.test(name);
const getEnv = (name, prefix = '') => process.env[getEnvName(name, prefix)];
exports.getEnv = getEnv;
// Custom error for required env variable.
class RequiredEnvError extends Error {
    constructor(name) {
        super(`Please set the required env ${name}.`);
        this.name = RequiredEnvError.name;
    }
}
exports.RequiredEnvError = RequiredEnvError;
/**
 * Get variable from environments
 * @param name The name of environment variable
 * @throws {RequiredEnvError} Will throw an error if environment variable is not defined.
 * @returns {string}
 */
const getRequiredEnv = (name, prefix = '') => {
    const val = exports.getEnv(name, prefix);
    if (!val)
        throw new RequiredEnvError(getEnvName(name, prefix));
    return val;
};
exports.getRequiredEnv = getRequiredEnv;
/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        }
        else {
            collection.push(item);
        }
    });
    return map;
}
exports.groupBy = groupBy;
/**
 * Predicate used to find adapter by name
 *
 * @param name string adapter name
 */
const byName = (name) => (a) => a.NAME.toUpperCase() === name?.toUpperCase();
exports.byName = byName;
/**
 * Covert number to max number of decimals, trim trailing zeros
 *
 * @param num number to convert to fixed max number of decimals
 * @param decimals max number of decimals
 */
const toFixedMax = (num, decimals) => new decimal_js_1.Decimal(num)
    .toFixed(decimals)
    // remove trailing zeros
    .replace(/(\.\d*?[1-9])0+$/g, '$1')
    // remove decimal part if all zeros (or only decimal point)
    .replace(/\.0*$/g, '');
exports.toFixedMax = toFixedMax;
/** Common keys within adapter requests that should be ignored to generate a stable key*/
exports.excludableAdapterRequestProperties = [
    'id',
    'maxAge',
    'meta',
    'debug',
    'rateLimitMaxAge',
    'metricsMeta',
]
    .concat((process.env.CACHE_KEY_IGNORED_PROPS || '').split(',').filter((k) => k))
    .reduce((prev, next) => {
    prev[next] = true;
    return prev;
}, {});
/** Common keys within adapter requests that should be used to generate a stable key*/
exports.includableAdapterRequestProperties = ['data'].concat((process.env.CACHE_KEY_INCLUDED_PROPS || '').split(',').filter((k) => k));
/** Common keys within adapter requests that should be ignored within "data" to create a stable key*/
const excludableInternalAdapterRequestProperties = [
    'resultPath',
    'overrides',
    'tokenOverrides',
    'includes',
];
const getKeyData = (data) => lodash_1.omit(lodash_1.pick(data, exports.includableAdapterRequestProperties), excludableInternalAdapterRequestProperties.map((property) => `data.${property}`));
exports.getKeyData = getKeyData;
/**
 * Generates a key by hashing input data
 *
 * @param data Adapter request input data
 * @param hashOptions Additional configuration for the objectHash package
 * @param mode Which behavior to use:
 *    include (default) - hash only selected properties throwing out everything else
 *    exclude           - hash the entire data object after excluding certain properties
 *
 * @returns string
 */
const hash = (data, hashOptions, mode = 'include') => {
    return mode === 'include' || !data
        ? object_hash_1.default(exports.getKeyData(data), hashOptions)
        : object_hash_1.default(data, exports.getHashOpts());
};
exports.hash = hash;
const getHashOpts = () => ({
    algorithm: 'sha1',
    encoding: 'hex',
    unorderedSets: false,
    respectType: false,
    respectFunctionProperties: false,
    respectFunctionNames: false,
    excludeKeys: (props) => exports.excludableAdapterRequestProperties[props],
});
exports.getHashOpts = getHashOpts;
// Helper to identify if debug mode is running
const isDebug = () => {
    return exports.parseBool(process.env.DEBUG) || process.env.NODE_ENV === 'development';
};
exports.isDebug = isDebug;
// Helper to identify if debug log level is set
const isDebugLogLevel = () => {
    return process.env.LOG_LEVEL === 'debug';
};
exports.isDebugLogLevel = isDebugLogLevel;
/**
 * @description Calculates all possible permutations without repetition of a certain size.
 *
 * @param collection A collection of distinct values to calculate the permutations from.
 * @param n The number of values to combine.
 *
 * @returns Array of permutations
 */
const permutations = (collection, n) => {
    const array = lodash_1.values(collection);
    if (array.length < n)
        return [];
    const recur = (array, n) => {
        if (--n < 0)
            return [[]];
        const permutations = [];
        array.forEach((value, index, array) => {
            array = array.slice();
            array.splice(index, 1);
            recur(array, n).forEach((permutation) => {
                permutation.unshift(value);
                permutations.push(permutation);
            });
        });
        return permutations;
    };
    return recur(array, n);
};
/**
 * @description
 * Builds a permutation set from a list of options
 *
 * @param options The options to create a permutation from
 * @param delimiter (Optional) Joins the permutation results to a string
 *
 * @returns Array of permutations
 */
const permutator = (options, delimiter) => {
    const output = lodash_1.flatMap(options, (_, i, a) => permutations(a, i + 1));
    const join = (combos) => combos.map((p) => p.join(delimiter));
    return typeof delimiter === 'string' ? join(output) : output;
};
exports.permutator = permutator;
/**
 * @description
 * Check existing (non-undefined) value for its type.
 *
 * @url
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#real-world_usage
 *
 * @param value The value to type check
 * @param fullClass (Optional) Whether to use polyfill for checking null
 *
 * @returns String describing type of obj
 */
function deepType(value, fullClass) {
    // get toPrototypeString() of obj (handles all types)
    // Early JS environments return '[object Object]' for null, so it's best to directly check for it.
    if (fullClass) {
        return value === null ? '[object Null]' : Object.prototype.toString.call(value);
    }
    if (value == null) {
        return (value + '').toLowerCase();
    } // implicit toString() conversion
    const deepType = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    if (deepType === 'generatorfunction') {
        return 'function';
    }
    // Prevent overspecificity (for example, [object HTMLDivElement], etc).
    // Account for functionish Regexp (Android <=2.3), functionish <object> element (Chrome <=57, Firefox <=52), etc.
    // String.prototype.match is universally supported.
    return deepType.match(/^(array|bigint|date|error|function|generator|regexp|symbol)$/)
        ? deepType
        : typeof value === 'object' || typeof value === 'function'
            ? 'object'
            : typeof value;
}
exports.deepType = deepType;
exports.LEGACY_ENV_ADAPTER_URL = 'DATA_PROVIDER_URL';
exports.ENV_ADAPTER_URL = 'ADAPTER_URL';
const getURL = (prefix, required = false) => required
    ? exports.getRequiredURL(prefix)
    : exports.getEnv(exports.ENV_ADAPTER_URL, prefix) || exports.getEnv(exports.LEGACY_ENV_ADAPTER_URL, prefix);
exports.getURL = getURL;
const getRequiredURL = (prefix) => exports.getRequiredEnv(exports.ENV_ADAPTER_URL, prefix) || exports.getRequiredEnv(exports.LEGACY_ENV_ADAPTER_URL, prefix);
exports.getRequiredURL = getRequiredURL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsMkNBQW9DO0FBQ3BDLG1DQUFvRDtBQUNwRCxzRUFBb0M7QUFDcEMsK0JBQW1DO0FBRzVCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBVSxFQUFXLEVBQUUsQ0FDOUMsQ0FBQyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUE7QUFEdEQsUUFBQSxRQUFRLFlBQzhDO0FBRTVELE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBVSxFQUFXLEVBQUUsQ0FDN0MsQ0FBQyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUQ1QyxRQUFBLE9BQU8sV0FDcUM7QUFFbEQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFVLEVBQVcsRUFBRTtJQUMvQyxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sS0FBSyxDQUFBO0lBQ3hCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMzQyxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksSUFBSSxLQUFLLE1BQU0sQ0FBQTtBQUNqRSxDQUFDLENBQUE7QUFKWSxRQUFBLFNBQVMsYUFJckI7QUFFRCxpRkFBaUY7QUFDMUUsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQzlDLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMs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Qyx1QkFBZSxFQUFFLE1BQU0sQ0FBQyxJQUFJLHNCQUFjLENBQUMsOEJBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFEOUUsUUFBQSxjQUFjLGtCQUNnRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkYXB0ZXJJbXBsZW1lbnRhdGlvbiwgQWRhcHRlclJlcXVlc3QgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0IHsgRGVjaW1hbCB9IGZyb20gJ2RlY2ltYWwuanMnXG5pbXBvcnQgeyBmbGF0TWFwLCB2YWx1ZXMsIHBpY2ssIG9taXQgfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgb2JqZWN0SGFzaCBmcm9tICdvYmplY3QtaGFzaCdcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnXG5pbXBvcnQgeyBDYWNoZUVudHJ5IH0gZnJvbSAnLi9jYWNoZS90eXBlcydcblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKG86IHVua25vd24pOiBib29sZWFuID0+XG4gIG8gIT09IG51bGwgJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkobykgPT09IGZhbHNlXG5cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gKG86IHVua25vd24pOiBib29sZWFuID0+XG4gIG8gIT09IG51bGwgJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkobylcblxuZXhwb3J0IGNvbnN0IHBhcnNlQm9vbCA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBmYWxzZVxuICBjb25zdCBfdmFsID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG4gIHJldHVybiAoX3ZhbCA9PT0gJ3RydWUnIHx8IF92YWwgPT09ICdmYWxzZScpICYmIF92YWwgPT09ICd0cnVlJ1xufVxuXG4vLyBjb252ZXJ0IHN0cmluZyB2YWx1ZXMgaW50byBOdW1iZXJzIHdoZXJlIHBvc3NpYmxlIChmb3IgaW5jb21pbmcgcXVlcnkgc3RyaW5ncylcbmV4cG9ydCBjb25zdCB0b09iamVjdFdpdGhOdW1iZXJzID0gKG9iajogYW55KSA9PiB7XG4gIGNvbnN0IHRvTnVtYmVyID0gKHY6IGFueSkgPT4gKGlzTmFOKHYpID8gdiA6IE51bWJlcih2KSlcbiAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhvYmopLm1hcCgoW2ssIHZdKSA9PiBbaywgdG9OdW1iZXIodildKSlcbn1cblxuLy8gcGljayBhIHJhbmRvbSBzdHJpbmcgZnJvbSBlbnYgdmFyIGFmdGVyIHNwbGl0dGluZyB3aXRoIHRoZSBkZWxpbWl0ZXIgKFwiYSZiJmNcIiBcIiZcIiAtPiBjaG9pY2UoW1wiYVwiLFwiYlwiLFwiY1wiXSkpXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tRW52ID0gKG5hbWU6IHN0cmluZywgZGVsaW1pdGVyID0gJywnLCBwcmVmaXggPSAnJyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHZhbCA9IGdldEVudihuYW1lLCBwcmVmaXgpXG4gIGlmICghdmFsKSByZXR1cm4gdmFsXG4gIGNvbnN0IGl0ZW1zID0gdmFsLnNwbGl0KGRlbGltaXRlcilcbiAgcmV0dXJuIGl0ZW1zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zLmxlbmd0aCldXG59XG5cbi8vIHBpY2sgYSByYW5kb20gc3RyaW5nIGZyb20gZW52IHZhciBhZnRlciBzcGxpdHRpbmcgd2l0aCB0aGUgZGVsaW1pdGVyIChcImEmYiZjXCIgXCImXCIgLT4gY2hvaWNlKFtcImFcIixcImJcIixcImNcIl0pKVxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbVJlcXVpcmVkRW52ID0gKFxuICBuYW1lOiBzdHJpbmcsXG4gIGRlbGltaXRlciA9ICcsJyxcbiAgcHJlZml4ID0gJycsXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCB2YWwgPSBnZXRSZXF1aXJlZEVudihuYW1lLCBwcmVmaXgpXG4gIGNvbnN0IGl0ZW1zID0gdmFsLnNwbGl0KGRlbGltaXRlcilcbiAgcmV0dXJuIGl0ZW1zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zLmxlbmd0aCldXG59XG5cbi8vIFdlIGdlbmVyYXRlIGFuIFVVSUQgcGVyIGluc3RhbmNlXG5leHBvcnQgY29uc3QgdXVpZCA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXByb2Nlc3MuZW52LlVVSUQpIHByb2Nlc3MuZW52LlVVSUQgPSB1dWlkdjQoKVxuICByZXR1cm4gcHJvY2Vzcy5lbnYuVVVJRFxufVxuXG5leHBvcnQgY29uc3QgZGVsYXkgPSAobXM6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiA9PlxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpXG5cbi8qKlxuICogUmV0dXJuIGEgdmFsdWUgdXNlZCBmb3IgZXhwb25lbnRpYWwgYmFja29mZiBpbiBtaWxsaXNlY29uZHMuXG4gKiBAZXhhbXBsZVxuICogZXhwb25lbnRpYWxCYWNrT2ZmTXMoMSwxMDAsMTAwMCwyKSA9PT0gMTAwXG4gKiBleHBvbmVudGlhbEJhY2tPZmZNcygyLDEwMCwxMDAwLDIpID09PSAyMDBcbiAqIGV4cG9uZW50aWFsQmFja09mZk1zKDMsMTAwLDEwMDAsMikgPT09IDQwMFxuICpcbiAqIEBwYXJhbSByZXRyeUNvdW50IFRoZSBhbW91bnQgb2YgcmV0cmllcyB0aGF0IGhhdmUgcGFzc2VkXG4gKiBAcGFyYW0gaW50ZXJ2YWwgVGhlIGludGVydmFsIGluIG1zXG4gKiBAcGFyYW0gbWF4IFRoZSBtYXhpbXVtIGJhY2stb2ZmIGluIG1zXG4gKiBAcGFyYW0gY29lZmZpY2llbnQgVGhlIGJhc2UgbXVsdGlwbGllclxuICovXG5leHBvcnQgY29uc3QgZXhwb25lbnRpYWxCYWNrT2ZmTXMgPSAocmV0cnlDb3VudCA9IDEsIGludGVydmFsID0gMTAwLCBtYXggPSAxMDAwLCBjb2VmZmljaWVudCA9IDIpID0+XG4gIE1hdGgubWluKG1heCwgaW50ZXJ2YWwgKiBjb2VmZmljaWVudCAqKiAocmV0cnlDb3VudCAtIDEpKVxuXG5leHBvcnQgY29uc3QgZ2V0V2l0aENvYWxlc2NpbmcgPSBhc3luYyAoe1xuICBnZXQsXG4gIGlzSW5GbGlnaHQsXG4gIHJldHJpZXMgPSA1LFxuICBpbnRlcnZhbCA9ICgpID0+IDEwMCxcbn06IHtcbiAgZ2V0OiAocmV0cnlDb3VudDogbnVtYmVyKSA9PiBQcm9taXNlPENhY2hlRW50cnkgfCB1bmRlZmluZWQ+XG4gIGlzSW5GbGlnaHQ6IChyZXRyeUNvdW50OiBudW1iZXIpID0+IFByb21pc2U8Ym9vbGVhbj5cbiAgcmV0cmllczogbnVtYmVyXG4gIGludGVydmFsOiAocmV0cnlDb3VudDogbnVtYmVyKSA9PiBudW1iZXJcbn0pID0+IHtcbiAgY29uc3QgX3NlbGYgPSBhc3luYyAoX3JldHJpZXM6IG51bWJlcik6IFByb21pc2U8dW5kZWZpbmVkIHwgQ2FjaGVFbnRyeT4gPT4ge1xuICAgIGlmIChfcmV0cmllcyA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgcmV0cnlDb3VudCA9IHJldHJpZXMgLSBfcmV0cmllcyArIDFcbiAgICBjb25zdCBlbnRyeSA9IGF3YWl0IGdldChyZXRyeUNvdW50KVxuICAgIGlmIChlbnRyeSkgcmV0dXJuIGVudHJ5XG4gICAgY29uc3QgaW5GbGlnaHQgPSBhd2FpdCBpc0luRmxpZ2h0KHJldHJ5Q291bnQpXG4gICAgaWYgKCFpbkZsaWdodCkgcmV0dXJuXG4gICAgYXdhaXQgZGVsYXkoaW50ZXJ2YWwocmV0cnlDb3VudCkpXG4gICAgcmV0dXJuIGF3YWl0IF9zZWxmKF9yZXRyaWVzIC0gMSlcbiAgfVxuICByZXR1cm4gYXdhaXQgX3NlbGYocmV0cmllcylcbn1cblxuY29uc3QgZ2V0RW52TmFtZSA9IChuYW1lOiBzdHJpbmcsIHByZWZpeCA9ICcnKSA9PiB7XG4gIGNvbnN0IGVudk5hbWUgPSBwcmVmaXggPyBgJHtwcmVmaXh9XyR7bmFtZX1gIDogbmFtZVxuICBpZiAoIWlzRW52TmFtZVZhbGlkKGVudk5hbWUpKVxuICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGVudmlyb25tZW50IHZhciBuYW1lOiAke2Vudk5hbWV9LiBPbmx5ICcvXltfYS16MC05XSskL2knIGlzIHN1cHBvcnRlZC5gKVxuICByZXR1cm4gZW52TmFtZVxufVxuXG4vLyBPbmx5IGNhc2UtaW5zZW5zaXRpdmUgYWxwaGFudW1lcmljIGFuZCB1bmRlcnNjb3JlIChfKSBhcmUgYWxsb3dlZCBmb3IgZW52IHZhcnNcbmNvbnN0IGlzRW52TmFtZVZhbGlkID0gKG5hbWU6IHN0cmluZykgPT4gL15bX2EtejAtOV0rJC9pLnRlc3QobmFtZSlcblxuZXhwb3J0IGNvbnN0IGdldEVudiA9IChuYW1lOiBzdHJpbmcsIHByZWZpeCA9ICcnKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+XG4gIHByb2Nlc3MuZW52W2dldEVudk5hbWUobmFtZSwgcHJlZml4KV1cblxuLy8gQ3VzdG9tIGVycm9yIGZvciByZXF1aXJlZCBlbnYgdmFyaWFibGUuXG5leHBvcnQgY2xhc3MgUmVxdWlyZWRFbnZFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoYFBsZWFzZSBzZXQgdGhlIHJlcXVpcmVkIGVudiAke25hbWV9LmApXG4gICAgdGhpcy5uYW1lID0gUmVxdWlyZWRFbnZFcnJvci5uYW1lXG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgdmFyaWFibGUgZnJvbSBlbnZpcm9ubWVudHNcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIGVudmlyb25tZW50IHZhcmlhYmxlXG4gKiBAdGhyb3dzIHtSZXF1aXJlZEVudkVycm9yfSBXaWxsIHRocm93IGFuIGVycm9yIGlmIGVudmlyb25tZW50IHZhcmlhYmxlIGlzIG5vdCBkZWZpbmVkLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJlcXVpcmVkRW52ID0gKG5hbWU6IHN0cmluZywgcHJlZml4ID0gJycpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB2YWwgPSBnZXRFbnYobmFtZSwgcHJlZml4KVxuICBpZiAoIXZhbCkgdGhyb3cgbmV3IFJlcXVpcmVkRW52RXJyb3IoZ2V0RW52TmFtZShuYW1lLCBwcmVmaXgpKVxuICByZXR1cm4gdmFsXG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBUYWtlcyBhbiBBcnJheTxWPiwgYW5kIGEgZ3JvdXBpbmcgZnVuY3Rpb24sXG4gKiBhbmQgcmV0dXJucyBhIE1hcCBvZiB0aGUgYXJyYXkgZ3JvdXBlZCBieSB0aGUgZ3JvdXBpbmcgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIGxpc3QgQW4gYXJyYXkgb2YgdHlwZSBWLlxuICogQHBhcmFtIGtleUdldHRlciBBIEZ1bmN0aW9uIHRoYXQgdGFrZXMgdGhlIHRoZSBBcnJheSB0eXBlIFYgYXMgYW4gaW5wdXQsIGFuZCByZXR1cm5zIGEgdmFsdWUgb2YgdHlwZSBLLlxuICogICAgICAgICAgICAgICAgICBLIGlzIGdlbmVyYWxseSBpbnRlbmRlZCB0byBiZSBhIHByb3BlcnR5IGtleSBvZiBWLlxuICpcbiAqIEByZXR1cm5zIE1hcCBvZiB0aGUgYXJyYXkgZ3JvdXBlZCBieSB0aGUgZ3JvdXBpbmcgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5PEssIFY+KGxpc3Q6IEFycmF5PFY+LCBrZXlHZXR0ZXI6IChpbnB1dDogVikgPT4gSyk6IE1hcDxLLCBBcnJheTxWPj4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPEssIEFycmF5PFY+PigpXG4gIGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGtleSA9IGtleUdldHRlcihpdGVtKVxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtYXAuZ2V0KGtleSlcbiAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgIG1hcC5zZXQoa2V5LCBbaXRlbV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbGxlY3Rpb24ucHVzaChpdGVtKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG1hcFxufVxuXG4vKipcbiAqIFByZWRpY2F0ZSB1c2VkIHRvIGZpbmQgYWRhcHRlciBieSBuYW1lXG4gKlxuICogQHBhcmFtIG5hbWUgc3RyaW5nIGFkYXB0ZXIgbmFtZVxuICovXG5leHBvcnQgY29uc3QgYnlOYW1lID1cbiAgKG5hbWU/OiBzdHJpbmcpID0+XG4gIChhOiBBZGFwdGVySW1wbGVtZW50YXRpb24pOiBib29sZWFuID0+XG4gICAgYS5OQU1FLnRvVXBwZXJDYXNlKCkgPT09IG5hbWU/LnRvVXBwZXJDYXNlKClcblxuLyoqXG4gKiBDb3ZlcnQgbnVtYmVyIHRvIG1heCBudW1iZXIgb2YgZGVjaW1hbHMsIHRyaW0gdHJhaWxpbmcgemVyb3NcbiAqXG4gKiBAcGFyYW0gbnVtIG51bWJlciB0byBjb252ZXJ0IHRvIGZpeGVkIG1heCBudW1iZXIgb2YgZGVjaW1hbHNcbiAqIEBwYXJhbSBkZWNpbWFscyBtYXggbnVtYmVyIG9mIGRlY2ltYWxzXG4gKi9cbmV4cG9ydCBjb25zdCB0b0ZpeGVkTWF4ID0gKG51bTogbnVtYmVyIHwgc3RyaW5nIHwgRGVjaW1hbCwgZGVjaW1hbHM6IG51bWJlcik6IHN0cmluZyA9PlxuICBuZXcgRGVjaW1hbChudW0pXG4gICAgLnRvRml4ZWQoZGVjaW1hbHMpXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHplcm9zXG4gICAgLnJlcGxhY2UoLyhcXC5cXGQqP1sxLTldKTArJC9nLCAnJDEnKVxuICAgIC8vIHJlbW92ZSBkZWNpbWFsIHBhcnQgaWYgYWxsIHplcm9zIChvciBvbmx5IGRlY2ltYWwgcG9pbnQpXG4gICAgLnJlcGxhY2UoL1xcLjAqJC9nLCAnJylcblxuLyoqIENvbW1vbiBrZXlzIHdpdGhpbiBhZGFwdGVyIHJlcXVlc3RzIHRoYXQgc2hvdWxkIGJlIGlnbm9yZWQgdG8gZ2VuZXJhdGUgYSBzdGFibGUga2V5Ki9cbmV4cG9ydCBjb25zdCBleGNsdWRhYmxlQWRhcHRlclJlcXVlc3RQcm9wZXJ0aWVzOiBSZWNvcmQ8c3RyaW5nLCB0cnVlPiA9IFtcbiAgJ2lkJyxcbiAgJ21heEFnZScsXG4gICdtZXRhJyxcbiAgJ2RlYnVnJyxcbiAgJ3JhdGVMaW1pdE1heEFnZScsXG4gICdtZXRyaWNzTWV0YScsXG5dXG4gIC5jb25jYXQoKHByb2Nlc3MuZW52LkNBQ0hFX0tFWV9JR05PUkVEX1BST1BTIHx8ICcnKS5zcGxpdCgnLCcpLmZpbHRlcigoaykgPT4gaykpXG4gIC5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHtcbiAgICBwcmV2W25leHRdID0gdHJ1ZVxuICAgIHJldHVybiBwcmV2XG4gIH0sIHt9IGFzIFJlY29yZDxzdHJpbmcsIHRydWU+KVxuXG4vKiogQ29tbW9uIGtleXMgd2l0aGluIGFkYXB0ZXIgcmVxdWVzdHMgdGhhdCBzaG91bGQgYmUgdXNlZCB0byBnZW5lcmF0ZSBhIHN0YWJsZSBrZXkqL1xuZXhwb3J0IGNvbnN0IGluY2x1ZGFibGVBZGFwdGVyUmVxdWVzdFByb3BlcnRpZXM6IHN0cmluZ1tdID0gWydkYXRhJ10uY29uY2F0KFxuICAocHJvY2Vzcy5lbnYuQ0FDSEVfS0VZX0lOQ0xVREVEX1BST1BTIHx8ICcnKS5zcGxpdCgnLCcpLmZpbHRlcigoaykgPT4gayksXG4pXG5cbi8qKiBDb21tb24ga2V5cyB3aXRoaW4gYWRhcHRlciByZXF1ZXN0cyB0aGF0IHNob3VsZCBiZSBpZ25vcmVkIHdpdGhpbiBcImRhdGFcIiB0byBjcmVhdGUgYSBzdGFibGUga2V5Ki9cbmNvbnN0IGV4Y2x1ZGFibGVJbnRlcm5hbEFkYXB0ZXJSZXF1ZXN0UHJvcGVydGllcyA9IFtcbiAgJ3Jlc3VsdFBhdGgnLFxuICAnb3ZlcnJpZGVzJyxcbiAgJ3Rva2VuT3ZlcnJpZGVzJyxcbiAgJ2luY2x1ZGVzJyxcbl1cblxuZXhwb3J0IGNvbnN0IGdldEtleURhdGEgPSAoZGF0YTogQWRhcHRlclJlcXVlc3QpID0+XG4gIG9taXQoXG4gICAgcGljayhkYXRhLCBpbmNsdWRhYmxlQWRhcHRlclJlcXVlc3RQcm9wZXJ0aWVzKSxcbiAgICBleGNsdWRhYmxlSW50ZXJuYWxBZGFwdGVyUmVxdWVzdFByb3BlcnRpZXMubWFwKChwcm9wZXJ0eSkgPT4gYGRhdGEuJHtwcm9wZXJ0eX1gKSxcbiAgKVxuXG5leHBvcnQgdHlwZSBIYXNoTW9kZSA9ICdpbmNsdWRlJyB8ICdleGNsdWRlJ1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSBrZXkgYnkgaGFzaGluZyBpbnB1dCBkYXRhXG4gKlxuICogQHBhcmFtIGRhdGEgQWRhcHRlciByZXF1ZXN0IGlucHV0IGRhdGFcbiAqIEBwYXJhbSBoYXNoT3B0aW9ucyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBvYmplY3RIYXNoIHBhY2thZ2VcbiAqIEBwYXJhbSBtb2RlIFdoaWNoIGJlaGF2aW9yIHRvIHVzZTpcbiAqICAgIGluY2x1ZGUgKGRlZmF1bHQpIC0gaGFzaCBvbmx5IHNlbGVjdGVkIHByb3BlcnRpZXMgdGhyb3dpbmcgb3V0IGV2ZXJ5dGhpbmcgZWxzZVxuICogICAgZXhjbHVkZSAgICAgICAgICAgLSBoYXNoIHRoZSBlbnRpcmUgZGF0YSBvYmplY3QgYWZ0ZXIgZXhjbHVkaW5nIGNlcnRhaW4gcHJvcGVydGllc1xuICpcbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5leHBvcnQgY29uc3QgaGFzaCA9IChcbiAgZGF0YTogQWRhcHRlclJlcXVlc3QsXG4gIGhhc2hPcHRpb25zOiBSZXF1aXJlZDxQYXJhbWV0ZXJzPHR5cGVvZiBvYmplY3RIYXNoPj5bJzEnXSxcbiAgbW9kZTogSGFzaE1vZGUgPSAnaW5jbHVkZScsXG4pOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gbW9kZSA9PT0gJ2luY2x1ZGUnIHx8ICFkYXRhXG4gICAgPyBvYmplY3RIYXNoKGdldEtleURhdGEoZGF0YSksIGhhc2hPcHRpb25zKVxuICAgIDogb2JqZWN0SGFzaChkYXRhLCBnZXRIYXNoT3B0cygpKVxufVxuXG5leHBvcnQgY29uc3QgZ2V0SGFzaE9wdHMgPSAoKTogUmVxdWlyZWQ8UGFyYW1ldGVyczx0eXBlb2Ygb2JqZWN0SGFzaD4+WycxJ10gPT4gKHtcbiAgYWxnb3JpdGhtOiAnc2hhMScsXG4gIGVuY29kaW5nOiAnaGV4JyxcbiAgdW5vcmRlcmVkU2V0czogZmFsc2UsXG4gIHJlc3BlY3RUeXBlOiBmYWxzZSxcbiAgcmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllczogZmFsc2UsXG4gIHJlc3BlY3RGdW5jdGlvbk5hbWVzOiBmYWxzZSxcbiAgZXhjbHVkZUtleXM6IChwcm9wczogc3RyaW5nKSA9PiBleGNsdWRhYmxlQWRhcHRlclJlcXVlc3RQcm9wZXJ0aWVzW3Byb3BzXSxcbn0pXG5cbi8vIEhlbHBlciB0byBpZGVudGlmeSBpZiBkZWJ1ZyBtb2RlIGlzIHJ1bm5pbmdcbmV4cG9ydCBjb25zdCBpc0RlYnVnID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gcGFyc2VCb29sKHByb2Nlc3MuZW52LkRFQlVHKSB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50J1xufVxuXG4vLyBIZWxwZXIgdG8gaWRlbnRpZnkgaWYgZGVidWcgbG9nIGxldmVsIGlzIHNldFxuZXhwb3J0IGNvbnN0IGlzRGVidWdMb2dMZXZlbCA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIHByb2Nlc3MuZW52LkxPR19MRVZFTCA9PT0gJ2RlYnVnJ1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBDYWxjdWxhdGVzIGFsbCBwb3NzaWJsZSBwZXJtdXRhdGlvbnMgd2l0aG91dCByZXBldGl0aW9uIG9mIGEgY2VydGFpbiBzaXplLlxuICpcbiAqIEBwYXJhbSBjb2xsZWN0aW9uIEEgY29sbGVjdGlvbiBvZiBkaXN0aW5jdCB2YWx1ZXMgdG8gY2FsY3VsYXRlIHRoZSBwZXJtdXRhdGlvbnMgZnJvbS5cbiAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgdmFsdWVzIHRvIGNvbWJpbmUuXG4gKlxuICogQHJldHVybnMgQXJyYXkgb2YgcGVybXV0YXRpb25zXG4gKi9cbmNvbnN0IHBlcm11dGF0aW9ucyA9IChjb2xsZWN0aW9uOiBhbnksIG46IGFueSkgPT4ge1xuICBjb25zdCBhcnJheSA9IHZhbHVlcyhjb2xsZWN0aW9uKVxuICBpZiAoYXJyYXkubGVuZ3RoIDwgbikgcmV0dXJuIFtdXG5cbiAgY29uc3QgcmVjdXIgPSAoYXJyYXk6IGFueSwgbjogYW55KSA9PiB7XG4gICAgaWYgKC0tbiA8IDApIHJldHVybiBbW11dXG5cbiAgICBjb25zdCBwZXJtdXRhdGlvbnM6IGFueVtdID0gW11cbiAgICBhcnJheS5mb3JFYWNoKCh2YWx1ZTogYW55LCBpbmRleDogYW55LCBhcnJheTogYW55KSA9PiB7XG4gICAgICBhcnJheSA9IGFycmF5LnNsaWNlKClcbiAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSlcbiAgICAgIHJlY3VyKGFycmF5LCBuKS5mb3JFYWNoKChwZXJtdXRhdGlvbikgPT4ge1xuICAgICAgICBwZXJtdXRhdGlvbi51bnNoaWZ0KHZhbHVlKVxuICAgICAgICBwZXJtdXRhdGlvbnMucHVzaChwZXJtdXRhdGlvbilcbiAgICAgIH0pXG4gICAgfSlcbiAgICByZXR1cm4gcGVybXV0YXRpb25zXG4gIH1cbiAgcmV0dXJuIHJlY3VyKGFycmF5LCBuKVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQnVpbGRzIGEgcGVybXV0YXRpb24gc2V0IGZyb20gYSBsaXN0IG9mIG9wdGlvbnNcbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyB0byBjcmVhdGUgYSBwZXJtdXRhdGlvbiBmcm9tXG4gKiBAcGFyYW0gZGVsaW1pdGVyIChPcHRpb25hbCkgSm9pbnMgdGhlIHBlcm11dGF0aW9uIHJlc3VsdHMgdG8gYSBzdHJpbmdcbiAqXG4gKiBAcmV0dXJucyBBcnJheSBvZiBwZXJtdXRhdGlvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IHBlcm11dGF0b3IgPSAob3B0aW9uczogc3RyaW5nW10sIGRlbGltaXRlcj86IHN0cmluZyk6IHN0cmluZ1tdIHwgc3RyaW5nW11bXSA9PiB7XG4gIGNvbnN0IG91dHB1dDogc3RyaW5nW11bXSA9IGZsYXRNYXAob3B0aW9ucywgKF86IGFueSwgaTogYW55LCBhOiBhbnkpID0+IHBlcm11dGF0aW9ucyhhLCBpICsgMSkpXG4gIGNvbnN0IGpvaW4gPSAoY29tYm9zOiBzdHJpbmdbXVtdKSA9PiBjb21ib3MubWFwKChwKSA9PiBwLmpvaW4oZGVsaW1pdGVyKSlcbiAgcmV0dXJuIHR5cGVvZiBkZWxpbWl0ZXIgPT09ICdzdHJpbmcnID8gam9pbihvdXRwdXQpIDogb3V0cHV0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDaGVjayBleGlzdGluZyAobm9uLXVuZGVmaW5lZCkgdmFsdWUgZm9yIGl0cyB0eXBlLlxuICpcbiAqIEB1cmxcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL09wZXJhdG9ycy90eXBlb2YjcmVhbC13b3JsZF91c2FnZVxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdHlwZSBjaGVja1xuICogQHBhcmFtIGZ1bGxDbGFzcyAoT3B0aW9uYWwpIFdoZXRoZXIgdG8gdXNlIHBvbHlmaWxsIGZvciBjaGVja2luZyBudWxsXG4gKlxuICogQHJldHVybnMgU3RyaW5nIGRlc2NyaWJpbmcgdHlwZSBvZiBvYmpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBUeXBlKHZhbHVlOiB1bmtub3duLCBmdWxsQ2xhc3M/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgLy8gZ2V0IHRvUHJvdG90eXBlU3RyaW5nKCkgb2Ygb2JqIChoYW5kbGVzIGFsbCB0eXBlcylcbiAgLy8gRWFybHkgSlMgZW52aXJvbm1lbnRzIHJldHVybiAnW29iamVjdCBPYmplY3RdJyBmb3IgbnVsbCwgc28gaXQncyBiZXN0IHRvIGRpcmVjdGx5IGNoZWNrIGZvciBpdC5cbiAgaWYgKGZ1bGxDbGFzcykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/ICdbb2JqZWN0IE51bGxdJyA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSlcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiAodmFsdWUgKyAnJykudG9Mb3dlckNhc2UoKVxuICB9IC8vIGltcGxpY2l0IHRvU3RyaW5nKCkgY29udmVyc2lvblxuXG4gIGNvbnN0IGRlZXBUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKS5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKVxuICBpZiAoZGVlcFR5cGUgPT09ICdnZW5lcmF0b3JmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gJ2Z1bmN0aW9uJ1xuICB9XG5cbiAgLy8gUHJldmVudCBvdmVyc3BlY2lmaWNpdHkgKGZvciBleGFtcGxlLCBbb2JqZWN0IEhUTUxEaXZFbGVtZW50XSwgZXRjKS5cbiAgLy8gQWNjb3VudCBmb3IgZnVuY3Rpb25pc2ggUmVnZXhwIChBbmRyb2lkIDw9Mi4zKSwgZnVuY3Rpb25pc2ggPG9iamVjdD4gZWxlbWVudCAoQ2hyb21lIDw9NTcsIEZpcmVmb3ggPD01MiksIGV0Yy5cbiAgLy8gU3RyaW5nLnByb3RvdHlwZS5tYXRjaCBpcyB1bml2ZXJzYWxseSBzdXBwb3J0ZWQuXG5cbiAgcmV0dXJuIGRlZXBUeXBlLm1hdGNoKC9eKGFycmF5fGJpZ2ludHxkYXRlfGVycm9yfGZ1bmN0aW9ufGdlbmVyYXRvcnxyZWdleHB8c3ltYm9sKSQvKVxuICAgID8gZGVlcFR5cGVcbiAgICA6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nXG4gICAgPyAnb2JqZWN0J1xuICAgIDogdHlwZW9mIHZhbHVlXG59XG5cbmV4cG9ydCBjb25zdCBMRUdBQ1lfRU5WX0FEQVBURVJfVVJMID0gJ0RBVEFfUFJPVklERVJfVVJMJ1xuZXhwb3J0IGNvbnN0IEVOVl9BREFQVEVSX1VSTCA9ICdBREFQVEVSX1VSTCdcblxuZXhwb3J0IGNvbnN0IGdldFVSTCA9IChwcmVmaXg6IHN0cmluZywgcmVxdWlyZWQgPSBmYWxzZSk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PlxuICByZXF1aXJlZFxuICAgID8gZ2V0UmVxdWlyZWRVUkwocHJlZml4KVxuICAgIDogZ2V0RW52KEVOVl9BREFQVEVSX1VSTCwgcHJlZml4KSB8fCBnZXRFbnYoTEVHQUNZX0VOVl9BREFQVEVSX1VSTCwgcHJlZml4KVxuXG5leHBvcnQgY29uc3QgZ2V0UmVxdWlyZWRVUkwgPSAocHJlZml4OiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgZ2V0UmVxdWlyZWRFbnYoRU5WX0FEQVBURVJfVVJMLCBwcmVmaXgpIHx8IGdldFJlcXVpcmVkRW52KExFR0FDWV9FTlZfQURBUFRFUl9VUkwsIHByZWZpeClcbiJdfQ==