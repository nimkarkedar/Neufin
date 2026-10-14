import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The site imports tokens and the Logo straight from ../designsystem, so the
  // bundler root is the repo root rather than this folder.
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
