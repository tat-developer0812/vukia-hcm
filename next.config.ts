import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 mặc định chỉ cho phép quality [75]; mở thêm 90 để ảnh xe nét hơn.
    qualities: [75, 90],
    // AVIF trước (nét hơn ở cùng dung lượng), WebP làm fallback.
    formats: ["image/avif", "image/webp"],
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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/tatdevweb/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "platform.cstatic-images.com",
      },
    ],
  },
};

export default nextConfig;
