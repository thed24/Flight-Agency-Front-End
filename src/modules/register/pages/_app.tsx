import "styles/globals.css";

import { ThemeProvider } from "@mui/material";
import { theme } from "common/utilities";
import "@fontsource/roboto/700.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
