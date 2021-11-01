import { ExecuteFactory, ExecuteWithConfig } from '@chainlink/types';
import { Config } from './config';
export interface Polygon {
    type: 'Polygon';
    coordinates: [number, number][][];
}
export declare type Point = {
    type: 'Point';
    coordinates: [number, number];
};
export interface Feature {
    type: string;
    geometry: Polygon | Point;
}
export interface GeoJSON {
    type: string;
    features: Feature[];
}
export declare const execute: ExecuteWithConfig<Config>;
export declare const makeExecute: ExecuteFactory<Config>;
//# sourceMappingURL=adapter.d.ts.map