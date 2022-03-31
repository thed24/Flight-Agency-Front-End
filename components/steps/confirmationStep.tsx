import { Typography } from "@mui/material";
import { Trip } from "types";
import { ConfirmationList, Container } from "components";

interface Props {
  trip: Trip;
}

export const ConfirmationStep = ({ trip }: Props) => {
  return (
    <Container>
      <Typography variant="h5">
        Your current trip itinary for your trip to {trip.destination}{" "}
      </Typography>

      <ConfirmationList trip={trip} />
    </Container>
  );
};
