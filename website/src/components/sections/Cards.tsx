import Link from "next/link";
import type { StaticImageData } from "next/image";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import styles from "./Cards.module.css";

// The two cards Careers and About are built from, so the pages read as one family
// (Kedar, 2026-10-26). Lay them out with `cardLayouts`: three across, four across (sideways
// on phones) or a sideways row of photo cards.
export { styles as cardLayouts };

// Photo card: the design system's image card, 4:5, title and line on the photo. Until a
// photo arrives it is Grey 800 with a note (a neutral stand-in, so placeholders don't add
// violet). With `href` the whole card is a link and its call to action shows on hover;
// without, it stays still (`.image-card-static`).
export function PhotoCard({
  title,
  text,
  photo,
  focus,
  note,
  href,
  cta,
}: {
  title?: string;
  text?: string;
  photo?: StaticImageData;
  focus?: string;
  note?: string;
  href?: string;
  cta?: string;
}) {
  const look = photo ? "image-card-wash" : styles.emptyCard;
  // A still card keeps a real heading; inside a link the parts are spans.
  const Body = href ? "span" : "div";
  const Title = href ? "span" : "h3";
  const Text = href ? "span" : "p";
  const inner = (
    <>
      {photo ? (
        <img src={photo.src} alt="" style={{ objectPosition: focus }} />
      ) : (
        <span className={styles.cardNote} role="img" aria-label={`Placeholder: ${note}`}>
          <IconSvg icon={icons.image} size={24} />
          {note}
        </span>
      )}
      {title && (
        <Body className="image-card-body">
          <Title className="image-card-title">{title}</Title>
          {text && <Text className="image-card-text">{text}</Text>}
          {href && cta && (
            <span className="image-card-cta" aria-hidden="true">
              {cta}
              <IconSvg icon={icons.arrow} size={18} />
            </span>
          )}
        </Body>
      )}
    </>
  );
  if (!href) return <div className={`image-card image-card-static ${look}`}>{inner}</div>;
  if (href.startsWith("http"))
    return (
      <a href={href} className={`image-card ${look}`} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  return (
    <Link href={href} className={`image-card ${look}`}>
      {inner}
    </Link>
  );
}

// Art card: a White card with a round spot illustration, a title and a line. Left-aligned
// with a 160px spot; `centred` gives a 200px spot over centred text (How we work, Kedar's
// mock). Until the illustration arrives, a Warm White circle holds the note.
export function ArtCard({ art, note, title, text, centred = false }: { art?: StaticImageData; note?: string; title: string; text: string; centred?: boolean }) {
  return (
    <div className={`${styles.artCard} ${centred ? styles.centred : ""}`}>
      {art ? (
        <img src={art.src} alt="" className={styles.cardArt} />
      ) : (
        <span className={`${styles.cardArt} ${styles.emptyArt}`} role="img" aria-label={`Placeholder: ${note}`}>
          <IconSvg icon={icons.image} size={24} />
          {note}
        </span>
      )}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{text}</p>
    </div>
  );
}
