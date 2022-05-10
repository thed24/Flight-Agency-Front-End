export const RequestLoginEndpoint = `/api/auth/login`;
export const RequestRegisterEndpoint = `/api/auth/register`;
export const RequestLocationDataEndpoint = `/api/places/nearBy`;
export const GetSuggestionsEndpoint = `/api/places/suggest`;
export const RequestAddressEndpoint = `/api/places/reverseGeocode`;
export const CreateTripEndpoint = (userId: string) =>
    `/api/users/${userId}/trips`;
export const GetTripsEndpoint = (userId: string) =>
    `/api/users/${userId}/trips`;
