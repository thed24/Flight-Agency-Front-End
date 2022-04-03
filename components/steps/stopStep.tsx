import { Typography, Select, MenuItem } from "@mui/material";
import { Categories, Location, Trip, Place } from "types";
import GoogleMapReact from "google-map-react";
import { List, Marker } from "components";
import React from "react";
import { getFromStorage } from "utilities";
import { Container } from "components/misc/container";
import { Map, MapContainer } from "./steps.styles";

interface Props {
  trip: Trip;
  center: Location;
  zoom: number;
  places: Place[];
  category: string;
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
}: Props) => {
  const entries = trip.stops.map((stop, i) => {
    return [
      {
        header: `${stop.name}`,
        content: `${stop.time.start.toLocaleTimeString()} to ${stop.time.end.toLocaleTimeString()}`,
      },
    ];
  });

  const onDragEnd = React.useCallback(
    (event: any) => {
      console.log(event);
      onMoveMap(event.center.lat(), event.center.lng());
    },
    [onMoveMap]
  );

  const key = getFromStorage<string>("apiKey");

  return (
    <Container>
      <MapContainer>
        <Map>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: key ?? "",
            }}
            defaultCenter={{ lat: center.lat, lng: center.lng }}
            defaultZoom={zoom}
            onDragEnd={onDragEnd}
            yesIWantToUseGoogleMapApiInternals
          >
            {places.map((place, i) => (
              <Marker
                key={i}
                onClick={() => onClickMarker(place)}
                place={place}
                lat={place.geometry.location.latitude}
                lng={place.geometry.location.longitude}
              />
            ))}
          </GoogleMapReact>
        </Map>

        <List title="Stops" entries={entries} />
      </MapContainer>

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
