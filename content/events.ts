// Event content (PRD §6). Everything here is PLACEHOLDER: replace names,
// descriptions, illustrations and registrationUrl with the real data. Adding,
// removing or reordering entries needs no other change.

export type EventCategory = "technical" | "non-technical";
export type EventTone = "gold" | "amber" | "red" | "burgundy";

export interface QubitEvent {
  id: string;
  /** Short mono label shown on the card, e.g. "T-01". */
  code: string;
  category: EventCategory;
  name: string;
  /** Brief introduction only — detailed rules live on Student Tribe. */
  description: string;
  /** This event's own Student Tribe registration page. */
  registrationUrl: string;
  /** Background tone of the illustration tile. */
  tone: EventTone;
  /** Final artwork. When omitted, a clearly-marked placeholder illustration is drawn. */
  illustration?: { src: string; alt: string };
}

export const categories: { id: EventCategory; label: string; channel: number }[] = [
  { id: "technical", label: "Technical", channel: 1 },
  { id: "non-technical", label: "Non-Technical", channel: 2 },
];

const tones: EventTone[] = ["gold", "amber", "red", "burgundy"];
const PLACEHOLDERS_PER_CATEGORY = 12;

function placeholders(category: EventCategory, letter: string, label: string): QubitEvent[] {
  return Array.from({ length: PLACEHOLDERS_PER_CATEGORY }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `${letter.toLowerCase()}${n}`,
      code: `${letter}-${n}`,
      category,
      name: `${label} Event ${i + 1}`,
      description:
        "[Placeholder] A brief introduction to this event will appear here once the copy is final.",
      registrationUrl: `https://studenttribe.example/PLACEHOLDER-${letter}${n}`,
      tone: tones[i % tones.length],
    };
  });
}

export const events: QubitEvent[] = [
  ...placeholders("technical", "T", "Technical"),
  ...placeholders("non-technical", "N", "Non-Technical"),
];
