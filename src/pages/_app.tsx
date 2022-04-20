import 'styles/globals.css';
import '@fontsource/roboto/700.css';

import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            {/* @ts-ignore */}
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
