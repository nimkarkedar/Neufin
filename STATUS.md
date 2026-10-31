# Status

Where the project stands on 2026-10-26, when the work moved from Kedar's personal Claude account to the company account. Update this file when a page's state changes.

## Phase 1 (Kedar, 2026-10-27)

Only these pages: Home, Solutions (Buy cheaper energy, Run and optimise, RE advisory, Services, Sell energy), Energy plans, Blog, Publications, Customer stories, About, Careers, Contact us. The nav and footer link only to these. The Solutions menu is now Products (2026-10-31): Energy plans and Lumen, then the solutions for businesses, Sell energy in its side panel. Energy plans is `/products/plan-finder`; Blog and Publications are still to build.

## Pages

| Page | Route | State |
| --- | --- | --- |
| Home | `/` | Locked (2026-10-24). Change only on Kedar's request. Plan finder replaced by the four energy plan packs beside the saving calculator (2026-10-30, Kedar; figures illustrative). |
| Contact | `/contact` | Locked: text-on-photo header (Bengaluru at dusk), form with validation, one office card with map. |
| Careers | `/careers` | Built from the brief as one family. Neufin's own photos in What it's like, Life at Neufin and Events (2026-10-26); hiring steps drawn in code in the values' family. |
| About | `/about` | Built from the brief: the story as one paragraph, home numbers block, team row with real portraits, the four institutional investors and 14 named angels, partners and press (press still TODO), real posts. Licence section removed. Ends on the footer contact card. |
| Customer stories | `/customer-stories` | Header done (mill photo, brief copy). Story cards still the old style (pastel placeholders, hover lift): next to rebuild on the shared cards, keeping the industry filter. |
| Buy cheaper power | `/solutions/buy-cheaper-power` | Built from the brief: plans as two boxes (four points; the four kinds in a 2 × 2 grid), plan finder (no energy charges row), story cards shared with Customer stories, steps with duration tags, FAQ, other solutions. |
| Run and optimise | `/solutions/run-and-optimise` | Built from the brief: module rows, Lumen industries block, animated how-it-works diagram on coral (LumenFlow). Lumen screens in the module rows drawn in the design system, each screen the card itself (2026-10-29). |
| Renewable energy advisory | `/solutions/renewable-energy-advisory` | Re-laid out (2026-10-27) so no two neighbouring sections share a pattern: photo header, problems icon grid, one-partner boxes (statement + five service rows) on White, suppliers panel on Violet 900, stories (the one card row), publications as post cards, FAQ, solution cards, call-back close with the advisory lead (footer card hidden). Brief rows 4 and 7 still to add. |
| Services | `/solutions/services` | Built from the brief (2026-10-27): text-on-photo header, customer logos and hardware partners (names until logos arrive), the seven services as photo cards (two photos TODO), three steps (illustrations TODO), FAQ, other solutions. Service pages not built. |
| Sell energy | `/solutions/sell-energy` | Built from the brief (2026-10-27): text-on-photo header, figures and supplier and buyer logos in one box, what you get (illustrations TODO), three routes as photo cards, FAQ, its own call-back close with the supply lead (footer card hidden). Brief row 5 and testimonials to come. |
| Energy plans | `/products/plan-finder` | The four packs as plan pills above the plans (beside Filters on phones), each plan with its pack's mark; pack per plan is a guess (2026-10-30). Filters and plan list rebuilt (2026-10-29): plain filter groups (selects, radios, checkboxes with counts; behind a Filters button on phones), the plans as a table from 1280px and compact link cards below; backgrounds alternate (plans, steps on White, FAQ, the call-back close on White; footer card hidden). Header, call-back and FAQ as built from the brief. Plans and prices are placeholders; business type doesn't filter yet. |
| Not built yet | | Industry pages, Lumen module pages, Lumen × industry pages, service detail pages, blog, publications, tools, state guides, legal pages, `/company-deck`. Links to them are marked TODO. |

Cards (2026-10-27): every vertical card on every page is the one `VerticalCard` (photo or panel, still or clickable). Cards waiting for art are Near Black; Kedar sends images card by card. Sets of ideas without art are pattern tiles (Careers values, Sell energy's what you get) and processes are the shared process steps (Buy cheaper power, Energy plans, Services, Careers hiring) (2026-10-27). Horizontal cards are next.

Phones (2026-10-29): stacked sets swipe sideways instead (`.scroll-row-phone`, `.figures-scroll`, `cardLayouts.threeSwipe`, `swipe` on `IconGrid` and `PatternTiles`) on Home, Buy cheaper power, Advisory, Sell energy, About and Careers; tablets and desktop unchanged. Open: at 82% width some card titles and lines hit the two-line cut on phones.

The pattern for rebuilding a page: read its brief table, reuse the shared blocks, put the header on a dark photo with text on it (`StripeHeader over`), end on the footer contact card, leave TODO pockets, screenshot at 390 and 1440, log it in `website/CLAUDE.md`.

## Open questions for Kedar or Neufin

- **Layout at 90%:** type is one notch smaller on laptops (2026-10-29). Whether spacing, cards, buttons and the header should also step down, like a full 90% browser zoom, is to decide later (Kedar).
- **Savings figure:** "up to 30%" (Buy cheaper power brief) vs "up to 40%" (home hero and FAQ) vs 15% (numbers block) vs 27% (plan finder example). One story needed.
- **Tailwind CSS:** paused by Kedar. Options given: A full migration, B Tailwind (themed from tokens.js, defaults off) for new and changed work only (recommended), C hold. `website/CLAUDE.md` still says "No Tailwind".
- **Plan finder:** the Buy brief wants yearly use, the electricity board by name, auto-detected state and a price-type line. Changing it changes the home page too.
- **Accent button twice on Buy cheaper power** (header View prices and plan finder Get a quote): rule is one per page.
- **Footer contact card vs briefs' final CTAs:** briefs ask for View prices, Book a demo or an email field in the close; the shared card has none of them. Any addition goes into the shared card for every page.
- **Wording:** "Spot, from the exchange" (jargon; maybe "Daily market power"); two-beat titles kept from the brief ("India's energy decade. Your opportunity.", "On the ground. At the table.", "₹X crore saved. 30+ businesses already switched.", "Generate more. Pay less."); "How we work: our values".
- **Content from Neufin:** real numbers (₹X crore, X% per industry, 225 GW source), customer stories, LinkedIn links for Hemant and Gaurav, larger photos of Hemant and Nikita, confirmation of each angel's line, licence number, validity and PDF, press coverage, blog posts, FAQ answers, the named sales and supply lead, Lumen screens, Neufin's own photos for every header, roles for Careers.
- **Infrastructure:** forms and call-backs are not connected (`website/src/lib/callback.ts`), Book a demo has no scheduling flow, Solutions and Products breadcrumbs have no hub pages.
- **Accessibility gap:** field borders (Grey 200) are 1.3:1 against White, under WCAG 1.4.11's 3:1.
- **Image sizes:** several supplied illustrations and the founders' photo are small (252–372px); larger exports would be sharper on retina screens.
- **Illustration prompt:** latest fix (2026-10-26) draws circle graphics as a filled square and describes the background positively; Kedar to confirm the black patches are gone.
