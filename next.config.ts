import type { NextConfig } from "next";
export const turbopack = {};
const nextConfig: NextConfig = {
webpack(config) {
      config.module?.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  
}
module.exports = {
images: {
  domains: ["localhost", "127.0.0.1"],
},
}
  
export default nextConfig;
