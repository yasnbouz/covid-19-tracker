import { roboto } from '@theme-ui/presets';

export const theme = {
    ...roboto,
    colors: {
        text: '#000',
        background: '#f4f6f8',
        primary: '#07c',
        success: '#00a476',
        warning: '#ec7100',
        error: '#FD000E',
        white: '#fff',
        dark: '#0a171f',
        modes: {
            dark: {
                text: '#fff',
                background: '#081217',
                primary: '#0cf',
            },
        },
    },
    shadows: { success: '#00a476', warning: '#ec7100', error: '#FD000E', dark: '#0a171f' },
    containers: {
        page: {
            width: '90%',
            maxWidth: '1400px',
            m: '0',
            mx: 'auto',
        },
    },
    styles: {
        ...roboto.styles,
        root: {
            fontFamily: 'body',
            lineHeight: 'body',
            fontWeight: 'body',
            scrollBehavior: 'smooth',
            transition: 'background-color .3s ease-out, color 0.3s ease-in',
            fontSize: 'clamp(0.5rem, 1vw + 0.8rem, 1.2rem)',
        },
    },
};
