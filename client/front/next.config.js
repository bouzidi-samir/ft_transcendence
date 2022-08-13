/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: "api/:path*",
        destination: `${process.env.API_URL}/:path*`
      }
    ]
  },
  
  images: {
    domains: ['images.unsplash.com'],
  },

}

module.exports = nextConfig
