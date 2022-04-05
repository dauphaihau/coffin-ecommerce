/** @type {import('next').NextConfig} */
const fs = require('fs')

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: 'dauphaihau'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'https://coffin-ecommerce.vercel.app/api' // development api
      : 'https://coffin-ecommerce.vercel.app/api' // production api
  },
  webpack: (config, {isServer}) => {
    // if (!isServer) {
    //   // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
    //   config.node = {
    //     fs: 'empty'
    //   }
    // } else {
    //   // reset users json on codesandbox every 10 minutes because
    //   // the same json data is viewed by all users
    //   setInterval(() => {
    //     const defaultUsers = [];
    //     fs.writeFileSync('assets/data/users.json', JSON.stringify(defaultUsers, null, 4));
    //     console.log('users reset to default in next.config.js');
    //   }, 10 * 60 * 1000);
    // }
    if (isServer) {
      // reset users json on codesandbox every 10 minutes because
      // the same json data is viewed by all users
      setInterval(() => {
        const defaultUsers = [];
        fs.writeFileSync('assets/data/users.json', JSON.stringify(defaultUsers, null, 4));
        console.log('users reset to default in next.config.js');
      }, 10 * 60 * 1000);
    }
    return config;
  }
}

module.exports = nextConfig
