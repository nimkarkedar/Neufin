import type { Metadata } from "next";

// Page metadata: title (the layout adds "| Neufin Energy"), description, canonical
// and the matching Open Graph fields.
export const pageMeta = (title: string, description: string, path: string): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
});
