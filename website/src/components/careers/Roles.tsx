"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import styles from "./Roles.module.css";

// Open roles, filtered by team with the design system's chips.
// TODO: real roles (title, experience, place, type) and their pages.
const teams = ["Engineering", "Business development", "Commercial", "Trading", "Product", "Marketing", "Finance"];

export function Roles() {
  const [team, setTeam] = useState("All");
  const shown = teams.filter((t) => team === "All" || t === team);
  return (
    <div>
      <div className={styles.scroller}>
        <div className="chips" role="radiogroup" aria-label="Team">
          {["All", ...teams].map((t) => (
            <label key={t} className="chip">
              <input type="radio" name="team" checked={team === t} onChange={() => setTeam(t)} />
              {t}
            </label>
          ))}
        </div>
      </div>
      <ul className={`surface ${styles.list}`} aria-live="polite">
        {shown.map((t) => (
          <li key={t} className={styles.role}>
            <div>
              <span className="tag">{t}</span>
              <p className={styles.title}>Role title</p>
              <p className={styles.meta}>N+ years · Bengaluru · Full-time</p>
            </div>
            <div className={styles.actions}>
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
