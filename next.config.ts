import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // Base path - set via env or leave empty for custom domain
  // e.g., NEXT_PUBLIC_BASE_PATH=/ai-tools-site for GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
