import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
    i18n: {
      locales: ['en','mn'],
        defaultLocale: 'en',
        localeDetection: false
    },
    trailingSlash: true,
    experimental: {
      globalNotFound: true,
    },
    allowedDevOrigins: ['http://http://192.168.200.111/:3000'],
};

export default nextConfig;
