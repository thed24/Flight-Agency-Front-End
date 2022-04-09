import { Typography, Select, MenuItem } from "@mui/material";
import { Categories, Location, Trip, Place } from "common/types";
import GoogleMapReact from "google-map-react";
import { Container, List, Marker } from "common/components";
import React from "react";
import * as SC from "../steps.styles";

interface Props {
  trip: Trip;
  center: Location;
  zoom: number;
  places: Place[];
  category: string;
  apiKey: string;
  onClickMarker: (place: Place) => void;
  onChangeCategory: (category: string) => void;
  onMoveMap: (lat: number, lng: number) => void;
}

export const StopStep = ({
  center,
  zoom,
  trip,
  places,
  category,
  onClickMarker,
  onChangeCategory,
  onMoveMap,
  apiKey,
}: Props) => {
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
        onChange={(e) => onChangeCategory(e.target.value)}
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
