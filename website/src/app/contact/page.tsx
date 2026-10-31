import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { ContactReach } from "@/components/contact/ContactReach";
import { StripeHeader } from "@/components/sections/StripeHeader";
// TODO: Neufin's own photo; Bengaluru at dusk (Unsplash) stands in.
import bengaluru from "@ds/../public/assets/photos/bengaluru-night.jpg";
import { Section } from "@/components/sections/Section";
import { pageMeta } from "@/lib/meta";
import { contactLink, office, officeMapEmbed, officeMapHref, site, telHref } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata = pageMeta(
  "Contact Neufin Energy",
  "Get a quote or a call back about buying cheaper power, Lumen, advisory, services or selling power. One team, across 16 states.",
  contactLink.href,
);

export default function Contact() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: "Contact" }]}
        title="Cut Energy Cost. On Your Terms."
        lead="Start paying less for energy today. Reach out to us for a quote."
        photo={bengaluru}
        focus="50% 50%"
        tallPhone
        over
      />

      <section className={styles.reach}>
        <div className="container">
          <ContactReach />
        </div>
      </section>

      <Section id="office" tone="white" title="Where to find us">
        <div className={`surface ${styles.office}`}>
          <div className={styles.officeBody}>
            <h3 className={styles.officeName}>Neufin Energy, {office.name}</h3>
            <address className={styles.address}>
              {office.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <ul className={styles.details}>
              <li>
                <a href={telHref}>
                  <DuoIcon name="duo-phone" size={20} />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>
                  <DuoIcon name="duo-envelope" size={20} />
                  {site.email}
                </a>
              </li>
            </ul>
            <a href={officeMapHref} target="_blank" rel="noopener" className="link-arrow">
              View on Google Maps
              <IconSvg icon={icons["arrow-up-right"]} size={20} />
            </a>
          </div>
          <iframe
            className={styles.map}
            src={officeMapEmbed}
            title={`Map of Neufin Energy's ${office.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </>
  );
}
