/** @jsx jsx */

import { jsx, Link } from 'theme-ui';

export default function Footer() {
    return (
        <footer
            sx={{
                marginTop: 'auto',
                textAlign: 'center',
                fontVariationSettings: "'wght' 800",
            }}
        >
            <p>
                Made with <span sx={{ color: 'warning' }}>❤</span> by{' '}
                <Link href="https://github.com/yasnbouzi" target="_blank" rel="noopener" style={{ color: '#055dbd' }}>
                    @yasnbouzi
                </Link>
            </p>
        </footer>
    );
}
