"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import rahool from "@/assets/photos/team/rahool-gadkari.jpg";
import rushil from "@/assets/photos/team/rushil-noronha.jpg";
import nikita from "@/assets/photos/team/nikita-pawar.jpg";
import gaurav from "@/assets/photos/team/gaurav-chauhan.jpg";
import { IconSvg } from "@ds/components/Icon.jsx";
import { WhatsAppBadge } from "@ds/components/WhatsAppBadge.jsx";
import { icons } from "@ds/brand/icons.js";
import { formatIndianMobile, normaliseIndianMobile } from "@/lib/phone";
import { site, telHref, whatsappHref } from "@/lib/site";
import styles from "./FooterContact.module.css";

// The people who call back: the founders and business development.
const faces = [rushil, rahool, nikita, gaurav];

// Where call-back requests are sent. Unset in the GitHub Pages preview, which has no
// server; see src/lib/callback.ts for how to connect it.
const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL;

type State = "closed" | "open" | "sending" | "error" | "unavailable" | { done: string };

// The call-back column: a button that opens a +91 field in place.
function CallBack() {
  const [state, setState] = useState<State>("closed");
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  function open() {
    setState("open");
    // Focus the field once it has rendered.
    requestAnimationFrame(() => input.current?.focus());
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const phone = normaliseIndianMobile(String(data.get("phone") ?? ""));
    if (!phone) {
      setError("Enter a 10-digit mobile number.");
      return;
    }
    setError("");
    if (!CALLBACK_URL) {
      setState("unavailable");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(CALLBACK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, company: data.get("company") }),
      });
      if (!res.ok) throw new Error();
      setState({ done: phone });
    } catch {
      setState("error");
      setError("That didn't go through. Try again, or send your bill on WhatsApp.");
    }
  }

  if (typeof state === "object") {
    return (
      <p className={styles.done} role="status">
        Thanks. We&apos;ll call you on {formatIndianMobile(state.done)}.
      </p>
    );
  }

  if (state === "unavailable") {
    return (
      <p className={styles.done} role="status">
        Call-back requests aren&apos;t connected in this preview yet. Contact us on WhatsApp or email us instead.
      </p>
    );
  }

  if (state === "closed") {
    return (
      <button type="button" className={`btn btn-secondary ${styles.action}`} onClick={open}>
        Request a call back
      </button>
    );
  }

  return (
    <div className={styles.action}>
      <form className={styles.form} onSubmit={submit} noValidate>
        <label htmlFor="callback-phone" className="visually-hidden">
          Your mobile number
        </label>
        <span className={`text-field ${styles.field}`} data-invalid={error ? true : undefined}>
          <span className="text-field-prefix" aria-hidden="true">
            +91
          </span>
          <input
            ref={input}
            id="callback-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="Your mobile number"
            className="text-field-input"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "callback-error" : undefined}
          />
        </span>
        {/* Honeypot for bots; hidden from people and screen readers. */}
        <input name="company" tabIndex={-1} autoComplete="off" className={styles.trap} aria-hidden="true" />
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Call me back"}
        </button>
      </form>
      <p id="callback-error" className={`form-field-error ${styles.error}`} role="alert">
        {error && (
          <>
            <IconSvg icon={icons["field-error"]} size={16} />
            {error}
          </>
        )}
      </p>
    </div>
  );
}

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
        <p className={styles.text}>Leave your number and we&apos;ll call you back.</p>
        <span className={styles.faces} aria-hidden="true">
          {faces.map((src) => (
            <Image key={src.src} src={src} alt="" width={40} height={40} />
          ))}
        </span>
        <CallBack />
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
