"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeProperties = exports.namespaceProperty = exports.flattenAllSchemas = exports.writeAllFlattenedSchemas = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs_1 = require("fs");
const Parser = tslib_1.__importStar(require("json-schema-ref-parser"));
const path = tslib_1.__importStar(require("path"));
const snake_case_1 = require("snake-case");
const workspace_1 = require("../workspace");
const config_1 = require("./config");
async function writeAllFlattenedSchemas() {
    const data = await flattenAllSchemas();
    data.forEach(({ location, schema }) => {
        fs_1.writeFileSync(location, JSON.stringify(schema));
    });
}
exports.writeAllFlattenedSchemas = writeAllFlattenedSchemas;
/**
 * Get a Map of all JSON schemas belonging to EA's and flatten them by doing
 * the following:
 *
 * - Dereference all refs
 * - Merge "allOf" properties into a top level object
 * - Resolve key collisions if configured to do so
 */
async function flattenAllSchemas() {
    const resolve = createChainlinkLabsResolver();
    const workspacePackages = workspace_1.getWorkspacePackages(['core']);
    const bootstrapPackage = workspacePackages.find((p) => p.descopedName === 'ea-bootstrap');
    if (!bootstrapPackage) {
        throw Error('Could not find bootstrap package to generate collisionIgnoreMap');
    }
    const pkgs = await Promise.all(workspacePackages
        .filter((p) => p.type !== 'core')
        .map(async (p) => {
        const { environment, location } = p;
        if (!environment) {
            return;
        }
        const schema = await Parser.default.dereference(environment.$id, {
            resolve,
        });
        const collisionIgnoreMap = config_1.getCollisionIgnoreMapFrom(bootstrapPackage);
        try {
            return {
                schema: flattenAllOf(schema, p.type, collisionIgnoreMap, config_1.forceRenameMap, config_1.collisionPackageTypeMap),
                location,
            };
        }
        catch (e) {
            throw Error(`Errors incurred while processing package:${location}: ${e.message}`);
        }
    }));
    return pkgs.filter((obj) => !!obj);
}
exports.flattenAllSchemas = flattenAllSchemas;
/**
 * Create a "json-schema-ref-parser" compatible resolver that matches URLs for https://external-adapters.chainlinklabs.com and returns internal schemas
 *
 * @returns Resolver for chainlink labs schemas
 */
function createChainlinkLabsResolver() {
    const schemas = workspace_1.getWorkspacePackages(['core'])
        .map((p) => p.environment)
        .filter((schema) => !!schema);
    const schemasById = schemas.reduce((prev, next) => {
        const id = next['$id'];
        if (!id) {
            console.warn(`$id not found for ${JSON.stringify(next, null, 1)}`);
            return prev;
        }
        prev[id] = next;
        return prev;
    }, {});
    const resolver = {
        order: 1,
        canRead: /^https:\/\/external-adapters.chainlinklabs.com/i,
        read: (file, callback) => {
            if (!callback) {
                console.error('[resolver] No callback found');
                return;
            }
            const data = schemasById[file.url];
            if (!data) {
                return callback(Error(`Could not find file for ${file.url}`), null);
            }
            callback(null, JSON.stringify(data));
        },
    };
    return { chainlinkLabsResolver: resolver };
}
/**
 * Recursively merge all subschema properties within the "allOf" union in a json-schema document into a top level properties object.
 *
 * @param document The document to flatten
 * @param packageType The type of the package that contains the passed document
 * @param collisionIgnoreMap When a key collision is found, if the key is contained within this allowMap then it is ignored
 * @param forceRenameMap When a key matching this Map is found, it is treated as a collision and renamed via namespacing
 * @param collisionPackageTypeMap If the package type is contained within this Map, then any collisions will also apply to the original key property
 * @returns The flattened document
 */
function flattenAllOf(document, packageType, collisionIgnoreMap, forceRenameMap, collisionPackageTypeMap) {
    function traverseAndMergeProperties(document, mergedProperties) {
        if (!document.properties) {
            return mergedProperties;
        }
        const newProperties = mergeProperties(packageType, mergedProperties, document.properties, collisionIgnoreMap, forceRenameMap, collisionPackageTypeMap, document.$id);
        if (!document.allOf) {
            return newProperties;
        }
        return document.allOf.reduce((prev, subschema) => {
            if (!subschema.properties) {
                return prev;
            }
            return traverseAndMergeProperties(subschema, prev);
        }, newProperties);
    }
    return traverseAndMergeProperties(document, {});
}
/**
 * Namespace a property to reduce chances of a key collision
 *
 * @param collisionNamespace A namespace like "https://external-adapters.chainlinklabs.com/schemas/genesis-volatility-adapter.json"
 * @param key A key like "API_KEY"
 *
 * @returns A key like "GENESIS_VOLATILITY_API_KEY"
 */
function namespaceProperty(collisionNamespace, key) {
    const numberMap = {
        1: 'ONE',
        2: 'TWO',
        3: 'THREE',
        4: 'FOUR',
        5: 'FIVE',
        6: 'SIX',
        7: 'SEVEN',
        8: 'EIGHT',
        9: 'NINE',
        0: 'ZERO',
    };
    const { name } = path.parse(collisionNamespace);
    const snakedName = snake_case_1.snakeCase(name).toUpperCase();
    // handle edge case when the namespace will start with a number
    // which is an invalid environment variable
    const numberCollision = numberMap[Number(snakedName[0])];
    const resnakedName = numberCollision ? `${numberCollision}${snakedName.slice(1)}` : snakedName;
    return `${resnakedName}_${key}`;
}
exports.namespaceProperty = namespaceProperty;
/**
 * Merge the properties of two objects.
 *
 * Assumptions:
 * - Base properties are never modified
 * - The first invocation of this function has the base property be an empty object
 *
 * @param basePackageType The package type that the base properties originated from
 * @param base The base properties
 * @param additional The additional properties to merge into the base
 * @param collisionIgnoreMap A record of properties that will be ignored if a collision is found, ex. no collision namespace will be used. This has precedence over all other collision / force rename options
 * @param forceRenameMap A Map of keys that will be treated as a collision even if one does not exist
 * @param collisionPackageTypeMap If the package type is contained within this Map, then any collisions will also apply to the original key property
 * @param collisionNamespace The namespace to prefix additional properties by if a collision is found, and the collision is not in the collision AllowMap
 */
function mergeProperties(basePackageType, base, additional, collisionIgnoreMap, forceRenameMap, collisionPackageTypeMap, collisionNamespace) {
    // works for plain ol json with no circular refs
    const baseCopy = JSON.parse(JSON.stringify(base));
    const originalKeyMap = Object.values(base).reduce((prev, next) => {
        if (!next.originalKey) {
            return prev;
        }
        prev[next.originalKey] = true;
        return prev;
    }, {});
    const originalKeyErrors = [];
    for (const [k, v] of Object.entries(additional)) {
        // if we have a key collision, or we're forced to rename
        if (baseCopy[k] || forceRenameMap[k]) {
            if (collisionIgnoreMap[k]) {
                continue;
            }
            const namespacedKey = namespaceProperty(collisionNamespace, k);
            if (baseCopy[namespacedKey]) {
                // this should never happen
                throw Error(`Key collision detected on namespaced property ${namespacedKey}`);
            }
            // store the pre-namedspaced key as a property, unless its contained in our package map
            const originalKey = collisionPackageTypeMap[basePackageType] ? namespacedKey : k;
            baseCopy[namespacedKey] = {
                ...v,
                originalKey,
            };
            if (originalKeyMap[originalKey]) {
                originalKeyErrors.push(`Key collision detected for ${originalKey}`);
            }
            originalKeyMap[originalKey] = true;
        }
        else {
            baseCopy[k] = { ...v, originalKey: k };
            if (originalKeyMap[k]) {
                originalKeyErrors.push(`Key collision detected for ${k}`);
            }
            originalKeyMap[k] = true;
        }
    }
    if (originalKeyErrors.length) {
        throw Error(`\n${originalKeyErrors.join('\n')}`);
    }
    return baseCopy;
}
exports.mergeProperties = mergeProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjaGVtYS1mbGF0dGVuL2xpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsdURBQXVEO0FBQ3ZELDJCQUFrQztBQUNsQyx1RUFBZ0Q7QUFDaEQsbURBQTRCO0FBQzVCLDJDQUFzQztBQUN0Qyw0Q0FBbUQ7QUFDbkQscUNBQTZGO0FBRXRGLEtBQUssVUFBVSx3QkFBd0I7SUFDNUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxpQkFBaUIsRUFBRSxDQUFBO0lBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3BDLGtCQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNqRCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFMRCw0REFLQztBQU9EOzs7Ozs7O0dBT0c7QUFDSSxLQUFLLFVBQVUsaUJBQWlCO0lBQ3JDLE1BQU0sT0FBTyxHQUFHLDJCQUEyQixFQUFFLENBQUE7SUFDN0MsTUFBTSxpQkFBaUIsR0FBRyxnQ0FBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDeEQsTUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssY0FBYyxDQUFDLENBQUE7SUFDekYsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1FBQ3JCLE1BQU0sS0FBSyxDQUFDLGlFQUFpRSxDQUFDLENBQUE7S0FDL0U7SUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQzVCLGlCQUFpQjtTQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7U0FDaEMsR0FB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LENBQUE7U0FDekI7S0FDRjtJQUNELElBQUksaUJBQWlCLENBQUMsTUFBTSxFQUFFO1FBQzVCLE1BQU0sS0FBSyxDQUFDLEtBQUssaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUNqRDtJQUNELE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUM7QUFyREQsMENBcURDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuaW1wb3J0IHsgd3JpdGVGaWxlU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0ICogYXMgUGFyc2VyIGZyb20gJ2pzb24tc2NoZW1hLXJlZi1wYXJzZXInXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBzbmFrZUNhc2UgfSBmcm9tICdzbmFrZS1jYXNlJ1xuaW1wb3J0IHsgZ2V0V29ya3NwYWNlUGFja2FnZXMgfSBmcm9tICcuLi93b3Jrc3BhY2UnXG5pbXBvcnQgeyBjb2xsaXNpb25QYWNrYWdlVHlwZU1hcCwgZm9yY2VSZW5hbWVNYXAsIGdldENvbGxpc2lvbklnbm9yZU1hcEZyb20gfSBmcm9tICcuL2NvbmZpZydcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdyaXRlQWxsRmxhdHRlbmVkU2NoZW1hcygpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGZsYXR0ZW5BbGxTY2hlbWFzKClcbiAgZGF0YS5mb3JFYWNoKCh7IGxvY2F0aW9uLCBzY2hlbWEgfSkgPT4ge1xuICAgIHdyaXRlRmlsZVN5bmMobG9jYXRpb24sIEpTT04uc3RyaW5naWZ5KHNjaGVtYSkpXG4gIH0pXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmxhdHRlbmVkU2NoZW1hIHtcbiAgbG9jYXRpb246IHN0cmluZ1xuICBzY2hlbWE6IGFueVxufVxuXG4vKipcbiAqIEdldCBhIE1hcCBvZiBhbGwgSlNPTiBzY2hlbWFzIGJlbG9uZ2luZyB0byBFQSdzIGFuZCBmbGF0dGVuIHRoZW0gYnkgZG9pbmdcbiAqIHRoZSBmb2xsb3dpbmc6XG4gKlxuICogLSBEZXJlZmVyZW5jZSBhbGwgcmVmc1xuICogLSBNZXJnZSBcImFsbE9mXCIgcHJvcGVydGllcyBpbnRvIGEgdG9wIGxldmVsIG9iamVjdFxuICogLSBSZXNvbHZlIGtleSBjb2xsaXNpb25zIGlmIGNvbmZpZ3VyZWQgdG8gZG8gc29cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZsYXR0ZW5BbGxTY2hlbWFzKCk6IFByb21pc2U8RmxhdHRlbmVkU2NoZW1hW10+IHtcbiAgY29uc3QgcmVzb2x2ZSA9IGNyZWF0ZUNoYWlubGlua0xhYnNSZXNvbHZlcigpXG4gIGNvbnN0IHdvcmtzcGFjZVBhY2thZ2VzID0gZ2V0V29ya3NwYWNlUGFja2FnZXMoWydjb3JlJ10pXG4gIGNvbnN0IGJvb3RzdHJhcFBhY2thZ2UgPSB3b3Jrc3BhY2VQYWNrYWdlcy5maW5kKChwKSA9PiBwLmRlc2NvcGVkTmFtZSA9PT0gJ2VhLWJvb3RzdHJhcCcpXG4gIGlmICghYm9vdHN0cmFwUGFja2FnZSkge1xuICAgIHRocm93IEVycm9yKCdDb3VsZCBub3QgZmluZCBib290c3RyYXAgcGFja2FnZSB0byBnZW5lcmF0ZSBjb2xsaXNpb25JZ25vcmVNYXAnKVxuICB9XG5cbiAgY29uc3QgcGtncyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIHdvcmtzcGFjZVBhY2thZ2VzXG4gICAgICAuZmlsdGVyKChwKSA9PiBwLnR5cGUgIT09ICdjb3JlJylcbiAgICAgIC5tYXAoYXN5bmMgKHApID0+IHtcbiAgICAgICAgY29uc3QgeyBlbnZpcm9ubWVudCwgbG9jYXRpb24gfSA9IHBcbiAgICAgICAgaWYgKCFlbnZpcm9ubWVudCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2NoZW1hID0gYXdhaXQgUGFyc2VyLmRlZmF1bHQuZGVyZWZlcmVuY2UoZW52aXJvbm1lbnQuJGlkLCB7XG4gICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBjb2xsaXNpb25JZ25vcmVNYXAgPSBnZXRDb2xsaXNpb25JZ25vcmVNYXBGcm9tKGJvb3RzdHJhcFBhY2thZ2UpXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NoZW1hOiBmbGF0dGVuQWxsT2YoXG4gICAgICAgICAgICAgIHNjaGVtYSxcbiAgICAgICAgICAgICAgcC50eXBlLFxuICAgICAgICAgICAgICBjb2xsaXNpb25JZ25vcmVNYXAsXG4gICAgICAgICAgICAgIGZvcmNlUmVuYW1lTWFwLFxuICAgICAgICAgICAgICBjb2xsaXNpb25QYWNrYWdlVHlwZU1hcCxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihgRXJyb3JzIGluY3VycmVkIHdoaWxlIHByb2Nlc3NpbmcgcGFja2FnZToke2xvY2F0aW9ufTogJHtlLm1lc3NhZ2V9YClcbiAgICAgICAgfVxuICAgICAgfSksXG4gIClcblxuICByZXR1cm4gcGtncy5maWx0ZXIoKG9iaik6IG9iaiBpcyBGbGF0dGVuZWRTY2hlbWEgPT4gISFvYmopXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgXCJqc29uLXNjaGVtYS1yZWYtcGFyc2VyXCIgY29tcGF0aWJsZSByZXNvbHZlciB0aGF0IG1hdGNoZXMgVVJMcyBmb3IgaHR0cHM6Ly9leHRlcm5hbC1hZGFwdGVycy5jaGFpbmxpbmtsYWJzLmNvbSBhbmQgcmV0dXJucyBpbnRlcm5hbCBzY2hlbWFzXG4gKlxuICogQHJldHVybnMgUmVzb2x2ZXIgZm9yIGNoYWlubGluayBsYWJzIHNjaGVtYXNcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2hhaW5saW5rTGFic1Jlc29sdmVyKCkge1xuICBjb25zdCBzY2hlbWFzID0gZ2V0V29ya3NwYWNlUGFja2FnZXMoWydjb3JlJ10pXG4gICAgLm1hcCgocCkgPT4gcC5lbnZpcm9ubWVudClcbiAgICAuZmlsdGVyKChzY2hlbWEpOiBzY2hlbWEgaXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiAhIXNjaGVtYSlcblxuICBjb25zdCBzY2hlbWFzQnlJZCA9IHNjaGVtYXMucmVkdWNlPFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz4+PigocHJldiwgbmV4dCkgPT4ge1xuICAgIGNvbnN0IGlkID0gbmV4dFsnJGlkJ11cbiAgICBpZiAoIWlkKSB7XG4gICAgICBjb25zb2xlLndhcm4oYCRpZCBub3QgZm91bmQgZm9yICR7SlNPTi5zdHJpbmdpZnkobmV4dCwgbnVsbCwgMSl9YClcbiAgICAgIHJldHVybiBwcmV2XG4gICAgfVxuXG4gICAgcHJldltpZF0gPSBuZXh0XG4gICAgcmV0dXJuIHByZXZcbiAgfSwge30pXG5cbiAgY29uc3QgcmVzb2x2ZXI6IFBhcnNlci5SZXNvbHZlck9wdGlvbnMgPSB7XG4gICAgb3JkZXI6IDEsXG4gICAgY2FuUmVhZDogL15odHRwczpcXC9cXC9leHRlcm5hbC1hZGFwdGVycy5jaGFpbmxpbmtsYWJzLmNvbS9pLFxuICAgIHJlYWQ6IChmaWxlLCBjYWxsYmFjaykgPT4ge1xuICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbcmVzb2x2ZXJdIE5vIGNhbGxiYWNrIGZvdW5kJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhID0gc2NoZW1hc0J5SWRbZmlsZS51cmxdXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKEVycm9yKGBDb3VsZCBub3QgZmluZCBmaWxlIGZvciAke2ZpbGUudXJsfWApLCBudWxsKVxuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayhudWxsLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICB9LFxuICB9XG5cbiAgcmV0dXJuIHsgY2hhaW5saW5rTGFic1Jlc29sdmVyOiByZXNvbHZlciB9XG59XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgbWVyZ2UgYWxsIHN1YnNjaGVtYSBwcm9wZXJ0aWVzIHdpdGhpbiB0aGUgXCJhbGxPZlwiIHVuaW9uIGluIGEganNvbi1zY2hlbWEgZG9jdW1lbnQgaW50byBhIHRvcCBsZXZlbCBwcm9wZXJ0aWVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gZG9jdW1lbnQgVGhlIGRvY3VtZW50IHRvIGZsYXR0ZW5cbiAqIEBwYXJhbSBwYWNrYWdlVHlwZSBUaGUgdHlwZSBvZiB0aGUgcGFja2FnZSB0aGF0IGNvbnRhaW5zIHRoZSBwYXNzZWQgZG9jdW1lbnRcbiAqIEBwYXJhbSBjb2xsaXNpb25JZ25vcmVNYXAgV2hlbiBhIGtleSBjb2xsaXNpb24gaXMgZm91bmQsIGlmIHRoZSBrZXkgaXMgY29udGFpbmVkIHdpdGhpbiB0aGlzIGFsbG93TWFwIHRoZW4gaXQgaXMgaWdub3JlZFxuICogQHBhcmFtIGZvcmNlUmVuYW1lTWFwIFdoZW4gYSBrZXkgbWF0Y2hpbmcgdGhpcyBNYXAgaXMgZm91bmQsIGl0IGlzIHRyZWF0ZWQgYXMgYSBjb2xsaXNpb24gYW5kIHJlbmFtZWQgdmlhIG5hbWVzcGFjaW5nXG4gKiBAcGFyYW0gY29sbGlzaW9uUGFja2FnZVR5cGVNYXAgSWYgdGhlIHBhY2thZ2UgdHlwZSBpcyBjb250YWluZWQgd2l0aGluIHRoaXMgTWFwLCB0aGVuIGFueSBjb2xsaXNpb25zIHdpbGwgYWxzbyBhcHBseSB0byB0aGUgb3JpZ2luYWwga2V5IHByb3BlcnR5XG4gKiBAcmV0dXJucyBUaGUgZmxhdHRlbmVkIGRvY3VtZW50XG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5BbGxPZihcbiAgZG9jdW1lbnQ6IGFueSxcbiAgcGFja2FnZVR5cGU6IHN0cmluZyxcbiAgY29sbGlzaW9uSWdub3JlTWFwOiBSZWNvcmQ8c3RyaW5nLCB0cnVlPixcbiAgZm9yY2VSZW5hbWVNYXA6IFJlY29yZDxzdHJpbmcsIHRydWU+LFxuICBjb2xsaXNpb25QYWNrYWdlVHlwZU1hcDogUmVjb3JkPHN0cmluZywgdHJ1ZT4sXG4pIHtcbiAgZnVuY3Rpb24gdHJhdmVyc2VBbmRNZXJnZVByb3BlcnRpZXMoZG9jdW1lbnQ6IGFueSwgbWVyZ2VkUHJvcGVydGllczogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xuICAgIGlmICghZG9jdW1lbnQucHJvcGVydGllcykge1xuICAgICAgcmV0dXJuIG1lcmdlZFByb3BlcnRpZXNcbiAgICB9XG4gICAgY29uc3QgbmV3UHJvcGVydGllcyA9IG1lcmdlUHJvcGVydGllcyhcbiAgICAgIHBhY2thZ2VUeXBlLFxuICAgICAgbWVyZ2VkUHJvcGVydGllcyxcbiAgICAgIGRvY3VtZW50LnByb3BlcnRpZXMsXG4gICAgICBjb2xsaXNpb25JZ25vcmVNYXAsXG4gICAgICBmb3JjZVJlbmFtZU1hcCxcbiAgICAgIGNvbGxpc2lvblBhY2thZ2VUeXBlTWFwLFxuICAgICAgZG9jdW1lbnQuJGlkLFxuICAgIClcbiAgICBpZiAoIWRvY3VtZW50LmFsbE9mKSB7XG4gICAgICByZXR1cm4gbmV3UHJvcGVydGllc1xuICAgIH1cblxuICAgIHJldHVybiBkb2N1bWVudC5hbGxPZi5yZWR1Y2UoKHByZXY6IGFueSwgc3Vic2NoZW1hOiBhbnkpID0+IHtcbiAgICAgIGlmICghc3Vic2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIHByZXZcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYXZlcnNlQW5kTWVyZ2VQcm9wZXJ0aWVzKHN1YnNjaGVtYSwgcHJldilcbiAgICB9LCBuZXdQcm9wZXJ0aWVzKVxuICB9XG5cbiAgcmV0dXJuIHRyYXZlcnNlQW5kTWVyZ2VQcm9wZXJ0aWVzKGRvY3VtZW50LCB7fSlcbn1cblxuLyoqXG4gKiBOYW1lc3BhY2UgYSBwcm9wZXJ0eSB0byByZWR1Y2UgY2hhbmNlcyBvZiBhIGtleSBjb2xsaXNpb25cbiAqXG4gKiBAcGFyYW0gY29sbGlzaW9uTmFtZXNwYWNlIEEgbmFtZXNwYWNlIGxpa2UgXCJodHRwczovL2V4dGVybmFsLWFkYXB0ZXJzLmNoYWlubGlua2xhYnMuY29tL3NjaGVtYXMvZ2VuZXNpcy12b2xhdGlsaXR5LWFkYXB0ZXIuanNvblwiXG4gKiBAcGFyYW0ga2V5IEEga2V5IGxpa2UgXCJBUElfS0VZXCJcbiAqXG4gKiBAcmV0dXJucyBBIGtleSBsaWtlIFwiR0VORVNJU19WT0xBVElMSVRZX0FQSV9LRVlcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gbmFtZXNwYWNlUHJvcGVydHkoY29sbGlzaW9uTmFtZXNwYWNlOiBzdHJpbmcsIGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbnVtYmVyTWFwOiBSZWNvcmQ8bnVtYmVyLCBzdHJpbmc+ID0ge1xuICAgIDE6ICdPTkUnLFxuICAgIDI6ICdUV08nLFxuICAgIDM6ICdUSFJFRScsXG4gICAgNDogJ0ZPVVInLFxuICAgIDU6ICdGSVZFJyxcbiAgICA2OiAnU0lYJyxcbiAgICA3OiAnU0VWRU4nLFxuICAgIDg6ICdFSUdIVCcsXG4gICAgOTogJ05JTkUnLFxuICAgIDA6ICdaRVJPJyxcbiAgfVxuICBjb25zdCB7IG5hbWUgfSA9IHBhdGgucGFyc2UoY29sbGlzaW9uTmFtZXNwYWNlKVxuICBjb25zdCBzbmFrZWROYW1lID0gc25ha2VDYXNlKG5hbWUpLnRvVXBwZXJDYXNlKClcblxuICAvLyBoYW5kbGUgZWRnZSBjYXNlIHdoZW4gdGhlIG5hbWVzcGFjZSB3aWxsIHN0YXJ0IHdpdGggYSBudW1iZXJcbiAgLy8gd2hpY2ggaXMgYW4gaW52YWxpZCBlbnZpcm9ubWVudCB2YXJpYWJsZVxuICBjb25zdCBudW1iZXJDb2xsaXNpb24gPSBudW1iZXJNYXBbTnVtYmVyKHNuYWtlZE5hbWVbMF0pXVxuICBjb25zdCByZXNuYWtlZE5hbWUgPSBudW1iZXJDb2xsaXNpb24gPyBgJHtudW1iZXJDb2xsaXNpb259JHtzbmFrZWROYW1lLnNsaWNlKDEpfWAgOiBzbmFrZWROYW1lXG5cbiAgcmV0dXJuIGAke3Jlc25ha2VkTmFtZX1fJHtrZXl9YFxufVxuXG4vKipcbiAqIE1lcmdlIHRoZSBwcm9wZXJ0aWVzIG9mIHR3byBvYmplY3RzLlxuICpcbiAqIEFzc3VtcHRpb25zOlxuICogLSBCYXNlIHByb3BlcnRpZXMgYXJlIG5ldmVyIG1vZGlmaWVkXG4gKiAtIFRoZSBmaXJzdCBpbnZvY2F0aW9uIG9mIHRoaXMgZnVuY3Rpb24gaGFzIHRoZSBiYXNlIHByb3BlcnR5IGJlIGFuIGVtcHR5IG9iamVjdFxuICpcbiAqIEBwYXJhbSBiYXNlUGFja2FnZVR5cGUgVGhlIHBhY2thZ2UgdHlwZSB0aGF0IHRoZSBiYXNlIHByb3BlcnRpZXMgb3JpZ2luYXRlZCBmcm9tXG4gKiBAcGFyYW0gYmFzZSBUaGUgYmFzZSBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gYWRkaXRpb25hbCBUaGUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRvIG1lcmdlIGludG8gdGhlIGJhc2VcbiAqIEBwYXJhbSBjb2xsaXNpb25JZ25vcmVNYXAgQSByZWNvcmQgb2YgcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgaWdub3JlZCBpZiBhIGNvbGxpc2lvbiBpcyBmb3VuZCwgZXguIG5vIGNvbGxpc2lvbiBuYW1lc3BhY2Ugd2lsbCBiZSB1c2VkLiBUaGlzIGhhcyBwcmVjZWRlbmNlIG92ZXIgYWxsIG90aGVyIGNvbGxpc2lvbiAvIGZvcmNlIHJlbmFtZSBvcHRpb25zXG4gKiBAcGFyYW0gZm9yY2VSZW5hbWVNYXAgQSBNYXAgb2Yga2V5cyB0aGF0IHdpbGwgYmUgdHJlYXRlZCBhcyBhIGNvbGxpc2lvbiBldmVuIGlmIG9uZSBkb2VzIG5vdCBleGlzdFxuICogQHBhcmFtIGNvbGxpc2lvblBhY2thZ2VUeXBlTWFwIElmIHRoZSBwYWNrYWdlIHR5cGUgaXMgY29udGFpbmVkIHdpdGhpbiB0aGlzIE1hcCwgdGhlbiBhbnkgY29sbGlzaW9ucyB3aWxsIGFsc28gYXBwbHkgdG8gdGhlIG9yaWdpbmFsIGtleSBwcm9wZXJ0eVxuICogQHBhcmFtIGNvbGxpc2lvbk5hbWVzcGFjZSBUaGUgbmFtZXNwYWNlIHRvIHByZWZpeCBhZGRpdGlvbmFsIHByb3BlcnRpZXMgYnkgaWYgYSBjb2xsaXNpb24gaXMgZm91bmQsIGFuZCB0aGUgY29sbGlzaW9uIGlzIG5vdCBpbiB0aGUgY29sbGlzaW9uIEFsbG93TWFwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVByb3BlcnRpZXMoXG4gIGJhc2VQYWNrYWdlVHlwZTogc3RyaW5nLFxuICBiYXNlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICBhZGRpdGlvbmFsOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICBjb2xsaXNpb25JZ25vcmVNYXA6IFJlY29yZDxzdHJpbmcsIHRydWU+LFxuICBmb3JjZVJlbmFtZU1hcDogUmVjb3JkPHN0cmluZywgdHJ1ZT4sXG4gIGNvbGxpc2lvblBhY2thZ2VUeXBlTWFwOiBSZWNvcmQ8c3RyaW5nLCB0cnVlPixcbiAgY29sbGlzaW9uTmFtZXNwYWNlOiBzdHJpbmcsXG4pOiBhbnkge1xuICAvLyB3b3JrcyBmb3IgcGxhaW4gb2wganNvbiB3aXRoIG5vIGNpcmN1bGFyIHJlZnNcbiAgY29uc3QgYmFzZUNvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGJhc2UpKVxuICBjb25zdCBvcmlnaW5hbEtleU1hcDogUmVjb3JkPHN0cmluZywgdHJ1ZT4gPSBPYmplY3QudmFsdWVzKGJhc2UpLnJlZHVjZSgocHJldiwgbmV4dCkgPT4ge1xuICAgIGlmICghbmV4dC5vcmlnaW5hbEtleSkge1xuICAgICAgcmV0dXJuIHByZXZcbiAgICB9XG4gICAgcHJldltuZXh0Lm9yaWdpbmFsS2V5XSA9IHRydWVcbiAgICByZXR1cm4gcHJldlxuICB9LCB7fSlcbiAgY29uc3Qgb3JpZ2luYWxLZXlFcnJvcnM6IHN0cmluZ1tdID0gW11cbiAgZm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMoYWRkaXRpb25hbCkpIHtcbiAgICAvLyBpZiB3ZSBoYXZlIGEga2V5IGNvbGxpc2lvbiwgb3Igd2UncmUgZm9yY2VkIHRvIHJlbmFtZVxuICAgIGlmIChiYXNlQ29weVtrXSB8fCBmb3JjZVJlbmFtZU1hcFtrXSkge1xuICAgICAgaWYgKGNvbGxpc2lvbklnbm9yZU1hcFtrXSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgY29uc3QgbmFtZXNwYWNlZEtleSA9IG5hbWVzcGFjZVByb3BlcnR5KGNvbGxpc2lvbk5hbWVzcGFjZSwgaylcbiAgICAgIGlmIChiYXNlQ29weVtuYW1lc3BhY2VkS2V5XSkge1xuICAgICAgICAvLyB0aGlzIHNob3VsZCBuZXZlciBoYXBwZW5cbiAgICAgICAgdGhyb3cgRXJyb3IoYEtleSBjb2xsaXNpb24gZGV0ZWN0ZWQgb24gbmFtZXNwYWNlZCBwcm9wZXJ0eSAke25hbWVzcGFjZWRLZXl9YClcbiAgICAgIH1cblxuICAgICAgLy8gc3RvcmUgdGhlIHByZS1uYW1lZHNwYWNlZCBrZXkgYXMgYSBwcm9wZXJ0eSwgdW5sZXNzIGl0cyBjb250YWluZWQgaW4gb3VyIHBhY2thZ2UgbWFwXG4gICAgICBjb25zdCBvcmlnaW5hbEtleSA9IGNvbGxpc2lvblBhY2thZ2VUeXBlTWFwW2Jhc2VQYWNrYWdlVHlwZV0gPyBuYW1lc3BhY2VkS2V5IDoga1xuICAgICAgYmFzZUNvcHlbbmFtZXNwYWNlZEtleV0gPSB7XG4gICAgICAgIC4uLnYsXG4gICAgICAgIG9yaWdpbmFsS2V5LFxuICAgICAgfVxuICAgICAgaWYgKG9yaWdpbmFsS2V5TWFwW29yaWdpbmFsS2V5XSkge1xuICAgICAgICBvcmlnaW5hbEtleUVycm9ycy5wdXNoKGBLZXkgY29sbGlzaW9uIGRldGVjdGVkIGZvciAke29yaWdpbmFsS2V5fWApXG4gICAgICB9XG4gICAgICBvcmlnaW5hbEtleU1hcFtvcmlnaW5hbEtleV0gPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGJhc2VDb3B5W2tdID0geyAuLi52LCBvcmlnaW5hbEtleTogayB9XG4gICAgICBpZiAob3JpZ2luYWxLZXlNYXBba10pIHtcbiAgICAgICAgb3JpZ2luYWxLZXlFcnJvcnMucHVzaChgS2V5IGNvbGxpc2lvbiBkZXRlY3RlZCBmb3IgJHtrfWApXG4gICAgICB9XG4gICAgICBvcmlnaW5hbEtleU1hcFtrXSA9IHRydWVcbiAgICB9XG4gIH1cbiAgaWYgKG9yaWdpbmFsS2V5RXJyb3JzLmxlbmd0aCkge1xuICAgIHRocm93IEVycm9yKGBcXG4ke29yaWdpbmFsS2V5RXJyb3JzLmpvaW4oJ1xcbicpfWApXG4gIH1cbiAgcmV0dXJuIGJhc2VDb3B5XG59XG4iXX0=