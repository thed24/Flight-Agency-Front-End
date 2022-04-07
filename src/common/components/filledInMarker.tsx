import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import { Stop } from "common/types";

export type LayoutProps = {
  lat: number;
  lng: number;
  stop: Stop;
};

export function FilledInMarker({ stop }: LayoutProps) {
  const [raised, setRaised] = useState<boolean>(false);
  const toggleRaised = () => setRaised(!raised);

  const text = stop.name;

  return (
    <Card onMouseOut={toggleRaised} raised={raised} sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography color={"secondary"}> {text} </Typography>
      </CardContent>
    </Card>
  );
}
