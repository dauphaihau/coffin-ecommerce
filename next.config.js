/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_MONGODB_URI: process.env.NEXT_PUBLIC_MONGODB_URI,
    NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
  },
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    config.resolve.alias["@components"] = path.resolve(__dirname, "components");
    config.resolve.alias["@services"] = path.resolve(__dirname, "services");
    config.resolve.alias["@utils"] = path.resolve(__dirname, "utils");
    config.resolve.alias["@context"] = path.resolve(__dirname, "context");
    config.resolve.alias["@assets"] = path.resolve(__dirname, "assets");
    return config;
  },
  images: {
    domains: ['i.pravatar.cc']
  }
}

const withTM = require("next-transpile-modules")([
  'gsap',
  'hover-effect'
]);
module.exports = withTM();


module.exports = nextConfig
