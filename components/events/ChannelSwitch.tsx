"use client";

import type { KeyboardEvent } from "react";
import { categories, type EventCategory } from "@/content/events";

/**
 * Technical / Non-Technical switch, styled as a channel selector. A sliding
 * gold pill marks the selection; implements the ARIA tabs pattern (roving
 * tabindex, arrow / Home / End keys). The panel it controls has id `panelId`.
 */
export function ChannelSwitch({
  selected,
  counts,
  onSelect,
  panelId,
}: {
  selected: EventCategory;
  counts: Record<EventCategory, number>;
  onSelect: (c: EventCategory) => void;
  panelId: string;
}) {
  const index = categories.findIndex((c) => c.id === selected);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = categories.length - 1;
    let next = index;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    onSelect(categories[next].id);
    document.getElementById(`events-tab-${categories[next].id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Event category"
      className="channel-switch"
      onKeyDown={onKeyDown}
    >
      <span
        className="channel-pill"
        aria-hidden="true"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {categories.map((c) => (
        <button
          key={c.id}
          id={`events-tab-${c.id}`}
          type="button"
          role="tab"
          aria-selected={c.id === selected}
          aria-controls={panelId}
          tabIndex={c.id === selected ? 0 : -1}
          className="channel-tab"
          onClick={() => onSelect(c.id)}
        >
          <span className="font-mono text-xs tracking-[0.1em] opacity-70 max-[480px]:hidden">
            CH {c.channel}
          </span>
          <span>{c.label}</span>
          <span className="font-mono text-xs opacity-70">· {counts[c.id]}</span>
        </button>
      ))}
    </div>
  );
}
