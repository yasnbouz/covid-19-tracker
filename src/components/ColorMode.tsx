/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';

export default function ColorMode() {
    const [colorMode, setColorMode] = useColorMode();
    const nextColorMode: string = colorMode === 'default' ? 'dark' : 'light';
    return (
        <button
            sx={{
                width: '44px',
                height: '44px',
                appearance: 'none',
                outline: 'none',
                border: 'none',
                backgroundColor: nextColorMode === 'dark' ? 'white' : 'dark',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'background-color .5s ease',
                boxShadow: nextColorMode === 'dark' ? '0px 0px 8px rgba(0,0,0,.08)' : '',
                cursor: 'pointer',
            }}
            aria-label={`Switch to ${nextColorMode} mode`}
            onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
        >
            {colorMode === 'default' ? (
                <img src="/assets/svg/moon.svg" alt="Dark Mode" width="24px" height="24px" />
            ) : (
                <img src="/assets/svg/sun.svg" alt="Light Mode" width="24px" height="24px" />
            )}
        </button>
    );
}
