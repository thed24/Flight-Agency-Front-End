import { Location } from 'common/types';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface Trip {
    id: number;
    destination: string;
    stops: Stop[];
}

export type Trips = Trip[];

export interface Stop {
    id: number;
    name: string;
    time: DateRange;
    location: Location;
    address: string;
    category: string;
}

export interface DateRange {
    start: Date;
    end: Date;
}

export interface Places {
    results: Place[];
}
export interface Place {
    name: string;
    rating: number;
    icon: string;
    id?: any;
    geometry: {
        location: {
            latitude: number;
            longitude: number;
        };
    };
    reference: string;
    vicinity: string;
    types: string[];
    placeId: string;
}
