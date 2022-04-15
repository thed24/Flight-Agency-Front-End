export interface Location {
  lat: number;
  lng: number;
}

export interface Country {
  name: string;
  code: string;
  lat: number;
  lng: number;
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
  vicinity: string;
  types: string[];
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
