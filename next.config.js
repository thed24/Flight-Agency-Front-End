/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
        swcMinify: true,
        outputStandalone: true,
    },
    experimental: {
        modularizeImports: {
            '@mui/material': {
                transform: '@mui/material/{{member}}',
            },
            '@mui/icons-material': {
                transform: '@mui/icons-material/{{member}}',
            },
        },
    },
    pwa: {
        dest: 'public',
        swSrc: 'src/service-worker.js',
    },
};
