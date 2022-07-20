const withPWA = require('next-pwa');

const isProd = process.env.NODE_ENV === 'production';

/**
 * @type {import('next').NextConfig}
 * */
module.exports = withPWA({
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    pwa: {
        dest: 'public',
        disable: !isProd,
    },
});
