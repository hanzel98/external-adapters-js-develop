export declare type DNSQuestion = {
    name: string;
    type: number;
};
export declare type DNSAnswer = {
    name: string;
    type: number;
    TTL: number;
    data: string;
};
export declare type DNSQueryResponse = {
    Status: number;
    TC: boolean;
    RD: boolean;
    RA: boolean;
    AD: boolean;
    CD: boolean;
    Question: DNSQuestion[];
    Answer: DNSAnswer[];
    Comment?: string;
};
//# sourceMappingURL=types.d.ts.map