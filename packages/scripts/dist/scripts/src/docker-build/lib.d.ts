export declare function writeFile(): Promise<void>;
export interface ComposeFileOptions {
    context: string;
}
export declare function generateFile(): Promise<string>;
export declare function generateFileJSON(imageNameConfig: ImageNameConfig, composeFileOptions: ComposeFileOptions): Promise<Dockerfile>;
interface Service {
    image: string;
    build: {
        context: string;
        dockerfile: string;
        args: Record<string, string>;
        labels: Record<string, string>;
    };
    ports: string[];
    environment: string[];
}
interface Dockerfile {
    version: string;
    services: Record<string, Service>;
}
export interface ImageNameConfig {
    branch: string;
    prefix: string;
    useLatest: boolean;
}
export declare enum DockerLabels {
    EA_TYPE = "com.chainlinklabs.external-adapter-type"
}
export declare function generateImageName(descopedName: string, version: string, { prefix, branch, useLatest }: ImageNameConfig): string;
export {};
//# sourceMappingURL=lib.d.ts.map