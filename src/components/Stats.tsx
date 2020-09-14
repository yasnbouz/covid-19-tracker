/** @jsx jsx */
import { jsx } from 'theme-ui';

import Card from 'components/Card';

import Loader from './Loader';

export default function Stats({ data, onClick }) {
    if (!data)
        return (
            <section sx={{ gridArea: 'Stats', position: 'relative', minHeight: '200px' }}>
                <Loader />
            </section>
        );
    const { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths } = data;
    return (
        <section
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '40px 80px',
                mb: 4,
                flexWrap: 'wrap',
                gridArea: 'Stats',
            }}
        >
            <Card type="warning" title="Confirmed" cases={todayCases} total={cases} onClick={() => onClick('cases')} />
            <Card type="success" title="Recovered" cases={todayRecovered} total={recovered} onClick={() => onClick('recovered')} />
            <Card type="error" title="Deaths" cases={todayDeaths} total={deaths} onClick={() => onClick('deaths')} />
        </section>
    );
}
