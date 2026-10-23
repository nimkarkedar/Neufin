import type { CSSProperties } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";

export type IconName = keyof typeof icons;
export type PlaceholderTone = "daylight" | "dawn" | "violet" | "dark" | "plain";

// The design system's media placeholder: holds the place of a photo, illustration or
// product screen. TODO: every Placeholder on the site is waiting for real imagery.
export function Placeholder({
  note,
  icon = "image",
  tone = "daylight",
  ratio,
  className = "",
  style,
}: {
  note: string;
  icon?: IconName;
  tone?: PlaceholderTone;
  ratio?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const toneClass = tone === "daylight" ? "" : `placeholder-${tone}`;
  return (
    <div
      className={`placeholder ${toneClass} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      role="img"
      aria-label={`Placeholder: ${note}`}
    >
      {/* The plain tone is note only, no icon. */}
      {tone !== "plain" && (
        <span className="placeholder-icon">
          <IconSvg icon={icons[icon]} size={24} />
        </span>
      )}
      <span className="placeholder-note">{note}</span>
    </div>
  );
}
