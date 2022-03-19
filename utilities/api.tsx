import * as Types from "../types";

import axios, { AxiosError, AxiosResponse } from "axios";
import { PlacesNearbyResponseData } from "@googlemaps/google-maps-services-js";
import { getFromStorage } from "./storage";

const loggedInUser = getFromStorage<Types.User>("loggedInUser");

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:8080",
});

export async function RequestLogin(
  data: Types.LoginRequest
): Promise<Types.User | null> {
  const url = `/api/auth/login`;

  const response = await api
    .post(url, data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => null);

  return response;
}

export async function RequestRegister(
  data: Types.RegisterRequest
): Promise<Types.User | null> {
  const url = `/api/auth/register`;

  const response = await api
    .post(url, data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => null);

  return response;
}

export async function RequestLocationData(
  data: Types.PlacesRequest
): Promise<PlacesNearbyResponseData> {
  const url = `/api/places/nearBy`;

  const response = await api
    .get(url, { params: data })
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => null);

  return response;
}

export async function CreateTrip(data: Types.Trip): Promise<Types.Trip> {
  const url = `/api/${loggedInUser?.id}/trips`;

  const response = await api
    .post(url, data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => null);

  return response;
}
export function GetTrips(): Promise<Types.Trip[] | null> {
  const url = `/api/${loggedInUser?.id}/trips/`;

  return api
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
