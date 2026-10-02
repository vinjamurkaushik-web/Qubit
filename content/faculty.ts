// Faculty / professors (PRD §9.2). PLACEHOLDER entries. `featured` gives an
// entry a full-width row (e.g. the head of department).

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  photo?: string;
  featured?: boolean;
}

export const faculty: FacultyMember[] = Array.from({ length: 6 }, (_, i) => ({
  id: `faculty-${i + 1}`,
  name: `Faculty Member ${i + 1}`,
  designation: "[Placeholder designation]",
  featured: i === 0,
}));
