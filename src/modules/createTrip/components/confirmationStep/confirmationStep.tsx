import { Trip } from "common/types";
import {
  ConfirmationList,
  Container,
  Divider,
  SubTitle,
} from "common/components";

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
