/** @jsx jsx */
import { jsx } from 'theme-ui';

import ColorMode from './ColorMode';

export default function Nav() {
    return (
        <nav
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: ['90%', '100%'],
                margin: 'auto',
            }}
        >
            <h1
                sx={{
                    fontVariationSettings: '"wght" 800',
                    my: 4,
                }}
            >
                Covid-19
            </h1>
            <ColorMode />
        </nav>
    );
}
