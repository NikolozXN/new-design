import type { ReactNode } from "react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { GrainOverlay } from "@/components/ui/aurora";
import { Cursor } from "@/components/ui/cursor";

/** Shared marketing chrome — cursor, scroll bar, grain, navbar, footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
