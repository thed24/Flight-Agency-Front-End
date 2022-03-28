import { Typography, Select, MenuItem } from "@mui/material";
import styles from "./destinationStep.module.css";
import { LoadCountries } from "types";

interface Props {
  destination: string;
  onChange: (destination: string) => void;
}

export const DestinationStep = ({ destination, onChange }: Props) => {
  return (
    <div className={styles.container}>
      <Typography variant="h5">Please select your destination</Typography>
      <Select
        style={{
          width: "25%",
          margin: "30px",
        }}
        placeholder="Select a country"
        value={destination}
        label="Destination"
        onChange={(e) => onChange(e.target.value)}
      >
        {LoadCountries().map((c, index) => {
          return (
            <MenuItem value={c.name} key={index}>
              {c.name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};
