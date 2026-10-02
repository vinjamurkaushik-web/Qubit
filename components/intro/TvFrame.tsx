import type { CSSProperties } from "react";
import type { TvGeo } from "./tvGeometry";

/** Rounded-rectangle path (also used to cut the screen hole). */
function rr(x: number, y: number, w: number, h: number, r: number) {
  return (
    `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}` +
    `A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}` +
    `V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`
  );
}

const fill = (v: string): CSSProperties => ({ fill: `var(${v})` });

/**
 * A 1970s portable television: rabbit-ear antennas, handle, cabinet, dark
 * recess around the glass, and a right-hand control column (channel dial,
 * power knob + LED, speaker grille). The screen is a transparent hole; what
 * shows through it is the intro's static and, later, the real hero.
 *
 * The intro timeline drives three parts directly: `.tv-dial` (rotation),
 * `.tv-rim` (stroke colour) and `.tv-led` / `.tv-led-glow` (`data-on`).
 */
export function TvFrame({ geo }: { geo: TvGeo }) {
  const { vbW, vbH, cab, recess, screen, col } = geo;
  const hole = rr(screen.x + 3, screen.y + 3, screen.w - 6, screen.h - 6, screen.rx - 3);

  const dcx = col.x + col.w / 2;
  const dcy = col.y + 100;
  const dr = Math.min(56, col.w * 0.32);
  const pcy = dcy + dr + 92;
  const pr = Math.min(24, col.w * 0.14);
  const grilleY = pcy + pr + 38;
  const grilleH = col.y + col.h - 14 - grilleY;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      width="100%"
      height="100%"
      style={{ display: "block", overflow: "visible", position: "relative" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="tv-body-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--tv-body-hi)" }} />
          <stop offset="1" style={{ stopColor: "var(--tv-body)" }} />
        </linearGradient>
        <radialGradient id="tv-knob-g" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" style={{ stopColor: "var(--tv-edge)" }} />
          <stop offset="1" style={{ stopColor: "var(--tv-dark)" }} />
        </radialGradient>
        <radialGradient id="tv-gloss-g" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="white" stopOpacity="0.1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tv-glass-g" cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.6" stopColor="black" stopOpacity="0" />
          <stop offset="1" stopColor="black" stopOpacity="0.45" />
        </radialGradient>
        <pattern id="tv-grille" width="14" height="24" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="6" r="4.2" style={fill("--tv-dark")} />
          <circle cx="0" cy="18" r="4.2" style={fill("--tv-dark")} />
          <circle cx="14" cy="18" r="4.2" style={fill("--tv-dark")} />
        </pattern>
      </defs>

      {/* antennas */}
      <g
        style={{ stroke: "var(--tv-edge)" }}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      >
        <line x1="488" y1="168" x2="318" y2="10" />
        <line x1="512" y1="168" x2="682" y2="10" />
      </g>
      <ellipse cx="500" cy="170" rx="30" ry="9" style={fill("--tv-edge")} />

      {/* handle */}
      <rect x="290" y="112" width="420" height="34" rx="6" style={fill("--tv-body")} />
      <rect
        x="290"
        y="112"
        width="420"
        height="34"
        rx="6"
        fill="none"
        style={{ stroke: "var(--tv-edge)" }}
        strokeWidth="2"
      />
      <rect x="300" y="144" width="14" height="26" style={fill("--tv-body")} />
      <rect x="686" y="144" width="14" height="26" style={fill("--tv-body")} />

      {/* feet */}
      <rect x="110" y={cab.y + cab.h - 2} width="90" height="26" rx="4" style={fill("--tv-dark")} />
      <rect x="800" y={cab.y + cab.h - 2} width="90" height="26" rx="4" style={fill("--tv-dark")} />

      {/* cabinet */}
      <path
        fillRule="evenodd"
        fill="url(#tv-body-g)"
        d={`${rr(cab.x, cab.y, cab.w, cab.h, cab.r)}${hole}`}
      />
      <rect
        x={cab.x + 0.5}
        y={cab.y + 0.5}
        width={cab.w - 1}
        height={cab.h - 1}
        rx={cab.r}
        fill="none"
        style={{ stroke: "var(--tv-edge)" }}
        strokeWidth="2"
      />
      <line
        x1={cab.x + cab.r}
        y1={cab.y + 2}
        x2={cab.x + cab.w - cab.r}
        y2={cab.y + 2}
        stroke="white"
        strokeOpacity="0.12"
        strokeWidth="2"
      />

      {/* dark recess with the transparent glass hole cut out */}
      <path
        fillRule="evenodd"
        style={fill("--tv-dark")}
        d={`${rr(recess.x, recess.y, recess.w, recess.h, recess.r)}${hole}`}
      />

      {/* control column */}
      <rect
        x={col.x}
        y={col.y}
        width={col.w}
        height={col.h}
        rx="10"
        style={{ fill: "var(--tv-panel)", stroke: "var(--tv-edge)" }}
        strokeWidth="2"
      />
      <text
        x={dcx}
        y={col.y + 28}
        textAnchor="middle"
        fontSize="13"
        letterSpacing="2"
        style={{ fill: "var(--tv-label)", fontFamily: "var(--font-jetbrains), monospace" }}
      >
        UHF
      </text>
      <circle cx={dcx} cy={dcy} r={dr + 10} style={fill("--tv-dark")} />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={dcx + Math.cos(a) * (dr + 4)}
            y1={dcy + Math.sin(a) * (dr + 4)}
            x2={dcx + Math.cos(a) * (dr + 10)}
            y2={dcy + Math.sin(a) * (dr + 10)}
            style={{ stroke: "var(--tv-label)" }}
            strokeWidth="2"
          />
        );
      })}
      <g
        className="tv-dial"
        style={{ transformBox: "fill-box", transformOrigin: "center" } as CSSProperties}
      >
        <circle cx={dcx} cy={dcy} r={dr} fill="url(#tv-knob-g)" />
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x={dcx - 3}
            y={dcy - dr - 1}
            width="6"
            height="10"
            rx="2"
            style={fill("--tv-edge")}
            transform={`rotate(${i * 30} ${dcx} ${dcy})`}
          />
        ))}
        <circle cx={dcx} cy={dcy} r={dr * 0.62} style={fill("--tv-dark")} />
        <line
          x1={dcx}
          y1={dcy - dr * 0.55}
          x2={dcx}
          y2={dcy - dr * 0.12}
          stroke="white"
          strokeOpacity="0.7"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* power knob + LED */}
      <circle cx={dcx} cy={pcy} r={pr + 6} style={fill("--tv-dark")} />
      <circle cx={dcx} cy={pcy} r={pr} fill="url(#tv-knob-g)" />
      <line
        x1={dcx}
        y1={pcy - pr * 0.7}
        x2={dcx}
        y2={pcy - pr * 0.15}
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="tv-led-glow" cx={col.x + 22} cy={pcy - pr - 20} r="12" />
      <circle className="tv-led" cx={col.x + 22} cy={pcy - pr - 20} r="5" />
      <text
        x={col.x + 12}
        y={pcy + pr + 24}
        fontSize="10"
        letterSpacing="1"
        style={{ fill: "var(--tv-label)", fontFamily: "var(--font-jetbrains), monospace" }}
      >
        ON·OFF
      </text>

      {/* speaker grille */}
      <rect
        x={col.x + 14}
        y={grilleY}
        width={col.w - 28}
        height={grilleH}
        rx="6"
        fill="url(#tv-grille)"
      />

      {/* glass: edge shading, specular highlight, and the rim that catches screen light */}
      <rect
        x={screen.x}
        y={screen.y}
        width={screen.w}
        height={screen.h}
        rx={screen.rx}
        fill="url(#tv-glass-g)"
      />
      <ellipse
        cx={screen.x + screen.w * 0.24}
        cy={screen.y + screen.h * 0.2}
        rx={screen.w * 0.2}
        ry={screen.h * 0.12}
        fill="url(#tv-gloss-g)"
        transform={`rotate(-22 ${screen.x + screen.w * 0.24} ${screen.y + screen.h * 0.2})`}
      />
      <rect
        x={screen.x + 1}
        y={screen.y + 1}
        width={screen.w - 2}
        height={screen.h - 2}
        rx={screen.rx - 1}
        fill="none"
        strokeWidth="5"
        className="tv-rim"
      />
    </svg>
  );
}
