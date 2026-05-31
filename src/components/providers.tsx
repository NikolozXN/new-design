"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide client providers.
 * - next-themes: class-based dark/light switching.
 * - MotionConfig reducedMotion="user": every Framer Motion animation in the
 *   app automatically respects the OS `prefers-reduced-motion` setting.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
