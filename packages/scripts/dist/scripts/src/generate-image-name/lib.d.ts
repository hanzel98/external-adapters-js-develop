/**
 * Create a image name that matches what the "docker-build" script outputs as a docker-compose file.
 *
 * Used as a workaround to a gha restriction where we were unable to use the output of the "gha" action if it contained secrets.
 */
export declare function generateImageName(): Promise<string>;
//# sourceMappingURL=lib.d.ts.map