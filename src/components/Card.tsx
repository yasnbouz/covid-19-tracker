/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';

import { useCallback } from 'react';

import numeral from 'numeral';

type CardProps = {
    title: string;
    cases: number;
    total: number;
    type: 'success' | 'warning' | 'error';
    onClick: () => void;
};

export default function Card({ title, type, cases, total, onClick }: CardProps) {
    const [colorMode] = useColorMode();
    const nextColorMode: string = colorMode === 'default' ? 'dark' : 'light';
    const onKeyPress = useCallback(
        (e) => {
            const enterOrSpace = e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.which === 13 || e.which === 32;
            if (enterOrSpace) {
                e.preventDefault();
                onClick();
            }
        },
        [onClick],
    );
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyPress={onKeyPress}
            sx={{
                bg: nextColorMode === 'dark' ? 'white' : 'dark',
                p: 1,
                borderRadius: 3,
                flex: '0 0 250px',
                boxShadow: nextColorMode === 'dark' ? '0 20px 40px rgba(0,0,0,.1)' : '',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                outline: 'none',
                transition: 'background-color .3s ease-out, color 0.3s ease-in',
                ':focus': {
                    boxShadow: (theme) => `0px 0px 4px ${theme.shadows[type]}`,
                },
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
            <p sx={{ color: '#767676', fontVariationSettings: "'wght' 300" }}>{title}</p>
            <h2 sx={{ color: type, fontVariationSettings: "'wght' 450" }}>{numeral(cases).format('+0,0')}</h2>
            <p sx={{ fontVariationSettings: "'wght' 550" }}>{numeral(total).format('0.0a')} Total</p>
        </div>
    );
}
