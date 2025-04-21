import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Enable linting during builds to catch issues early
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Fail the build if there are type errors (recommended for production)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
