/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    transforms: {
      dangerousTaggedTemplateString: true,
    },
    styledComponents: true,
    swcMinify: true,
  },
  experimental: {
    concurrentFeatures: true,
  },
};
