import { Typography } from "@mui/material";
import styles from "./confirmationStep.module.css";
import { Trip } from "types";
import { ConfirmationList } from "components";

interface Props {
  trip: Trip;
}

export const ConfirmationStep = ({ trip }: Props) => {
  return (
    <div className={styles.container}>
      <Typography variant="h5">
        Your current trip itinary for your trip to {trip.destination}{" "}
      </Typography>

      <ConfirmationList trip={trip} />
    </div>
  );
};
