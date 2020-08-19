/** @jsx jsx */
import { jsx } from 'theme-ui';

import ColorMode from './ColorMode';

export default function Nav() {
    return (
        <nav sx={{ variant: 'containers.page', bg: '', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 sx={{ fontFamily: 'CrimsonPro-Roman-VF', fontVariationSettings: '"wght" 800', fontSize: [5, 6], my: 4 }}>Covid-19</h1>
            <ColorMode />
        </nav>
    );
}
