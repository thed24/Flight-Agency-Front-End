import { ThemeOptions } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';

export const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#4c91e0',
            100: '#6ca7ff',
            200: '#4186d4',
            300: '#1a6ab0',
            400: '#0d4c8a',
            500: '#003066',
        },
        secondary: {
            main: '#a4bcfe',
            100: '#c6d7ff',
            200: '#9eb5ff',
        },
        info: {
            main: '#000000',
        },
        background: {
            default: '#dceffd8e',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#000000',
        },
    },
    components: {
        MuiButton: {},
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 18,
        fontWeightRegular: 300,
    },
};

export const theme = createTheme(themeOptions);
