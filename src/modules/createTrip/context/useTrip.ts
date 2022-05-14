import { DayToStopMap, Stop, Trip } from 'common/types';
import { useCallback, useContext, useMemo } from 'react';

import { CreateTripContext } from './createTripContext';

export function useTrip() {
    const [{ trip }, dispatch] = useContext(CreateTripContext);

    const setTrip = useCallback(
        (newTrip: Trip) => dispatch('setTrip', newTrip),
        [dispatch]
    );

    const setDestination = useCallback(
        (newDestination: string) => dispatch('setDestination', newDestination),
        [dispatch]
    );

    const addStop = useCallback(
        (stop: Stop) => dispatch('addStop', stop),
        [dispatch]
    );

    const removeStop = useCallback(
        (stopId: number) => dispatch('removeStop', stopId),
        [dispatch]
    );

    const updateStop = useCallback(
        (stop: Stop) => dispatch('updateStop', stop),
        [dispatch]
    );

    const dayToStopMap: Record<string, Stop[]> = useMemo(
        () => DayToStopMap(trip.stops),
        [trip.stops]
    );

    return {
        trip,
        setTrip,
        addStop,
        removeStop,
        updateStop,
        dayToStopMap,
        setDestination,
    };
}
