import * as React from "react";
import {
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
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
      <FormControl style={{ width: "15%", margin: "30px" }}>
        <InputLabel>Select a country</InputLabel>
        <Select
          label={"Select a country"}
          value={destination}
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
      </FormControl>
    </Container>
  );
};
