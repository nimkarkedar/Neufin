import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The preview is published as static files to GitHub Pages (npm run deploy), at
  // /Neufin/website. Local dev runs at /. On a server host, drop `output`,
  // `trailingSlash` and `images`, and Cache Components (`cacheComponents: true`,
  // `partialPrefetching: true`) can be turned back on; they don't work with a
  // static export. See the handover notes in CLAUDE.md.
  output: "export",
  basePath: process.env.BASE_PATH ?? "",
  trailingSlash: true,
  images: { unoptimized: true },
  // The site imports tokens and the Logo straight from ../designsystem, so the
  // bundler root is the repo root rather than this folder.
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
