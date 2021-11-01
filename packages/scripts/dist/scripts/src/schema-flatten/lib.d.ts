export declare function writeAllFlattenedSchemas(): Promise<void>;
export interface FlattenedSchema {
    location: string;
    schema: any;
}
/**
 * Get a Map of all JSON schemas belonging to EA's and flatten them by doing
 * the following:
 *
 * - Dereference all refs
 * - Merge "allOf" properties into a top level object
 * - Resolve key collisions if configured to do so
 */
export declare function flattenAllSchemas(): Promise<FlattenedSchema[]>;
/**
 * Namespace a property to reduce chances of a key collision
 *
 * @param collisionNamespace A namespace like "https://external-adapters.chainlinklabs.com/schemas/genesis-volatility-adapter.json"
 * @param key A key like "API_KEY"
 *
 * @returns A key like "GENESIS_VOLATILITY_API_KEY"
 */
export declare function namespaceProperty(collisionNamespace: string, key: string): string;
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
export declare function mergeProperties(basePackageType: string, base: Record<string, any>, additional: Record<string, any>, collisionIgnoreMap: Record<string, true>, forceRenameMap: Record<string, true>, collisionPackageTypeMap: Record<string, true>, collisionNamespace: string): any;
//# sourceMappingURL=lib.d.ts.map