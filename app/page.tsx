import { CrtIntro } from "@/components/intro/CrtIntro";
import { SiteScreen } from "@/components/intro/SiteScreen";

/**
 * The CRT intro plays with the main Qubit site (public/site) on its glass;
 * when the screen fills the viewport that same site is simply the page.
 */
export default function Home() {
  return (
    <main>
      <CrtIntro>
        <SiteScreen />
      </CrtIntro>
    </main>
  );
}
