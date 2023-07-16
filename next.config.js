/** @type {import('next').NextConfig} */
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
}

module.exports = nextConfig
