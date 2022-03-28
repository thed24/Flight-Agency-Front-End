import { Typography, Select, MenuItem } from "@mui/material";
import style from "./stopStep.module.css";
import { Categories, Location, Trip, Place } from "types";
import GoogleMapReact from "google-map-react";
import { List, Marker } from "components";
import React from "react";
import { getFromStorage } from "utilities";

interface Props {
  trip: Trip;
  center: Location;
  zoom: number;
  places: Place[];
  category: string;
  onClickMarker: (place: Place) => void;
  onChangeCategory: (category: string) => void;
}

export const StopStep = ({
  center,
  zoom,
  trip,
  places,
  category,
  onClickMarker,
  onChangeCategory,
}: Props) => {
  const entries = trip.stops.map((stop, i) => {
    return [
      {
        header: `${stop.name}`,
        content: `${stop.time.start.toLocaleTimeString()} to ${stop.time.end.toLocaleTimeString()}`,
      },
    ];
  });

  const key = getFromStorage<string>("apiKey");

  return (
    <>
      <div className={style.stopStep}>
        <div className={style.maps}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: key ?? "",
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            {places.map((place, i) => (
              <Marker
                key={i}
                onClick={() => onClickMarker(place)}
                lat={place.geometry.lat}
                lng={place.geometry.lng}
                place={place}
              />
            ))}
          </GoogleMapReact>
        </div>

        <List title="Stops" entries={entries} />
      </div>
      <div className={style.selector}>
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
      </div>
    </>
  );
};
