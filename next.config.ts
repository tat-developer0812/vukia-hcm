import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kia-hcm.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
