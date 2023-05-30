/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.postimg.cc", "cdn.shopify.com"],
  },
  env: {
    API_ENDPOINT: "https://server-homestay-canada.vercel.app",
    API_DEVELOPMENT: "http://localhost:8000/listing",
  },
};

module.exports = nextConfig;
