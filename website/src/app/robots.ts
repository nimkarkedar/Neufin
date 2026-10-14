import type { MetadataRoute } from "next";
import { isLive, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isLive) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
