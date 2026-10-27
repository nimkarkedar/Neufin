"use client";

import Image from "next/image";
import Link from "next/link";
import rahool from "@/assets/photos/team/rahool-gadkari.jpg";
import rushil from "@/assets/photos/team/rushil-noronha.jpg";
import nikita from "@/assets/photos/team/nikita-pawar.jpg";
import gaurav from "@/assets/photos/team/gaurav-chauhan.jpg";
import { IconSvg } from "@ds/components/Icon.jsx";
import { WhatsAppBadge } from "@ds/components/WhatsAppBadge.jsx";
import { icons } from "@ds/brand/icons.js";
import { site, telHref, whatsappHref } from "@/lib/site";
import { CallBackDialog } from "./contact/CallBackDialog";
import styles from "./FooterContact.module.css";

// The people who call back: the founders and business development.
const faces = [rushil, rahool, nikita, gaurav];

// The contact card above the dark footer, in three blocks: the card's heading (the content
// doc's line), request a call back, and contact us by email, phone or WhatsApp (the only
// solid button; Kedar, 2026-10-27). A fourth block across the bottom points suppliers to us,
// with a link rather than a button so the buyer asks stay first.
export function FooterContact() {
  return (
    <section className={styles.card} aria-label="Contact Neufin">
      <div className={styles.col}>
        {/* TODO: "30%" is the content doc's figure; the site also says up to 40% (one savings figure to settle). */}
        <h2 className={styles.title}>
          Why wait? <span className="muted">Buy 30% cheaper energy starting today.</span>
        </h2>
      </div>

      <div className={styles.col}>
        <h2 className={styles.title}>Speak to a Neufin specialist</h2>
        <p className={styles.text}>Tell us what you need and we&apos;ll call you back.</p>
        <span className={styles.faces} aria-hidden="true">
          {faces.map((src) => (
            <Image key={src.src} src={src} alt="" width={40} height={40} />
          ))}
        </span>
        <CallBackDialog className={styles.action} />
      </div>

      <div className={styles.col}>
        <h2 className={styles.title}>Contact us</h2>
        <address className={styles.contact}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={telHref}>{site.phone}</a>
        </address>
        <a href={whatsappHref} className={`btn btn-primary btn-badge ${styles.action}`} target="_blank" rel="noopener">
          <WhatsAppBadge />
          Contact us on WhatsApp
        </a>
      </div>

      <div className={`${styles.col} ${styles.row}`}>
        <h2 className={styles.title}>
          Are you a supplier? <span className="muted">Sell energy with Neufin.</span>
        </h2>
        <Link href="/contact" className="link-arrow">
          Get in touch
          <IconSvg icon={icons.arrow} size={20} />
        </Link>
      </div>
    </section>
  );
}
