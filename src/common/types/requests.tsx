import { Location } from "./models";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PlacesRequest {
  lat: number;
  lng: number;
  zoom: number;
  radius: number;
  keyword: string;
}

export interface AddressRequest {
  lat: number;
  lng: number;
}
