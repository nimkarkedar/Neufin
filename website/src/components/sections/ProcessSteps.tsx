import Link from "next/link";
import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import { IconSvg } from "@ds/components/Icon.jsx";
import { StepMark, StepTrack } from "@ds/components/StepTrack.jsx";
import { icons } from "@ds/brand/icons.js";
import type { IconName } from "@/lib/site";
import boxes from "./Boxes.module.css";
import side from "./SideSection.module.css";

export type ProcessStep = { icon: IconName; title: string; text: string; duration?: string };

// How a process happens, step by step (Kedar's reference, 2026-10-27): the home FAQ's two
// columns, the title and its line on the left, the steps as rows in one White box on the
// right, each with a hero duo icon, an H3 title and a line, and the time it takes as a tag
// with the live dot. Order carries the sequence: no step numbers. The circles sit on the
// design system's step track, so current runs from step to step while the box is in view
// (Kedar, 2026-10-28: show they are steps, and quick). Used for Buy cheaper
// power and Energy plans (QuoteSteps), Services and Careers' hiring.
// `link` adds the next step as a primary button under the head (Kedar: a proper call to
// action, as Ramp's steps carry; not a text link). `white` sets it on a White band, to part it from a two-column FAQ
// right after it.
export function ProcessSteps({
  id = "how",
  title,
  lead,
  steps,
  link,
  white = false,
}: {
  id?: string;
  title: string;
  lead?: string;
  steps: ProcessStep[];
  link?: { label: string; href: string };
  white?: boolean;
}) {
  return (
    <section id={id} className={side.band} data-white={white || undefined} aria-labelledby={`${id}-title`}>
      <div className={`container ${side.section}`}>
        <div className={side.side}>
          <h2 id={`${id}-title`} className={side.title}>
            {title}
          </h2>
          {lead && <p className={side.lead}>{lead}</p>}
          {link && (
            <Link href={link.href} className={`btn btn-primary ${side.action}`}>
              {link.label}
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          )}
        </div>
        <StepTrack className={`surface ${boxes.rows}`}>
          {steps.map((s) => (
            <li key={s.title} className={`step-track-item ${boxes.row}`}>
              <StepMark>
                <DuoIcon name={s.icon} hero />
              </StepMark>
              <span className={boxes.rowText}>
                <span className={boxes.rowTitle}>{s.title}</span>
                <span className={boxes.rowLine}>{s.text}</span>
              </span>
              {s.duration && (
                <span className={boxes.rowEnd}>
                  <span className="tag">
                    {s.duration}
                    <span className="tag-dot" />
                  </span>
                </span>
              )}
            </li>
          ))}
        </StepTrack>
      </div>
    </section>
  );
}
