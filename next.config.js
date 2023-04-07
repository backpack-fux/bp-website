/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// next.config.js
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

module.exports = nextConfig

