/* eslint-disable no-param-reassign */
/**
 * @type {import('next').NextConfig}
 * */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
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
    webpack: (config) => {
        config.module.rules = [
            ...config.module.rules,
            {
                test: /libs\/.*src\/index.ts/i,
                sideEffects: false,
            },
        ]

        return config;
    },
    compiler: {
        styledComponents: true,
    },
}
