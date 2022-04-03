import { Divider, Typography } from "@mui/material";
import { Trip } from "types";
import { ConfirmationList, Container, SubTitle } from "components";

interface Props {
  trip: Trip;
}

export const ConfirmationStep = ({ trip }: Props) => {
  return (
    <Container>
      <SubTitle>
        Your current trip itinary for your trip to {trip.destination}
      </SubTitle>

      <Divider />
      <ConfirmationList trip={trip} />
      <Divider />
    </Container>
  );
};
