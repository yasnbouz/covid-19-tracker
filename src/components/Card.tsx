/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';

import CountUp from 'react-countup';

type CardProps = {
    title: string;
    cases: number;
    total: number;
    type: 'success' | 'warning' | 'error';
};

export default function Card({ title, type, cases, total }: CardProps) {
    const [colorMode] = useColorMode();
    const nextColorMode: string = colorMode === 'default' ? 'dark' : 'light';
    return (
        <div
            sx={{
                bg: nextColorMode === 'dark' ? 'white' : 'dark',
                p: 1,
                borderRadius: 10,
                width: '250px',
                boxShadow: nextColorMode === 'dark' ? '0 20px 40px rgba(0,0,0,.1)' : '0 0 8px rgb(38 45 75 / 58%)',
                textAlign: 'center',
                mt: '40px',
                position: 'relative',
                overflow: 'hidden',
                '::after': {
                    content: '""',
                    width: '100%',
                    height: '8px',
                    display: 'block',
                    bg: type,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                },
            }}
        >
            <p sx={{ color: 'grey' }}>{title}</p>
            <h2 sx={{ color: type }}>
                <CountUp start={0} end={cases} separator="," />
            </h2>
            <p>
                <CountUp start={0} end={total} duration={3} separator="," /> Total
            </p>
        </div>
    );
}
