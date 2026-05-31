import type { Metadata } from "next";
import { SiteShell } from "@/components/ui/site-shell";
import { Pricing } from "@/components/sections/pricing";
import { PricingComparison } from "@/components/sections/pricing-comparison";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Pricing — Flowly",
  description:
    "Simple, transparent pricing for teams of every size. Start free, upgrade as you grow, and cancel anytime.",
};

export default function PricingPage() {
  return (
    <SiteShell>
      <div className="pt-16">
        <Pricing />
        <PricingComparison />
        <FAQ />
        <CTA />
      </div>
    </SiteShell>
  );
}
