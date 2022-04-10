import { Trip } from "common/types";
import { Divider, SC } from "common/components";
import { ConfirmationList } from "modules/createTrip/components";

interface Props {
  trip: Trip;
}

export const ConfirmationStep = ({ trip }: Props) => {
  return (
    <SC.Container>
      <SC.SubTitle>
        Your current trip itinary for your trip to {trip.destination}
      </SC.SubTitle>

      <Divider />
      <ConfirmationList trip={trip} />
      <Divider />
    </SC.Container>
  );
};
