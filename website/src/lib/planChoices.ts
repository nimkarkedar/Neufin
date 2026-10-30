"use client";

import { useEffect, useState } from "react";

// What a visitor has told us about their site (state, business type, yearly use, term,
// investment, work email) and the pack they picked in the plan finder, shared by the Energy plans page's header and plan list. It comes
// from the link they arrived with (e.g. /products/plan-finder/?state=Gujarat&term=mid), else
// from their last visit on this browser, and every change is written back to both, so the
// choice persists (brief: "that choice / info should persist on this page").
// TODO: pages that link here (home hero and plan finder, Buy cheaper power) should add their
// choices to the link; state auto-detection by location needs a location service.
type PlanChoices = {
  state?: string;
  type?: string;
  use?: string;
  term?: string;
  investment?: string;
  email?: string;
  pack?: string;
};

const keys: (keyof PlanChoices)[] = ["state", "type", "use", "term", "investment", "email", "pack"];
const storageKey = "neufin-plan-choices";
const changed = "neufin:plan-choices";

function read(): PlanChoices {
  let stored: PlanChoices = {};
  try {
    stored = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
  } catch {
    // Storage can be blocked (private windows); the link still works.
  }
  const params = new URLSearchParams(window.location.search);
  const fromLink = Object.fromEntries(keys.flatMap((k) => (params.get(k) ? [[k, params.get(k)!]] : []))) as PlanChoices;
  return { ...stored, ...fromLink };
}

function write(next: PlanChoices) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    // Storage blocked; keep going with the link only.
  }
  const params = new URLSearchParams(window.location.search);
  keys.forEach((k) => (next[k] ? params.set(k, next[k]!) : params.delete(k)));
  const query = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
  window.dispatchEvent(new Event(changed));
}

// The visitor's choices, and a setter that merges one change. Empty until the page has
// loaded in the browser (the page is pre-rendered without them).
export function usePlanChoices(): [PlanChoices, (change: PlanChoices) => void] {
  const [choices, setChoices] = useState<PlanChoices>({});
  useEffect(() => {
    const sync = () => setChoices(read());
    sync();
    window.addEventListener(changed, sync);
    return () => window.removeEventListener(changed, sync);
  }, []);
  return [choices, (change) => write({ ...read(), ...change })];
}
