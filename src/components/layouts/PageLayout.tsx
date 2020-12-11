/** @jsx jsx */

import { jsx } from 'theme-ui';

import { ReactNode } from 'react';

import Footer from 'components/Footer';
import Header from 'components/Header';
import { NextSeo } from 'next-seo';

export default function PageLayout({ children, country, ...props }: { children: ReactNode; country: string }) {
    return (
        <div {...props} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NextSeo
                title="The Coronavirus Tracker App"
                description="Track the spread of the Coronavirus COVID-19 epidemic, browse an interactive map, view fatality rate and recoveries, check affected regions in real-time and more."
                canonical={`https://covid-19-tracker-wheat.vercel.app/${country}`}
                openGraph={{
                    type: 'website',
                    url: 'https://covid-19-tracker-wheat.vercel.app/',
                    title: 'The Coronavirus Tracker App',
                    description:
                        'Track the spread of the Coronavirus COVID-19 epidemic, browse an interactive map, view fatality rate and recoveries, check affected regions in real-time and more.',

                    images: [
                        { url: 'https://covid-19-tracker-wheat.vercel.app/covid-img.jpg', width: 800, height: 600, alt: 'covid 19 image' },
                    ],
                }}
                twitter={{ handle: '@yasnbouz', site: 'https://covid-19-tracker-wheat.vercel.app/', cardType: 'summary_large_image' }}
            />
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
