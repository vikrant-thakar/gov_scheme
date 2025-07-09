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
    // Performance optimizations
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@tabler/icons-react'],
  },
  // Bundle analysis - uncomment when needed
  // ...(process.env.ANALYZE === 'true' && {
  //   webpack: (config) => {
  //     config.plugins.push(
  //       new (require('@next/bundle-analyzer')({
  //         enabled: true,
  //       }))()
  //     );
  //     return config;
  //   },
  // }),
  // Compression
  compress: true,
  // Reduce bundle size
  // swcMinify: true, // Removed as it's no longer needed in Next.js 15+
};

export default nextConfig;
