You are the frontend engineer implementing the Qubit '26 event website. The visual and interaction direction has already been designed and approved. Your job is to build it faithfully, in phases, stopping for review after each one.

## Read these first, in full, before writing any code
1. `docs/QUBIT_PRD.md`: the functional source of truth (scope, placeholders, out-of-scope list).
2. `docs/DESIGN_DIRECTION.md`: the approved design spec (CRT intro storyboard, tokens, typography, motion, components, file structure). Treat its numbers as starting values you may tune by eye, but keep its structure and architecture.
3. `AGENTS.md`: this project runs **Next.js 16.3**, which has breaking changes from what you know. Before using any Next.js API (`next/font`, metadata, `layout.tsx`, `<Script>`, routing), read the relevant guide in `node_modules/next/dist/docs/` and follow it over your memory.
4. `.agents/skills/design-taste-frontend/SKILL.md`: apply its quality bar (no generic AI aesthetics, `min-h-[100dvh]` not `h-screen`, grid over flex math, `next/font`, isolated client leaves).

If the PRD and the design direction disagree on functionality, the PRD wins. The PRD's notes that the palette, typography and theme are "pending" / "not finalized" are superseded by the approved design direction. Use its tokens, but keep them in one swappable file as the PRD requires. If something is ambiguous, ask me. Don't guess.

## Non-negotiable rules
- **Do not invent content.** No real event names, dates, people, phone numbers, emails, or URLs. Use clearly marked placeholders ("Technical Event 1", "Coordinator 1", `https://studenttribe.example/PLACEHOLDER-T01`, "Date · TBA"). Do not use the names, events or dates from the Qubit poster unless I explicitly say so.
- **All replaceable content lives in `content/*.ts`**, never hard-coded in components.
- **All colours, fonts, durations and easings are tokens** (CSS custom properties mapped into Tailwind v4 `@theme` in `app/globals.css`). No raw hex values in components.
- **No new dependencies** without asking me first. The intro uses no animation library: CSS, the Web Animations API, `requestAnimationFrame`, inline SVG, one small `<canvas>`. No video, no WebGL.
- **Nothing out of scope:** no registration forms, backend, auth, payments, lightbox, timing filters, sound, or extra pages.
- **Server Components by default.** `'use client'` only on isolated interactive leaves.
- Animate only `transform`, `opacity` and `clip-path`. Respect `prefers-reduced-motion` everywhere.
- Keep the code plain and readable: small components, no premature abstraction.

## How we work
Build **one phase at a time**. At the end of each phase:
1. Run `npm run lint` and `npm run build` and fix every error.
2. Run the dev server and check the result yourself at 390×844 (phone) and 1440×900 (desktop).
3. Stop and report: what you built, which files changed, how to see it (URL / query params), anything you deviated from in the spec and why, and any open questions. **Then wait for my approval before starting the next phase.**

---

## Phase 1: Foundations + CRT intro (the signature moment)

The intro reveals the *real* hero, so build a minimal hero first, then the intro on top of it.

**1a. Foundations**
- Tokens in `app/globals.css` (colours, motion durations/easings from DESIGN_DIRECTION §10–11), grain tile utility, scanline utility.
- Fonts via `next/font/google`: Bricolage Grotesque (variable), DM Sans, JetBrains Mono, exposed as CSS variables.
- `content/site.ts` with placeholder name, intro, organiser, date, venue, `countdownTarget` (ISO with `+05:30`, marked PLACEHOLDER), `postEventMessage`.
- Clean out the default Next.js starter page and assets usage.

**1b. Minimal hero (enough for the intro to land on)**
- `Hero` with the burgundy background, warm off-centre stage light, grain, the placeholder `Wordmark` (gold + solid red offset extrusion, swappable component), the `BulbRing` around it, eyebrow, one-line intro, date/venue chips, and a static placeholder where the countdown plate will go. Asymmetric desktop layout and stacked mobile layout per §6. The real countdown and nav come in Phase 2.
- `BulbRing` must accept an energy value (CSS variable `--energy` 0–1) that drives chase speed and brightness, because the intro drives it.

**1c. CRT intro**: implement DESIGN_DIRECTION §3, §4, §5 and §12 exactly:
- `introGate.ts` + an inline `<head>` script that sets `html[data-intro="play"]` before first paint, only when: no `sessionStorage` flag, no URL hash, no `?nointro`, JS running. Reduced motion → 400 ms crossfade from ink instead. If JS fails: no overlay, site works.
- `TvFrame.tsx`: an inline SVG of a 1970s portable TV (V rabbit-ear antennas, top handle, cabinet, right control column with a channel dial that can rotate, power knob with LED, hex speaker grille) plus the room-coloured rect with an **even-odd hole** at the screen. Tasteful and simplified, not photoreal.
- `StaticCanvas.tsx`: low-res noise (192×144 desktop, 128×96 mobile) written via `Uint32Array`, throttled, with two pre-blurred drifting cloud blobs, so it matches the cloudy static in the reference rather than salt-and-pepper snow.
- `useIntroTimeline.ts`: **one rAF clock** that computes stage progress and writes CSS custom properties to the overlay root. The hero clip (`clip-path: inset(... round ...)`), hero counter-scale, SVG transform, static opacity, desaturation mask, scanlines, vignette and `--energy` all read from those variables.
- Stages 0–6 with the timings, easings and effects in §3: power-on line (the only full-screen flash), rolling hum bar, VHS tracking band, flicker, OSD `CH 03 → CH 14 → CH 26` with dial clicks, stepped static fade with relapses, vertical-hold settle, three wordmark tear slices, red/gold separation, centre-out colour bleed via a `mix-blend-mode: saturation` layer, push-in with hero counter-scale and growing energy, bezel rim light, final refresh sweep, unmount.
- **Mobile breakout** (§4): small dolly (1 → 1.6×) then the screen clip grows independently to the full viewport while the bezel overshoots and fades. Use the same technique on ultrawide viewports. Shorter mobile timeline.
- Skip: any tap/click/key/wheel, plus a visible "Skip ›" button (≥44 px) after 600 ms. Skip **accelerates to the finish over 350 ms**; it never hard-cuts.
- Device tiers: full / lite (no tear slices, no chroma) / crossfade-only, based on `hardwareConcurrency`, `deviceMemory`, `saveData`.
- Overlay `aria-hidden`, no focus trap, scroll locked only while playing, ≤3 flashes per second.
- Add `?intro=force` to replay the intro regardless of session, and `?intro=slow` to run it at 4× slower speed so I can review each stage.

**Phase 1 done when:** the intro plays at both test sizes, lands pixel-stable on the real hero with no visible swap or jump, skip works at every stage, reduced motion gets the crossfade, a deep link (`/#events`) skips the intro, it plays once per session, it runs smoothly in Chrome DevTools with 4× CPU throttling on the mobile size, and lint/build pass. **Stop and report.**

---

## Phase 2: Navigation, countdown, programme strip
- `SiteNav` (transparent over hero → solid ink + blur after 80 px; lit bulb dot for the active item; scroll-spy; hash updates) and `MobileMenu` (56 px bar, full-screen ink sheet, `CH 01`–`CH 06`). The nav slides in at intro Stage 6.
- Live `Countdown` plate (§6): IST target from `content/site.ts`, server renders `--`, ticks every second, digit slide, clamps at 0 → post-event message, slow bulb chase every 8 s.
- `ProgrammeStrip` (About / Organised by / When / Where) on cream.
- Empty anchored section shells for the remaining sections so every nav item works in one action.

## Phase 3: Events
- `content/events.ts` with 12 placeholder events per category (`tone` cycles through 4 palette tones).
- `ChannelSwitch` (ARIA tablist, arrow keys, sliding gold pill, counts, sticky on mobile), `EventCard` (ticket card with perforation, mono index, clamp-3 description, full-width Register Now → new tab, `rel="noopener noreferrer"`, descriptive `aria-label`), placeholder `EventIllustration`.
- Switch animation, card hover (hover-capable devices only), button press per §11.

## Phase 4: Gallery, Coordinators, Faculty, Contact, Footer
- Per DESIGN_DIRECTION §8, with content files for each. Gallery placeholders are palette-tinted test cards. Contact has no form.
- `Reveal` section-entrance behaviour per §11.

## Phase 5: Hardening
- Full responsive pass (360, 390, 768, 1024, 1440, 2560 widths), touch targets ≥44 px, contrast check of every text/background pair, keyboard pass, reduced-motion pass, Lighthouse mobile run (report the scores), and a final check of the site against the PRD §13 acceptance criteria and the out-of-scope list.

---

Start with Phase 1. Before writing code, give me a short plan for Phase 1: the files you'll create and how you'll structure the intro timeline. Then build it.
