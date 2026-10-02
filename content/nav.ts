// Navigation items. Each id matches a section's `id` / `data-spy` on the page
// (PRD §4.1). Order is a design decision and can be changed freely here.

export const navItems = [
  { id: "home", label: "Home" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "coordinators", label: "Coordinators" },
  { id: "faculty", label: "Faculty" },
  { id: "contact", label: "Contact Us" },
] as const;

export type NavId = (typeof navItems)[number]["id"];
