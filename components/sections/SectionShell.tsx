import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Anchored section frame shared by Events, Gallery, Coordinators, Faculty and
 * Contact: the nav's scroll target, the surface tone (dark = spectacle world,
 * light = information world) and the mono "CH 02 / EVENTS" heading.
 * `revealBody={false}` lets a section reveal its own items individually.
 */
export function SectionShell({
  id,
  index,
  label,
  title,
  tone,
  revealBody = true,
  children,
}: {
  id: string;
  index: number;
  label: string;
  title: string;
  tone: "light" | "dark";
  revealBody?: boolean;
  children?: ReactNode;
}) {
  const light = tone === "light";
  return (
    <section
      id={id}
      data-spy={id}
      aria-labelledby={`${id}-title`}
      className={`relative ${light ? "bg-cream text-on-light" : "bg-burgundy text-on-dark"}`}
    >
      {!light && <div className="grain" aria-hidden="true" />}
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p
            className={`font-mono text-xs uppercase tracking-[0.12em] ${
              light ? "text-muted-on-light" : "text-muted-on-dark"
            }`}
          >
            CH {String(index).padStart(2, "0")} / {label}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-none tracking-[-0.02em]"
          >
            {title}
          </h2>
        </Reveal>
        <div className="mt-10">{revealBody ? <Reveal>{children}</Reveal> : children}</div>
      </div>
    </section>
  );
}
