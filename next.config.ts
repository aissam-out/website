import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  serverExternalPackages: ["shiki", "rehype-pretty-code"],
  // Hide the Next.js Dev Tools "N" badge in local development
  devIndicators: false,
};

export default nextConfig;
