/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';

export default function ColorMode() {
    const [colorMode, setColorMode] = useColorMode();
    const nextColorMode: string = colorMode === 'default' ? 'dark' : 'light';
    return (
        <button
            sx={{
                appearance: 'none',
                outline: 'none',
                border: 'none',
                backgroundColor: nextColorMode === 'dark' ? '#fff' : '#212b36',
                borderRadius: '50%',
                padding: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'background-color .5s ease',
                boxShadow: `0px 0px 8px ${nextColorMode === 'dark' ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.08)'}`,
                cursor: 'pointer',
            }}
            aria-label={`Switch to ${nextColorMode} mode`}
            onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
        >
            {colorMode === 'default' ? (
                <img src="/assets/svg/moon.svg" alt="Dark Mode" />
            ) : (
                <img src="/assets/svg/sun.svg" alt="Light Mode" />
            )}
        </button>
    );
}
