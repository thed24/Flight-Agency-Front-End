export interface Location {
    latitude: number;
    longitude: number;
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
            lat: number;
            lng: number;
        };
    };
    photos: {
        height: number;
        html_attributions: string[];
        photo_reference: string;
        width: number;
    }[];
    vicinity: string;
    business_status: string;
    types: string[];
    opening_hours: {
        open_now: boolean;
    };
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
