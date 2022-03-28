import { Typography } from "@mui/material";
import { Trip } from "../../../types";
import styles from "./confirmationList.module.css";

interface Props {
  trip: Trip;
}
export const ConfirmationList = ({ trip }: Props) => {
  return (
    <div className={styles.destination}>
      {trip.stops.map((stop) => (
        <>
          <Typography variant="h6">{stop.name}</Typography>
          <Typography variant="subtitle1">
            From {new Date(stop.time.start).toLocaleDateString()} to{" "}
            {new Date(stop.time.end).toLocaleDateString()}
          </Typography>

          <Typography variant="subtitle1">At {stop.address}</Typography>
        </>
      ))}
    </div>
  );
};
