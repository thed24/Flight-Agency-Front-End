import * as React from "react";
import { Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { LoadCountries } from "types";
import { Container } from "components";

interface Props {
  destination: string;
  onChange: (destination: string) => void;
}

export const DestinationStep = ({ destination, onChange }: Props) => {
  const handleOnChange = React.useCallback(
    (event: SelectChangeEvent<string>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <Container>
      <Typography variant="h5">Please select your destination</Typography>
      <Select
        style={{
          width: "25%",
          margin: "30px",
        }}
        placeholder="Select a country"
        value={destination}
        label="Destination"
        onChange={handleOnChange}
      >
        {LoadCountries().map((c, index) => {
          return (
            <MenuItem value={c.name} key={index}>
              {c.name}
            </MenuItem>
          );
        })}
      </Select>
    </Container>
  );
};
