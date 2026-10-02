import Image from "next/image";
import type { QubitEvent } from "@/content/events";

/** Placeholder glyphs: plain geometry, ink outline, two palette fills (PRD §6.4). */
const GLYPHS = [
  (a: string, b: string) => (
    <>
      <circle cx="200" cy="130" r="62" style={{ fill: a }} />
      <circle cx="226" cy="108" r="22" style={{ fill: b }} />
    </>
  ),
  (a: string, b: string) => (
    <>
      <rect x="140" y="70" width="120" height="120" rx="14" style={{ fill: a }} />
      <rect x="170" y="100" width="60" height="60" rx="8" style={{ fill: b }} />
    </>
  ),
  (a: string, b: string) => (
    <>
      <polygon points="200,64 268,190 132,190" style={{ fill: a }} />
      <circle cx="200" cy="154" r="16" style={{ fill: b }} />
    </>
  ),
  (a: string, b: string) => (
    <>
      <polygon points="200,60 270,130 200,200 130,130" style={{ fill: a }} />
      <polygon points="200,98 232,130 200,162 168,130" style={{ fill: b }} />
    </>
  ),
  (a: string, b: string) => (
    <>
      <circle cx="200" cy="130" r="64" style={{ fill: a }} />
      <circle cx="200" cy="130" r="34" style={{ fill: b }} />
    </>
  ),
  (a: string, b: string) => (
    <>
      <rect x="124" y="108" width="152" height="44" rx="22" style={{ fill: a }} />
      <rect x="178" y="54" width="44" height="152" rx="22" style={{ fill: b }} />
    </>
  ),
];

/**
 * The illustration slot of an event card. Real artwork (`event.illustration`)
 * fills the same 4:3 box as the placeholder, so swapping never changes layout.
 */
export function EventIllustration({ event, index }: { event: QubitEvent; index: number }) {
  if (event.illustration) {
    return (
      <Image
        src={event.illustration.src}
        alt={event.illustration.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    );
  }
  const glyph = GLYPHS[index % GLYPHS.length]("var(--cream)", "var(--ink)");
  return (
    <svg
      viewBox="0 0 400 300"
      className="ticket-art-svg"
      role="img"
      aria-label={`Placeholder illustration for ${event.name}`}
    >
      <g stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round">
        {glyph}
      </g>
      <text
        x="20"
        y="278"
        fontSize="30"
        fontWeight="700"
        style={{ fill: "var(--ink)", fontFamily: "var(--font-jetbrains), monospace" }}
      >
        {event.code}
      </text>
      <text
        x="380"
        y="32"
        fontSize="15"
        textAnchor="end"
        letterSpacing="2"
        style={{ fill: "var(--ink)", fontFamily: "var(--font-jetbrains), monospace" }}
      >
        PLACEHOLDER
      </text>
    </svg>
  );
}
