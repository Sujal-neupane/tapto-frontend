import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Output configuration (standalone only for production)
  ...(process.env.NODE_ENV === 'production' && { output: "standalone" }),
  
  // Image optimization (simplified for faster dev)
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Fast compilation and build optimization
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Experimental features for faster builds
  experimental: {
    optimizePackageImports: ['lucide-react'],
    scrollRestoration: true,
  },
  
  // Turbopack configuration
  turbopack: {
    root: path.join(__dirname),
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },

  // Redirects for auth
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landingpage",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:4000/uploads/:path*",
      },
    ];
  },

  
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
