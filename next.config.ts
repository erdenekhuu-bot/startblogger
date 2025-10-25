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
    allowedDevOrigins: ['http://localhost:3000'],
};

export default nextConfig;
