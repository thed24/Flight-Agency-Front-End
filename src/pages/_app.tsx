import "styles/globals.css";

import { ThemeProvider } from "@mui/material";
import { theme } from "common/utilities/theme";
import "@fontsource/roboto/700.css";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
