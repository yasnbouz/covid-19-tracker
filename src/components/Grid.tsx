import React, { ReactNode } from 'react';

import { StyledGrid } from 'styles';

export default function Grid({ children }: { children: ReactNode }) {
    return <StyledGrid>{children}</StyledGrid>;
}
