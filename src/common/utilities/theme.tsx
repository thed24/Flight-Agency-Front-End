import { createTheme, ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#4186d4',
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
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
};

export const theme = createTheme(themeOptions);
