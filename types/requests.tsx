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
  location: Location;
  zoom: number;
  radius: number;
}
