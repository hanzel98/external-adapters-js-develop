import { ExecuteWithConfig, Config, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const batchablePropertyPath: {
    name: string;
    limit: number;
}[];
export declare const endpointResultPaths: {
    crypto: string;
    price: string;
    marketcap: string;
    volume: string;
};
export interface ResponseSchema {
    RAW: {
        [fsym: string]: {
            [tsym: string]: {
                TYPE: string;
                MARKET: string;
                FROMSYMBOL: string;
                TOSYMBOL: string;
                FLAGS: string;
                PRICE?: number;
                LASTUPDATE: number;
                MEDIAN: number;
                LASTVOLUME: number;
                LASTVOLUMETO: number;
                LASTTRADEID: string;
                VOLUMEDAY: number;
                VOLUMEDAYTO: number;
                VOLUME24HOUR: number;
                VOLUME24HOURTO: number;
                OPENDAY: number;
                HIGHDAY: number;
                LOWDAY: number;
                OPEN24HOUR: number;
                HIGH24HOUR: number;
                LOW24HOUR: number;
                LASTMARKET: string;
                VOLUMEHOUR: number;
                VOLUMEHOURTO: number;
                OPENHOUR: number;
                HIGHHOUR: number;
                LOWHOUR: number;
                TOPTIERVOLUME24HOUR: number;
                TOPTIERVOLUME24HOURTO: number;
                CHANGE24HOUR: number;
                CHANGEPCT24HOUR: number;
                CHANGEDAY: number;
                CHANGEPCTDAY: number;
                CHANGEHOUR: number;
                CHANGEPCTHOUR: number;
                CONVERSIONTYPE: string;
                CONVERSIONSYMBOL: string;
                SUPPLY: number;
                MKTCAP: number;
                MKTCAPPENALTY: number;
                TOTALVOLUME24H: number;
                TOTALVOLUME24HTO: number;
                TOTALTOPTIERVOLUME24H: number;
                TOTALTOPTIERVOLUME24HTO: number;
                IMAGEURL: string;
            };
        };
    };
    DISPLAY: {
        [fsym: string]: {
            [tsym: string]: {
                FROMSYMBOL: string;
                TOSYMBOL: string;
                MARKET: string;
                PRICE: string;
                LASTUPDATE: string;
                LASTVOLUME: string;
                LASTVOLUMETO: string;
                LASTTRADEID: string;
                VOLUMEDAY: string;
                VOLUMEDAYTO: string;
                VOLUME24HOUR: string;
                VOLUME24HOURTO: string;
                OPENDAY: string;
                HIGHDAY: string;
                LOWDAY: string;
                OPEN24HOUR: string;
                HIGH24HOUR: string;
                LOW24HOUR: string;
                LASTMARKET: string;
                VOLUMEHOUR: string;
                VOLUMEHOURTO: string;
                OPENHOUR: string;
                HIGHHOUR: string;
                LOWHOUR: string;
                TOPTIERVOLUME24HOUR: string;
                TOPTIERVOLUME24HOURTO: string;
                CHANGE24HOUR: string;
                CHANGEPCT24HOUR: string;
                CHANGEDAY: string;
                CHANGEPCTDAY: string;
                CHANGEHOUR: string;
                CHANGEPCTHOUR: string;
                CONVERSIONTYPE: string;
                CONVERSIONSYMBOL: string;
                SUPPLY: string;
                MKTCAP: string;
                MKTCAPPENALTY: string;
                TOTALVOLUME24H: string;
                TOTALVOLUME24HTO: string;
                TOTALTOPTIERVOLUME24H: string;
                TOTALTOPTIERVOLUME24HTO: string;
                IMAGEURL: string;
            };
        };
    };
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
//# sourceMappingURL=crypto.d.ts.map