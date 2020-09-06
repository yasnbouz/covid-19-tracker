import { roboto } from '@theme-ui/presets';

export const theme = {
    ...roboto,
    colors: {
        text: '#000',
        background: '#f4f6f8',
        primary: '#07c',
        success: '#05b584',
        warning: '#FB7800',
        error: '#FD000E',
        white: '#fff',
        dark: '#1E2735',
        modes: {
            dark: {
                text: '#fff',
                background: '#19212a',
                primary: '#0cf',
            },
        },
    },
    shadows: { success: '#05b584', warning: '#FB7800', error: '#FD000E' },
    containers: {
        page: {
            width: '90%',
            maxWidth: '1400px',
            m: '0',
            mx: 'auto',
        },
    },
    styles: { ...roboto.styles },
};
