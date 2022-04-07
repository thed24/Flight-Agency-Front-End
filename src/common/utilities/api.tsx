import * as Types from "../types";

import { getFromStorage } from "./storage";

const loggedInUser = getFromStorage<Types.User>("loggedInUser");

export const RequestLoginEndpoint = `/api/auth/login`;
export const RequestRegisterEndpoint = `/api/auth/register`;
export const CreateTripEndpoint = `/api/users/${loggedInUser?.id}/trips`;
export const GetTripsEndpoint = `/api/users/${loggedInUser?.id}/trips`;
export const RequestLocationDataEndpoint = `/api/places/nearBy`;
export const GetSuggestionsEndpoint = `/api/places/suggest`;
export const RequestAddressEndpoint = `/api/places/reverseGeocode`;
