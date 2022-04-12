/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    RUN_ENV: process.env.RUN_ENV
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_MONGODB_URI: process.env.NEXT_PUBLIC_MONGODB_URI,
    NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
  }
}

module.exports = nextConfig
