import { PageHeader, Section, ShowMore } from '../components/ui.jsx';

const principles = [
  ['Direct', 'Start with what matters: the answer, saving, problem, decision or action. If the first sentence can be deleted without losing anything, delete it.'],
  ['Plain', 'Use the words people use at work. Use technical terms only when they help, and explain them when the reader may not know them.'],
  ['Specific', 'Use numbers instead of adjectives. Show what cheaper, flexible or significant actually means.'],
  ['On your side', 'Advise, do not push. Sometimes the answer is solar, wind or open access. Sometimes it is to do nothing. Say so.'],
];

const voice = [
  { left: 'Technical', right: 'Plain', pos: 75, example: 'Your sanctioned load is 975 kVA. You are paying for it whether you use it or not.' },
  { left: 'Corporate', right: 'Conversational', pos: 60, example: 'Here is what we found.' },
  { left: 'Promotional', right: 'Matter of fact', pos: 85, example: 'This could reduce your annual power cost by ₹38 lakh.' },
  { left: 'Cautious', right: 'Direct', pos: 75, example: 'Wind is the better option for this site.' },
  { left: 'Seller', right: 'Advisor', pos: 85, example: 'At current battery costs, the numbers do not work for this site.' },
];

const steps = [
  ['What is happening?', 'Your average power cost is ₹11.80 per unit.'],
  ['Why should I care?', 'That is ₹1.35 above the available open access rate.'],
  ['What can be done?', 'Shift 40% of your requirement to wind power.'],
  ['What happens next?', 'Share your last six electricity bills. We will model the numbers.'],
];

const beforeAfter = [
  ['Our comprehensive energy optimisation platform enables businesses to unlock significant value across their power procurement lifecycle.', 'You are paying ₹1.20 more per unit than you need to.'],
  ['Neufin offers comprehensive end to end energy management.', 'We find the right power deal, get it running and keep the numbers in check.'],
  ['Consumption reconciliation identified discrepancies.', 'Your bill does not match your actual consumption.'],
  ['The facility exhibits limited incremental solar absorption potential.', 'More solar will not save you much here.'],
  ['Flexible contracts.', 'Choose a contract from 30 days to 15 years.'],
  ['Your rooftop solar is performing well.', 'Your rooftop solar saved about ₹26.4 lakh in six months.'],
  ['Open access offers favourable economics compared with grid electricity.', 'Grid: ₹9.40/unit. Open access: ₹6.85/unit.'],
  ['The application will be submitted by Neufin.', 'We submit the application.'],
  ['Upgrade to battery storage for greater energy independence.', 'At current battery costs, the numbers do not work for this site.'],
  ['Discover our solutions', 'Check my power cost'],
  ['Contact us today to unlock your renewable energy opportunity.', 'Send us your latest power bill. We will show you where the money is going.'],
  ['Congratulations! We have successfully completed the analysis of your electricity consumption.', '3 savings opportunities found'],
  ['Oops! Something went wrong.', 'We could not read this bill. Upload a clearer copy.'],
  ['Amazing! You’re crushing your energy goals!', '₹4.2 lakh saved this month.'],
  ['September was another great month on your energy journey!', 'September: 4.8 lakh units, ₹38.2 lakh billed. One billing error found: ₹1.9 lakh overcharged on demand charges.'],
];

const words = [
  ['Use', 'power, electricity, bill, cost, unit, tariff, contract, consumption, savings, capacity, supplier, plant, grid, solar, wind, terms, month, year, ₹ per unit, what you use, what you pay'],
  ['Use when needed', 'open access, PPA, DISCOM, kVA, banking. Explain them for non-specialist readers.'],
  ['Do not use', 'unlock value, empower, reimagine, revolutionise, transform your energy journey, energy ecosystem, future ready, next generation, cutting edge, best in class, world class, seamless, holistic, bespoke, game changing, innovative solutions, sustainable future, accelerate the energy transition, one stop solution, end to end solution, leverage, synergy, partner in your journey, optimise (when a simpler verb exists)'],
  ['Only if measurable', 'smart, intelligent, advanced, powerful, robust, dynamic'],
];

const checks = [
  'Can someone understand it on the first read?',
  'Does the useful information come first?',
  'Are we saying what we know rather than what we hope?',
  'Can we replace an adjective with a number?',
  'Does the customer know what this means for them?',
  'Is there an obvious next step?',
  'Would a CFO believe this?',
  'Would a plant head find it useful?',
  'Would we say this sentence in a meeting?',
];

export default function ToneOfVoice() {
  return (
    <>
      <PageHeader eyebrow="Voice" title="Tone of voice" />

      <Section title="Brand line">
        <p className="tov-line">Cut Energy Cost. On Your Terms.</p>
        <p>Choose the tariff, tenure and capacity that works for you.</p>
      </Section>

      <Section title="Principles">
        <div className="rows">
          {principles.map(([k, v]) => (
            <div key={k} className="row"><span className="row-key">{k}</span><p>{v}</p></div>
          ))}
        </div>
      </Section>

      <Section title="Where we sit">
        <div className="rows">
          {voice.map((v) => (
            <div key={v.left} className="row">
              <span className="row-key">{v.right}, not {v.left.toLowerCase()}</span>
              <div>
                <div className="voice-scale">
                  <span>{v.left}</span>
                  <div className="scale-line" role="img" aria-label={`Neufin sits ${v.pos}% towards ${v.right}`}>
                    <b style={{ left: `${v.pos}%` }}>Neufin</b>
                  </div>
                  <strong>{v.right}</strong>
                </div>
                <p>{v.example}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Writing a message">
        <div className="rows">
          {steps.map(([q, a]) => (
            <div key={q} className="row"><span className="row-key">{q}</span><p>{a}</p></div>
          ))}
        </div>
      </Section>

      <Section title="Words">
        <div className="rows">
          <ShowMore
            initial={0}
            label={() => 'Show word lists'}
            closeLabel="Hide word lists"
            items={words.map(([k, v]) => (
              <div key={k} className="row"><span className="row-key">{k}</span><p>{v}</p></div>
            ))}
          />
        </div>
      </Section>

      <Section title="Before and after">
        <div className="row row-ba row-head"><span>Instead of</span><span>Write</span></div>
        <ShowMore items={beforeAfter.map(([n, w]) => (
          <div key={w} className="row row-ba"><p>{n}</p><p>{w}</p></div>
        ))} />
      </Section>

      <Section title="Before publishing" intro="If the answer to any of these is no, rewrite it.">
        <ul className="plain-list">{checks.map((c) => <li key={c}>{c}</li>)}</ul>
      </Section>
    </>
  );
}
