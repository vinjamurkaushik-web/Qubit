export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TvGeo {
  vbW: number;
  vbH: number;
  cab: Box & { r: number };
  recess: Box & { r: number };
  screen: Box & { rx: number };
  col: Box;
}

const SCREEN_ASPECT = 1.36;

/**
 * Geometry of the TV illustration in SVG units (viewBox width is always 1000).
 * `compact` narrows the control column so the screen gets more of the width —
 * used on phones, where the screen should dominate the set.
 */
export function tvGeo(compact: boolean): TvGeo {
  const vbW = 1000;
  const cabX = 30;
  const cabW = 940;
  const cabY = 165;
  const colW = compact ? 132 : 175;
  const colX = cabX + cabW - 30 - colW;
  const recessX = cabX + 22;
  const recessW = colX - 24 - recessX;
  const pad = compact ? 22 : 26;
  const screenW = recessW - pad * 2;
  const screenH = screenW / SCREEN_ASPECT;
  const screenY = 215;
  const recessY = screenY - pad;
  const recessH = screenH + pad * 2;
  const cabH = recessY + recessH + 36 - cabY;

  return {
    vbW,
    vbH: cabY + cabH + 46,
    cab: { x: cabX, y: cabY, w: cabW, h: cabH, r: 20 },
    recess: { x: recessX, y: recessY, w: recessW, h: recessH, r: compact ? 90 : 100 },
    screen: { x: recessX + pad, y: screenY, w: screenW, h: screenH, rx: compact ? 70 : 78 },
    col: { x: colX, y: recessY, w: colW, h: recessH },
  };
}
