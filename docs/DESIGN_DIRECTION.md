# QUBIT '26 — Approved Design Direction

Status: **approved direction** (visual + interaction). Functional source of truth remains `docs/QUBIT_PRD.md`; where they conflict on functionality, the PRD wins. Numbers below are starting values — tune by eye, but keep the structure.

Design read: college tech-fest site for students arriving by phone via QR code. Theatrical marquee energy in signature moments, calm and readable information UI. Dials: VARIANCE 7 · MOTION 9 (intro) / 4 (rest) · DENSITY 3.

---

## 1. Core concept — "Tuning in to Channel 26"

A qubit is in every state at once until it is measured and collapses to one value. TV static is that, visually: noise until the set locks onto a signal. The intro is: **noise → measurement → signal → Qubit**. The visitor tunes a TV to **Channel 26** (Qubit '26); static resolves into a broadcast; the broadcast gains energy; the camera pushes through the glass.

**Critical architecture rule:** what is on the TV screen *is the real homepage hero*, not a video or a copy. The real SSR hero sits behind the glass for the whole intro. When the glass fills the viewport, nothing swaps — the user is already on the page.

**Two-world rule**
- **Spectacle world** (dark burgundy): intro, hero, gallery, contact/footer. Light, glow, grain and bulbs live here.
- **Information world** (cream "ticket stock"): programme strip, events, coordinators, faculty. Flat, high contrast, no effects.

Section order and surface: Hero (dark) → Programme strip (cream) → Events (cream) → Gallery (dark) → Coordinators (cream) → Faculty (cream) → Contact + footer (dark).

---

## 2. Visual identity

| Take from poster | Leave behind |
|---|---|
| Burgundy / gold / red / orange as warm stage light | Literal halftone smoke, distressed "Q" glyph |
| Marquee bulbs — rationed: countdown plate, active-nav dot, intro chase | Bulb-ringed panels everywhere |
| Cream panels as information surfaces | Script fonts |
| 3D extruded lettering → reduced to a solid offset shadow on buttons/cards | Megaphone and decorative clutter |
| Printed grain → static ~5% texture on dark surfaces only | Centred poster stacking on every section |

From the CRT frames: 1970s portable silhouette (V rabbit-ear antennas, top handle bar, right-hand control column with channel dial, power/volume knob, hex speaker grille), *cloudy* grey static (not salt-and-pepper), VHS tracking band at the bottom edge, logo resolving with glow.

Technical identity comes from a monospace layer: channel numbers, OSD, section indexes (`CH 02 / EVENTS`), countdown digits. **No purple or pink anywhere. No neon. No looping glitch after the intro.**

---

## 3. CRT intro storyboard (desktop, ~3.5 s)

Any tap / click / key / wheel / Skip button → **350 ms accelerated finish** (jump to Stage 6 behaviour, never a hard cut).

### Stage 0 — Void (0–300 ms)
Viewport solid `--ink` #0E0609. Nothing visible. Hero paints underneath; fonts settle.

### Stage 1 — The set (300–800 ms)
- TV width `min(36vw, 480px)`, centred horizontally, optical centre 4vh above true centre.
- Enter: opacity 0→1, translateY 12px→0, scale 0.96→1, ease `cubic-bezier(.22,1,.36,1)`.
- Cabinet warm-black #1E0C11, 1px top highlight. Antennas, handle, dial, knob, hex grille: inline SVG.
- Screen off: dark glass #15100F, curved specular highlight top-left (8% white, blurred), heavy inner vignette.
- Faint floor-glow ellipse under the set (gold @ 6%). No other light.

### Stage 2 — Power on (800–1100 ms)
- 4px LED next to knob turns red with glow.
- CRT turn-on: 2px cream horizontal line from centre, scaleX 0→1 (100 ms), then scaleY to full screen (150 ms) at 40% opacity, falling into static.
- This is the **only** full-screen flash (WCAG 2.3.1: never > 3 flashes/s).

### Stage 3 — No signal (1100–1800 ms) — ref frame 2
- Static: low-res canvas (192×144, upscaled), grey 30–70%, slight cool cast.
- Two pre-blurred soft blobs drift slowly over it → cloudy static.
- Rolling hum bar: ~20%-height band, +6% luminance, travels top→bottom every 900 ms.
- VHS tracking band: white dash strip in bottom 8%, jittering horizontally.
- Flicker: screen brightness randomly 0.92–1.0 at ~12 Hz.
- OSD top-right, mono cream: `CH 03`.
- At 1400 ms the bezel dial clicks twice (each 90 ms rotation with slight overshoot); OSD `CH 03 → CH 14 → CH 26`.

### Stage 4 — Signal lock (1800–2400 ms) — ref frames 1 & 3
- Static opacity steps 1 → 0.55 → 0.25 → 0 (stepped, not smooth), with two 40 ms relapses.
- Underneath, the real hero is revealed **fully desaturated**.
- Vertical-hold settle: hero content jumps −8% → 0 twice.
- Horizontal tear: three slices of the wordmark offset ±12px for 60 ms each.
- Chromatic separation on wordmark only: red + gold offsets 4px → 0 (no cyan).
- Colour bleeds in from the centre: the desaturation layer is masked by a radial gradient that expands outward over 500 ms.

### Stage 5 — Energy + push-in (2400–3100 ms)
Camera moves **in**; it is not a plain `scale(20)`. Three layers at different rates:

| Layer | Behaviour |
|---|---|
| TV frame | Scale 1 → value where screen covers viewport (computed). Ease `cubic-bezier(.7,0,.2,1)`. |
| Hero (screen content) | Counter-scales 0.55 → 1 relative to the screen — content grows slower than the frame → depth / parallax. |
| Energy | `--energy` 0→1 tied to push-in progress: bulb ring around the wordmark lights in sequence and chases faster, gold/orange bloom behind wordmark grows, saturation overshoots to 1.15. |

Also: scanlines 0.18 → 0.06; vignette 0.6 → 0.15; glass corner radius held at constant *visual* size. Bezel inner rim catches screen light: grey during static, warm gold once colour arrives.

### Stage 6 — Arrival (3100–3500 ms)
- Screen edges pass the viewport.
- A single bright refresh line sweeps top→bottom (200 ms), clearing the last scanlines/grain behind it.
- Saturation settles 1.15 → 1.0; bulb chase slows to idle.
- Nav slides down from above (240 ms) — it was never part of the broadcast.
- Overlay unmounts; scroll unlocks; focus not moved. Countdown has been ticking throughout.

---

## 4. Mobile intro (~2.6 s) — "the screen breaks out of the TV"

A 4:3 TV on a ~9:19.5 viewport would need ~6× zoom. Instead:
1. TV `86vw` wide, 6vh above centre; control column narrowed to ~18% of TV width.
2. Push-in only 1 → 1.6×.
3. Then the screen's clip grows independently from the 4:3 rounded rect to the full viewport (`clip-path: inset(...)`), while the bezel keeps scaling past the edges and fades to 0. Hero counter-scales 0.55 → 1.
4. Stage 0 = 150 ms; Stage 3 = 500 ms; one dial click (`CH 03 → CH 26`).
5. "Skip ›" button (≥44×44px) bottom-right, appears at 600 ms. Tap anywhere also skips.
6. Static canvas 128×96, ~30 fps. No live SVG filters.
7. Device tiers via `hardwareConcurrency`, `deviceMemory`, `navigator.connection.saveData`: **full** / **lite** (no tear slices, no chroma split) / **crossfade only**.

The breakout technique (frame and screen decoupled) also applies on ultrawide desktops.

---

## 5. Intro gating & accessibility

- Plays **once per browser session** (`sessionStorage`).
- Skipped when: URL has a hash (deep link), `?nointro`, `prefers-reduced-motion: reduce` (→ 400 ms crossfade from ink instead), or JS unavailable.
- A tiny inline `<head>` script sets `html[data-intro="play"]` *before first paint*; the overlay only renders under that attribute. **If JS fails there is no overlay and the site works.**
- Overlay is `aria-hidden="true"`; focus is never trapped; Skip button is a real `<button>`.
- Hero is real SSR HTML, so LCP is not blocked by the intro.

---

## 6. Homepage (after intro)

**Hero:** full-bleed `min-h-[100dvh]`, `--burgundy` with an off-centre warm stage light (amber/gold radial, top-right), static grain, ~3% scanlines (hero only). Desktop composition is asymmetric:

```
 [Q]   Home  Events  Gallery  Coordinators  Faculty  Contact
 CH 26 · {ORGANISER PLACEHOLDER} PRESENTS        (mono eyebrow)
 QUBIT ’26                                       (wordmark)
 One-sentence intro, max 52ch.
 [ DATE · TBA ]  [ VENUE · TBA ]              ┌ ● ● ● ● ● ● ┐
                                              │ DD : HH : MM : SS │
 [ Explore events → ]   See the gallery       │ DAYS HRS MIN SEC  │
                                              └ ● ● ● ● ● ● ┘
```

- **Wordmark:** official vector logo when supplied. Until then a typographic placeholder: display font, gold, solid red offset extrusion (two stacked offset shadows; no gradients). It is a swappable component.
- **Bulb ring** around the wordmark exists in the hero (it is what lights up during Stage 5); at rest it is lit and still.
- **Countdown plate:** darker burgundy plate, mono cream digits, a row of small bulb dots on top and bottom edges. Changed digits slide vertically 120 ms. Bulbs lit and still; one slow chase every 8 s.
- **Programme strip (PRD 5.4)** directly below hero, on cream: 4-field definition grid — About / Organised by / When / Where — mono labels, body values (placeholders).
- **Nav:** transparent over hero; solid ink + backdrop blur after 80 px scroll. Active item = one lit bulb dot (6 px `--bulb` with soft glow) under the label. Logo links to Home. Scroll-spy drives the active state; URL hash updates.
- **Mobile nav:** 56 px bar with logo + "Menu" button → full-screen ink sheet, six destinations in display font 2.25rem, numbered `CH 01`–`CH 06`; tap closes and scrolls.

---

## 7. Events

**Channel switch:** two-segment control `CH 1 Technical · N` / `CH 2 Non-Technical · N`, sliding gold pill (220 ms), ARIA `tablist`/`tab`/`tabpanel`, keyboard arrows. Default Technical. Sticky under the nav on mobile.

**Ticket card:**
```
┌──────────────────────────┐
│  illustration (4:3)      │  flat colour tile, one of 4 palette tones
●- - - - - - - - - - - - - ●  perforation + semicircle side notches
│ T-01                     │  mono index
│ Technical Event 1        │  display 1.25rem
│ Brief description …      │  body, clamp 3 lines
│ [   Register Now  ↗   ]  │  full width, min-height 48px
└──────────────────────────┘
```
- Surface `--card`, 1.5px ink border, 14px radius, 4px solid ink offset shadow. No gradients or glow.
- Only the button is a link (whole card is *not* clickable). Opens in **new tab**, `rel="noopener noreferrer"`, external glyph, `aria-label="Register for {name} on Student Tribe (opens in new tab)"`.
- Grid: 1 col <768, 2 cols ≥768, 3 cols ≥1024.
- Data: `{ id, category: 'technical' | 'non-technical', name, description, illustration, registrationUrl, tone }`. 12 placeholder events per category ("Technical Event 1"…), placeholder URLs clearly marked, e.g. `https://studenttribe.example/PLACEHOLDER-T01`.
- Placeholder illustration: square SVG on a tone tile, 2px ink outline, ≤3 fills, a simple geometric glyph + big mono `T01`. Must be obviously a placeholder. Replaceable without layout change.

---

## 8. Gallery / Coordinators / Faculty / Contact

- **Gallery (dark):** CSS grid, 2 cols mobile / 4 desktop, every 5th tile spans 2×2. Placeholder tile = broadcast test card (colour bars re-tinted to palette) labelled `PHOTO 01 · NO SIGNAL`. Real images via fixed aspect + `object-fit: cover`. No lightbox.
- **Coordinators (cream):** 2 cols mobile / 4 desktop. 4:5 portrait (12px radius), name (display 1.125rem), role (mono label). Placeholder silhouette + "Coordinator 1".
- **Faculty (cream):** list rows — 72px circular photo, name, designation; 1 col mobile / 2 desktop. Optional `featured` flag → full-width row.
- **Contact (dark, flows into footer):** heading "Questions about Qubit?"; large tappable rows: phone (`tel:`), email (`mailto:`), venue (external map link, no embed). All placeholders. No form. Footer: nav repeat, "Registration is handled by Student Tribe", wordmark.

---

## 9. Typography

| Role | Font | Spec |
|---|---|---|
| Wordmark | Official SVG, else display 900 + extrusion | `clamp(5rem, 22vw, 16rem)` |
| Section headings | **Bricolage Grotesque** (variable, use opsz) | `clamp(2.25rem, 6vw, 4.5rem)`, 800, tracking −0.02em, leading 1.0 |
| Event / person names | Bricolage Grotesque 700 | 1.25rem / 1.2 |
| Body | **DM Sans** | 1rem / 1.6, max 65ch, ≥16px on mobile |
| Nav | DM Sans 500 | 0.9375rem |
| Buttons | DM Sans 700 | 0.95rem, tracking 0.02em, "Register Now" |
| Tech layer (OSD, indexes, labels, countdown) | **JetBrains Mono** | labels 0.75rem uppercase 0.12em; countdown `clamp(2rem, 7vw, 3.5rem)` tabular |

All via `next/font/google`. No script fonts, no pixel fonts, no chrome/neon type.

---

## 10. Colour tokens

All as CSS custom properties, mapped into Tailwind v4 `@theme` — the palette must be swappable from one file.

| Token | Value | Use |
|---|---|---|
| `--ink` | #0E0609 | intro room, footer, text/borders on light, card shadows |
| `--burgundy` | #4A0F1F | spectacle-world background |
| `--burgundy-raised` | #5E1628 | countdown plate, scrolled nav |
| `--gold` | #F5B82E | wordmark, primary CTA fill, active category pill |
| `--bulb` | #FFD84D | lit bulbs, active-nav dot only |
| `--signal-red` | #E2332B | wordmark extrusion, focus ring on dark, LED |
| `--amber` | #F07A1E | stage-light glow, illustration tone; never text |
| `--cream` | #FCEBDC | information-world background |
| `--card` | #FFF8F1 | cards on cream |
| `--text-on-dark` | #FBEADB | body on burgundy |
| `--muted-on-dark` | #C9A6A0 | secondary on burgundy |
| `--text-on-light` | #2A0D14 | body on cream |
| `--muted-on-light` | #7A4C52 | secondary on cream |

**One CTA style site-wide:** `--gold` fill, `--ink` text, 3px `--ink` solid offset shadow.

---

## 11. Motion system

Tokens: `--t-fast` 120ms · `--t-base` 200ms · `--t-enter` 320ms · `--ease-out` `cubic-bezier(.22,1,.36,1)` · `--ease-inout` `cubic-bezier(.65,0,.35,1)`.

| Situation | Behaviour |
|---|---|
| Section entrance | fade-up 16px, 320 ms, once (IntersectionObserver). Card stagger 40 ms, capped at 6. |
| Category switch | out 120 ms → in with 30 ms stagger; pill slides 220 ms; scroll position preserved |
| Card hover (`@media (hover:hover)` only) | translate(−2px,−2px), shadow 4→6px, illustration scale 1.03 |
| Button press | translate(+3px,+3px), shadow → 0 (physical key) |
| Countdown | 120 ms vertical slide on changed digits only |
| Nav | background fade 200 ms; active dot glides 200 ms |
| Reduced motion | intro → 400 ms crossfade; everything else instant; no chase, no stagger |

No scroll-jacking, parallax sections, cursor effects, or looping glitches after the intro.

---

## 12. Technical approach

- No video, no WebGL, **no animation library**. CSS + Web Animations API + rAF. Intro JS budget ~6–8 KB + one inline SVG.
- **Intro layer stack (bottom → top), inside one fixed overlay:**
  1. Real `<Hero>` (SSR). During intro, a client controller sets `--hero-scale` on its wrapper and clips it: `clip-path: inset(var(--t) var(--r) var(--b) var(--l) round var(--rad))`.
  2. Desaturation layer: grey layer with `mix-blend-mode: saturation`, radial-masked; fading it brings colour in (cheaper than animating `filter` on the whole hero).
  3. Signal layers clipped to the screen: static `<canvas>` (`Uint32Array` writes, throttled), pre-blurred cloud blobs, hum bar, tracking band, scanlines (`repeating-linear-gradient`), vignette, OSD.
  4. TV SVG: cabinet + a room-coloured rect with an **even-odd hole** at the screen, so scaling the SVG scales hole and room together.
- **One controller, one clock:** a single rAF loop computes stage progress and writes ~8 CSS custom properties to the overlay root; clip, SVG transform, hero scale all read them — they cannot drift. Animate only transform, opacity, clip-path.
- Countdown: client component; target in config as ISO with IST offset (e.g. `"2026-10-16T09:00:00+05:30"` — PLACEHOLDER time); renders `--` on the server to avoid hydration mismatch; clamps at 0 and shows the configurable post-event message (placeholder: "Qubit '26 is live.").
- Grain: one small pre-generated PNG tile, not live `feTurbulence`.
- Single scrolling page with anchor sections.

---

## 13. File structure

```
app/
  layout.tsx            fonts, tokens, intro <head> gate script
  page.tsx              single page, sections in order
  globals.css           @theme tokens, grain, scanline utilities
content/                ← ALL replaceable content (PRD §10)
  site.ts               name, intro, organiser, date, venue, countdownTarget, postEventMessage
  events.ts             Event[] incl. registrationUrl
  gallery.ts  coordinators.ts  faculty.ts  contact.ts
components/
  intro/   CrtIntro.tsx  useIntroTimeline.ts  TvFrame.tsx  StaticCanvas.tsx  introGate.ts
  layout/  SiteNav.tsx  MobileMenu.tsx  Footer.tsx  useScrollSpy.ts
  home/    Hero.tsx  Wordmark.tsx  BulbRing.tsx  Countdown.tsx  ProgrammeStrip.tsx
  events/  EventsSection.tsx  ChannelSwitch.tsx  EventCard.tsx  EventIllustration.tsx
  gallery/ GalleryGrid.tsx  TestCardPlaceholder.tsx
  people/  PersonCard.tsx  FacultyRow.tsx
  contact/ ContactSection.tsx
  ui/      Button.tsx  SectionHeader.tsx  BulbRow.tsx  Reveal.tsx
```

Client components only where needed: `CrtIntro`, `Countdown`, `ChannelSwitch` + list, `SiteNav` / `MobileMenu`, `Reveal`. Everything else is a Server Component.

---

## 14. Resolved defaults (until the team says otherwise)

| Decision | Default |
|---|---|
| Content | PRD placeholders only. Do **not** use the poster's real names/dates/faculty unless explicitly instructed. |
| Logo | Typographic placeholder in a swappable `Wordmark` component. |
| Page structure | Single scrolling page. |
| Intro frequency | Once per session. |
| Register Now | New tab, `rel="noopener noreferrer"`. |
| Post-event message | "Qubit '26 is live." (placeholder, in config) |
| Gallery lightbox | None. |
| Sound | None. |
