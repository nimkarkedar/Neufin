import Image from "next/image";
import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import face1 from "@/assets/placeholder-faces/face-1.jpg";
import { site, telHref } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import styles from "./ContactReach.module.css";

// The call-back form with "Prefer to talk now?" beside it: phone, email, reply time and the
// named lead. Contact uses the full form; Energy plans and Sell energy the short one
// (`short`; Sell energy passes its `topic` and the supply lead's `leadRole`).
export function ContactReach({ short = false, topic, leadRole = "Sales lead" }: { short?: boolean; topic?: string; leadRole?: string }) {
  return (
    <div className="grid">
      <div className={styles.form}>
        <ContactForm short={short} topic={topic} />
      </div>
      <div className={styles.direct}>
        <p className={styles.directTitle}>{short ? "Or call our team" : "Prefer to talk now?"}</p>
        <a href={telHref} className={styles.line}>
          <DuoIcon name="duo-phone" size={20} />
          {site.phone}
        </a>
        <a href={`mailto:${site.email}`} className={styles.line}>
          <DuoIcon name="duo-envelope" size={20} />
          {site.email}
        </a>
        <p className={styles.reply}>We reply within one business day.</p>
        {/* TODO: the named lead's photo, name and role; placeholder until Neufin sends them. */}
        <div className={styles.lead}>
          <Image src={face1} alt="" width={56} height={56} className={styles.leadPhoto} />
          <p>
            <span className={styles.leadName}>Name Surname</span>
            <span className={styles.leadRole}>{leadRole}, Neufin Energy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
