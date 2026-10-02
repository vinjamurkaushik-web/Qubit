// Contact details (PRD §9.3). ALL PLACEHOLDERS — replace `value` and `href`
// with the real details. Display only: there is no form and no backend.

export interface ContactItem {
  id: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export const contact: ContactItem[] = [
  { id: "phone", label: "Phone", value: "[Placeholder phone number]", href: "tel:+000000000000" },
  {
    id: "email",
    label: "Email",
    value: "[Placeholder email address]",
    href: "mailto:placeholder@example.com",
  },
  {
    id: "venue",
    label: "Venue",
    value: "[Placeholder venue — opens map]",
    href: "https://maps.example/PLACEHOLDER",
    external: true,
  },
];
