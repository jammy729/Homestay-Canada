/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.postimg.cc", "cdn.shopify.com"],
  },
  env: {
    API_ENDPOINT: "http://localhost:8000",
    API_DEVELOPMENT: "https://server-homestay-canada.vercel.app",
  },
};

module.exports = nextConfig;
