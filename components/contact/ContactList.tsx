import { contact } from "@/content/contact";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Contact information only (PRD §9.3): large tappable rows for phone, email
 * and the venue map link. There is deliberately no form and no backend.
 */
export function ContactList() {
  return (
    <ul className="grid max-w-3xl gap-3">
      {contact.map((c, i) => (
        <Reveal as="li" key={c.id} index={i}>
          <a
            href={c.href}
            className="contact-row"
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-on-dark">
              {c.label}
            </span>
            <span className="font-display text-xl font-bold md:text-2xl">{c.value}</span>
            <span aria-hidden="true" className="ml-auto text-gold">
              {c.external ? "↗" : "→"}
            </span>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
