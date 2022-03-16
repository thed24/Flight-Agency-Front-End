import * as Types from "../types";

import axios, { AxiosError, AxiosResponse } from "axios";
import { PlacesNearbyResponseData } from "@googlemaps/google-maps-services-js";
import { getFromStorage } from "./storage";
import { env } from "process";

const urlBase = env.NEXT_PUBLIC_URL;
const loggedInUser = getFromStorage<Types.User>("loggedInUser");

export async function RequestLogin(
  data: Types.LoginRequest
): Promise<Types.User | null> {
  const url = `${urlBase}/api/auth/login`;

  const response = await axios
    .post(url, data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => null);

  return response;
}

export async function RequestRegister(
  data: Types.RegisterRequest
): Promise<Types.User | null> {
  const url = `${urlBase}/api/auth/register`;

  const response = await axios
    .post(url, data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => null);

  return response;
}

export async function RequestLocationData(
  data: Types.PlacesRequest
): Promise<PlacesNearbyResponseData> {
  const url = `${urlBase}/api/places/nearBy`;

  const response = await axios
    .get(url, { params: data })
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => null);

  return response;
}

export async function CreateTrip(data: Types.Trip): Promise<Types.Trip> {
  const url = `${urlBase}/api/${loggedInUser?.id}/trips`;

  const response = await axios
    .post(url, data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => null);

  return response;
}
export function GetTrips(): Promise<Types.Trip[] | null> {
  const url = `${urlBase}/api/${loggedInUser?.id}/trips/`;

  return axios
    .get(url)
    .then((res: AxiosResponse<Types.Trip[]>) =>
      res.data.map((trip) => {
        trip.stops = trip.stops.map((stop) => {
          stop.time.start = new Date(stop.time.start);
          stop.time.end = new Date(stop.time.end);
          return stop;
        });
        return trip;
      })
    )
    .catch((err: AxiosError) => null);
}
