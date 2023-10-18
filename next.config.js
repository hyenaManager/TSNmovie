/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            // port: '3000',
            // pathname: '/account123/**',
          },
        ],
        dangerouslyAllowSVG: true,

      },
    experimental: {
        scrollRestoration: true,
    },
}