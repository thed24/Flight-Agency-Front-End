import { Typography } from "@mui/material";
import styles from "./confirmationStep.module.css";
import { Trip } from "../../../types";

interface Props {
  trip: Trip;
}

export const ConfirmationStep = ({ trip }: Props) => {
  return (
    <div className={styles.container}>
      <Typography variant="h5">
        Your current trip itinary for your trip to {trip.Destination}{" "}
      </Typography>

      {trip.Stops.map((stop, index) => (
        <div className={styles.destination} key={index}>
          <Typography variant="h6">{stop.Name}</Typography>
          <Typography variant="subtitle1">
            From {stop.Time.start.toLocaleDateString()} to{" "}
            {stop.Time.end.toLocaleDateString()}
          </Typography>

          <Typography variant="subtitle1">At {stop.Address}</Typography>
        </div>
      ))}
    </div>
  );
};
