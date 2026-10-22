import Form from "next/form";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import styles from "./EmailAction.module.css";

// A work email and one action, in the design system's action field.
// TODO: send to the forms backend; for now it opens the contact page with the email.
export function EmailAction({ label, accent = true }: { label: string; accent?: boolean }) {
  return (
    <Form action="/contact" className={`action-field ${styles.field}`}>
      <label className="action-field-choice">
        <span className="visually-hidden">Work email</span>
        <input type="email" name="email" placeholder="Your work email" autoComplete="email" required />
      </label>
      <button type="submit" className={`btn ${accent ? "btn-accent" : "btn-primary"}`}>
        {label}
        <IconSvg icon={icons.arrow} size={20} />
      </button>
    </Form>
  );
}
