import "./siteScreen.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * The content the CRT intro shows on its glass: the main Qubit site
 * (public/site) in a viewport-sized frame. CrtIntro clips and scales it into
 * the TV screen, then lets it go — it is the same frame, never reloaded, so
 * what was inside the TV simply becomes the full-screen site.
 *
 * The hidden stand-ins keep the intro's hero hooks satisfied (it animates a
 * glow, bloom and bulb ring that the old hero had); they render nothing.
 */
export function SiteScreen() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-ink">
      <iframe
        src={`${BASE}/site/index.html`}
        title="Qubit ’26"
        className="absolute inset-0 h-full w-full border-0 bg-ink"
      />
      <div className="site-focus" data-intro-focus aria-hidden="true" />
      <div className="wm-bloom hero-glow bulb-ring" style={{ display: "none" }} aria-hidden="true" />
    </div>
  );
}
