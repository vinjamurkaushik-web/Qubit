"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Section-entrance behaviour: fades up 16px over 320 ms the first time the
 * element scrolls into view, then stays. `index` staggers siblings by 40 ms
 * (capped at 6). Content is only hidden once JS has marked the page
 * (`html[data-js]`), so nothing is ever invisible without JavaScript, and
 * reduced-motion visitors never see the hidden state.
 */
export function Reveal({
  children,
  className = "",
  index = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-in", "");
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ "--d": `${Math.min(index, 6) * 40}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
