/** @jsx jsx */
import { jsx } from 'theme-ui';

import Card from 'components/Card';

import Loader from './Loader';

export default function Stats({ data }) {
    if (!data)
        return (
            <div sx={{ gridArea: 'Stats', position: 'relative' }}>
                <Loader />;
            </div>
        );
    const { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths } = data;
    return (
        <div
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px 80px',
                flexWrap: 'wrap',
                gridArea: 'Stats',
            }}
        >
            <Card type="warning" title="Confirmed" cases={todayCases} total={cases} />
            <Card type="success" title="Recovered" cases={todayRecovered} total={recovered} />
            <Card type="error" title="Deaths" cases={todayDeaths} total={deaths} />
        </div>
    );
}
