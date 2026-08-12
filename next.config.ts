import type { NextConfig } from "next";
import { getLanAllowedDevOrigins } from "./lib/config/lan-access";

const lanAllowedDevOrigins = getLanAllowedDevOrigins();

const nextConfig: NextConfig = {
  ...(lanAllowedDevOrigins.length > 0 ? { allowedDevOrigins: lanAllowedDevOrigins } : {}),

  // Cloudflare Pages / next-on-pages compatibility:
  // do not use standalone output or the unsupported React strict-mode option.
  poweredByHeader: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img3.doubanio.com' },
      { protocol: 'https', hostname: 'img1.doubanio.com' },
      { protocol: 'https', hostname: 'img2.doubanio.com' },
      { protocol: 'https', hostname: 'img9.doubanio.com' },
      { protocol: 'http', hostname: '**.com' },
      { protocol: 'https', hostname: '**.com' },
      { protocol: 'http', hostname: '**.cn' },
      { protocol: 'https', hostname: '**.cn' },
      { protocol: 'http', hostname: '**.net' },
      { protocol: 'https', hostname: '**.net' },
      { protocol: 'http', hostname: '**.org' },
      { protocol: 'https', hostname: '**.org' },
      { protocol: 'http', hostname: '**.tv' },
      { protocol: 'https', hostname: '**.tv' },
      { protocol: 'http', hostname: '**.io' },
      { protocol: 'https', hostname: '**.io' },
      { protocol: 'http', hostname: '**.xyz' },
      { protocol: 'https', hostname: '**.xyz' },
      { protocol: 'http', hostname: '**.online' },
      { protocol: 'https', hostname: '**.online' },
      { protocol: 'http', hostname: '**.top' },
      { protocol: 'https', hostname: '**.top' },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
