/**
 * @type {import('next').NextConfig}
 * */
module.exports = {
    reactStrictMode: true,
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
    compiler: {
        styledComponents: true,
    },
}
