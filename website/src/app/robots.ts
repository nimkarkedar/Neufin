import type { MetadataRoute } from "next";
import { isLive, site } from "@/lib/site";

// Generated once at build time (the site is a static export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!isLive) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
