import { navItems } from "@/content/nav";
import { site } from "@/content/site";

/** Closing footer: the nav repeated, the Student Tribe note, and the wordmark. */
export function Footer() {
  return (
    <footer className="bg-ink text-on-dark">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
        <nav aria-label="Footer">
          <ul className="-ml-3 flex flex-wrap gap-x-2 gap-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-8 max-w-[52ch] text-muted-on-dark">
          Registration is handled by Student Tribe. Each event’s Register Now button takes you to
          its page there.
        </p>
        <p
          className="mt-10 font-display text-[clamp(3.5rem,14vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.02em] text-gold"
          aria-hidden="true"
        >
          {site.name.toUpperCase()}
          <span className="ml-[0.06em] text-[0.38em] text-signal-red">{site.edition}</span>
        </p>
      </div>
    </footer>
  );
}
