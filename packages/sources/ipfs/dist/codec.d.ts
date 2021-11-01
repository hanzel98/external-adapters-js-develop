/// <reference types="node" />
import * as dagCBOR from 'ipld-dag-cbor';
export declare const CODEC_DAG_CBOR = "dag-cbor";
export declare const CODEC_JSON = "json";
export declare const serialize: (data: string | object, codec?: string | undefined) => string | Uint8Array;
export declare const deserialize: (data: Buffer, codec?: string | undefined) => ReturnType<typeof dagCBOR.util.deserialize> | string;
//# sourceMappingURL=codec.d.ts.map