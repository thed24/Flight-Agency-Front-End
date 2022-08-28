import { createTheme, ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#4186d4',
            100: '#6ca7ff',
        },
        secondary: {
            main: '#a4bcfe',
        },
        background: {
            default: '#a3d5fa',
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
