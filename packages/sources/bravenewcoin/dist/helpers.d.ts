export declare const host = "bravenewcoin.p.rapidapi.com";
export declare const apiHeaders: {
    'x-rapidapi-host': string;
    'x-rapidapi-key': string | undefined;
};
export declare const authenticate: () => Promise<any>;
export declare const getAssetId: (symbol: any) => Promise<any>;
export declare const convert: (token: any, baseAssetId: any, quoteAssetId: any) => Promise<{
    status: number;
    data: {
        result: number;
    };
    result: number;
}>;
//# sourceMappingURL=helpers.d.ts.map