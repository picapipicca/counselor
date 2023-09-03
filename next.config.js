/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== "production";
const repository = "counselor"

const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  assetPrefix: !debug ? `/${repository}/` : "",
  trailingSlash: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GTAG_ID: process.env.GTAG_ID,
    NEXT_PUBLIC_KAKAO_API_KEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
  }
}

module.exports = nextConfig
