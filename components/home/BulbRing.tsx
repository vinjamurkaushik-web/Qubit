import type { CSSProperties } from "react";
import { BULB_COUNT } from "./bulbs";

const DOWN = 4;
const ACROSS = BULB_COUNT / 2 - DOWN;

/** Evenly spaced points around a rectangle, clockwise from the top-left corner. */
const points = (() => {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < ACROSS; i++) pts.push({ x: (i / (ACROSS - 1)) * 100, y: 0 });
  for (let j = 1; j <= DOWN; j++) pts.push({ x: 100, y: (j / (DOWN + 1)) * 100 });
  for (let i = ACROSS - 1; i >= 0; i--) pts.push({ x: (i / (ACROSS - 1)) * 100, y: 100 });
  for (let j = DOWN; j >= 1; j--) pts.push({ x: 0, y: (j / (DOWN + 1)) * 100 });
  return pts;
})();

/**
 * Marquee bulbs around its positioned parent. Bulb i is lit while `--lit`
 * (set on this element by the intro) is above i, so they light in sequence;
 * the chase runs while an ancestor carries `data-surge`. At rest every bulb
 * is lit (`--lit` defaults to BULB_COUNT in CSS).
 */
export function BulbRing() {
  return (
    <div className="bulb-ring" aria-hidden="true">
      {points.map((p, i) => (
        <span
          key={i}
          className="bulb"
          style={{ left: `${p.x}%`, top: `${p.y}%`, "--i": i } as CSSProperties}
        />
      ))}
    </div>
  );
}
