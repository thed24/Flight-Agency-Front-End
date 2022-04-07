import { createTheme } from "@mui/material/styles";
import { pink, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: pink[500],
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});
