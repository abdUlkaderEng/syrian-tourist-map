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
  async rewrites() {
    return [
        {
        source: '/region/:path*',
        destination: 'http://127.0.0.1:8000/region/:path*',
      },
      {
        source: '/region',
        destination: 'http://127.0.0.1:8000/region',
      },
      // {
      //   source: '/(regions|places|admins|whatever)/:path*',
      //   destination:  'http://127.0.0.1:8000/:path*',
      // },
    ]
  }
};

export default nextConfig;
