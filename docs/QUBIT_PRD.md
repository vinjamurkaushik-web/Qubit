# QUBIT — Technical Event Website
## Product Requirements Document (Frontend)

---

## 1. Purpose and Scope

### 1.1 Overview
Qubit is a technical event organized at our college. This document specifies the frontend of the Qubit event website. The website is the primary platform where students discover the event, browse its activities, view essential information, and are directed to the registration platform.

### 1.2 Entry Point
Visitors reach the website primarily by scanning a QR code printed on Qubit promotional posters. The QR code redirects directly to the website's landing page. Because the main access path is a phone camera, the website must be fully usable on mobile devices as well as desktop.

### 1.3 Core Objective
Provide a clean, visually engaging, easy-to-navigate website that:
- Explains what Qubit is and shows essential event information with a live countdown.
- Lets visitors browse Technical and Non-Technical events.
- Redirects visitors to the correct Student Tribe registration page for each event.

### 1.4 Current Phase
This phase covers the frontend structure, functionality, and user flow only. All unfinalized content is implemented with **placeholders** (see Section 11). The color palette, typography, and visual theme are **pending** and are decided by the design team.

### 1.5 Responsibility Split

| Responsibility | Qubit Website | Student Tribe (external) |
|---|---|---|
| Event overview and landing information | Yes | No |
| Event discovery (browse by category, event cards) | Yes | No |
| Gallery, coordinators, faculty, contact information | Yes | No |
| Register Now button and redirect | Yes | No |
| Registration pages and forms | No | Yes |
| Team size restrictions | No | Yes |
| Registration fees | No | Yes |
| Rules and regulations | No | Yes |
| Detailed event descriptions and instructions | No | Yes |
| Event-specific posters and registration details | No | Yes |

---

## 2. User Flow

1. A student or visitor sees a Qubit promotional poster.
2. They scan the QR code, which opens the Qubit landing page.
3. The landing page shows the event introduction, essential details, and the live countdown timer.
4. The visitor opens the Events section via the navigation bar (or a landing-page entry point to it, if provided by the design).
5. The visitor chooses **Technical Events** or **Non-Technical Events**; the matching event cards are displayed. They can switch categories at any time without leaving the Events section.
6. The visitor browses the cards and selects an event of interest.
7. The visitor clicks **Register Now** on that event's card.
8. The visitor is redirected to that event's Student Tribe registration page.
9. Registration continues entirely on Student Tribe.

The journey from event discovery to the registration page must require as few steps as possible.

---

## 3. Design Philosophy

The website must feel like a thoughtfully designed college technical event site, not a generic template. The design is **minimalist, clean, modern, and visually balanced**.

| Principle | Requirement |
|---|---|
| Minimalism | Include only elements that serve a clear functional or visual purpose. |
| Clarity | The purpose of every section is immediately understandable. |
| Visual hierarchy | The most important information (event name, date, countdown, Register Now) receives the most emphasis. |
| Consistency | One design language across the landing page, events, gallery, and all other sections. |
| Whitespace | Sections and elements have generous spacing and never feel cramped. |
| Simplicity | Layouts, navigation, and interactions stay simple. |
| Visual identity | Qubit has a recognizable identity without relying on heavy decoration. |
| Readability | Legible typography and well-organized content; text, buttons, and key information are easy to identify. |
| Usability | Event exploration and registration actions are easy to discover. |

**Avoid:** cluttered layouts, excessive gradients, unnecessary animations or visual effects, oversized decorative elements, and excessive card nesting.

**Open decisions (design team):** color palette, typography system, and overall visual theme. Implementations must not finalize these; use neutral, easily replaceable styling values so the chosen theme can be applied later without restructuring the interface.

---

## 4. Navigation and Information Architecture

### 4.1 Navigation Bar
A single, consistent navigation bar is available on every page/section of the website. It must be simple and must not occupy excessive screen space. On small screens it must remain usable and compact.

| Item | Destination |
|---|---|
| Home | Landing page |
| Events | Events section (category selection and event cards) |
| Gallery | Gallery section |
| Coordinators | Student coordinators section |
| Faculty | Faculty / professors section |
| Contact Us | Contact section |

- Each item leads to exactly one defined destination.
- The current location is visually indicated in the navigation.
- Item order is decided during the design phase, provided navigation stays intuitive. The list above is not a mandated order.
- The Qubit logo (see 5.1) links to Home.

### 4.2 Page Structure — Pending Decision
Whether the sections are separate pages or sections of a single scrolling page is **pending**. Either approach is acceptable provided that:
- Every navigation item reaches its destination in one action.
- No pages or sections beyond those listed in this document are introduced.
- The Events category switch (Section 6.1) does not require a separate page load or extra navigation.

---

## 5. Landing Page (Home)

The landing page immediately communicates what Qubit is and provides the essential event information.

### 5.1 Header
- Qubit logo, displayed prominently.
- The main navigation bar.
- A clean, balanced layout.

### 5.2 Hero Section
Establishes the identity of the event and is informative without being text-heavy or decorated excessively. It contains:
- Event name: **QUBIT**.
- A brief introduction explaining what Qubit is.
- Who is organizing the event.
- Event date and other essential details.
- A visually engaging presentation that makes the event immediately recognizable.

### 5.3 Countdown Timer
Displayed directly on the landing page, clearly visible, and integrated naturally into the design.

- Shows the time remaining until the event begins, in days, hours, minutes, and seconds.
- Updates dynamically every second while the page is open. It must not be a static image or static text.
- Counts down to a single configurable target date and time, which must be easy to set once the real date and time are finalized. Until then, a clearly marked placeholder target is used.
- The target is interpreted in the event's local time zone (the college's local time) so that all visitors see the same countdown.
- Once the target time is reached, the timer stops at zero and never shows negative values. The message displayed after the event starts is **pending**.

### 5.4 Event Information
A structured, readable block presenting:
- What the event is about.
- Who is organizing it.
- When it takes place.
- Other relevant event details (to be finalized later).

Actual values for these fields are placeholders until provided.

---

## 6. Events Section

One of the primary functional components. Visitors explore Qubit's events and distinguish between technical and non-technical categories.

### 6.1 Category Selection
- Two clear category options: **Technical Events** and **Non-Technical Events**.
- Selecting a category displays that category's event cards.
- Only one category is shown at a time; visitors switch between them directly within the Events section, without navigating through additional pages.
- The selected category is visually indicated. On first opening the Events section, Technical Events is selected by default (implementation default; may be changed by the design team).

### 6.2 Event Listings
- Each event is represented by one event card.
- Initial implementation uses placeholder events: approximately **10–15 Technical** and **10–15 Non-Technical**.
- Placeholder events must be clearly generic (for example, "Technical Event 1") and must not use invented real event names.
- Actual names, descriptions, illustrations, and registration links are provided later. Adding, removing, or changing an event must not require restructuring the interface.

### 6.3 Event Card
Every card contains:

| Element | Description |
|---|---|
| Illustration | A basic event logo or illustration (see 6.4). |
| Event name | The event's title. |
| Description | A brief introductory text. Detailed descriptions and instructions are handled by Student Tribe. |
| Register Now button | Clearly visible; redirects to the event's Student Tribe page (see Section 7). |

Cards are visually consistent in structure, while each event keeps a distinct identity through its own illustration and content.

### 6.4 Event Illustrations
Each event has a simple, distinctive visual representation.

- Minimalist 2D illustrations in a friendly, cartoonish or animated visual language.
- Simple shapes and a limited number of colors.
- Clear, recognizable imagery related to the specific event.
- The same illustration style across all cards.
- Avoid generic AI-looking imagery, overly complex illustrations, and 3D treatments.
- In the initial implementation, simple placeholder illustrations are used until final artwork is supplied. Each illustration must be replaceable without altering the card layout.

The goal is a friendly, approachable, visually coherent event listing.

### 6.5 Optional Filtering — Not in Initial Scope
Filtering by event timing (for example, morning / evening) may be considered later. It is **not** part of the initial implementation. The only required browsing mechanism is the Technical / Non-Technical category selection.

---

## 7. Registration Integration — Student Tribe

The website does **not** handle registration. Registration is managed entirely by Student Tribe, an external platform.

### 7.1 Requirements
- Every event card has a **Register Now** button.
- Clicking it redirects the user to that event's Student Tribe registration URL.
- Each event has its own registration URL.
- Registration URLs are configurable per event so real Student Tribe links can be added once provided, without changing the interface structure.
- Until real links exist, each event holds a clearly marked placeholder URL. The button remains visible and functional-looking in all cases.
- Whether the link opens in the same tab or a new tab is **pending**.

### 7.2 Boundaries
The Qubit website only provides the event discovery interface and the redirect. It must not build a registration system or duplicate any Student Tribe functionality (registration forms or submission, team size rules, fees, rules and regulations, detailed event descriptions or instructions, event-specific posters or registration information).

---

## 8. Gallery Section

- A dedicated section, reachable from the navigation bar, for photographs and visual content related to Qubit.
- Initial implementation uses placeholder images/tiles to establish structure and layout.
- Actual photographs are provided later and must be replaceable without layout changes.

---

## 9. People and Contact Sections

### 9.1 Coordinators Section
- A dedicated section presenting the student coordinators organizing Qubit in a structured layout.
- Each entry is designed to hold: name, photograph, and role (additional details may be added later).
- Initial implementation uses placeholder entries; actual details are provided later.

### 9.2 Faculty / Professors Section
- A dedicated section acknowledging the professors and faculty members organizing or overseeing Qubit, presented clearly and professionally.
- Each entry is designed to hold: name, designation, and photograph (additional details may be added later).
- Initial implementation uses placeholder entries; actual details are finalized later.

### 9.3 Contact Us Section
- A dedicated section, reachable from the navigation bar, providing contact information for event-related queries.
- Initial implementation establishes the basic structure with placeholder contact details; actual details are provided later.
- It displays contact information only. It does not include a message-submission form or any backend.

---

## 10. General Requirements

- **Responsive:** All sections and the event cards display correctly and are easy to use on phones, tablets, and desktops, with mobile as the primary use case (QR code access).
- **Content replaceability:** All changeable content (event details, illustrations, registration links, countdown target, coordinator, faculty, gallery, and contact information) is kept separate from the presentation layout so it can be updated without restructuring the interface.
- **Readability:** Text, buttons, and links are clearly legible and easy to tap on touch devices.

---

## 11. Placeholder Content and Pending Decisions

### 11.1 Placeholder Content
The following use placeholders until the real information is provided:

- Event date, time, and other event details
- Event names, descriptions, and illustrations
- Student Tribe registration links
- Gallery images
- Coordinator names, photographs, and roles
- Faculty names, designations, and photographs
- Contact details

Placeholders must be clearly identifiable as placeholders. No real event names, dates, coordinator details, faculty details, or contact information are to be invented.

### 11.2 Pending Decisions

| Item | Status |
|---|---|
| Color palette, typography, overall visual theme | Pending (design team) |
| Final order of navigation items | Pending (design phase) |
| Separate pages vs. single scrolling page | Pending |
| Countdown message after the event starts | Pending |
| Register Now link opening behavior (same tab / new tab) | Pending |
| Event date, time, and final event details | Pending |
| Event timing filter (morning / evening) | Optional; not in initial scope |

---

## 12. Initial Implementation Scope

**In scope**
- Landing page with Qubit branding, navigation, event introduction, and essential information
- Dynamically updating countdown timer
- Technical and Non-Technical categories with direct switching
- Approximately 10–15 placeholder event cards per category, each with a minimal 2D cartoon-style illustration
- Register Now buttons with configurable per-event Student Tribe links
- Gallery, Coordinators, Faculty / Professors, and Contact Us sections
- Consistent, clean, uncluttered presentation across all sections

**Out of scope**
1. A registration system of any kind, or duplication of Student Tribe functionality.
2. Authentication or user accounts.
3. Payment processing.
4. Admin dashboards or backend functionality.
5. Invented event names, dates, coordinator, faculty, or contact information.
6. A finalized color palette or visual theme.
7. Event timing filters (optional, later).
8. Additional pages or features not specified in this document.
9. Unnecessary animations, visual effects, or decorative elements.

---

## 13. Acceptance Criteria

- Scanning the QR code opens the landing page, which displays the event name, introduction, organizer, date and details (placeholders as applicable), and a live countdown that updates every second.
- The navigation bar appears consistently and every item reaches its destination in one action.
- The Events section offers Technical and Non-Technical categories, and switching between them requires no extra page navigation.
- Each category lists approximately 10–15 placeholder event cards, each containing an illustration, name, brief description, and a Register Now button.
- Every Register Now button redirects to its own configurable Student Tribe URL.
- Gallery, Coordinators, Faculty, and Contact Us sections exist with placeholder content structured for easy replacement.
- The site is fully usable on mobile devices.
- No out-of-scope functionality is present, and no color palette or theme has been finalized.
