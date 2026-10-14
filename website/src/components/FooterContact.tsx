"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { formatIndianMobile, normaliseIndianMobile } from "@/lib/phone";
import { site, telHref, whatsappHref } from "@/lib/site";
import styles from "./FooterContact.module.css";

// TODO: placeholder faces from Unsplash until the team photos arrive.
const faces = ["face-1", "face-2", "face-3", "face-4"].map((f) => `/placeholder/faces/${f}.jpg`);

// WhatsApp glyph from Simple Icons (CC0).
const WhatsAppIcon = () => (
  <span className={styles.wa} aria-hidden="true">
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  </span>
);

type State = "closed" | "open" | "sending" | "error" | { done: string };

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
    setState("sending");
    try {
      const res = await fetch("/api/callback", {
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
        <span className={styles.field} data-invalid={error ? true : undefined}>
          <span className={styles.prefix} aria-hidden="true">
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
            className={styles.input}
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
// write or call.
export function FooterContact() {
  return (
    <section className={styles.card} aria-label="Contact Neufin">
      <div className={styles.col}>
        <h2 className={styles.title}>
          Send us your latest power bill. <span className="muted">We&apos;ll show you where the money is going.</span>
        </h2>
        <a href={whatsappHref} className={`btn btn-primary ${styles.action} ${styles.waButton}`} target="_blank" rel="noopener">
          <WhatsAppIcon />
          Send your bill on WhatsApp
        </a>
      </div>

      <div className={styles.col}>
        <h2 className={styles.title}>Speak to a Neufin specialist</h2>
        <p className={styles.text}>Leave your number and we&apos;ll call you back.</p>
        <span className={styles.faces} aria-hidden="true">
          {faces.map((src) => (
            <Image key={src} src={src} alt="" width={40} height={40} />
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
    </section>
  );
}
