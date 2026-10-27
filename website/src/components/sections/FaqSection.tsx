import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { Faq } from "./Blocks";
import { contactLink } from "@/lib/site";
import side from "./SideSection.module.css";
import styles from "./FaqSection.module.css";

// The FAQ section from the home page, shared: two columns on desktop, easier to read
// (Kedar): the title and a way to ask more on the left (staying in view), the questions in
// a White card on the right.
export function FaqSection({ title, items }: { title: string; items: { q: string; a?: string }[] }) {
  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className={`container ${side.section}`}>
        <div className={side.side}>
          <h2 id="faq-title" className={side.title}>
            {title}
          </h2>
          <Link href={contactLink.href} className="link-arrow">
            Ask us something else
            <IconSvg icon={icons.arrow} size={20} />
          </Link>
          {/* TODO: Kedar's illustration under the title. */}
        </div>
        <div className={`surface ${styles.box}`}>
          <Faq items={items} />
        </div>
      </div>
    </section>
  );
}
