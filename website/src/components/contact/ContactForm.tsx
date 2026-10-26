"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { normaliseIndianMobile } from "@/lib/phone";
import { legalLinks, planFinderHref } from "@/lib/site";
import styles from "./ContactForm.module.css";

// The quote and call-back form. Built from the design system's form field, text and select
// fields. What and where come first, then who and how to reach them, two to a row from
// tablets. Errors show when the form is sent (focus moves to the first one), then update as
// the person types; each is one line saying how to fix it. `short` asks only for name, work
// email and mobile (Energy plans, "Not sure which plan fits?"), with no title of its own.
// TODO: send to the forms backend (see src/lib/callback.ts); for now it only shows the
// thank-you state.
const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana", "Haryana", "Rajasthan", "Uttar Pradesh", "More than one state"];
const needs = ["Buy cheaper power", "A Lumen demo", "Renewable energy advisory", "A services quote", "Sell power", "Something else"];

type Key = "name" | "company" | "email" | "phone";
const fullOrder: Key[] = ["name", "company", "email", "phone"];
const shortOrder: Key[] = ["name", "email", "phone"];

const check: Record<Key, (v: string) => string> = {
  name: (v) => (v.trim().length < 2 ? "Enter your full name." : ""),
  company: (v) => (v.trim().length < 2 ? "Enter your company name." : ""),
  email: (v) => (!v.trim() ? "Enter your work email." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter an email like you@company.com."),
  phone: (v) => (!v.trim() ? "Enter your mobile number." : normaliseIndianMobile(v) ? "" : "Enter a 10-digit Indian mobile number."),
};

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="form-field-error">
          <IconSvg icon={icons["field-error"]} size={16} />
          {error}
        </p>
      )}
    </div>
  );
}

// `topic` names what a short form is about in the thank-you note (Sell energy: "selling
// your energy"); without it the note is about a plan and offers the energy plans.
export function ContactForm({ short = false, topic }: { short?: boolean; topic?: string }) {
  const order = short ? shortOrder : fullOrder;
  const [sent, setSent] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [tried, setTried] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const privacy = legalLinks.find((l) => l.label.startsWith("Privacy"))!;

  // Carry over an email typed into a "Talk to us" or "Get a quote" field elsewhere.
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    const input = form.current?.elements.namedItem("email") as HTMLInputElement | null;
    if (email && input && !input.value) input.value = email;
  }, []);

  // After the first send, a field's message updates as the person types or leaves it.
  const recheck = (key: Key, value: string) => {
    if (tried) setErrors((e) => ({ ...e, [key]: check[key](value) }));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = Object.fromEntries(order.map((k) => [k, check[k](String(data.get(k) ?? ""))])) as Record<Key, string>;
    setErrors(found);
    setTried(true);
    const first = order.find((k) => found[k]);
    if (first) {
      (e.currentTarget.elements.namedItem(first) as HTMLInputElement).focus();
      return;
    }
    setSent(short ? (topic ?? "a plan for your sites") : String(data.get("need")));
  };

  // Props shared by the text inputs: the error wiring for screen readers.
  const wire = (key: Key) => ({
    id: `contact-${key}`,
    name: key,
    className: "text-field-input",
    required: true,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => recheck(key, ev.target.value),
    onBlur: (ev: React.FocusEvent<HTMLInputElement>) => recheck(key, ev.target.value),
  });
  const invalid = (key: Key) => (errors[key] ? true : undefined);

  if (sent) {
    return (
      <div className={`surface ${styles.card} ${styles.done}`} role="status">
        <span className={styles.tick}>
          <IconSvg icon={icons.check} size={28} />
        </span>
        <h2 className={styles.title}>Thanks, we&apos;ll call you back</h2>
        <p className={styles.note}>Someone from our team will call within one business day about {sent.toLowerCase()}.</p>
        <div className={styles.row}>
          {!topic && (
            <Link href={planFinderHref} className="btn btn-secondary">
              Browse energy plans
            </Link>
          )}
          <button type="button" className="link-arrow" onClick={() => setSent(null)}>
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={form} className={`surface ${styles.card}`} onSubmit={submit} noValidate>
      {!short && <h2 className={styles.title}>Tell us what you need</h2>}
      <p className={styles.required}>All fields are required.</p>
      <div className={styles.grid}>
        {!short && (
          <>
            <Field id="contact-need" label="What do you need?">
              <span className="select-field">
                <select id="contact-need" name="need" defaultValue={needs[0]}>
                  {needs.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </span>
            </Field>
            <Field id="contact-state" label="State">
              <span className="select-field">
                <span className="select-field-icon">
                  <IconSvg icon={icons["field-location"]} size={18} />
                </span>
                <select id="contact-state" name="state" defaultValue={states[0]}>
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </span>
            </Field>
          </>
        )}
        <Field id="contact-name" label="Name" error={errors.name}>
          <span className="text-field" data-invalid={invalid("name")}>
            <input {...wire("name")} autoComplete="name" placeholder="Full name" />
          </span>
        </Field>
        {!short && (
          <Field id="contact-company" label="Company" error={errors.company}>
            <span className="text-field" data-invalid={invalid("company")}>
              <input {...wire("company")} autoComplete="organization" placeholder="Company name" />
            </span>
          </Field>
        )}
        <Field id="contact-email" label="Work email" error={errors.email}>
          <span className="text-field" data-invalid={invalid("email")}>
            <input {...wire("email")} type="email" autoComplete="email" placeholder="you@company.com" />
          </span>
        </Field>
        <Field id="contact-phone" label="Mobile" error={errors.phone}>
          <span className="text-field" data-invalid={invalid("phone")}>
            <span className="text-field-prefix" aria-hidden="true">
              +91
            </span>
            <input {...wire("phone")} type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" />
          </span>
        </Field>
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
