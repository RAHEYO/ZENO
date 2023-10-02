/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
// Load environment variables
dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'tinyurl.com'
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/spaces',
        permanent: true
      },
      {
        source: '/spaces',
        destination: '/spaces/@_@me',
        permanent: true
      },
    ]
  },
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  }
}

module.exports = nextConfig
