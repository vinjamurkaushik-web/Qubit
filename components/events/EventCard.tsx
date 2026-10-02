import type { QubitEvent } from "@/content/events";
import { EventIllustration } from "./EventIllustration";

/**
 * One event as an admission ticket: illustration, perforation, then name,
 * description and the single action — Register Now, which leaves for the
 * event's own Student Tribe page. Only the button is a link (the card is not),
 * so scrolling on a phone can never trigger a redirect by accident.
 */
export function EventCard({ event, index }: { event: QubitEvent; index: number }) {
  return (
    <article className="ticket">
      <div className={`ticket-art tone-${event.tone}`}>
        <EventIllustration event={event} index={index} />
      </div>
      <div className="ticket-perf" aria-hidden="true" />
      <div className="ticket-body">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-on-light">
          {event.code}
        </p>
        <h3 className="font-display text-xl font-bold leading-tight">{event.name}</h3>
        <p className="line-clamp-3 leading-relaxed text-muted-on-light">{event.description}</p>
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-auto w-full"
          aria-label={`Register for ${event.name} on Student Tribe (opens in new tab)`}
        >
          Register Now <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
