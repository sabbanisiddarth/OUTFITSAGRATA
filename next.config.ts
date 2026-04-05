import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/agrataoutfits",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
