import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kia-hcm.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
