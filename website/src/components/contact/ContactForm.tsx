"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { normaliseIndianMobile } from "@/lib/phone";
import { legalLinks, planFinderHref } from "@/lib/site";
import styles from "./ContactForm.module.css";

// The quote and call-back form. Built from the design system's text and select fields.
// TODO: send to the forms backend (see src/lib/callback.ts); for now it only shows the
// thank-you state.
const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana", "Haryana", "Rajasthan", "Uttar Pradesh", "More than one state"];
const needs = ["Buy cheaper power", "A Lumen demo", "Renewable energy advisory", "A services quote", "Sell power", "Something else"];

export function ContactForm() {
  const [sent, setSent] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const privacy = legalLinks.find((l) => l.label.startsWith("Privacy"))!;

  // Carry over an email typed into a "Talk to us" or "Get a quote" field elsewhere.
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    if (email && emailRef.current && !emailRef.current.value) emailRef.current.value = email;
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!normaliseIndianMobile(String(data.get("phone") ?? ""))) {
      setPhoneError(true);
      return;
    }
    setSent(String(data.get("need")));
  };

  if (sent) {
    return (
      <div className={`surface ${styles.card} ${styles.done}`} role="status">
        <span className={styles.tick}>
          <IconSvg icon={icons.check} size={28} />
        </span>
        <h2 className={styles.title}>Thanks, we&apos;ll call you back</h2>
        <p className={styles.note}>Someone from our team will call within one business day about {sent.toLowerCase()}.</p>
        <div className={styles.row}>
          <Link href={planFinderHref} className="btn btn-secondary">
            Browse energy plans
          </Link>
          <button type="button" className="link-arrow" onClick={() => setSent(null)}>
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={`surface ${styles.card}`} onSubmit={submit} noValidate={false}>
      <h2 className={styles.title}>Tell us what you need</h2>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <span className="text-field">
            <input className="text-field-input" name="name" autoComplete="name" placeholder="Full name" required />
          </span>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Company</span>
          <span className="text-field">
            <input className="text-field-input" name="company" autoComplete="organization" placeholder="Company name" required />
          </span>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Work email</span>
          <span className="text-field">
            <input ref={emailRef} className="text-field-input" type="email" name="email" autoComplete="email" placeholder="you@company.com" required />
          </span>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Mobile</span>
          <span className="text-field" data-invalid={phoneError || undefined}>
            <span className="text-field-prefix">+91</span>
            <input
              className="text-field-input"
              type="tel"
              inputMode="numeric"
              name="phone"
              autoComplete="tel-national"
              placeholder="98765 43210"
              aria-invalid={phoneError}
              aria-describedby={phoneError ? "phone-error" : undefined}
              onChange={() => setPhoneError(false)}
              required
            />
          </span>
          {phoneError && (
            <span id="phone-error" className={styles.error}>
              Enter a 10-digit Indian mobile number.
            </span>
          )}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>State</span>
          <span className="select-field">
            <span className="select-field-icon">
              <IconSvg icon={icons["field-location"]} size={18} />
            </span>
            <select name="state" defaultValue={states[0]}>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </span>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>What do you need?</span>
          <span className="select-field">
            <select name="need" defaultValue={needs[0]}>
              {needs.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </span>
        </label>
      </div>
      <button type="submit" className={`btn btn-accent ${styles.submit}`}>
        Get a call back
        <IconSvg icon={icons.arrow} size={20} />
      </button>
      <p className={styles.small}>
        By sending this, you agree to our <Link href={privacy.href}>privacy policy</Link>.
      </p>
    </form>
  );
}
