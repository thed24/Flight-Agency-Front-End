import { Typography, Select, MenuItem } from "@mui/material";
import style from "./stopStep.module.css";
import { Categories, Location, Trip } from "../../../types";
import GoogleMapReact from "google-map-react";
import { Marker } from "../..";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import React from "react";

interface Props {
  trip: Trip;
  center: Location;
  zoom: number;
  places: PlaceData[];
  category: string;
  onClickMarker: (place: PlaceData) => void;
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
  return (
    <>
      <div className={style.stopStep}>
        <div className={style.maps}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_API_KEY ?? "",
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            {places.map((place, i) => (
              <Marker
                key={i}
                onClick={() => onClickMarker(place)}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                place={place}
              />
            ))}
          </GoogleMapReact>
        </div>

        <div style={{ marginRight: "100px", marginLeft: "100px" }}>
          <Typography gutterBottom variant="h4">
            Planned Stops
          </Typography>
          {trip.Stops.map((stop, i) => (
            <Typography component={"div"} key={i}>
              {stop.Name} at {stop.Time.toLocaleString()}
            </Typography>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
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
