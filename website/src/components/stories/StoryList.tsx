"use client";

import { useState } from "react";
import { Segmented } from "@ds/components/Segmented.jsx";
import { LinkCards } from "@/components/sections/Blocks";
import { industries } from "@/lib/site";
import { stories, storyCard } from "@/lib/stories";
import styles from "./StoryList.module.css";

// Customer stories filtered by industry with the design system's segmented control.
const filters = ["All", ...industries.map((i) => i.label)];

export function StoryList() {
  const [current, setCurrent] = useState("All");
  const shown = stories.filter((s) => current === "All" || s.ind === current);
  return (
    <div>
      <Segmented name="story-industry" label="Industry" options={filters} value={filters.indexOf(current)} onChange={(i: number) => setCurrent(filters[i])} />
      <p className={styles.count} aria-live="polite">
        {shown.length} {shown.length === 1 ? "story" : "stories"}
      </p>
      <LinkCards
        items={shown.map(storyCard)}
      />
    </div>
  );
}
