import { BULB_COUNT } from "@/components/home/bulbs";
import { tvGeo, type TvGeo } from "./tvGeometry";

export type Tier = "full" | "lite" | "crossfade";

/** Stage windows in ms (see docs/DESIGN_DIRECTION.md §3–4). */
export interface Profile {
  total: number;
  tvIn: [number, number];
  power: [number, number];
  noSignal: [number, number];
  lock: [number, number];
  push: [number, number];
  arrive: [number, number];
  /** Dial clicks: time and the channel shown afterwards. */
  clicks: [number, string][];
  skipAt: number;
}

export const DESKTOP_PROFILE: Profile = {
  total: 3500,
  tvIn: [300, 800],
  power: [800, 1100],
  noSignal: [1100, 1800],
  lock: [1800, 2400],
  push: [2400, 3100],
  arrive: [3100, 3500],
  clicks: [
    [1400, "CH 14"],
    [1560, "CH 26"],
  ],
  skipAt: 600,
};

export const MOBILE_PROFILE: Profile = {
  total: 2600,
  tvIn: [150, 550],
  power: [550, 800],
  noSignal: [800, 1300],
  lock: [1300, 1750],
  push: [1750, 2400],
  arrive: [2400, 2600],
  clicks: [[1000, "CH 26"]],
  skipAt: 600,
};

/* ----------------------------- math helpers ----------------------------- */

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const smooth = (x: number) => x * x * (3 - 2 * x);
const hash = (n: number) => {
  const h = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return h - Math.floor(h);
};

/** CSS-style cubic-bezier(x1, y1, x2, y2) easing. */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 20; i++) {
      const v = sx(t);
      if (Math.abs(v - x) < 1e-4) break;
      if (v < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sy(t);
  };
}

const easeOut = bezier(0.22, 1, 0.36, 1);
const easePush = bezier(0.7, 0, 0.2, 1);

/*
 * TV growth is continuous: it starts with the TV's entrance and creeps up
 * through power-on, static and signal lock (a share of the total log-scale,
 * PRE_GROWTH), then the final push accelerates out of that same motion. The
 * push curve's initial slope matches the pre-growth speed so there is no dip
 * where the two meet.
 */
const PRE_GROWTH = { normal: 0.35, breakout: 0.2 };
const pushGrowth = {
  normal: bezier(0.5, 0.1, 0.25, 1),
  breakout: bezier(0.5, 0.05, 0.25, 1),
};
const easeOutBack = (x: number) => {
  const c1 = 1.7;
  const c3 = c1 + 1;
  const v = clamp01(x) - 1;
  return 1 + c3 * v * v * v + c1 * v * v;
};

/* -------------------------------- layout -------------------------------- */

export interface Layout {
  vw: number;
  vh: number;
  /** Phone / portrait: narrower TV, shorter timeline. */
  compact: boolean;
  /** Screen glass grows independently of the cabinet (phones, ultrawide). */
  breakout: boolean;
  geo: TvGeo;
  k: number;
  tvW: number;
  tvH: number;
  /** Screen size in px at TV scale 1, its corner radius, and its centre inside the TV box. */
  swpx: number;
  shpx: number;
  radk: number;
  scx: number;
  scy: number;
  /** Screen centre in viewport px at TV scale 1. */
  c0x: number;
  c0y: number;
  /** TV scale at the end of the push-in. */
  sEnd: number;
  /** Centre + width of the wordmark in the untransformed hero (viewport px). */
  focus: { x: number; y: number; w: number };
  noise: [number, number];
}

export function computeLayout(
  vw: number,
  vh: number,
  focus: { x: number; y: number; w: number },
): Layout {
  const compact = vw < 768 || vh > vw * 1.05;
  const breakout = compact || vw / vh > 2.1;
  const geo = tvGeo(compact);

  let tvW = compact ? vw * 0.86 : Math.min(vw * 0.36, 480);
  tvW = Math.min(tvW, ((vh * 0.62) / geo.vbH) * geo.vbW);
  const k = tvW / geo.vbW;
  const tvH = geo.vbH * k;

  const swpx = geo.screen.w * k;
  const shpx = geo.screen.h * k;
  const radk = geo.screen.rx * k;
  const scx = (geo.screen.x + geo.screen.w / 2) * k;
  const scy = (geo.screen.y + geo.screen.h / 2) * k;

  const tvLeft = (vw - tvW) / 2;
  const tvTop = (vh - tvH) / 2 - vh * 0.04;

  // Scale at which the rounded screen fully covers the viewport (corners included).
  const cover = Math.max(vw / (swpx - 0.6 * radk), vh / (shpx - 0.6 * radk));
  const sEnd = breakout ? Math.min(cover, 3) : cover;

  return {
    vw,
    vh,
    compact,
    breakout,
    geo,
    k,
    tvW,
    tvH,
    swpx,
    shpx,
    radk,
    scx,
    scy,
    c0x: tvLeft + scx,
    c0y: tvTop + scy,
    sEnd,
    focus,
    noise: compact ? [128, 96] : [192, 144],
  };
}

/* -------------------------------- frames -------------------------------- */

export interface Frame {
  tvTransform: string;
  tvOpacity: number;
  stageClip: string;
  camTransform: string;
  osd: string;
  surge: boolean;
  state: "playing" | "arriving";
  showSkip: boolean;
  drawNoise: boolean;
  stageFilter: string;
  /*
   * Hero-side values are applied directly to the few elements that use them
   * (never through inherited custom properties on a shared ancestor — that
   * forced a whole-tree style recalc every frame).
   */
  bloomOpacity: number;
  glowOpacity: number;
  extrasOpacity: number;
  /** How many marquee bulbs are lit (integer, so it changes ~BULB_COUNT times in total). */
  lit: number;
  chroma: number;
  tear: { on: number; shift: [number, number, number] };
  /** TV controls. */
  dial: number;
  rim: number;
  led: boolean;
  /** CSS custom properties, grouped by the single (leaf-ish) element that consumes them. */
  vars: Record<VarTarget, Record<string, string>>;
}

export type VarTarget = "fx" | "desat" | "scan" | "vig" | "sweep";

/** Static opacity through the signal-lock stage: stepped, with two brief relapses. */
function lockStatic(u: number, dur: number) {
  const rw = 40 / dur;
  if (u < 0.15) return 1;
  if (u < 0.3) return 0.55;
  if (u < 0.42) return 0.25;
  if (u < 0.42 + rw) return 0.6;
  if (u < 0.62) return 0.12;
  if (u < 0.62 + rw) return 0.4;
  return 0;
}

/** Everything the screen shows at time `t` (ms). A pure function of its inputs. */
export function computeFrame(t: number, L: Layout, P: Profile, tier: Tier): Frame {
  const { vw, vh } = L;
  const full = tier === "full";
  const [inA, inB] = P.tvIn;
  const [pwA, pwB] = P.power;
  const [lkA, lkB] = P.lock;
  const [puA, puB] = P.push;
  const [arA, arB] = P.arrive;
  const lockDur = lkB - lkA;

  /* TV entrance + push-in -------------------------------------------------- */
  const eIn = easeOut(range(t, inA, inB));
  const p = range(t, puA, puB);
  const e = easePush(p);
  const kind = L.breakout ? "breakout" : "normal";
  const pre = PRE_GROWTH[kind];
  // 0 → 1 over the whole intro: steady growth until the push, then acceleration.
  const grow = t < puA ? pre * range(t, inA, puA) : pre + (1 - pre) * pushGrowth[kind](p);
  const s = Math.exp(Math.log(L.sEnd) * grow) * (0.96 + 0.04 * eIn);
  const cx = lerp(L.c0x, vw / 2, grow);
  const cy = lerp(L.c0y, vh / 2, grow) + 12 * (1 - eIn);
  const tvX = cx - s * L.scx;
  const tvY = cy - s * L.scy;
  const cabFade = L.breakout ? smooth(range(p, 0.5, 0.95)) : smooth(range(p, 0.7, 0.97));

  /* Screen glass: follows the TV, then breaks out to the full viewport -------- */
  const rw = L.swpx * s;
  const rh = L.shpx * s;
  const b = L.breakout ? smooth(range(p, 0.35, 0.95)) : smooth(range(p, 0.93, 1));
  const cl = lerp(cx - rw / 2, 0, b);
  const ct = lerp(cy - rh / 2, 0, b);
  const cr = lerp(cx + rw / 2, vw, b);
  const cb = lerp(cy + rh / 2, vh, b);
  const rad = L.radk * s * (1 - b);

  const screenOn = t >= pwA + (pwB - pwA) * 0.33;
  const stageClip = screenOn
    ? `inset(${ct.toFixed(1)}px ${(vw - cr).toFixed(1)}px ${(vh - cb).toFixed(1)}px ${cl.toFixed(1)}px round ${rad.toFixed(1)}px)`
    : `inset(${cy.toFixed(1)}px ${(vw - cx).toFixed(1)}px ${(vh - cy).toFixed(1)}px ${cx.toFixed(1)}px)`;

  /* Power-on line ---------------------------------------------------------- */
  const q = range(t, pwA, pwB);
  const lineSx = easeOut(range(q, 0, 0.33));
  const lineSy = q < 0.33 ? 2 / L.shpx : lerp(2 / L.shpx, 1, easeOut(range(q, 0.33, 0.83)));
  const lineO = t < pwA || t >= pwB ? 0 : q < 0.33 ? 1 : lerp(0.5, 0, range(q, 0.33, 0.9));

  /* Static ------------------------------------------------------------------ */
  const u = range(t, lkA, lkB);
  let staticO = 0;
  if (t >= pwA && t < pwB) staticO = smooth(range(q, 0.33, 0.83));
  else if (t >= pwB && t < lkA) staticO = 1;
  else if (t >= lkA && t < lkB) staticO = lockStatic(u, lockDur);
  const flicker = staticO > 0 ? 0.92 + 0.08 * hash(Math.floor(t / 83)) : 1;
  const trackX = Math.sin(t * 0.031) * 5 + (hash(Math.floor(t / 60)) - 0.5) * 18;

  /* Dial + on-screen display ----------------------------------------------- */
  let dial = 0;
  let osd = "CH 03";
  for (const [tc, label] of P.clicks) {
    dial += 28 * easeOutBack(range(t, tc, tc + 90));
    if (t >= tc) osd = label;
  }
  const osdO =
    t < pwB ? 0 : t < lkA ? range(t, pwB, pwB + 60) : 1 - smooth(range(u, 0.5, 0.7));

  /* Signal lock: colour bleed, vertical hold, tear, chroma ------------------ */
  const bleed = t < lkA ? -20 : lerp(-20, 120, easeOut(range(u, 0.35, 1)));
  const satO = bleed >= 118 ? 0 : 1;
  const rim = smooth(range(u, 0.4, 1));
  let hold = 0;
  for (const [at, amt] of [
    [lkA + lockDur * 0.3, 0.08],
    [lkA + lockDur * 0.5, 0.04],
  ]) {
    if (t >= at) hold -= amt * (1 - range(t, at, at + 80));
  }
  let tear = 0;
  const tearVals = [0, 0, 0];
  if (full) {
    [0.45, 0.55, 0.65].forEach((at, i) => {
      const t0 = lkA + lockDur * at;
      if (t >= t0 && t < t0 + 60) {
        tear = 1;
        tearVals[0] = (hash(i + 1) > 0.5 ? 1 : -1) * 12;
        tearVals[1] = -tearVals[0] * 0.7;
        tearVals[2] = tearVals[0] * 0.55;
      }
    });
  }
  const chroma = full && t >= lkA ? 4 * (1 - range(u, 0.4, 1)) : 0;

  /* Hero camera: a window on the hero that opens up as the screen grows ------ */
  const vw0 = Math.min(vw, L.focus.w / 0.62);
  const winW = Math.exp(lerp(Math.log(vw0), Math.log(vw), e));
  const a = (cr - cl) / winW;
  const fx = lerp(L.focus.x, vw / 2, e);
  const fy = lerp(L.focus.y, vh / 2, e);
  const camX = (cl + cr) / 2 - a * fx;
  const camY = (ct + cb) / 2 - a * fy + hold * vh;

  /* Energy, saturation, scanlines, vignette, arrival sweep ------------------ */
  const energy =
    t < lkA
      ? 0
      : t < puA
        ? lerp(0, 0.45, smooth(range(u, 0.3, 1)))
        : lerp(0.45, 1, e);
  const sat = 1 + 0.15 * (t < arA ? e : 1 - easeOut(range(t, arA, arB)));
  const extras = t < puA ? 0 : smooth(range(p, 0.15, 0.85));
  const sweep = range(t, arA, arA + 200) * 100;
  const sweepO = t >= arA && sweep < 100 ? 1 : 0;
  const scan = t < lkA ? 0.18 : lerp(0.18, 0.06, e);
  const vig = t < puA ? 0.6 : lerp(0.6, 0.15, e) * (t >= arA ? 1 - range(t, arA, arB) : 1);

  const wClip = cr - cl;
  const hClip = cb - ct;
  const px = (n: number) => `${n.toFixed(2)}px`;
  const num = (n: number) => n.toFixed(4);

  return {
    tvTransform: `translate3d(${tvX.toFixed(2)}px, ${tvY.toFixed(2)}px, 0) scale(${s.toFixed(4)})`,
    tvOpacity: eIn * (1 - cabFade),
    stageClip,
    camTransform: `translate3d(${camX.toFixed(2)}px, ${camY.toFixed(2)}px, 0) scale(${a.toFixed(4)})`,
    osd,
    surge: t >= puA && t < arA + (arB - arA) * 0.4,
    state: t >= arA ? "arriving" : "playing",
    showSkip: t >= P.skipAt,
    drawNoise: staticO > 0.01,
    stageFilter: Math.abs(sat - 1) < 0.001 ? "none" : `saturate(${sat.toFixed(4)})`,
    bloomOpacity: 0.15 + energy * 0.5,
    glowOpacity: 0.45 + energy * 0.55,
    extrasOpacity: extras,
    lit: Math.min(BULB_COUNT, Math.floor(energy * BULB_COUNT)),
    chroma,
    tear: { on: tear, shift: [tearVals[0], tearVals[1], tearVals[2]] },
    dial,
    rim,
    led: t >= pwA,
    vars: {
      fx: {
        "--static-o": num(staticO),
        "--flicker": num(flicker),
        "--base-o": t < lkA ? "1" : "0",
        "--hum": num((t % 900) / 900),
        "--track-x": px(trackX),
        "--osd-o": num(osdO),
        "--line-sx": num(lineSx),
        "--line-sy": num(lineSy),
        "--line-o": num(lineO),
      },
      desat: {
        "--sat-o": String(satO),
        "--bleed": bleed.toFixed(2),
        "--rr": px(Math.hypot(wClip, hClip) / 2),
        "--scx": px((cl + cr) / 2),
        "--scy": px((ct + cb) / 2),
      },
      scan: { "--scan-o": num(scan), "--sweep": sweep.toFixed(2) },
      vig: {
        "--vig-o": num(vig),
        "--vrx": px((wClip / 2) * 1.05),
        "--vry": px((hClip / 2) * 1.05),
        "--scx": px((cl + cr) / 2),
        "--scy": px((ct + cb) / 2),
      },
      sweep: { "--sweep": sweep.toFixed(2), "--sweep-o": String(sweepO) },
    },
  };
}
