"use client";

import Link from "next/link";
import { useState } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { Placeholder } from "@/components/sections/Placeholder";
import { industries } from "@/lib/site";
import styles from "./Industries.module.css";

// Industries on the home page: the design system's choice chips pick an industry,
// and one surface shows what Neufin does for it, with proof and a link to its page.
// TODO: a line, two figures and client names per industry, from Neufin.
export function Industries() {
  const [current, setCurrent] = useState(0);
  const ind = industries[current];

  return (
    <div>
      <div className={styles.scroller}>
        <div className="chips" role="radiogroup" aria-label="Industry">
          {industries.map((i, n) => (
            <label key={i.href} className="chip">
              <input
                type="radio"
                name="industry"
                checked={current === n}
                onChange={() => setCurrent(n)}
              />
              {i.label}
            </label>
          ))}
        </div>
      </div>

      <div className={`surface ${styles.panel}`} aria-live="polite">
        <div className={styles.text}>
          <h3 className={styles.title}>
            Lower, steadier power cost for {ind.label.toLowerCase()}
          </h3>
          <p className={styles.line}>
            One line on how {ind.label.toLowerCase()} businesses use power, and
            what we do for them.
          </p>
          <dl className={styles.figures}>
            <div>
              <dd>X%</dd>
              <dt>lower power cost</dt>
            </div>
            <div>
              <dd>N</dd>
              <dt>sites switched</dt>
            </div>
          </dl>
          <p className={styles.clients}>Client name · Client name</p>
          <Link href={ind.href} className="link-arrow">
            Power for {ind.label.toLowerCase()}
            <IconSvg icon={icons.arrow} size={20} />
          </Link>
        </div>
        <Placeholder
          note={`Photo: a ${ind.label.toLowerCase()} site`}
          icon="image"
          tone="daylight"
          className={styles.photo}
        />
      </div>
    </div>
  );
}
