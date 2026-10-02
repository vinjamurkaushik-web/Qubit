"use client";

import { useEffect, useRef } from "react";
import { navItems } from "@/content/nav";

/**
 * Full-screen ink sheet with the six destinations (CH 01–06). Rendered always
 * (hidden via CSS) so its links exist for keyboard focus handling; the parent
 * owns open state and the Menu/Close button.
 */
export function MobileMenu({
  open,
  active,
  onNavigate,
}: {
  open: boolean;
  active: string;
  onNavigate: (id: string) => void;
}) {
  const firstRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) firstRef.current?.focus();
  }, [open]);

  return (
    <div
      id="mobile-menu"
      className="mobile-menu"
      data-open={open ? "" : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
    >
      <ul className="flex flex-col">
        {navItems.map((item, i) => (
          <li key={item.id}>
            <a
              ref={i === 0 ? firstRef : undefined}
              href={`#${item.id}`}
              className="mobile-menu-link"
              aria-current={active === item.id ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
            >
              <span className="font-mono text-xs tracking-[0.12em] text-muted-on-dark">
                CH {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
