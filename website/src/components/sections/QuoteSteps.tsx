import { ScrollRow } from "@ds/components/ScrollRow.jsx";
import { VerticalCard, cardLayouts } from "./Cards";
import { Section } from "./Section";

// From first call to cheaper energy: the four steps from bill to power, as panel cards with
// the step and its duration in one tag. Shared by Buy cheaper power and Energy plans.
// TODO: an illustration per step from Kedar (the round spot ones don't fit the card).
// TODO: Neufin to confirm the durations (48 hours and 30 days are the brief's).
const steps = [
  { title: "Share your bills", text: "Send them on WhatsApp or by email. That is all we need to start.", duration: "5 minutes" },
  { title: "Get a quote", text: "We compare plans across 30+ suppliers and send you a price.", duration: "Within 48 hours" },
  { title: "Sign the contract", text: "Pick the plan we recommend. The terms are agreed in advance.", duration: "1 day" },
  { title: "Power starts", text: "Depending on the plan you pick.", duration: "From 30 days" },
];

export function QuoteSteps() {
  return (
    <Section id="how" title="From first call to cheaper energy">
      <ScrollRow label="How it works" className={cardLayouts.row}>
        {steps.map((s, i) => (
          <VerticalCard key={s.title} tag={`Step ${i + 1} · ${s.duration}`} title={s.title} text={s.text} />
        ))}
      </ScrollRow>
    </Section>
  );
}
