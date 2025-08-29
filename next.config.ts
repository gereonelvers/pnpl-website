import type { NextConfig } from "next";

// Support GitHub Pages deployments under a subpath by honoring NEXT_PUBLIC_BASE_PATH.
// Example: set NEXT_PUBLIC_BASE_PATH="/repo-name" in the Pages workflow.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  // basePath is safe for static export when all asset links are relative to it
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: true,
  },
  // Ensure trailingSlash to make static export predictable on GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
