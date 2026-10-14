import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Add each page here as it is built. Blog posts will be added from Sanity.
const routes = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: `${site.url}${path}` }));
}
