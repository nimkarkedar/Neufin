import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import { StripePattern, patternCombos } from "@ds/components/StripePattern.jsx";
import type { IconName } from "@/lib/site";

export type PatternTile = { icon: IconName; title: string; text: string };

// A set of ideas without cards (Kedar, 2026-10-27: Jasper's values and Dovetail's perks as
// references): each idea is a tile of the Stripe pattern in one of the device's colour
// combinations, its icon on the band like a node on a wire, with the title (Card title) and
// line under it on the page. All in one row from desktop. Replaces cards that waited for
// art: Careers' values, Sell energy's what you get.
// `swipe`: on phones the tiles run in a sideways row instead of a stack (`label` names it).
export function PatternTiles({ items, swipe = false, label }: { items: PatternTile[]; swipe?: boolean; label?: string }) {
  return (
    <ul
      className={`pattern-tiles ${swipe ? "scroll-row-phone" : ""}`}
      style={{ "--cols": items.length } as React.CSSProperties}
      aria-label={swipe ? label : undefined}
      tabIndex={swipe ? 0 : undefined}
    >
      {items.map((it, i) => {
        const combo = patternCombos[i % patternCombos.length];
        return (
          <li key={it.title}>
            <div className="pattern-tile-art">
              <StripePattern fg={combo.fg} bg={combo.bg}>
                <DuoIcon name={it.icon} hero />
              </StripePattern>
            </div>
            <h3 className="pattern-tile-title">{it.title}</h3>
            <p className="pattern-tile-text">{it.text}</p>
          </li>
        );
      })}
    </ul>
  );
}
