"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

const TARGET = new Date(site.countdownTarget).getTime();
const UNITS = ["Days", "Hrs", "Min", "Sec"] as const;

// Whole seconds since the epoch. Primitive and stable within a second, so React
// re-renders once per second, aligned to the wall clock. The server snapshot is
// null so server HTML and first client render both show "--" (no hydration mismatch).
function subscribe(notify: () => void) {
  const id = setInterval(notify, 250);
  return () => clearInterval(id);
}
const now = () => Math.floor(Date.now() / 1000);
const serverNow = () => null;

function split(secondsLeft: number) {
  const s = Math.max(0, secondsLeft);
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

/**
 * Live countdown to `site.countdownTarget` (an ISO string with the college's
 * UTC offset, so every visitor sees the same time). Ticks every second, only
 * changed digits animate, and it stops at zero — never negative — showing
 * `site.postEventMessage`.
 *
 * Styled as a ticket stub — the same hard ink border, offset shadow and
 * perforation as the event tickets — so it reads as part of one system.
 */
export function CountdownPlate() {
  const nowS = useSyncExternalStore(subscribe, now, serverNow);
  const valid = Number.isFinite(TARGET);
  const ready = nowS !== null && valid;
  const left = ready ? Math.ceil(TARGET / 1000) - nowS : 0;
  const values = ready ? split(left) : null;
  const over = ready && left <= 0;

  return (
    <div
      className="plate hero-extra"
      role="timer"
      aria-label={`Time until ${site.name} ${site.edition} begins`}
    >
      <div className="plate-head">
        <span>Event starts in</span>
        <span>CH {site.channel}</span>
      </div>
      <div className="plate-perf" aria-hidden="true" />
      <div className="plate-body">
        <div className="grid grid-cols-4 text-center">
          {UNITS.map((unit, i) => {
            const text = values ? String(values[i]).padStart(2, "0") : "--";
            return (
              <div key={unit} className="plate-unit">
                <div
                  className="font-mono text-[clamp(2rem,6.5vw,3.25rem)] font-bold leading-none tabular-nums text-on-dark"
                  aria-hidden="true"
                >
                  <span key={text} className="digit">
                    {text}
                  </span>
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-on-dark">
                  {unit}
                </div>
              </div>
            );
          })}
        </div>
        <p className="sr-only">
          {values
            ? `${values[0]} days, ${values[1]} hours, ${values[2]} minutes`
            : "Countdown loading"}
        </p>
        {over && (
          <p className="mt-5 text-center font-display text-xl font-extrabold text-gold">
            {site.postEventMessage}
          </p>
        )}
        <p className="mt-5 border-t border-on-dark/15 pt-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-on-dark">
          Local time · IST
        </p>
      </div>
    </div>
  );
}
