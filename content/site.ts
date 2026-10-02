// All replaceable site-level content lives here (PRD §10). Every value is a
// PLACEHOLDER until the real information is provided.

export const site = {
  name: "Qubit",
  edition: "’26",
  channel: "26",
  organiser: "[Placeholder organiser]",
  intro:
    "[Placeholder] A one-sentence introduction to Qubit will appear here once the copy is final.",
  about:
    "[Placeholder] A short description of what Qubit is about will appear here once the copy is final.",
  date: "Date · TBA",
  venue: "Venue · TBA",
  /**
   * PLACEHOLDER countdown target. ISO-8601 with the college's local offset
   * (IST, +05:30) so every visitor sees the same countdown.
   */
  countdownTarget: "2026-12-31T09:00:00+05:30",
  /** PLACEHOLDER message shown once the countdown reaches zero (PRD §5.3, pending). */
  postEventMessage: "Qubit ’26 is live.",
} as const;
