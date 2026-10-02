"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navItems } from "@/content/nav";
import { site } from "@/content/site";
import { MobileMenu } from "./MobileMenu";
import { useScrollSpy } from "./useScrollSpy";

const IDS = navItems.map((n) => n.id);

/**
 * The single site navigation. Transparent over the hero, solid ink with blur
 * once scrolled. Hidden while the CRT intro plays and slides in when it
 * arrives (see `.site-nav` in globals.css). Below `md` it shows a compact bar
 * with a Menu button that opens the full-screen sheet.
 */
export function SiteNav() {
  const [active, pin] = useScrollSpy(IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) btnRef.current?.focus();
  }, []);

  // Menu open: lock page scroll, Esc closes, Tab stays inside the menu, desktop width closes.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close(true);
      if (e.key !== "Tab") return;
      const items = [
        btnRef.current,
        ...document.querySelectorAll<HTMLElement>("#mobile-menu a"),
      ].filter((el): el is HTMLElement => !!el);
      const first = items[0];
      const last = items[items.length - 1];
      const here = document.activeElement;
      if (e.shiftKey && here === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && here === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 768 && close(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      html.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  // All nav links: pin the highlight, close the menu (unlocks scroll), then scroll — one action.
  const navigate = useCallback(
    (id: string) => {
      pin(id);
      setOpen(false);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
        history.replaceState(null, "", id === "home" ? location.pathname + location.search : `#${id}`);
      });
    },
    [pin],
  );

  return (
    <>
      <header className="site-nav" data-solid={scrolled || open ? "" : undefined}>
        <nav
          aria-label="Primary"
          className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-10"
        >
          <a href="#home" className="nav-logo" onClick={(e) => {
              e.preventDefault();
              navigate("home");
            }}
            aria-label={`${site.name} ${site.edition} — home`}>
            QUBIT<span>{site.edition}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="nav-link"
                  aria-current={active === item.id ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={btnRef}
            type="button"
            className="nav-menu-btn md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>
      <MobileMenu open={open} active={active} onNavigate={navigate} />
    </>
  );
}
