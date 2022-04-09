import { Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import {
  Categories,
  Location,
  Trip,
  Place,
  Places,
  PlacesRequest,
} from "common/types";
import GoogleMapReact from "google-map-react";
import { Container, List, LoadingOverlay, Marker } from "common/components";
import React, { useEffect } from "react";
import * as SC from "../steps.styles";
import { IsError, useGet } from "common/hooks";
import { RequestLocationDataEndpoint } from "common/utilities";

interface Props {
  trip: Trip;
  center: Location;
  zoom: number;
  apiKey: string;
  onClickMarker: (place: Place) => void;
  onMoveMap: (lat: number, lng: number) => void;
}

export const StopStep = ({
  center,
  zoom,
  trip,
  onClickMarker,
  onMoveMap,
  apiKey,
}: Props) => {
  const [places, setPlaces] = React.useState<Place[]>([]);
  const [category, setCategory] = React.useState<string>("");

  const {
    loading: placesLoading,
    payload: placesResult,
    request: placesRequest,
  } = useGet<Places>(RequestLocationDataEndpoint);

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

  const entries = trip.stops.map((stop, i) => {
    return [
      {
        header: `${stop.name}`,
        content: `${stop.time.start.toLocaleTimeString()} to ${stop.time.end.toLocaleTimeString()}`,
      },
    ];
  });

  const onDragEnd = (event: any) => {
    onMoveMap(event.center.lat(), event.center.lng());
  };

  const handleOnClickMarker =
    (place: Place) => (e: React.MouseEvent<Element, MouseEvent>) => {
      e.preventDefault();
      onClickMarker(place);
    };

  const handleOnChangeCategory = (e: SelectChangeEvent<string>) => {
    setCategory(e.target.value);
  };

  if (placesLoading) {
    return <LoadingOverlay loading={true} />;
  }

  return (
    <Container>
      <SC.MapContainer>
        <SC.Map>
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
        </SC.Map>

        <List title="Stops" entries={entries} />
      </SC.MapContainer>

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
    </Container>
  );
};
