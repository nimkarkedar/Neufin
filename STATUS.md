# Status

Where the project stands on 2026-10-26, when the work moved from Kedar's personal Claude account to the company account. Update this file when a page's state changes.

## Pages

| Page | Route | State |
| --- | --- | --- |
| Home | `/` | Locked (2026-10-24). Change only on Kedar's request. |
| Contact | `/contact` | Locked: text-on-photo header (Bengaluru at dusk), form with validation, one office card with map. |
| Careers | `/careers` | Built from the brief as one family. Photos and illustrations from Kedar; placeholders for Life at Neufin and Events. |
| About | `/about` | Built from the brief: story art cards, home numbers block, team row, investors, licence band, partners and press, posts. Ends on the footer contact card. |
| Customer stories | `/customer-stories` | Header done (mill photo, brief copy). Story cards still the old style (pastel placeholders, hover lift): next to rebuild on the shared cards, keeping the industry filter. |
| Buy cheaper power | `/solutions/buy-cheaper-power` | Built from the brief, with Kedar's plan and step illustrations. |
| Run and optimise | `/solutions/run-and-optimise` | Built from the brief: module rows, Lumen industries block, how-it-works picture. Lumen screens are placeholders. |
| Renewable energy advisory | `/solutions/renewable-energy-advisory` | Old template (StripeHeader with the photo under the text, old blocks). To rebuild from the brief. |
| Services | `/solutions/services` | Old template. To rebuild. |
| Sell energy | `/solutions/sell-energy` | Old template. To rebuild. |
| Plan finder (every plan) | `/products/plan-finder` | Old template. To rebuild. |
| Not built yet | | Industry pages, Lumen module pages, Lumen × industry pages, service detail pages, blog, publications, tools, state guides, legal pages, `/company-deck`. Links to them are marked TODO. |

The pattern for rebuilding a page: read its brief table, reuse the shared blocks, put the header on a dark photo with text on it (`StripeHeader over`), end on the footer contact card, leave TODO pockets, screenshot at 390 and 1440, log it in `website/CLAUDE.md`.

## Open questions for Kedar or Neufin

- **Savings figure:** "up to 30%" (Buy cheaper power brief) vs "up to 40%" (home hero and FAQ) vs 15% (numbers block) vs 27% (plan finder example). One story needed.
- **Tailwind CSS:** paused by Kedar. Options given: A full migration, B Tailwind (themed from tokens.js, defaults off) for new and changed work only (recommended), C hold. `website/CLAUDE.md` still says "No Tailwind".
- **Plan finder:** the Buy brief wants yearly use, the electricity board by name, auto-detected state and a price-type line. Changing it changes the home page too.
- **Accent button twice on Buy cheaper power** (header View prices and plan finder Get a quote): rule is one per page.
- **Footer contact card vs briefs' final CTAs:** briefs ask for View prices, Book a demo or an email field in the close; the shared card has none of them. Any addition goes into the shared card for every page.
- **Wording:** "Spot, from the exchange" (jargon; maybe "Daily market power"); two-beat titles kept from the brief ("India's energy decade. Your opportunity.", "On the ground. At the table.", "₹X crore saved. 30+ businesses already switched.", "Generate more. Pay less."); "How we work: our values".
- **Content from Neufin:** real numbers (₹X crore, X% per industry, 225 GW source), customer stories, team portraits and LinkedIn links, which investor logos are funds vs angels' companies and the angels' names, licence number, validity and PDF, press coverage, blog posts, FAQ answers, the named sales and supply lead, Lumen screens, Neufin's own photos for every header, roles for Careers.
- **Infrastructure:** forms and call-backs are not connected (`website/src/lib/callback.ts`), Book a demo has no scheduling flow, Solutions and Products breadcrumbs have no hub pages.
- **Accessibility gap:** field borders (Grey 200) are 1.3:1 against White, under WCAG 1.4.11's 3:1.
- **Image sizes:** several supplied illustrations and the founders' photo are small (252–372px); larger exports would be sharper on retina screens.
- **Illustration prompt:** latest fix (2026-10-26) draws circle graphics as a filled square and describes the background positively; Kedar to confirm the black patches are gone.
