import Form from "next/form";
import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { whatsappHref } from "@/lib/site";
import { ComparePanel } from "./ComparePanel";
import styles from "./Hero.module.css";

// States and union territories for the picker. Maharashtra first, as the default.
const states = [
  "Maharashtra", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.intro}`}>
        <h1 id="hero-title" className={styles.title}>
          {/* One sentence per line, so a line never breaks across the full stop. */}
          Cut Energy Cost. <br />
          On Your Terms.
        </h1>
        <p className={styles.lead}>Energy orchestration software that plans, buys and optimises clean power for your business.</p>

        {/* TODO: the options page doesn't exist yet. */}
        <Form action="/options" className={`action-field ${styles.picker}`}>
          <label className="action-field-choice">
            <span className="visually-hidden">Your state</span>
            <select name="state" defaultValue="Maharashtra">
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-accent">
            See my options
            <IconSvg icon={icons.arrow} size={20} />
          </button>
        </Form>

        <p className={styles.more}>
          Know your bill? Check <Link href="/products/bill-checker">estimated possible savings</Link> or{" "}
          <a href={whatsappHref} target="_blank" rel="noopener">
            share your bill
          </a>
        </p>
      </div>

      <div className={`container ${styles.preview}`}>
        <ComparePanel />
      </div>
    </section>
  );
}
