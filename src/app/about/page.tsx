import type { Metadata } from "next";
import { SiteShell } from "@/components/ui/site-shell";
import { About } from "@/components/sections/about";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About — Flowly",
  description:
    "Flowly is building the calm operating system for modern teams. Meet the people and the values behind the product.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <About />
      <CTA />
    </SiteShell>
  );
}
