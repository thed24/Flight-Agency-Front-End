import { Location, Stop, Trip } from 'common/types';

export type CreateTripState = {
    trip: Trip;
    step: number;
    zoom: number;
    center: Location;
};

export function createTripReducer(
    state: CreateTripState,
    action: Actions
): CreateTripState {
    switch (action.type) {
        case 'setTrip':
            return {
                ...state,
                trip: action.payload,
            };
        case 'setDestination':
            return {
                ...state,
                trip: {
                    ...state.trip,
                    destination: action.payload,
                },
            };
        case 'setStep':
            return {
                ...state,
                step: action.payload,
            };
        case 'increaseStep':
            return {
                ...state,
                step: state.step + 1,
            };
        case 'decreaseStep':
            return {
                ...state,
                step: state.step - 1,
            };
        case 'addStop':
            return {
                ...state,
                trip: {
                    ...state.trip,
                    stops: [...state.trip.stops, action.payload].sort(
                        (currStop, nextStop) => {
                            const currTime = new Date(
                                currStop.time.start
                            ).getTime();
                            const nextTime = new Date(
                                nextStop.time.start
                            ).getTime();

                            return currTime - nextTime;
                        }
                    ),
                    length: Math.max(
                        ...[...state.trip.stops, action.payload].map(
                            (stop) => stop.day
                        )
                    ),
                },
            };
        case 'removeStop':
            return {
                ...state,
                trip: {
                    ...state.trip,
                    stops: state.trip.stops
                        .filter((stop) => stop.id !== action.payload)
                        .map((stop, i) => ({ ...stop, id: i })),
                },
            };
        case 'updateStop':
            return {
                ...state,
                trip: {
                    ...state.trip,
                    stops: state.trip.stops.map((stop) => {
                        if (stop.id === action.payload.id) {
                            return action.payload;
                        }
                        return stop;
                    }),
                },
            };
        case 'setZoom':
            return {
                ...state,
                zoom: action.payload,
            };
        case 'setCenter':
            return {
                ...state,
                center: action.payload,
            };
        default:
            return state;
    }
}

export type ActionsMap = {
    setDestination: string;
    setStep: number;
    increaseStep: void;
    decreaseStep: void;
    setTrip: Trip;
    addStop: Stop;
    removeStop: number;
    updateStop: Stop;
    setZoom: number;
    setCenter: Location;
};

export type Actions = {
    [Key in keyof ActionsMap]: {
        type: Key;
        payload: ActionsMap[Key];
    };
}[keyof ActionsMap];
