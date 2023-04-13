/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
  reactStrictMode: true,
}

// next.config.js
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

module.exports = nextConfig

