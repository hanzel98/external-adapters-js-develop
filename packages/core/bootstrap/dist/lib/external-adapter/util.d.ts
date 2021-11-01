export declare const getRandomEnv: (name: string, delimiter?: string, prefix?: string) => string | undefined;
export declare const getRandomRequiredEnv: (name: string, delimiter?: string, prefix?: string) => string;
export declare const getEnv: (name: string, prefix?: string) => string | undefined;
export declare class RequiredEnvError extends Error {
    constructor(name: string);
}
/**
 * Get variable from environments
 * @param name The name of environment variable
 * @throws {RequiredEnvError} Will throw an error if environment variable is not defined.
 * @returns {string}
 */
export declare const getRequiredEnv: (name: string, prefix?: string) => string;
//# sourceMappingURL=util.d.ts.map