import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Generated once at build time (the site is a static export).
export const dynamic = "force-static";

// Add each page here as it is built. Blog posts will be added from Sanity.
const routes = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: `${site.url}${path}` }));
}
