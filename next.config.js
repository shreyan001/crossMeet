/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        port: '',
        pathname: '/set_set1/bgset_bg1/**',
      },
    ],
  },
};

module.exports = nextConfig;
