"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { StaticCanvas } from "./StaticCanvas";
import { TvFrame } from "./TvFrame";
import {
  DESKTOP_PROFILE,
  MOBILE_PROFILE,
  computeLayout,
  type Layout,
  type Tier,
} from "./timeline";
import { useIntroTimeline, type IntroPlan } from "./useIntroTimeline";

type NavigatorExtras = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/** Review speeds selected with ?intro=… (force and anything else = real time). */
const INTRO_SPEEDS: Record<string, number> = { slow: 0.25, medium: 0.625, perfect_speed: 0.45 };

/** full → everything; lite → no tear / chroma slices; crossfade → no TV at all. */
function detectTier(): Tier {
  const nav = navigator as NavigatorExtras;
  if (nav.connection?.saveData) return "crossfade";
  const mem = nav.deviceMemory ?? 4;
  const cores = nav.hardwareConcurrency ?? 4;
  if (mem <= 1) return "crossfade";
  if (mem <= 2 || cores <= 2) return "lite";
  return "full";
}

function IntroOverlay({ layout }: { layout: Layout }) {
  const { geo, k, tvW, tvH, noise } = layout;
  const s = geo.screen;
  return (
    <div className="intro-tv" data-intro-tv style={{ width: tvW, height: tvH }} aria-hidden="true">
      <div className="tv-floor" />
      <div
        className="tv-fx"
        style={{
          left: s.x * k,
          top: s.y * k,
          width: s.w * k,
          height: s.h * k,
          borderRadius: s.rx * k,
          fontSize: s.w * k * 0.075,
        }}
      >
        <div className="fx-base" />
        <div className="fx-static">
          <StaticCanvas width={noise[0]} height={noise[1]} />
          <div className="fx-cloud a" />
          <div className="fx-cloud b" />
          <div className="fx-hum" />
          <div className="fx-track" />
          <div className="fx-scan" />
        </div>
        <div className="fx-osd" data-intro-osd>
          CH 03
        </div>
        <div className="fx-line" />
      </div>
      <TvFrame geo={geo} />
    </div>
  );
}

/**
 * Wraps the real hero. While the intro plays, the hero sits in a "stage" that is
 * clipped to the TV's screen (so what you see on the glass is the actual page),
 * with the television drawn above it. When the screen fills the viewport the
 * overlay is removed and the same pixels are simply the page.
 */
export function CrtIntro({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [plan, setPlan] = useState<IntroPlan | null>(null);
  const [done, setDone] = useState(false);
  const playing = plan !== null && !done;

  useEffect(() => {
    const html = document.documentElement;
    const mode = html.dataset.intro;
    if (!mode) return;

    const fadeOut = () => window.setTimeout(() => html.removeAttribute("data-intro"), 450);
    const tier = mode === "play" ? detectTier() : "crossfade";
    if (tier === "crossfade") {
      html.dataset.intro = "fade";
      const id = fadeOut();
      return () => window.clearTimeout(id);
    }

    let cancelled = false;
    (async () => {
      await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]);
      const root = rootRef.current;
      if (cancelled || !root) return;

      window.scrollTo(0, 0);
      const focusEl = root.querySelector("[data-intro-focus]");
      if (!focusEl) {
        html.removeAttribute("data-intro");
        return;
      }
      const r = focusEl.getBoundingClientRect();
      const layout = computeLayout(window.innerWidth, window.innerHeight, {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        w: r.width,
      });
      const speed = INTRO_SPEEDS[new URLSearchParams(location.search).get("intro") ?? ""] ?? 1;
      setPlan({
        tier,
        speed,
        layout,
        profile: layout.compact ? MOBILE_PROFILE : DESKTOP_PROFILE,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onDone = useCallback(() => {
    flushSync(() => setDone(true));
    const html = document.documentElement;
    html.removeAttribute("data-intro");
    html.dataset.introState = "done";
  }, []);

  useIntroTimeline(plan, rootRef, onDone);

  return (
    <div ref={rootRef} className="intro-root">
      <div className="intro-room" aria-hidden="true" />
      <div
        className="intro-stage"
        data-intro-stage
        data-playing={playing ? "" : undefined}
        inert={playing}
      >
        <div className="intro-cam" data-intro-cam>
          {children}
        </div>
        {playing && (
          <>
            <div className="intro-desat" aria-hidden="true" />
            <div className="intro-scan" aria-hidden="true" />
            <div className="intro-vig" aria-hidden="true" />
            <div className="intro-sweep" aria-hidden="true" />
          </>
        )}
      </div>
      {playing && plan && <IntroOverlay layout={plan.layout} />}
      {playing && (
        <button type="button" className="intro-skip" data-intro-skip hidden>
          Skip ›
        </button>
      )}
    </div>
  );
}
