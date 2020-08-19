import { roboto } from '@theme-ui/presets';

export const theme = {
    ...roboto,
    colors: {
        text: '#000',
        background: '#f4f6f8',
        primary: '#07c',
        modes: {
            dark: {
                text: '#fff',
                background: '#19212a',
                primary: '#0cf',
            },
        },
    },
    containers: {
        page: {
            width: '1200px',
            maxWidth: '90%',
            m: '0',
            mx: 'auto',
        },
    },
    styles: { ...roboto.styles },
};
