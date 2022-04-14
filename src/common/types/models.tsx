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
  id: number;
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

export const getStopsPerDay = (stops: Stop[]): Record<string, Stop[]> => {
  return stops.reduce<Record<string, Stop[]>>((acc, curr) => {
    var baseLine = stops[0].time.start;
    var diff = Math.abs(baseLine.getTime() - curr.time.start.getTime());
    const day = Math.ceil(diff / (1000 * 3600 * 24)) + 1;

    if (!acc[day]) {
      acc[day] = [];
    }

    acc[day].push(curr);
    return acc;
  }, {});
};

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

export interface Places {
  results: Place[];
}
export interface Place {
  name: string;
  rating: number;
  icon: string;
  id?: any;
  geometry: {
    location: {
      latitude: number;
      longitude: number;
    };
  };
  reference: string;
  vicinity: string;
  types: string[];
  placeId: string;
}

export interface Addresses {
  results: Address[];
}
export interface Address {
  match: boolean;
  formattedAddress: string;
  geometry: {
    location: {
      latitude: number;
      longitude: number;
    };
  };
}
