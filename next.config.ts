import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.digitalindiacorporation.in",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
