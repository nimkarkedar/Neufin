import type { Metadata, Viewport } from "next";
// Global styles load first so component styles (CSS Modules) can override them:
// the site's base styles, then the design system's buttons and text fields.
import "./globals.css";
import "@ds/styles/ui.css";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLive, site } from "@/lib/site";
import { tokensCss } from "@/lib/tokens";
import { hexOf } from "@ds/brand/tokens.js";

const archivo = Archivo({ variable: "--nf-archivo", subsets: ["latin"] });
const plexSans = IBM_Plex_Sans({
  variable: "--nf-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const plexMono = IBM_Plex_Mono({
  variable: "--nf-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: isLive ? undefined : { index: false, follow: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: hexOf("warm-white"),
};

const organisation = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  sameAs: [site.linkedin, site.instagram, site.x],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: tokensCss({ display: "--nf-archivo", body: "--nf-plex-sans", mono: "--nf-plex-mono" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
