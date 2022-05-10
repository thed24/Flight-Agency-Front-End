import { Stop, Trip } from 'common/types';
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
        () =>
            trip.stops.reduce<Record<string, Stop[]>>((acc, curr) => {
                const baseLine = trip.stops[0].time.start;

                const oneDay = 24 * 60 * 60 * 1000;
                const diffDays = Math.round(
                    Math.abs(
                        (baseLine.getTime() - curr.time.start.getTime()) /
                            oneDay
                    )
                );

                if (!acc[diffDays]) {
                    acc[diffDays] = [];
                }

                acc[diffDays].push(curr);
                return acc;
            }, {}),
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
