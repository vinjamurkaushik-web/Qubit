import Image from "next/image";
import type { FacultyMember } from "@/content/faculty";
import { Silhouette } from "./PersonCard";

/** One faculty member: 72px round photo, name, designation. */
export function FacultyRow({ member }: { member: FacultyMember }) {
  return (
    <article className="faculty-row">
      <div className="faculty-photo">
        {member.photo ? (
          <Image src={member.photo} alt={member.name} fill sizes="72px" className="object-cover" />
        ) : (
          <Silhouette />
        )}
      </div>
      <div>
        <h3 className="font-display text-xl font-bold leading-tight">{member.name}</h3>
        <p className="mt-1 text-muted-on-light">{member.designation}</p>
      </div>
    </article>
  );
}
