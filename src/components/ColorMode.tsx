/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';

import { useEffect, useState } from 'react';

export default function ColorMode() {
    const [colorMode, setColorMode] = useColorMode();
    const nextColorMode: string = colorMode === 'default' ? 'dark' : 'light';
    const [opacity, setOpacity] = useState(0);
    useEffect(() => {
        setOpacity(1);
    }, []);
    return (
        <button
            sx={{
                width: '44px',
                height: '44px',
                appearance: 'none',
                outline: 'none',
                border: 'none',
                backgroundColor: 'background2',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: nextColorMode === 'dark' ? '0px 0px 8px rgba(0,0,0,.08)' : '',
                cursor: 'pointer',
            }}
            aria-label={`Switch to ${nextColorMode} mode`}
            onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
        >
            <img
                src={`/assets/svg/${nextColorMode === 'light' ? 'sun' : 'moon'}.svg`}
                alt={nextColorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                title={nextColorMode === 'light' ? 'Activate Light Mode' : 'Activate Dark Mode'}
                width="24px"
                height="24px"
                sx={{ opacity }}
            />
        </button>
    );
}
