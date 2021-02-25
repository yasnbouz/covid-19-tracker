import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

import { theme } from '@/theme';
import { GA_TRACKING_ID } from 'lib/gtag';
// inject inline styles on the body before the page is rendered to avoid the flash of light if we are in dark mode
let codeToRunOnClient = '';
if (theme.colors?.modes) {
    codeToRunOnClient = `
  (function() {
    const theme = ${JSON.stringify(theme)}
    let mode = localStorage.getItem("theme-ui-color-mode")
    if (!mode) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      if (typeof mql.matches === 'boolean' && mql.matches) {
        mode = "dark"
      }
    }
    if (mode && typeof theme.colors.modes === "object" && typeof theme.colors.modes[mode] === "object") {
        // document.body.style.setProperty("--theme-ui-colors-dark","var(--theme-ui-colors-dark,"+theme.colors.dark+")")
        Object.keys(theme.colors.modes[mode]).forEach((colorName) => {
          document.body.style.setProperty("--theme-ui-colors-"+colorName, "var(--theme-ui-colors-primary,"+theme.colors.modes[mode][colorName]+")")
        })
      }
})()`;
}
class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preload" href="/assets/fonts/CrimsonPro-Roman-VF.ttf" as="font" crossOrigin="anonymous" />

                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />
                </Head>
                <body>
                    {/* Fix dark mode glitch */}
                    {codeToRunOnClient && <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
