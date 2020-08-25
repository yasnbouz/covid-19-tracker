import { ThemeProvider } from 'theme-ui';

import { ReactNode } from 'react';

import Head from 'next/head';

import { theme } from '@/theme';
import { Global, css } from '@emotion/core';

function AppLayout({ children }: { children?: ReactNode }) {
    return (
        <>
            <Head>
                {/* <!-- Must --> */}
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                <meta name="description" content="Description" />
                <meta name="keywords" content="covid-19, coronavirus, pandemic 2020" />
                <title>Covid-19</title>

                {/* <!-- Android  --> */}
                <meta name="theme-color" content="red" />
                <meta name="mobile-web-app-capable" content="yes" />

                {/* <!-- iOS --> */}
                <meta name="apple-mobile-web-app-title" content="covid-19" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />

                {/* <!-- Windows  --> */}
                <meta name="msapplication-navbutton-color" content="red" />
                <meta name="msapplication-TileColor" content="red" />
                <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
                <meta name="msapplication-config" content="browserconfig.xml" />

                {/* <!-- Pinned Sites  --> */}
                <meta name="application-name" content="covid-19" />
                <meta name="msapplication-tooltip" content="covid-19" />
                <meta name="msapplication-starturl" content="/" />

                {/* <!-- Tap highlighting  --> */}
                <meta name="msapplication-tap-highlight" content="no" />

                {/* <!-- UC Mobile Browser  --> */}
                <meta name="full-screen" content="yes" />
                <meta name="browsermode" content="application" />

                {/* <!-- Disable night mode for this page  --> */}
                <meta name="nightmode" content="enable/disable" />

                {/* <!-- Fitscreen  --> */}
                <meta name="viewport" content="uc-fitscreen=yes" />

                {/* <!-- Layout mode --> */}
                <meta name="layoutmode" content="fitscreen/standard" />

                {/* <!-- imagemode - show image even in text only mode  --> */}
                <meta name="imagemode" content="force" />

                {/* <!-- Orientation  --> */}
                <meta name="screen-orientation" content="portrait" />
                {/* <!-- Icons  --> */}
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#5bbad5" />
                <link rel="shortcut icon" href="/assets/icons/favicon.ico" />
                <meta name="msapplication-TileColor" content="#603cba" />
                <meta name="msapplication-config" content="/assets/icons/browserconfig.xml" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Global
                styles={css`
                    @font-face {
                        font-family: 'Roboto';
                        src: url('/assets/fonts/Roboto.ttf');
                    }
                    @supports (font-variation-settings: 'wdth' 200) {
                        @font-face {
                            font-family: 'CrimsonPro-Roman-VF';
                            src: url('/assets/fonts/CrimsonPro-Roman-VF.ttf');
                        }
                        body {
                            font-family: 'CrimsonPro-Roman-VF';
                            font-variation-settings: 'wdth' 400, 'wght' 98;
                        }
                    }
                    body {
                        scroll-behavior: smooth;
                        transition: background-color 0.3s ease-out, color 0.3s ease-in;
                    }
                `}
            />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </>
    );
}
export default AppLayout;