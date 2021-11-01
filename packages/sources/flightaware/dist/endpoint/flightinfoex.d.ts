import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types';
export declare const supportedEndpoints: string[];
export declare const endpointResultPaths: {
    estimatedarrivaltime: string;
};
interface Flights {
    faFlightID: string;
    ident: string;
    aircrafttype: string;
    filed_ete: string;
    filed_time: number;
    filed_departuretime: number;
    filed_airspeed_kts: number;
    filed_airspeed_mach: string;
    filed_altitude: number;
    route: string;
    actualdeparturetime: number;
    estimatedarrivaltime: number;
    actualarrivaltime: number;
    diverted: string;
    origin: string;
    destination: string;
    originName: string;
    originCity: string;
    destinationName: string;
    destinationCity: string;
}
export interface ResponseSchema {
    FlightInfoExResult: {
        next_offset: number;
        flights: Flights[];
    };
}
export declare const inputParameters: InputParameters;
export declare const execute: ExecuteWithConfig<Config>;
export {};
//# sourceMappingURL=flightinfoex.d.ts.map