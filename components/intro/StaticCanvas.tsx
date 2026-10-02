/** Low-resolution canvas for the TV static; upscaled by CSS for a soft analog grain. */
export function StaticCanvas({ width, height }: { width: number; height: number }) {
  return <canvas data-intro-static width={width} height={height} />;
}

/** Returns a function that paints a fresh frame of cool-grey noise (xorshift into a Uint32Array). */
export function createNoiseDrawer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const img = ctx.createImageData(canvas.width, canvas.height);
  const buf = new Uint32Array(img.data.buffer);
  let seed = 0x9e3779b9;

  return () => {
    for (let i = 0; i < buf.length; i++) {
      seed ^= seed << 13;
      seed ^= seed >>> 17;
      seed ^= seed << 5;
      const v = 70 + ((seed >>> 0) % 120);
      // little-endian ABGR: slight blue cast
      buf[i] = 0xff000000 | ((v + 8) << 16) | (v << 8) | (v - 4);
    }
    ctx.putImageData(img, 0, 0);
  };
}
