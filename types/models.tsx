export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Trip {
  destination: string;
  stops: Stop[];
}

export type Trips = Trip[];

export interface Stop {
  name: string;
  time: DateRange;
  location: Location;
  address: string;
}

export interface Country {
  name: string;
  code: string;
  lat: number;
  lng: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface Entry {
  header: string;
  content: string;
}

export type Entries = Entry[];
