"use client";

import { useEffect, type RefObject } from "react";
import { createNoiseDrawer } from "./StaticCanvas";
import { computeFrame, type Layout, type Profile, type Tier, type VarTarget } from "./timeline";

export interface IntroPlan {
  tier: Tier;
  /** 1 = real time; 0.25 = the `?intro=slow` review mode. */
  speed: number;
  layout: Layout;
  profile: Profile;
}

type Styled = HTMLElement | SVGElement;

const SKIP_MS = 350;
const NOISE_INTERVAL = 1000 / 24;
const SKIP_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"] as const;

/** The element that consumes each group of CSS variables. */
const VAR_TARGETS: Record<VarTarget, string> = {
  fx: ".tv-fx",
  desat: ".intro-desat",
  scan: ".intro-scan",
  vig: ".intro-vig",
  sweep: ".intro-sweep",
};

/**
 * The single clock for the CRT intro. One rAF loop turns elapsed time into a
 * Frame (timeline.ts) and writes it to the DOM.
 *
 * Performance rule: a value is written only on the element(s) that read it,
 * and only when it changed. Per-frame values are never put on a shared
 * ancestor as inherited custom properties — doing that forced the browser to
 * re-resolve styles for the whole hero subtree every frame.
 *
 * Skipping fast-forwards the same timeline to its end over SKIP_MS instead of
 * cutting.
 */
export function useIntroTimeline(
  plan: IntroPlan | null,
  rootRef: RefObject<HTMLDivElement | null>,
  onDone: () => void,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!plan || !root) return;

    const q = <T extends Styled>(sel: string) => root.querySelector<T>(sel);
    const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    const stage = q<HTMLElement>("[data-intro-stage]");
    const cam = q<HTMLElement>("[data-intro-cam]");
    const tv = q<HTMLElement>("[data-intro-tv]");
    const osd = q<HTMLElement>("[data-intro-osd]");
    const skipBtn = q<HTMLButtonElement>("[data-intro-skip]");
    const canvas = q<HTMLCanvasElement>("canvas[data-intro-static]");
    const bloom = q<HTMLElement>(".wm-bloom");
    const glow = q<HTMLElement>(".hero-glow");
    const ring = q<HTMLElement>(".bulb-ring");
    const dial = q<SVGElement>(".tv-dial");
    const rim = q<SVGElement>(".tv-rim");
    const leds = all(".tv-led, .tv-led-glow");
    const extras = all(".hero-extra");
    const lettering = all(".wm");
    const slices = all(".wm-slice");
    if (
      !stage || !cam || !tv || !osd || !skipBtn || !canvas ||
      !bloom || !glow || !ring || !dial || !rim
    )
      return;

    const targets = {} as Record<VarTarget, HTMLElement>;
    const written = {} as Record<VarTarget, Set<string>>;
    for (const key of Object.keys(VAR_TARGETS) as VarTarget[]) {
      const el = q<HTMLElement>(VAR_TARGETS[key]);
      if (!el) return;
      targets[key] = el;
      written[key] = new Set();
    }

    const html = document.documentElement;
    const { layout, profile, tier, speed } = plan;
    const drawNoise = createNoiseDrawer(canvas);

    // Last value written per key, so unchanged values cost nothing.
    const cache = new Map<string, string>();
    const put = (key: string, els: Styled[], prop: string, value: string) => {
      if (cache.get(key) === value) return;
      cache.set(key, value);
      for (const el of els) el.style.setProperty(prop, value);
    };

    let raf = 0;
    let startTs = 0;
    let lastT = 0;
    let lastNoise = -Infinity;
    let skip: { real: number; virt: number } | null = null;
    let surge = false;
    let ledOn = false;
    let state = "playing";
    let finished = false;

    stage.style.height = `${layout.vh}px`;

    const apply = (t: number, now: number) => {
      const f = computeFrame(t, layout, profile, tier);

      // Always-moving transforms: written directly every frame.
      tv.style.transform = f.tvTransform;
      tv.style.opacity = String(f.tvOpacity);
      stage.style.clipPath = f.stageClip;
      cam.style.transform = f.camTransform;
      put("filter", [stage], "filter", f.stageFilter);

      // Hero: opacities on individual elements, bulbs as an integer count.
      put("bloom", [bloom], "opacity", f.bloomOpacity.toFixed(3));
      put("glow", [glow], "opacity", f.glowOpacity.toFixed(3));
      put("extras", extras, "opacity", f.extrasOpacity.toFixed(3));
      put("lit", [ring], "--lit", String(f.lit));
      put("chroma", lettering, "--chroma", f.chroma.toFixed(2));
      put("tear-on", slices, "--tear-on", String(f.tear.on));
      slices.forEach((s, i) => put(`tear-${i}`, [s], `--tear-${i + 1}`, f.tear.shift[i].toFixed(1)));

      // TV controls.
      put("dial", [dial], "transform", `rotate(${f.dial.toFixed(1)}deg)`);
      put("rim", [rim], "stroke", `color-mix(in srgb, var(--gold) ${(f.rim * 100).toFixed(1)}%, var(--tv-edge))`);
      if (f.led !== ledOn) {
        ledOn = f.led;
        leds.forEach((el) => el.toggleAttribute("data-on", ledOn));
      }

      // Screen layers: variables on the leaf element that reads them.
      for (const key of Object.keys(VAR_TARGETS) as VarTarget[]) {
        const vars = f.vars[key];
        for (const name in vars) {
          targets[key].style.setProperty(name, vars[name]);
          written[key].add(name);
        }
      }

      if (osd.textContent !== f.osd) osd.textContent = f.osd;
      if (f.surge !== surge) {
        surge = f.surge;
        cam.toggleAttribute("data-surge", surge);
      }
      if (f.state !== state) {
        state = f.state;
        html.dataset.introState = state;
      }
      if (skipBtn.hidden === f.showSkip) skipBtn.hidden = !f.showSkip;
      if (f.drawNoise && now - lastNoise >= NOISE_INTERVAL) {
        lastNoise = now;
        drawNoise();
      }
    };

    const cleanup = () => {
      cancelAnimationFrame(raf);
      SKIP_EVENTS.forEach((ev) => window.removeEventListener(ev, requestSkip));
      window.removeEventListener("resize", requestSkip);
      tv.style.transform = "";
      tv.style.opacity = "";
      stage.style.clipPath = "";
      stage.style.filter = "";
      stage.style.height = "";
      cam.style.transform = "";
      cam.removeAttribute("data-surge");
      bloom.style.opacity = "";
      glow.style.opacity = "";
      extras.forEach((el) => (el.style.opacity = ""));
      ring.style.removeProperty("--lit");
      lettering.forEach((el) => el.style.removeProperty("--chroma"));
      slices.forEach((el) => {
        for (const p of ["--tear-on", "--tear-1", "--tear-2", "--tear-3"]) el.style.removeProperty(p);
      });
      dial.style.transform = "";
      rim.style.stroke = "";
      leds.forEach((el) => el.removeAttribute("data-on"));
      for (const key of Object.keys(VAR_TARGETS) as VarTarget[]) {
        written[key].forEach((name) => targets[key].style.removeProperty(name));
        written[key].clear();
      }
      cache.clear();
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cleanup();
      onDone();
    };

    function requestSkip() {
      if (!skip) skip = { real: performance.now(), virt: lastT };
    }

    const tick = (now: number) => {
      if (!startTs) startTs = now;
      let t: number;
      if (skip) {
        const f = Math.min(1, (now - skip.real) / SKIP_MS);
        t = skip.virt + (profile.total - skip.virt) * f;
        if (f >= 1) return finish();
      } else {
        t = (now - startTs) * speed;
        lastT = t;
        if (t >= profile.total) return finish();
      }
      apply(t, now);
      raf = requestAnimationFrame(tick);
    };

    html.dataset.introState = "playing";
    apply(0, 0);
    SKIP_EVENTS.forEach((ev) => window.addEventListener(ev, requestSkip, { passive: true }));
    window.addEventListener("resize", requestSkip);
    raf = requestAnimationFrame(tick);

    return () => {
      if (!finished) cleanup();
    };
  }, [plan, rootRef, onDone]);
}
