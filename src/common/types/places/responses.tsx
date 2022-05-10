import { Place } from 'common/types';

export type PlacesResponse = Place[];

export interface AddressResponse {
    lat: string;
    lng: string;
}
