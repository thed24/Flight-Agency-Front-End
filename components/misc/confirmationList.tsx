import { Typography } from "@mui/material";
import { Trip } from "types";
import { Container } from "./container";

interface Props {
  trip: Trip;
}
export const ConfirmationList = ({ trip }: Props) => {
  return (
    <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      {trip.stops.map((stop) => (
        <>
          <Typography variant="h5">{stop.name}</Typography>
          <Typography variant="subtitle2">
            From {new Date(stop.time.start).toLocaleDateString()} to{" "}
            {new Date(stop.time.end).toLocaleDateString()}
          </Typography>

          <Typography variant="subtitle2"> At {stop.address}</Typography>
        </>
      ))}
    </Container>
  );
};
