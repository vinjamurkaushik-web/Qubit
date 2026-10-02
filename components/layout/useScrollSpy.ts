"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Which section is "current": the one crossing a line 40% down the viewport
 * (or the last one when scrolled to the very bottom). Sections opt in with
 * `data-spy="<id>"`; several elements may share an id (the hero and the
 * programme strip are both "home"). While the user scrolls, the URL hash
 * follows the active section ("home" clears it) without adding history entries.
 *
 * `pin(id)` makes a nav click authoritative: short sections near the page end
 * cannot scroll up to the line, so without it the clicked item would not be the
 * highlighted one. The pin is released by the next manual scroll (wheel, touch, key).
 */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  const pinned = useRef<string | null>(null);
  const currentRef = useRef(ids[0]);

  const pin = useCallback((id: string) => {
    pinned.current = id;
    currentRef.current = id;
    setActive(id);
  }, []);

  useEffect(() => {
    let raf = 0;

    const compute = (syncHash: boolean) => {
      raf = 0;
      if (pinned.current) return;
      const line = window.innerHeight * 0.4;
      let next = ids[0];
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && window.scrollY > 0) {
        next = ids[ids.length - 1];
      } else {
        for (const id of ids) {
          for (const el of document.querySelectorAll(`[data-spy="${id}"]`)) {
            const r = el.getBoundingClientRect();
            if (r.top <= line && r.bottom > line) next = id;
          }
        }
      }
      if (next === currentRef.current) return;
      currentRef.current = next;
      setActive(next);
      if (syncHash) {
        const url = next === ids[0] ? location.pathname + location.search : `#${next}`;
        history.replaceState(null, "", url);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => compute(true));
    };

    const release = () => {
      pinned.current = null;
    };
    // A deep link (/#faculty) highlights its own item until the user scrolls.
    raf = requestAnimationFrame(() => {
      const hash = location.hash.slice(1);
      if (ids.includes(hash)) pin(hash);
      else compute(false);
    });
    for (const ev of ["wheel", "touchmove", "keydown"]) window.addEventListener(ev, release, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      for (const ev of ["wheel", "touchmove", "keydown"]) window.removeEventListener(ev, release);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, pin]);

  return [active, pin] as const;
}
