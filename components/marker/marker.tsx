import { Card, CardContent, Typography } from "@mui/material";
import React, { MouseEventHandler, useState } from "react";

export type LayoutProps = {
  lat: number;
  lng: number;
  text: string;
  onClick: MouseEventHandler;
};

export default function Marker({ lat, lng, text, onClick }: LayoutProps) {
  const [raised, setRaised] = useState<boolean>(false);
  const toggleRaised = () => setRaised(!raised);

  return (
    <Card
      onMouseOut={toggleRaised}
      raised={raised}
      sx={{ minWidth: 100 }}
      onClick={onClick}
    >
      <CardContent>
        <Typography color={"secondary"}> {text} </Typography>
      </CardContent>
    </Card>
  );
}
