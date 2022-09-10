import 'styles/globals.css';

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from 'common/utilities/theme';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    </ThemeProvider>
);

export default MyApp;
