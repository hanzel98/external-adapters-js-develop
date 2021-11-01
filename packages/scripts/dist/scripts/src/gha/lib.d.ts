interface JobMatrix {
    adapter: {
        name: string;
        type: string;
    }[];
}
/**
 * Create a job matrix that allows our build pipeline to create and push
 * docker images
 */
export declare function getJobMatrix(): Promise<JobMatrix>;
export {};
//# sourceMappingURL=lib.d.ts.map