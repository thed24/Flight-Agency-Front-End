/**
 * @type {import('next').NextConfig}
 * */
module.exports = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
        outputStandalone: true,
    },
    pwa: {
        dest: 'public',
        swSrc: 'src/service-worker.js',
    },
};
