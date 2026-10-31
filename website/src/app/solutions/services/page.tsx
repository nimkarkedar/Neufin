import Link from "next/link";
import type { StaticImageData } from "next/image";
import { IconSvg } from "@ds/components/Icon.jsx";
import { ScrollRow } from "@ds/components/ScrollRow.jsx";
import { icons } from "@ds/brand/icons.js";
// TODO: Neufin's own photos; library photos stand in.
import electricianRack from "@ds/../public/assets/photos/electrician-rack.jpg";
import meters from "@ds/../public/assets/photos/meters.jpg";
import metersWall from "@ds/../public/assets/photos/meters-wall.jpg";
import electricityBill from "@ds/../public/assets/photos/electricity-bill.jpg";
import switchPanel from "@ds/../public/assets/photos/switch-panel.jpg";
import electrician from "@ds/../public/assets/photos/electrician.jpg";
import transformerCrew from "@ds/../public/assets/photos/transformer-crew.jpg";
import solarPanels from "@ds/../public/assets/photos/solar.jpg";
import { HowWeDoIt } from "@/components/home/HowWeDoIt";
import { VerticalCard, cardLayouts } from "@/components/sections/Cards";
import { ProcessSteps, type ProcessStep } from "@/components/sections/ProcessSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { LogoBar } from "@/components/sections/LogoBar";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { customerLogos, hardwareLogos } from "@/lib/logos";
import { pageMeta } from "@/lib/meta";
import { contactLink, services, solutions } from "@/lib/site";

export const metadata = pageMeta(
  "Energy services for your business",
  "ABT and smart meters, meter moves, name and contract demand changes, open access approvals and net metering, done for you across India. For any business, on a quote.",
  solutions.services.href,
);

// Services, in the brief's order (the "Neufin website structure" doc, Solutions:
// Services), with the finish of the other solution pages: the text-on-photo header,
// customer logos close under it, then hardware partners, the shared vertical cards (photo and panel),
// the shared FAQ and solution cards, and the footer's contact card as the last step.

// One line per service, in the order of `services` (site.ts), and its photo.
// Card titles are shortened from the service names where needed, to fit one line.
const details: { title?: string; text: string; image?: StaticImageData; focus?: string }[] = [
  { text: "Two-way meters for open access, installed, tested and approved.", image: meters },
  { title: "Smart meters", text: "New smart meters, so you can track your energy use closely.", image: electrician, focus: "30% 50%" },
  { title: "Move a meter", text: "Move your meter when your site location changes.", image: metersWall },
  { title: "Bill name change", text: "Update the name on your electricity connection.", image: electricityBill },
  { title: "Contract demand", text: "Match contract demand to real use and cut demand charges.", image: transformerCrew },
  { title: "Open access", text: "We file your open access applications for you.", image: switchPanel },
  { text: "Get net metering approved for your rooftop solar.", image: solarPanels },
];

// How it works, from the brief. TODO: Kedar's spot illustrations; durations from Neufin.
const steps: ProcessStep[] = [
  { icon: "duo-clipboard", title: "Send documents", text: "Your site details, connection number and the papers we ask for." },
  { icon: "duo-wrench", title: "We do the work", text: "We install the hardware and file with your electricity board." },
  { icon: "duo-shield", title: "Verified and tested", text: "We test all hardware and confirm every approval before we hand over." },
];

export default function Services() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: "Products" }, { label: solutions.services.label }]}
        title="Energy services for your business"
        lead="Metering, electricity board approvals across India and hardware installation, done with ease."
        actions={
          <Link href="/contact" className="btn btn-accent">
            Get a quote
            <IconSvg icon={icons.arrow} size={20} />
          </Link>
        }
        photo={electricianRack}
        focus="50% 40%"
        over
      />

      <LogoBar label="Used by businesses across India" logos={customerLogos} underHeader />

      <Section>
        <LogoBar label="Hardware partners" logos={hardwareLogos} still />
      </Section>

      <Section id="all" title="Every site and electricity board job, in one place">
        <ScrollRow label="Our services" className={cardLayouts.row}>
          {services.map((s, i) => (
            <VerticalCard key={s.href} look="photo" title={s.label} {...details[i]} href={s.href} />
          ))}
        </ScrollRow>
      </Section>

      <ProcessSteps title="Done in three steps" steps={steps} link={{ label: "Get a quote", href: contactLink.href }} white />

      {/* TODO: Neufin to answer the open questions. */}
      <FaqSection
        title="Questions about services"
        items={[
          { q: "Do I have to buy energy from you?", a: "No. Our services are open to any business, on a quote." },
          { q: "Which states do you cover?" },
          { q: "How long does it take?" },
        ]}
      />

      <HowWeDoIt title="Reduce your cost with Neufin Energy" exclude="services" />
    </>
  );
}
