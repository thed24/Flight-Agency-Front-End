import * as Types from "../types";

import axios, { AxiosError, AxiosResponse } from "axios";
import { getFromStorage } from "./storage";
import { Result } from "hooks";

const loggedInUser = getFromStorage<Types.User>("loggedInUser");

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:8080",
});

export async function SendData<I, O>(url: string, data: I): Promise<Result<O>> {
  const result: O | string = await api
    .post(url, data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => err?.response?.data ?? err.message);

  return typeof result === "string" ? { error: result } : { data: result };
}

export async function UpdateData<I, O>(
  url: string,
  data: I
): Promise<Result<O>> {
  const result: O | string = await api
    .put(url, data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => err?.response?.data ?? err.message);

  return typeof result === "string" ? { error: result } : { data: result };
}

export async function QueryData<I, O>(
  url: string,
  query: I
): Promise<Result<O>> {
  const result: O | string = await api
    .get(url, { params: query })
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => err?.response?.data ?? err.message);

  return typeof result === "string" ? { error: result } : { data: result };
}

export const RequestLoginEndpoint = `/api/auth/login`;
export const RequestRegisterEndpoint = `/api/auth/register`;
export const CreateTripEndpoint = `/api/${loggedInUser?.id}/trips`;
export const GetTripsEndpoint = `/api/${loggedInUser?.id}/trips`;
export const RequestLocationDataEndpoint = `/api/places/nearBy`;
export const GetSuggestionsEndpoint = `/api/places/suggest`;
