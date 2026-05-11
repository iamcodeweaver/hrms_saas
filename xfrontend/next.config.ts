import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "http://localhost:3000/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [{ hostname: "localhost" }],
  },
};

export default nextConfig;
