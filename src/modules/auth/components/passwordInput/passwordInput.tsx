import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import React from "react";

interface Props {
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({ password, onPasswordChange }: Props) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ m: 1, width: "25ch", gap: "20px" }} variant="outlined">
      <InputLabel>Password</InputLabel>
      <OutlinedInput
        id="outlined-basic"
        label="Password"
        value={password}
        type={passwordVisible ? "text" : "password"}
        onChange={onPasswordChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
