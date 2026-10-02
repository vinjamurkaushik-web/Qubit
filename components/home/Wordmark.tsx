import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { BulbRing } from "./BulbRing";

// Horizontal bands copied over the lettering; the intro shifts them sideways
// for the signal-tear effect. Invisible unless --tear-on is set.
const SLICES = [
  { band: "inset(18% 0 66% 0)", shift: "--tear-1" },
  { band: "inset(44% 0 40% 0)", shift: "--tear-2" },
  { band: "inset(70% 0 14% 0)", shift: "--tear-3" },
] as const;

function Lettering() {
  return (
    <>
      QUBIT<span className="wm-year">{site.edition}</span>
    </>
  );
}

/**
 * PLACEHOLDER wordmark — gold lettering with a solid red extrusion. Replace
 * the body of this component with the official vector logo when supplied;
 * `data-intro-focus` marks what the TV screen frames during the intro.
 */
export function Wordmark() {
  return (
    <div
      data-intro-focus
      className="relative inline-block text-[clamp(4rem,17vw,10rem)] lg:text-[clamp(4rem,9.5vw,10rem)]"
    >
      <div className="wm-bloom" aria-hidden="true" />
      <div className="wm-frame">
        <BulbRing />
        <h1 className="wm">
          <Lettering />
        </h1>
        {SLICES.map((s) => (
          <div
            key={s.shift}
            className="wm-slice"
            aria-hidden="true"
            style={
              {
                clipPath: s.band,
                transform: `translateX(calc(var(${s.shift}, 0) * 1px))`,
                padding: "inherit",
              } as CSSProperties
            }
          >
            <div className="wm">
              <Lettering />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
