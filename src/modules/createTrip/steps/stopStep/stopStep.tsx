import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import useAxios from 'axios-hooks';
import { SC } from 'common/components';
import { Categories, LoadCountries, Place, PlacesRequest } from 'common/types';
import { Entry } from 'common/types/misc';
import { RequestLocationDataEndpoint } from 'common/utilities';
import {
    AutoComplete,
    GoogleMap,
    Marker,
    ScrollableStops,
} from 'modules/createTrip/components';
import { useMap, useTrip } from 'modules/createTrip/context';
import { SCC } from 'modules/createTrip/steps';
import React, { useEffect, useMemo } from 'react';

interface Props {
    apiKey: string;
    onClickMarker: (place: Place, day: number) => void;
}

export const StopStep = ({ onClickMarker, apiKey }: Props) => {
    const [{ data: places }, fetchPlaces] = useAxios<Place[]>(
        RequestLocationDataEndpoint,
        { manual: true }
    );

    const { center, setCenter, zoom, setZoom } = useMap();
    const { trip, dayToStopMap } = useTrip();

    const [index, setIndex] = React.useState<number>(0);
    const [category, setCategory] = React.useState<string>('Food');
    const [mapLoaded, setMapLoaded] = React.useState<boolean>(false);

    const days = Object.keys(dayToStopMap);

    useEffect(() => {
        const currentCountry = LoadCountries().find(
            (country) => country.name === trip.destination
        );

        if (currentCountry) {
            setCenter(currentCountry.lat, currentCountry.lng);
        }
    }, []);

    useEffect(() => {
        const request: PlacesRequest = {
            lat: center.latitude.toString(),
            lng: center.longitude.toString(),
            zoom: zoom.toString(),
            radius: '2000',
            keyword: `'${category}'`,
        };

        fetchPlaces({ params: { ...request }, method: 'get' });
    }, [category, center]);

    const handleOnChangeCategory = (e: SelectChangeEvent<string>) => {
        setCategory(e.target.value);
    };

    const day = days.length > 0 ? parseInt(days[index], 10) : 1;

    const markers = useMemo(() => {
        const handleOnClickMarker =
            (place: Place) => (e: React.MouseEvent<Element, MouseEvent>) => {
                e.preventDefault();
                onClickMarker(place, day);
            };

        return places
            ? places
                  .map((place) => ({ ...place, category }))
                  .map((place) => (
                      <Marker
                          key={place.id}
                          onClick={handleOnClickMarker(place)}
                          place={place}
                          name={place.name}
                          lat={place.geometry.location.lat}
                          lng={place.geometry.location.lng}
                      />
                  ))
            : [];
    }, [places, onClickMarker, day, category]);

    const entries = useMemo(() => {
        const stopsForDay = Object.values(dayToStopMap)[index] ?? [];

        return stopsForDay.map((stop) => [
            {
                id: stop.id,
                header: `${stop.name}`,
                content: `${new Date(
                    stop.time.start
                ).toLocaleTimeString()} to ${new Date(
                    stop.time.end
                ).toLocaleTimeString()}`,
            } as Entry,
        ]);
    }, [dayToStopMap, index]);

    const handleMapPlaceClick = (place: Place) => {
        onClickMarker(place, day);
    };

    return (
        <SC.Container>
            <SCC.MapContainer>
                <SCC.MapSubContainer>
                    <GoogleMap
                        center={center}
                        zoom={zoom}
                        places={places ?? []}
                        onClickPlace={handleMapPlaceClick}
                        onDrag={setCenter}
                        onZoom={setZoom}
                        apiKey={apiKey}
                        setLoaded={setMapLoaded}
                    >
                        {markers}
                    </GoogleMap>
                    <SCC.MapControls>
                        <Select
                            value={category}
                            label="Category"
                            onChange={handleOnChangeCategory}
                        >
                            {Categories.map((cat) => (
                                <MenuItem value={cat} key={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>

                        {places && (
                            <AutoComplete
                                defaultAddress={`${places[0].name}, ${trip.destination}`}
                                setCenter={setCenter}
                                apiLoaded={mapLoaded}
                            />
                        )}
                    </SCC.MapControls>
                </SCC.MapSubContainer>

                {trip.stops.length > 0 && (
                    <ScrollableStops
                        setIndex={setIndex}
                        index={index}
                        dayToStopsMap={dayToStopMap}
                        entries={entries}
                        deletable
                    />
                )}
            </SCC.MapContainer>
        </SC.Container>
    );
};
