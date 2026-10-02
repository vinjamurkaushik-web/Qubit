// Gallery content (PRD §8). PLACEHOLDER tiles until real photographs are
// supplied: give an item a `src` (a file in /public) and it replaces the test
// card without any layout change.

export interface GalleryItem {
  id: string;
  alt: string;
  src?: string;
}

export const gallery: GalleryItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `photo-${i + 1}`,
  alt: `Placeholder gallery photo ${i + 1}`,
}));
