/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GTAG_ID: process.env.GTAG_ID,
  }
}

module.exports = nextConfig
