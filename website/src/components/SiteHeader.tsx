"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import { Icon } from "@ds/components/Icon.jsx";
import { Logo } from "@ds/components/Logo.jsx";
import { hexOf } from "@ds/brand/tokens.js";
import { contactLink, mainNav, site, type MenuAside, type MenuColumn, type NavItem } from "@/lib/site";
import { DESKTOP_MIN } from "@/lib/tokens";
import styles from "./SiteHeader.module.css";

const isCurrent = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

const inSection = (pathname: string, item: NavItem) =>
  isCurrent(pathname, item.href) ||
  !!item.menu?.columns.some((c) => c.items.some((m) => isCurrent(pathname, m.href)));

const ariaCurrent = (pathname: string, href: string) => (isCurrent(pathname, href) ? "page" : undefined);

const Chevron = () => (
  <svg className={styles.chevron} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
    <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// One labelled column of a desktop flyout: icon items (tile, label, note) or plain links.
function FlyoutColumn({ column, pathname }: { column: MenuColumn; pathname: string }) {
  return (
    <div className={styles.flyoutCol}>
      <p className={styles.flyoutTitle}>{column.title}</p>
      <ul className={styles.flyoutList}>
        {column.items.map((m) => (
          <li key={m.href + m.label}>
            {m.icon ? (
              <Link href={m.href} className={`duo-icon-host ${styles.flyoutItem}`} aria-current={ariaCurrent(pathname, m.href)}>
                <DuoIcon name={m.icon} hero size="m" />
                <span>
                  <span className={styles.flyoutLabel}>{m.label}</span>
                  <span className={styles.flyoutDesc}>{m.description}</span>
                </span>
              </Link>
            ) : (
              <Link href={m.href} className={styles.flyoutPlain} aria-current={ariaCurrent(pathname, m.href)}>
                {m.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlyoutAside({ aside }: { aside: MenuAside }) {
  return (
    <div className={styles.flyoutAside}>
      <p className={styles.flyoutTitle}>{aside.label}</p>
      <p className={styles.asideTitle}>{aside.title}</p>
      <p className={styles.asideText}>{aside.text}</p>
      <Link href={aside.link.href} className={styles.asideLink}>
        {aside.link.label}
        <Icon name="arrow" size={20} />
      </Link>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  // Desktop: which flyout is open. Phone: whether the menu panel is open, and which group is expanded.
  const [flyout, setFlyout] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [group, setGroup] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openedByHover = useRef(false);

  // Close everything when the route changes.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setFlyout(null);
    setMenuOpen(false);
    setGroup(null);
  }

  // Desktop flyout on a real mouse: open after a short rest on the name so passing over
  // does nothing, switch at once when another flyout is already open, and wait a moment
  // before closing so the cursor can travel into the panel.
  const hoverIn = (e: React.PointerEvent, label: string) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hoverTimer.current);
    if (flyout === label) return;
    const open = () => {
      openedByHover.current = true;
      setFlyout(label);
    };
    if (flyout) open();
    else hoverTimer.current = setTimeout(open, 120);
  };

  const hoverOut = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hoverTimer.current);
    if (flyout && openedByHover.current) hoverTimer.current = setTimeout(() => setFlyout(null), 250);
  };

  // A click on a flyout that hover just opened keeps it open instead of closing it.
  const clickTrigger = (label: string) => {
    clearTimeout(hoverTimer.current);
    if (flyout === label && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    openedByHover.current = false;
    setFlyout(flyout === label ? null : label);
  };

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  // At the top of the page the header has no bottom line, so its White runs straight
  // into the page's top fade. The line appears once the page scrolls under it.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop flyout: close on outside click or Escape.
  useEffect(() => {
    if (!flyout) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setFlyout(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      navRef.current?.querySelector<HTMLButtonElement>(`[data-trigger="${flyout}"]`)?.focus();
      setFlyout(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [flyout]);

  // Phone menu: lock page scroll, close on Escape or when the screen widens to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`);
    const onChange = () => desktop.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header} data-menu-open={menuOpen || undefined} data-scrolled={scrolled || undefined}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
          <Logo variant="stacked" markColor={hexOf("electric-violet")} height="100%" title={site.name} />
        </Link>

        <nav ref={navRef} aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.desktopList}>
            {mainNav.map((item) => {
              // Only one item is current: a page can sit in two menus (Energy plans is
              // also Buy cheaper power), so the first menu that holds it wins.
              const current = mainNav.find((n) => inSection(pathname, n)) === item;
              if (!item.menu) {
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.topLink} aria-current={current ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const open = flyout === item.label;
              const id = `flyout-${item.label.toLowerCase()}`;
              return (
                <li
                  key={item.href}
                  className={styles.hasFlyout}
                  onPointerEnter={(e) => hoverIn(e, item.label)}
                  onPointerLeave={hoverOut}
                >
                  <button
                    type="button"
                    className={styles.topLink}
                    data-trigger={item.label}
                    data-current={current || undefined}
                    aria-expanded={open}
                    aria-controls={id}
                    onClick={() => clickTrigger(item.label)}
                  >
                    {item.label}
                    <Chevron />
                  </button>
                  <div id={id} className={styles.flyout} data-open={open || undefined}>
                    <div className={styles.flyoutMain}>
                      {item.menu.columns.map((c) => (
                        <FlyoutColumn key={c.title} column={c} pathname={pathname} />
                      ))}
                    </div>
                    <FlyoutAside aside={item.menu.aside} />
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={contactLink.href}
          className={`btn btn-primary ${styles.contact}`}
          aria-current={isCurrent(pathname, contactLink.href) ? "page" : undefined}
        >
          {contactLink.label}
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className={styles.menuIcon} aria-hidden="true" />
        </button>
      </div>

      {/* Dims the page behind an open desktop flyout. A click on it closes the flyout. */}
      <div className={styles.scrim} data-open={flyout ? true : undefined} aria-hidden="true" />

      <div id="mobile-menu" className={styles.panel} hidden={!menuOpen}>
        <nav aria-label="Main" className="container">
          <ul className={styles.panelList}>
            {mainNav.map((item) => {
              if (!item.menu) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.panelLink}
                      aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const open = group === item.label;
              const id = `group-${item.label.toLowerCase()}`;
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    className={styles.panelLink}
                    aria-expanded={open}
                    aria-controls={id}
                    onClick={() => setGroup(open ? null : item.label)}
                  >
                    {item.label}
                    <Chevron />
                  </button>
                  <div id={id} className={styles.group} data-open={open || undefined}>
                    <div className={styles.groupInner} inert={!open}>
                      {[...item.menu.columns, { title: item.menu.aside.label, items: [item.menu.aside.link] }].map((g) => (
                        <div key={g.title} className={styles.panelGroup}>
                          <p className={styles.panelGroupTitle}>{g.title}</p>
                          <ul>
                            {g.items.map((m: MenuColumn["items"][number]) => (
                              <li key={m.href + m.label}>
                                <Link
                                  href={m.href}
                                  className={m.icon ? `duo-icon-host ${styles.groupLink}` : styles.groupPlain}
                                  aria-current={ariaCurrent(pathname, m.href)}
                                >
                                  {m.icon && <DuoIcon name={m.icon} hero size="m" />}
                                  {m.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.panelFoot}>
            <Link href={contactLink.href} className="btn btn-primary">
              {contactLink.label}
            </Link>
            <a href={`mailto:${site.email}`} className={styles.panelEmail}>
              {site.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
