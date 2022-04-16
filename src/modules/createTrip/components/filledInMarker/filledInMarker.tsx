import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Stop } from "common/types";

export type LayoutProps = {
  key: number;
  lat: number;
  lng: number;
  stop: Stop;
};

export function FilledInMarker({ lat, lng, stop }: LayoutProps) {
  const text = stop.name;

  return (
    <Card>
      <CardContent>
        <Typography color={"secondary"}> {text} </Typography>
      </CardContent>
    </Card>
  );
}
