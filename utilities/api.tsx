import axios, { AxiosError, AxiosResponse } from "axios";
import { PlacesNearbyResponseData } from "@googlemaps/google-maps-services-js";
import { User } from "../types/models";
import {
  LoginRequest,
  PlacesRequest,
  RegisterRequest,
} from "../types/requests";

export async function RequestLogin(data: LoginRequest): Promise<User | null> {
  const url = "http://localhost:7071/api/auth/login";

  const response = await axios
    .post(url, data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => err);

  return response;
}

export async function RequestRegister(
  data: RegisterRequest
): Promise<User | null> {
  const url = "http://localhost:7071/api/auth/register";

  const response = await axios
    .post(url, data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => err);

  return response;
}

export async function RequestLocationData(
  data: PlacesRequest
): Promise<PlacesNearbyResponseData> {
  const url = "http://localhost:7071/api/places/nearBy";

  console.log(data);

  const response = await axios
    .get(url, { params: data })
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => null);

  return response;
}
