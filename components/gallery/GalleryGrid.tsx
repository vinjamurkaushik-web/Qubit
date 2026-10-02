import Image from "next/image";
import { gallery } from "@/content/gallery";
import { Reveal } from "@/components/ui/Reveal";

/** Placeholder tile: a broadcast test card in the palette, labelled NO SIGNAL. */
function TestCard({ n }: { n: number }) {
  return (
    <div className="test-card" role="img" aria-label={`Placeholder photo ${n}`}>
      <div className="test-card-bars" />
      <p className="test-card-label">PHOTO {String(n).padStart(2, "0")} · NO SIGNAL</p>
    </div>
  );
}

/**
 * Photo grid: 2 columns on phones, 4 on desktop, every 5th tile spans 2×2.
 * A tile with `src` shows that photo in the same box (object-fit: cover), so
 * real photographs replace the test cards without any layout change.
 */
export function GalleryGrid() {
  return (
    <ul className="grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {gallery.map((item, i) => (
        <Reveal
          as="li"
          key={item.id}
          index={i}
          className={`gallery-tile aspect-square ${(i + 1) % 5 === 0 ? "col-span-2 row-span-2" : ""}`}
        >
          {item.src ? (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
          ) : (
            <TestCard n={i + 1} />
          )}
        </Reveal>
      ))}
    </ul>
  );
}
