import React, { ReactNode } from 'react';

import styled from '@emotion/styled';

export default function Grid({ children }: { children: ReactNode }) {
    return <StyledGrid>{children}</StyledGrid>;
}

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr auto;
    grid-template-rows: repeat(3, auto) 1fr;
    grid-template-areas: 'Select .' 'Stats Table' 'Map Table' 'Map Graph';
    gap: 20px;
    align-items: start;
    @media screen and (max-width: 1440px) {
        grid-template-areas: 'Select .' 'Stats Table' 'Map Graph' 'Map .';
    }
    @media screen and (max-width: 1075px) {
        grid-template-areas: 'Select .' 'Stats Table' 'Stats Graph' 'Map Map';
    }
    @media screen and (max-width: 740px) {
        grid-template-columns: 1fr;
        grid-template-areas: 'Select' 'Stats' 'Map' 'Table' 'Graph';
    }
`;
