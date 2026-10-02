"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { EventCategory, QubitEvent } from "@/content/events";
import { ChannelSwitch } from "./ChannelSwitch";
import { EventCard } from "./EventCard";

const PANEL_ID = "events-panel";
const FADE_OUT_MS = 120;

/**
 * Category switch + card grid. Switching never navigates: the tab changes at
 * once, the current cards fade out (120 ms), then the new set fades in with a
 * short stagger. Both categories have the same page position, so the scroll
 * position is preserved.
 */
export function EventsBrowser({ events }: { events: QubitEvent[] }) {
  const [selected, setSelected] = useState<EventCategory>("technical");
  const [shown, setShown] = useState<EventCategory>("technical");
  const [leaving, setLeaving] = useState(false);
  const [switched, setSwitched] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const select = (next: EventCategory) => {
    if (next === selected) return;
    setSelected(next);
    setSwitched(true);
    window.clearTimeout(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(next);
      return;
    }
    setLeaving(true);
    timer.current = window.setTimeout(() => {
      setShown(next);
      setLeaving(false);
    }, FADE_OUT_MS);
  };

  const counts = {
    technical: events.filter((e) => e.category === "technical").length,
    "non-technical": events.filter((e) => e.category === "non-technical").length,
  };
  const list = events.filter((e) => e.category === shown);

  return (
    <div>
      <div className="channel-bar">
        <ChannelSwitch selected={selected} counts={counts} onSelect={select} panelId={PANEL_ID} />
      </div>
      <div
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`events-tab-${selected}`}
        tabIndex={0}
        className="mt-8"
      >
        <ul
          className={`card-grid ${leaving ? "is-leaving" : ""} ${switched ? "is-switched" : ""}`}
        >
          {list.map((event, i) => (
            <li key={event.id} style={{ "--i": i } as CSSProperties}>
              <EventCard event={event} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
