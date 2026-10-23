"use client";

import { useState } from "react";
import { LinkCards } from "@/components/sections/Blocks";
import { customerStories, industries } from "@/lib/site";
import styles from "./StoryList.module.css";

// Customer stories filtered by industry with the design system's chips.
// TODO: real clients, figures and story pages (one template: client and sites,
// the problem, what we did, result in numbers, client quote).
const stories = [
  { ind: "Auto", value: "X%", label: "lower power cost across N plants" },
  { ind: "Hotels and resorts", value: "₹X L", label: "saved in year one" },
  { ind: "Offices and coworking", value: "X%", label: "lower power cost, N sites, N states" },
  { ind: "Banks and finance", value: "X%", label: "lower power cost" },
  { ind: "Real estate and malls", value: "₹X L", label: "saved a year" },
  { ind: "Plastics", value: "X%", label: "lower power cost" },
  { ind: "Steel", value: "X%", label: "lower power cost" },
  { ind: "Retail chains", value: "₹X L", label: "saved a year" },
  { ind: "Hotels and resorts", value: "X%", label: "lower power cost" },
];

const filters = ["All", ...industries.map((i) => i.label)];

export function StoryList() {
  const [current, setCurrent] = useState("All");
  const shown = stories.filter((s) => current === "All" || s.ind === current);
  return (
    <div>
      <div className="chips chips-row" role="radiogroup" aria-label="Industry">
        {filters.map((f) => (
          <label key={f} className="chip">
            <input type="radio" name="story-industry" checked={current === f} onChange={() => setCurrent(f)} />
            {f}
          </label>
        ))}
      </div>
      <p className={styles.count} aria-live="polite">
        {shown.length} {shown.length === 1 ? "story" : "stories"}
      </p>
      <LinkCards
        items={shown.map((s, i) => ({
          title: "Client name",
          href: customerStories.href,
          tag: s.ind,
          cover: { note: `Photo: a ${s.ind.toLowerCase()} site, with the client's logo`, icon: "image" as const, tone: (i % 3 === 1 ? "dawn" : "daylight") as "dawn" | "daylight" },
          meta: [{ value: s.value, label: s.label }],
          linkLabel: "Read story",
        }))}
      />
    </div>
  );
}
