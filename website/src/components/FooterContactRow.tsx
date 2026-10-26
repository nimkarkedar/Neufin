"use client";

import { usePathname } from "next/navigation";
import { careers, contactLink, solutions } from "@/lib/site";
import { FooterContact } from "./FooterContact";

// The footer's contact card, on every page but Contact (which already is one), Careers
// and Sell energy (it is for buyers, not candidates or suppliers; Sell energy closes on its
// own call-back block). Kedar, 2026-10-25 and 2026-10-26.
const without = [contactLink.href, careers.href, solutions.sell.href];
export function FooterContactRow({ className }: { className: string }) {
  const path = usePathname().replace(/\/$/, "");
  if (without.includes(path)) return null;
  return (
    <div className={`container ${className}`}>
      <FooterContact />
    </div>
  );
}
