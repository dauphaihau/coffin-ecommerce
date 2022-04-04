/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: 'dauphaihau'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : '' // production api
  }
  // webpack: (config, {isServer}) => {
  //   if (!isServer) {
  //     // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
  //     config.node = {
  //       fs: 'empty'
  //     }
  //   }
  //   return config;
  // }
}

module.exports = nextConfig
