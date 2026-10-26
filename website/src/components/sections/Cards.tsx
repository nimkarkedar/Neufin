import Link from "next/link";
import type { StaticImageData } from "next/image";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import styles from "./Cards.module.css";

// The site's one vertical card (Kedar, 2026-10-27), the design system's .vertical-card, and
// the layouts it sits in (`cardLayouts`: three across, or a sideways row). Every card is 4:5
// with a Card title (28px) and a Body line, each cut after two lines. Two looks:
// - "photo": the picture fills the card, the text in White at the bottom;
// - "panel": the picture across the top, stepping down along the Stripe into a White panel
//   with an optional tag ("Step 3", an industry, a content type).
// With `href` the whole card is a link and shows the round arrow; without, it stays still.
// No picture yet: the media is plain Near Black (TODO in the page's data).
// Each layout also carries the design system's .vertical-card-row, so the panels in a row
// share one height (the tallest there) and the pictures line up.
export const cardLayouts = {
  three: `${styles.three} vertical-card-row`,
  row: `${styles.row} vertical-card-row`,
};

export type VerticalCardProps = {
  look?: "photo" | "panel";
  image?: StaticImageData;
  focus?: string;
  tag?: string;
  title?: string;
  text?: string;
  href?: string;
  // Words read after the title on a link, for screen readers (e.g. "on LinkedIn").
  label?: string;
};

export function VerticalCard({ look = "panel", image, focus, tag, title, text, href, label }: VerticalCardProps) {
  // A still card keeps real headings; inside a link the parts are spans.
  const Part = href ? "span" : "div";
  const Title = href ? "span" : "h3";
  const Text = href ? "span" : "p";
  const className = `vertical-card ${look === "photo" ? "vertical-card-photo" : ""}`;
  const inner = (
    <>
      <Part className="vertical-card-media">{image && <img src={image.src} alt="" style={{ objectPosition: focus }} />}</Part>
      {(title || tag) && (
        <Part className="vertical-card-body">
          <Part className="vertical-card-words">
            {tag && <span className="tag">{tag}</span>}
            {title && <Title className="vertical-card-title">{title}</Title>}
            {text && <Text className="vertical-card-text">{text}</Text>}
          </Part>
          {href && (
            <span className="vertical-card-go">
              {label && <span className="visually-hidden">{label}</span>}
              <IconSvg icon={icons.arrow} size={20} />
            </span>
          )}
        </Part>
      )}
    </>
  );
  if (!href) return <div className={className}>{inner}</div>;
  if (href.startsWith("http"))
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
