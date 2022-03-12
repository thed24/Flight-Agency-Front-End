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
  Destination: string;
  Stops: Stop[];
}

export interface Stop {
  Name: string;
  Time: DateRange;
  Location: Location;
  Address: string;
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
