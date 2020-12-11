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
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="title" content="The Coronavirus Tracker App" />
                <meta
                    name="description"
                    content="Track the spread of the Coronavirus COVID-19 epidemic, browse an interactive map, view fatality rate and recoveries, check affected regions in real-time and more."
                />
                <meta name="keywords" content="covid-19,coronavirus,pandemic 2020" />
                <meta name="author" content="@yasnbouzi" />
                <title>The Coronavirus Tracker App</title>
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
                        src: url('/assets/fonts/Roboto.ttf') format('truetype');
                        font-display: swap;
                    }
                    @supports (font-variation-settings: 'wdth' 200) {
                        @font-face {
                            font-family: 'CrimsonPro-Roman-VF';
                            src: url('/assets/fonts/CrimsonPro-Roman-VF.ttf') format('truetype');
                            font-display: swap;
                        }
                        body {
                            font-family: 'CrimsonPro-Roman-VF' !important;
                            font-variation-settings: 'wdth' 400, 'wght' 98;
                        }
                    }
                    html {
                        scrollbar-width: none;
                    }
                    img {
                        max-width: 100%;
                    }
                    section,
                    aside {
                        content-visibility: auto;
                    }
                    :focus:not(::focus-visible) {
                        outline: none;
                    }
                    body::-webkit-scrollbar {
                        width: 0;
                    }
                    ::-webkit-scrollbar {
                        width: 6px;
                    }
                    ::-webkit-scrollbar-track {
                        background-color: rgba(0, 0, 0, 0.8);
                    }
                    ::-webkit-scrollbar-thumb {
                        background-color: #dfdfdf;
                        border-radius: 10px;
                    }
                `}
            />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </>
    );
}
export default AppLayout;
