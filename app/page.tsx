import { CrtIntro } from "@/components/intro/CrtIntro";
import { Hero } from "@/components/home/Hero";
import { ProgrammeStrip } from "@/components/home/ProgrammeStrip";
import { SiteNav } from "@/components/layout/SiteNav";
import { Footer } from "@/components/layout/Footer";
import { SectionShell } from "@/components/sections/SectionShell";
import { EventsBrowser } from "@/components/events/EventsBrowser";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PersonCard } from "@/components/people/PersonCard";
import { FacultyRow } from "@/components/people/FacultyRow";
import { ContactList } from "@/components/contact/ContactList";
import { Reveal } from "@/components/ui/Reveal";
import { events } from "@/content/events";
import { coordinators } from "@/content/coordinators";
import { faculty } from "@/content/faculty";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <CrtIntro>
          <Hero />
        </CrtIntro>
        <ProgrammeStrip />

        <SectionShell id="events" index={2} label="Events" title="Events" tone="light">
          <EventsBrowser events={events} />
        </SectionShell>

        <SectionShell
          id="gallery"
          index={3}
          label="Gallery"
          title="Gallery"
          tone="dark"
          revealBody={false}
        >
          <GalleryGrid />
        </SectionShell>

        <SectionShell
          id="coordinators"
          index={4}
          label="Coordinators"
          title="Student coordinators"
          tone="light"
          revealBody={false}
        >
          <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
            {coordinators.map((c, i) => (
              <Reveal as="li" key={c.id} index={i}>
                <PersonCard person={c} />
              </Reveal>
            ))}
          </ul>
        </SectionShell>

        <SectionShell
          id="faculty"
          index={5}
          label="Faculty"
          title="Faculty"
          tone="light"
          revealBody={false}
        >
          <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
            {faculty.map((f, i) => (
              <Reveal as="li" key={f.id} index={i} className={f.featured ? "md:col-span-2" : ""}>
                <FacultyRow member={f} />
              </Reveal>
            ))}
          </ul>
        </SectionShell>

        <SectionShell
          id="contact"
          index={6}
          label="Contact"
          title="Questions about Qubit?"
          tone="dark"
          revealBody={false}
        >
          <ContactList />
        </SectionShell>
      </main>
      <Footer />
    </>
  );
}
