export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Trip {
  Stops: Stop[];
}

export interface Stop {
  Name: string;
  Location: Location;
}

export interface Country {
  name: string;
  code: string;
  lat: number;
  lng: number;
}
