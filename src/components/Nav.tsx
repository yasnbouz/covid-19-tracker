/** @jsx jsx */
import { jsx } from 'theme-ui';

import Link from 'next/link';

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
                <Link href="/">
                    <a sx={{ textDecoration: 'none', cursor: 'pointer' }}>Covid-19</a>
                </Link>
            </h1>
            <ColorMode />
        </nav>
    );
}
