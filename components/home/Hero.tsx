import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";
import { CountdownPlate } from "./CountdownPlate";

const meta = [
  { label: "When", value: site.date },
  { label: "Where", value: site.venue },
] as const;

/**
 * Landing section. It speaks the same language as the sections below it:
 * the "CH 01 / HOME" label, mono-label + value details, a hard-edged
 * countdown stub that matches the event tickets, and a thin screen-shaped
 * frame that carries the CRT's glass outline into the page.
 *
 * Everything except the wordmark carries `hero-extra`: the intro keeps those
 * hidden while the signal locks and fades them in during the push-in.
 */
export function Hero() {
  return (
    <section
      id="home"
      data-spy="home"
      className="relative isolate min-h-dvh overflow-hidden bg-burgundy text-on-dark"
    >
      <div className="hero-light" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="scanlines-soft" aria-hidden="true" />
      <div className="hero-screen hero-extra" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-dvh max-w-[1400px] flex-col px-5 pb-14 pt-[5.5rem] md:px-10 md:pb-16">
        <div className="hero-extra flex items-center justify-between gap-4 border-b border-on-dark/15 pb-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-on-dark">
          <span>CH 01 / Home</span>
          <span className="flex items-center gap-2">
            <span className="signal-dot" aria-hidden="true" />
            Signal locked
          </span>
        </div>

        <div className="grid flex-1 content-center gap-12 py-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-0">
          <div className="flex flex-col items-start gap-7 lg:pr-14">
            <p className="hero-extra font-mono text-xs uppercase tracking-[0.12em] text-muted-on-dark">
              {site.organiser} presents
            </p>

            <Wordmark />

            <p className="hero-extra max-w-[46ch] text-lg leading-relaxed text-on-dark">
              {site.intro}
            </p>

            <dl className="hero-extra hero-meta">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted-on-dark">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-lg">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="hero-extra flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button href="#events">Explore events →</Button>
              <Button href="#gallery" variant="ghost">
                See the gallery
              </Button>
            </div>
          </div>

          <div className="lg:border-l lg:border-on-dark/15 lg:pl-14">
            <CountdownPlate />
          </div>
        </div>
      </div>
    </section>
  );
}
