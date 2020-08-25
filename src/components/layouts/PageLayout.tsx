/** @jsx jsx */

import { jsx } from 'theme-ui';

import { ReactNode } from 'react';

import Footer from 'components/Footer';
import Header from 'components/Header';

export default function PageLayout({ children, ...props }: { children: ReactNode }) {
    return (
        <div {...props} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
