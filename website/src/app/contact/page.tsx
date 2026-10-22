import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Placeholder } from "@/components/sections/Placeholder";
import { Section } from "@/components/sections/Section";
import { pageMeta } from "@/lib/meta";
import { contactLink, site, telHref } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata = pageMeta(
  "Contact Neufin Energy",
  "Get a quote or a call back about buying cheaper power, Lumen, advisory, services or selling power. One team, across 16 states.",
  contactLink.href,
);

export default function Contact() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        title="Let's cut your power cost"
        lead="Buy cheaper power, run it better or plan your clean power targets. One team, across 16 states."
        actions={
          <div className={styles.direct}>
            <p className={styles.directTitle}>Prefer to talk now?</p>
            <a href={telHref} className={styles.line}>
              <IconSvg icon={icons.phone} size={20} />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className={styles.line}>
              <IconSvg icon={icons.envelope} size={20} />
              {site.email}
            </a>
            <p className={styles.reply}>A named person from our team calls you back, within one business day.</p>
          </div>
        }
        media={<ContactForm />}
      />

      <Section id="offices" tone="white" title="Where to find us" narrowHead>
        {/* TODO: office addresses, phone and email per office, and map links. */}
        <ul className={styles.offices}>
          {[
            { name: "Bengaluru (head office)", phone: site.phone, email: site.email },
            { name: "City", phone: "Phone", email: "Email" },
          ].map((o) => (
            <li key={o.name} className={`surface ${styles.office}`}>
              <Placeholder note="Map" icon="map" tone="daylight" ratio="16 / 9" className={styles.map} />
              <div className={styles.officeBody}>
                <h3 className={styles.officeName}>Neufin Energy, {o.name}</h3>
                <p className={styles.address}>Street address, City, PIN</p>
                <p className={styles.address}>
                  {o.phone} · {o.email}
                </p>
                <a href="#" className="link-arrow">
                  View on Google Maps
                  <IconSvg icon={icons["arrow-up-right"]} size={20} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
