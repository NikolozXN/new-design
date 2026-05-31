"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

/**
 * Premium track switch: a glowing gradient knob slides between a sun and moon,
 * with the active glyph morphing inside it. Spring-animated, accessible.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-8 w-[3.75rem] items-center rounded-full border border-border bg-surface-2 px-1 transition-colors hover:border-primary/40"
    >
      {/* faint background glyphs */}
      <Sun className="absolute left-1.5 h-3.5 w-3.5 text-muted/60" />
      <Moon className="absolute right-1.5 h-3.5 w-3.5 text-muted/60" />

      {/* sliding knob */}
      <motion.span
        initial={false}
        animate={{ x: isDark ? "1.75rem" : "0rem" }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_12px_2px_color-mix(in_srgb,var(--primary)_55%,transparent)] ring-1 ring-inset ring-white/25"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="inline-flex"
          >
            {isDark ? (
              <Moon className="h-3.5 w-3.5" />
            ) : (
              <Sun className="h-3.5 w-3.5" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
