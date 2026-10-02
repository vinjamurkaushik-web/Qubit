import { site } from "@/content/site";

const fields = [
  { label: "About", value: site.about },
  { label: "Organised by", value: site.organiser },
  { label: "When", value: site.date },
  { label: "Where", value: site.venue },
] as const;

/**
 * "Programme strip" (PRD §5.4): what the event is, who organises it, when and
 * where. Information world — flat cream surface, no effects. Values come from
 * content/site.ts and are placeholders until finalised.
 */
export function ProgrammeStrip() {
  return (
    <section
      data-spy="home"
      aria-label="Event information"
      className="bg-cream text-on-light"
    >
      <dl className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 sm:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-0">
        {fields.map((f, i) => (
          <div
            key={f.label}
            className={`lg:px-8 ${i > 0 ? "lg:border-l lg:border-on-light/20" : "lg:pl-0"}`}
          >
            <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted-on-light">
              {f.label}
            </dt>
            <dd className="mt-2 text-lg leading-snug">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
