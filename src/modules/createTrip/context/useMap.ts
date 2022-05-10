import { useCallback, useContext } from 'react';

import { CreateTripContext } from './createTripContext';

export function useMap() {
    const [{ zoom, center }, dispatch] = useContext(CreateTripContext);

    const setZoom = useCallback(
        (newZoom: number) => dispatch('setZoom', newZoom),
        [dispatch]
    );
    const setCenter = useCallback(
        (lat: number, lng: number) =>
            dispatch('setCenter', { latitude: lat, longitude: lng }),
        [dispatch]
    );

    return {
        setZoom,
        setCenter,
        zoom,
        center,
    };
}
