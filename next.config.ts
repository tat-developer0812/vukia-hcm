import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/**": ["./src/content/**/*"],
  },
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
