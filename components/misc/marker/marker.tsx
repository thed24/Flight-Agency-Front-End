import { PlaceData } from "@googlemaps/google-maps-services-js";
import { Card, CardContent, Typography } from "@mui/material";
import React, { MouseEventHandler, useState } from "react";

export type LayoutProps = {
  lat: number;
  lng: number;
  place: PlaceData;
  onClick: MouseEventHandler;
};

export function Marker({ lat, lng, place, onClick }: LayoutProps) {
  const [raised, setRaised] = useState<boolean>(false);
  const toggleRaised = () => setRaised(!raised);

  const text = place.name;
  const address = place.formatted_address;
  const rating = place.rating;

  return (
    <Card
      onMouseOut={toggleRaised}
      raised={raised}
      sx={{ minWidth: 100 }}
      onClick={onClick}
    >
      <CardContent>
        <Typography color={"secondary"}> {text} </Typography>
        <Typography color={"secondary"}> {address} </Typography>
        <Typography color={"secondary"}> {rating} </Typography>
      </CardContent>
    </Card>
  );
}
