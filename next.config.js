/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    { source: '/posts', destination: '/posts/nav/1', permanent: true },
    { source: '/posts/nav', destination: '/posts/nav/1', permanent: true },
  ],
}

module.exports = nextConfig
