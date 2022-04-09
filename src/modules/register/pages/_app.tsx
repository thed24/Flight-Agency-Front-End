import "styles/globals.css";
import "@fontsource/roboto/700.css";

import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
