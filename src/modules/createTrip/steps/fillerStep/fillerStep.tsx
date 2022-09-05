import { CircularProgress } from '@mui/material';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import useAxios from 'axios-hooks';
import { Container } from 'common/components';
import {
    Addresses,
    AddressRequest,
    Entries,
    Location,
    Stop,
} from 'common/types';
import { GoogleKeyEndpoint, RequestAddressEndpoint } from 'common/utilities';
import { GoogleMap, ScrollableStops } from 'modules/createTrip/components';
import { useMap, useTrip } from 'modules/createTrip/context';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { MapContainer } from '../steps.styles';

function arePointsNear(
    checkPoint: Location,
    centerPoint: Location,
    km: number
): boolean {
    const ky = 40000 / 360;
    const kx = Math.cos((Math.PI * centerPoint.latitude) / 180.0) * ky;
    const dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
    const dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}

export const FillerStep = () => {
    const [{ data: apiKey, loading: apiKeyLoading }] =
        useAxios<string>(GoogleKeyEndpoint);
    const [{ data: addresses, loading: addressesLoading }, fetchAddresses] =
        useAxios<Addresses>(RequestAddressEndpoint, { manual: true });

    const { center, setCenter, zoom, setZoom } = useMap();
    const { trip, addStop, dayToStopMap } = useTrip();

    const [index, setIndex] = React.useState<number>(0);
    const [allRoutes, setAllRoutes] = useState<{
        [key: number]: google.maps.DirectionsResult;
    }>({});

    const isRouteMemoized = index in allRoutes;
    const route = allRoutes[index]?.routes[0] ?? null;

    const days = Object.keys(dayToStopMap);
    const day = days.length > 0 ? parseInt(days[index], 10) : 1;
    const stopsForDay = Object.values(dayToStopMap)[index];

    useEffect(() => {
        setCenter(
            stopsForDay[0].location.latitude,
            stopsForDay[0].location.longitude
        );
        setZoom(14);
    }, [index, setCenter, setZoom, stopsForDay]);

    useEffect(() => {
        if (addresses) {
            const address = addresses.results[0];
            const startDate = new Date(stopsForDay[0].time.start);
            const endDate = new Date(stopsForDay[0].time.end);

            const newStop: Stop = {
                id: trip.stops.length,
                day,
                name: `Stop Over at ${address.formatted_address}`,
                time: {
                    start: startDate,
                    end: endDate,
                },
                location: {
                    latitude: address.geometry.location.lat,
                    longitude: address.geometry.location.lng,
                },
                category: trip.stops[0].category,
                address: address.formatted_address,
            };

            addStop(newStop);

            delete allRoutes[index];
        }
    }, [addresses]);

    const onClickRoute = useCallback(
        (event: google.maps.MapMouseEvent) => {
            if (event && event.latLng !== null) {
                const nearestLocationOnPath = route.overview_path.find((p) =>
                    arePointsNear(
                        {
                            latitude: event.latLng?.lat() ?? 0,
                            longitude: event.latLng?.lng() ?? 0,
                        },
                        { latitude: p.lat(), longitude: p.lng() },
                        0.02
                    )
                );

                if (nearestLocationOnPath) {
                    const request: AddressRequest = {
                        lat: nearestLocationOnPath.lat().toString(),
                        lng: nearestLocationOnPath.lng().toString(),
                    };

                    fetchAddresses({ params: { ...request }, method: 'get' });
                }
            }
        },
        [fetchAddresses, route]
    );

    const directionsRequest = useMemo(
        () => ({
            origin: {
                lat: stopsForDay[0].location.latitude,
                lng: stopsForDay[0].location.longitude,
            },
            destination: {
                lat: stopsForDay[stopsForDay.length - 1].location.latitude,
                lng: stopsForDay[stopsForDay.length - 1].location.longitude,
            },
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: stopsForDay
                .slice(1, stopsForDay.length - 1)
                .map((stop) => {
                    const stopOver: google.maps.DirectionsWaypoint = {
                        location: new google.maps.LatLng(
                            stop.location.latitude,
                            stop.location.longitude
                        ),
                        stopover: true,
                    };

                    return stopOver;
                }),
        }),
        [stopsForDay]
    );

    const directionsCallback = useCallback(
        (
            result: google.maps.DirectionsResult | null,
            status: google.maps.DirectionsStatus
        ) => {
            if (result && status === google.maps.DirectionsStatus.OK) {
                setAllRoutes((prev) => ({ ...prev, [index]: result }));
            }
        },
        [index]
    );

    const DirectionsAsAService = useCallback(
        () =>
            !isRouteMemoized ? (
                <DirectionsService
                    options={directionsRequest}
                    callback={directionsCallback}
                />
            ) : (
                []
            ),
        [directionsCallback, directionsRequest, isRouteMemoized]
    );

    const DirectionsRendererAsAService = useCallback(
        () =>
            isRouteMemoized ? (
                <DirectionsRenderer
                    options={{
                        polylineOptions: {
                            strokeColor: 'lightblue',
                            strokeWeight: 7,
                            clickable: false,
                            geodesic: true,
                            draggable: false,
                            editable: false,
                        },
                        directions: allRoutes[index],
                    }}
                />
            ) : (
                []
            ),
        [allRoutes, index, isRouteMemoized]
    );

    const entries =
        (route &&
            route.legs.map((leg, i) => {
                const entry: Entries = [
                    {
                        header: `Stop ${i + 1}`,
                        content: `${leg.start_address} to ${leg.end_address}`,
                        id: index,
                    },
                    {
                        header: 'Duration',
                        content: `${leg?.duration?.text}`,
                        id: index,
                    },
                    {
                        header: 'Distance',
                        content: `${leg?.distance?.text}`,
                        id: index,
                    },
                ];

                return entry;
            })) ??
        [];

    if (addressesLoading || apiKeyLoading) {
        return (
            <Container>
                <CircularProgress color="inherit" />
            </Container>
        );
    }

    return (
        <Container>
            <MapContainer solo={trip.stops.length === 0}>
                <GoogleMap
                    key={index * stopsForDay.length}
                    center={center}
                    zoom={zoom}
                    places={[]}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onClickPlace={() => {}}
                    onDrag={setCenter}
                    onZoom={setZoom}
                    apiKey={apiKey ?? ''}
                    onClick={onClickRoute}
                >
                    {DirectionsRendererAsAService()}
                    {DirectionsAsAService()}
                </GoogleMap>

                {trip.stops.length > 0 && (
                    <ScrollableStops
                        setIndex={setIndex}
                        index={index}
                        dayToStopsMap={dayToStopMap}
                        entries={entries}
                    />
                )}
            </MapContainer>
        </Container>
    );
};
