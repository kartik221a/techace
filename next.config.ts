import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactRefresh: true, // Ensure Fast Refresh is enabled
  },
};

export default nextConfig;
