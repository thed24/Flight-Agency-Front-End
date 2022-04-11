import { Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import {
  Categories,
  Location,
  Trip,
  Place,
  Places,
  PlacesRequest,
  LoadCountries,
} from "common/types";
import GoogleMapReact from "google-map-react";
import { List, LoadingOverlay, SC } from "common/components";
import React, { useEffect } from "react";
import { SSC, Marker, ScrollableStops } from "modules/createTrip/components";
import { IsError, useGet } from "common/hooks";
import { RequestLocationDataEndpoint } from "common/utilities";

interface Props {
  trip: Trip;
  center: Location;
  zoom: number;
  apiKey: string;
  destination: string;
  onClickMarker: (place: Place, day: number) => void;
  onMoveMap: (lat: number, lng: number) => void;
}

export const StopStep = ({
  center,
  zoom,
  trip,
  onClickMarker,
  onMoveMap,
  apiKey,
  destination,
}: Props) => {
  const [places, setPlaces] = React.useState<Place[]>([]);
  const [category, setCategory] = React.useState<string>("");
  const [day, setDay] = React.useState(0);

  const countries = LoadCountries();

  const {
    loading: placesLoading,
    payload: placesResult,
    request: placesRequest,
  } = useGet<Places>(RequestLocationDataEndpoint);

  useEffect(() => {
    setCategory("Food");

    const currentCountry = countries.find(
      (country) => country.name === destination
    );

    if (currentCountry) {
      onMoveMap(currentCountry.lat, currentCountry.lng);
    }
  }, []);

  useEffect(() => {
    var request: PlacesRequest = {
      lat: center.lat,
      lng: center.lng,
      zoom: zoom,
      radius: 2000,
      keyword: `'${category}'`,
    };

    placesRequest(request);
  }, [category, center]);

  useEffect(() => {
    if (!IsError(placesResult)) {
      setPlaces(placesResult.data.results);
    }
  }, [placesResult]);

  const onDragEnd = (event: any) => {
    onMoveMap(event.center.lat(), event.center.lng());
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setDay(newValue);
  };

  const handleOnClickMarker =
    (place: Place) => (e: React.MouseEvent<Element, MouseEvent>) => {
      e.preventDefault();
      onClickMarker(place, day);
    };

  const handleOnChangeCategory = (e: SelectChangeEvent<string>) => {
    setCategory(e.target.value);
  };

  if (placesLoading) {
    return <LoadingOverlay loading={true} />;
  }

  return (
    <SC.Container>
      <SSC.MapContainer>
        <SSC.Map>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: apiKey,
            }}
            center={{ lat: center.lat, lng: center.lng }}
            zoom={zoom}
            onDragEnd={onDragEnd}
            yesIWantToUseGoogleMapApiInternals
          >
            {places.map((place, i) => (
              <Marker
                key={i}
                onClick={handleOnClickMarker(place)}
                place={place}
                lat={place.geometry.location.latitude}
                lng={place.geometry.location.longitude}
              />
            ))}
          </GoogleMapReact>
        </SSC.Map>

        <ScrollableStops
          day={day}
          handleDayChange={handleChange}
          stops={trip.stops}
        />
      </SSC.MapContainer>

      <Typography gutterBottom variant="h6">
        Select a category
      </Typography>

      <Select
        placeholder="Select a category"
        value={category}
        label="Category"
        onChange={handleOnChangeCategory}
      >
        {Categories.map((category, index) => {
          return (
            <MenuItem value={category} key={index}>
              {category}
            </MenuItem>
          );
        })}
      </Select>
    </SC.Container>
  );
};
