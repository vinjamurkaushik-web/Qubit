import Image from "next/image";
import type { Coordinator } from "@/content/coordinators";

/** Silhouette made of two shapes — shown until a real photo is supplied. */
export function Silhouette() {
  return (
    <div className="silhouette" aria-hidden="true">
      <span className="silhouette-head" />
      <span className="silhouette-body" />
    </div>
  );
}

/** Student coordinator: 4:5 portrait, name, role. */
export function PersonCard({ person }: { person: Coordinator }) {
  return (
    <article>
      <div className="person-photo">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <Silhouette />
        )}
      </div>
      <h3 className="mt-3 font-display text-[1.125rem] font-bold leading-tight">{person.name}</h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-muted-on-light">
        {person.role}
      </p>
    </article>
  );
}
