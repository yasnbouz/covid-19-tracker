const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.NEXT_ANALYZE === 'true',
});
const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');

const runtimeCaching = require('./src/lib/cache.js');

const nextConfig = {
    workboxOpts: {
        swDest: process.env.NEXT_EXPORT === 'true' ? 'service-worker.js' : 'static/service-worker.js',
        runtimeCaching,
    },
    webpack: function (config, { buildId, dev, isServer, defaultLoaders, webpack }) {
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]',
                },
            },
        });
        config.plugins.push(
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        );
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/service-worker.js',
                destination: '/_next/static/service-worker.js',
            },
            {
                source: '/',
                destination: '/countries/worldwide',
            },
        ];
    },
};
module.exports = withBundleAnalyzer(withOffline(withCSS(nextConfig)));
