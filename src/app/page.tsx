import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { SiteShell } from "@/components/ui/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Ticker />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </SiteShell>
  );
}
