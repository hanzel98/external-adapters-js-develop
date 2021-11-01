interface TsConfig {
    references: {
        path: string;
    }[];
}
export interface WorkspacePackage {
    tsconf: TsConfig | undefined;
    location: string;
    name: string;
    descopedName: string;
    type: string;
    environment: Record<string, string> | undefined;
    version: string;
}
/**
 * Types of adapters that are publically consumed
 */
export declare const PUBLIC_ADAPTER_TYPES: string[];
export declare type WorkspacePackages = ReturnType<typeof getWorkspacePackages>;
export declare function getWorkspacePackages(additionalTypes?: string[]): WorkspacePackage[];
export {};
//# sourceMappingURL=workspace.d.ts.map