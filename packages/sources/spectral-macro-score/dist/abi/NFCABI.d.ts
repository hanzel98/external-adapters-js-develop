declare const ABI: {
    _format: string;
    contractName: string;
    sourceName: string;
    abi: ({
        inputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    bytecode: string;
    deployedBytecode: string;
    linkReferences: {
        'contracts/nfc/typesLibrary.sol': {
            typesLibrary: {
                length: number;
                start: number;
            }[];
        };
    };
    deployedLinkReferences: {
        'contracts/nfc/typesLibrary.sol': {
            typesLibrary: {
                length: number;
                start: number;
            }[];
        };
    };
};
export default ABI;
//# sourceMappingURL=NFCABI.d.ts.map