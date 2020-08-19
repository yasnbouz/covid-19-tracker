const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    /* config options here */
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['svg-url-loader'],
        });

        return config;
    },
});
