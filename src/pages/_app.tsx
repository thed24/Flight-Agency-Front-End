import 'styles/globals.css';

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { UserProvider } from 'common/context';
import { theme } from 'common/utilities/theme';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider theme={theme}>
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    </ThemeProvider>
);

export default MyApp;
