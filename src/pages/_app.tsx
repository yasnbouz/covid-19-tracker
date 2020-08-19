import { AppProps } from 'next/app';

import AppLayout from 'components/layouts/AppLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>
    );
}
