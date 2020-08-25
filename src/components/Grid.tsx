import React, { ReactNode } from 'react';

import styled from '@emotion/styled';

export default function Grid({ children }: { children: ReactNode }) {
    return <StyledGrid>{children}</StyledGrid>;
}

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: 'Select Select . .' 'Stats Stats Table Table' 'Map Map Graph Graph' 'Map Map . .';
    gap: 20px;
    align-items: center;
    @media screen and (max-width: 520px) {
        grid-template-columns: 1fr;
        grid-template-areas: 'Select' 'Stats' 'Map' 'Table' 'Graph';
    }
`;
