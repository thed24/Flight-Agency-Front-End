import 'styles/globals.css';
import '@fontsource/roboto/700.css';

import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>
);

export default MyApp;
