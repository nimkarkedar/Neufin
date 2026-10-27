// Lumen's dashboard, cropped to its app window (Kedar, 2026-10-27), in place of the laptop photo.
import lumenDashboard from "@/assets/lumen/reporting-dashboard.png";
import electrician from "@ds/../public/assets/photos/electrician-rack.jpg";
import windHills from "@ds/../public/assets/photos/wind-hills.jpg";
import solarSite from "@ds/../public/assets/photos/solar-site.jpg";
import { VerticalCard, cardLayouts } from "@/components/sections/Cards";
import { solutions } from "@/lib/site";
import styles from "./HowWeDoIt.module.css";

// How Neufin keeps the price low, after the plan finder: the three solutions besides
// buying power, as clickable photo cards (the shared VerticalCard): Run and optimise
// (Lumen, the software), advisory (market knowledge and 30+ suppliers) and services, so a business
// gets one partner and its site keeps running. Copy follows the Tone of voice page (no
// "smart" or "end to end"; a number where there is one).
// TODO: Neufin to confirm the lines.
const cards = [
  {
    id: "buy",
    title: "Buy cheaper energy",
    text: "Cut energy cost, on your terms. Choose your tariff, tenure and capacity.",
    href: solutions.buy.href,
    image: solarSite,
  },
  {
    id: "run",
    title: "Run and optimise",
    text: "Lumen watches every meter, plant and bill, and flags overcharges.",
    href: solutions.run.href,
    image: lumenDashboard,
    // The cost chart, past the sidebar.
    focus: "22% 50%",
  },
  {
    id: "advisory",
    title: "Energy advisory",
    text: "We compare 30+ suppliers and tell you which power suits each site.",
    href: solutions.advisory.href,
    image: windHills,
  },
  {
    id: "services",
    title: "Services",
    text: "Meters, approvals and paperwork, done while your site keeps running.",
    href: solutions.services.href,
    image: electrician,
  },
] as const;

// Other pages reuse the cards under their own heading, leaving out their own solution
// (`exclude`). The home page shows the three besides buying, which the plan finder covers.
export function HowWeDoIt({ title = "How we keep your price low", exclude = "buy" }: { title?: string; exclude?: (typeof cards)[number]["id"] }) {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="how-title">
      <h2 id="how-title" className={styles.title}>
        {title}
      </h2>
      <ul className={cardLayouts.three}>
        {cards.filter((c) => c.id !== exclude).map((c) => (
          <li key={c.title}>
            <VerticalCard look="photo" image={c.image} focus={"focus" in c ? c.focus : undefined} title={c.title} text={c.text} href={c.href} />
          </li>
        ))}
      </ul>
    </section>
  );
}
