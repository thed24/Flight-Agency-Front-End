import axios from 'axios';

export const RequestLoginEndpoint = `/api/auth/login`;
export const GoogleKeyEndpoint = `/api/auth/key`;
export const RequestRegisterEndpoint = `/api/auth/register`;
export const RequestLocationDataEndpoint = `/api/places/nearBy`;
export const GetSuggestionsEndpoint = `/api/places/suggest`;
export const RequestAddressEndpoint = `/api/places/reverseGeocode`;

export const DownloadTripEndpoint = (userId: string, tripId: string) =>
    `/api/users/${userId}/trips/${tripId}/record`;
export const CreateTripEndpoint = (userId: string) =>
    `/api/users/${userId}/trips`;
export const GetTripsEndpoint = (userId: string) =>
    `/api/users/${userId}/trips`;

export const httpClient = axios.create();
