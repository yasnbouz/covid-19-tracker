/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';

import { useCallback, useEffect, useRef } from 'react';

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
    const refCard = useRef<HTMLDivElement>(null!);
    useEffect(() => {
        if (type === 'error') {
            refCard.current.focus();
        }
    }, [refCard.current]);

    return (
        <div
            ref={refCard}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyPress={onKeyPress}
            sx={{
                bg: 'background2',
                p: '1em',
                borderRadius: 3,
                flex: '0 0 250px',
                boxShadow: nextColorMode === 'dark' ? '0 20px 40px rgba(0,0,0,.1)' : '',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                outline: 'none',
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
            <p sx={{ color: '#767676', fontVariationSettings: "'wght' 300", m: '0', mb: '1em' }}>{title}</p>
            <h2 sx={{ color: type, fontVariationSettings: "'wght' 450", m: '0', mb: '1em' }}>{numeral(cases).format('+0,0')}</h2>
            <p sx={{ fontVariationSettings: "'wght' 550", m: '0' }}>{numeral(total).format('0.0a')} Total</p>
        </div>
    );
}
