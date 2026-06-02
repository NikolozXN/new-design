import type { ReactNode } from "react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { GrainOverlay } from "@/components/ui/aurora";

/**
 * Shared marketing chrome (scroll bar, grain, navbar, footer).
 * Custom cursor removed — mix-blend-difference over the full viewport was
 * costing a frame on every mousemove.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
