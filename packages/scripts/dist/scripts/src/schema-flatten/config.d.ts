import { WorkspacePackage } from '../workspace';
/**
 * Ignore any collisions based on the keys in the bootstrap package
 */
export declare function getCollisionIgnoreMapFrom(pkg: WorkspacePackage): Record<string, true>;
/**
 * Always rename adapter specific things such as "API_KEY"
 */
export declare const forceRenameMap: {
    readonly API_KEY: true;
    readonly RPC_URL: true;
    readonly API_USERNAME: true;
    readonly API_PASSWORD: true;
    readonly API_ENDPOINT: true;
};
export declare const collisionPackageTypeMap: {};
//# sourceMappingURL=config.d.ts.map