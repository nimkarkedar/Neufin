"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import face1 from "@/assets/placeholder-faces/face-1.jpg";
import face2 from "@/assets/placeholder-faces/face-2.jpg";
import face3 from "@/assets/placeholder-faces/face-3.jpg";
import face4 from "@/assets/placeholder-faces/face-4.jpg";
import { IconSvg } from "@ds/components/Icon.jsx";
import { WhatsAppBadge } from "@ds/components/WhatsAppBadge.jsx";
import { icons } from "@ds/brand/icons.js";
import { formatIndianMobile, normaliseIndianMobile } from "@/lib/phone";
import { site, telHref, whatsappHref } from "@/lib/site";
import styles from "./FooterContact.module.css";

// TODO: placeholder faces from Unsplash until the team photos arrive.
const faces = [face1, face2, face3, face4];

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
        Call-back requests aren&apos;t connected in this preview yet. Send your bill on WhatsApp or email us instead.
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
      <p id="callback-error" className={styles.error} role="alert">
        {error}
      </p>
    </div>
  );
}

// The contact card above the dark footer, in three blocks on one soft gradient: send a
// bill on WhatsApp (the main ask, the only solid button), request a call back, or
// write or call. A fourth block across the bottom points suppliers to us, with a link
// rather than a button so the buyer asks stay first.
export function FooterContact() {
  return (
    <section className={styles.card} aria-label="Contact Neufin">
      <div className={styles.col}>
        <h2 className={styles.title}>
          Send us your latest power bill. <span className="muted">We&apos;ll show you where the money is going.</span>
        </h2>
        <a href={whatsappHref} className={`btn btn-primary btn-badge ${styles.action}`} target="_blank" rel="noopener">
          <WhatsAppBadge />
          Send your bill on WhatsApp
        </a>
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
