// Student coordinators (PRD §9.1). PLACEHOLDER entries; `photo` is optional.

export interface Coordinator {
  id: string;
  name: string;
  role: string;
  photo?: string;
}

export const coordinators: Coordinator[] = Array.from({ length: 8 }, (_, i) => ({
  id: `coordinator-${i + 1}`,
  name: `Coordinator ${i + 1}`,
  role: "[Placeholder role]",
}));
