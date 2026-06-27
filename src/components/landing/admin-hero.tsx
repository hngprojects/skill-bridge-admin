import { HeroCopy } from "./hero-copy";
import { HeroCurve } from "./hero-curve";
import { HeroPreviewCards } from "./hero-preview-cards";

export function AdminHero() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-73px)] overflow-hidden bg-landing-hero-bg md:min-h-[calc(100vh-73px)]"
    >
      <HeroCopy />
      <HeroPreviewCards />
      <HeroCurve />
    </section>
  );
}
