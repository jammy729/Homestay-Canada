/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.postimg.cc", "cdn.shopify.com"],
  },
  env: {
    MONGODB_URI:
      "mongodb+srv://jyoo3607:James990729@rental-homestay-cluster.oiblylx.mongodb.net/rentalHomestay?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
