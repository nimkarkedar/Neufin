import { contactLink } from "@/lib/site";
import { ProcessSteps, type ProcessStep } from "./ProcessSteps";

// From first call to cheaper energy: the four steps from bill to power, each with the time
// it takes. Shared by Buy cheaper power and Energy plans.
// TODO: Neufin to confirm the durations (48 hours and 30 days are the brief's) and the line
// (worked out from the first two durations).
const steps: ProcessStep[] = [
  { icon: "duo-bill", title: "Share your bills", text: "Send them on WhatsApp or by email. That is all we need to start.", duration: "5 minutes" },
  { icon: "duo-coins", title: "Get a quote", text: "We compare plans across 30+ suppliers and send you a price.", duration: "Within 48 hours" },
  { icon: "duo-contract", title: "Sign the contract", text: "Pick the plan we recommend. The terms are agreed in advance.", duration: "1 day" },
  { icon: "duo-bolt", title: "Power starts", text: "Depending on the plan you pick.", duration: "From 30 days" },
];

// `white` puts it on a White band, where the section above is on the Warm White page too.
export function QuoteSteps({ white = false }: { white?: boolean }) {
  return (
    <ProcessSteps
      title="From first call to cheaper energy"
      lead="Most businesses go from first call to a quote in two days."
      steps={steps}
      link={{ label: "Get a quote", href: contactLink.href }}
      white={white}
    />
  );
}
