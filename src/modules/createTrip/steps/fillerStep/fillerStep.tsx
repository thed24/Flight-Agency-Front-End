import { CircularProgress } from '@mui/material';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import useAxios from 'axios-hooks';
import { SC } from 'common/components';
import {
    Addresses,
    AddressRequest,
    Entries,
    Location,
    Stop,
} from 'common/types';
import { RequestAddressEndpoint } from 'common/utilities';
import { GoogleMap, ScrollableStops } from 'modules/createTrip/components';
import { useMap, useTrip } from 'modules/createTrip/context';
import { MapContainer } from 'modules/createTrip/steps';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
    apiKey: string;
}

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

export const FillerStep = ({ apiKey }: Props) => {
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

            const startDate = stopsForDay[0].time.start;
            startDate.setDate(startDate.getDate() - 1);

            const endDate = stopsForDay[0].time.end;
            endDate.setDate(endDate.getDate() - 1);

            const newStop: Stop = {
                id: trip.stops.length,
                name: `Stop Over at ${address.formattedAddress}`,
                time: { start: startDate, end: endDate },
                location: {
                    latitude: address.geometry.location.latitude,
                    longitude: address.geometry.location.longitude,
                },
                address: address.formattedAddress,
            };

            addStop(newStop);
        }
    }, [addresses, stopsForDay]);

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

    if (addressesLoading) {
        return (
            <SC.Container>
                <CircularProgress color="inherit" />
            </SC.Container>
        );
    }

    return (
        <SC.Container>
            <MapContainer>
                <GoogleMap
                    center={center}
                    zoom={zoom}
                    onDrag={setCenter}
                    onZoom={setZoom}
                    apiKey={apiKey}
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
        </SC.Container>
    );
};
