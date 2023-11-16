/** @type {import('next').NextConfig} */

// const nextConfig = {
//   reactStrictMode: true,
// }

const nextConfig = {
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    config.externals.push(
      "pino-pretty",
      "lokijs",
      "encoding"
    );
  return config;
}
}
// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   runtimeCaching
// })

// module.exports = withPWA({
//   // other congigs
//   reactStrictMode: false
// })

module.exports=nextConfig
