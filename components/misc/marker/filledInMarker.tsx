import { PlaceData } from "@googlemaps/google-maps-services-js";
import { Card, CardContent, Typography } from "@mui/material";
import React, { MouseEventHandler, useState } from "react";
import { Stop } from "../../../types";

export type LayoutProps = {
  lat: number;
  lng: number;
  stop: Stop;
};

export function FilledInMarker({ lat, lng, stop }: LayoutProps) {
  const [raised, setRaised] = useState<boolean>(false);
  const toggleRaised = () => setRaised(!raised);

  const text = stop.Name;

  return (
    <Card onMouseOut={toggleRaised} raised={raised} sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography color={"secondary"}> {text} </Typography>
      </CardContent>
    </Card>
  );
}
