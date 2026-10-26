"use client";

import { useState } from "react";
import { Segmented } from "@ds/components/Segmented.jsx";
import { site } from "@/lib/site";
import styles from "./Roles.module.css";

// Open roles, grouped by team and filtered with the design system's segmented control.
// Each role shows its team, title, experience, place and type, with View role and Apply.
// TODO: real roles (title, experience, place, type) and their pages.
const teams = ["Engineering", "Business development", "Commercial", "Trading", "Product", "Marketing", "Finance"];

export function Roles() {
  const [team, setTeam] = useState("All");
  const options = ["All", ...teams];
  const shown = teams.filter((t) => team === "All" || t === team);
  return (
    <div>
      <Segmented name="team" label="Team" options={options} value={options.indexOf(team)} onChange={(i: number) => setTeam(options[i])} />
      <ul className={`surface ${styles.list}`} aria-live="polite">
        {shown.map((t) => (
          <li key={t} className={styles.role}>
            <div>
              <span className="tag">{t}</span>
              <p className={styles.title}>Role title</p>
              <p className={styles.meta}>N+ years · Bengaluru · Full-time</p>
            </div>
            <div className={styles.actions}>
              {/* TODO: link to the role's own page once roles exist. */}
              <a href="#roles" className="link-arrow">
                View role
              </a>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${t} role`)}`} className="btn btn-primary">
                Apply
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
